package Cooler;

import javax.tools.Tool;

import Cooler.Database.PostgresqlDriver;
import Cooler.Observer.Publisher;
import Cooler.Observer.Subscriber1;
import Cooler.Observer.Subscriber2;

public class SmartDevice {
    Subscriber1 s1;
    Subscriber2 s2;
    Publisher p;
    private User user ;
    private IInterface intrface;
    private ICentralProcessingUnit CPU;
    private ISensor Sensor;
    private IActuator Actuator;


    private static final int CHECK_TEMPERATURE = 1;
    private static final int POWER_ON_COOLER = 2;
    private static final int TURN_OFF_COOLER = 3;
    private static final int EXIT = 4;


    private SmartDevice(SmartDeviceBuilder builder) {
        this.intrface = builder.intrface;
        this.CPU = builder.CPU;
        this.Actuator = builder.Actuator;
        this.Sensor = builder.Sensor;
        this.p = builder.p;
    }
    public void Start() {
        intrface.DisplayMessage("Redirecting to login Screen, please wait...");
        Tools.Wait();
        ICoolerDatabase CoolerSystemDatabase = new CoolerDatabase(new PostgresqlDriver());
        user = intrface.login(CoolerSystemDatabase);
        if (user != null){
                intrface.DisplayMessage("Authentication success !...\nWelcome "+ user.Username);
                Tools.wait(1000);
                if(p != null)p.notify(user.Username + " now connected to the device !");
                int choice;
                SelectOperation();
            } else{
                intrface.DisplayMessage("Authentication failed ...");
                Start();
            }
    }

    private void SelectOperation(){
        int choice;
        String yesNo;
        do{
            choice=intrface.DisplaySelectionMenu();
            switch (choice) {
                case CHECK_TEMPERATURE:
                    intrface.DisplayTemperature(CPU.SendTemperature(this.Sensor));
                    yesNo=intrface.Redirection();
                    if(yesNo.equals("Y"))break;
                    else choice = 4 ;
                case POWER_ON_COOLER:
                    CPU.powerOnCooler(this.Actuator);
                    yesNo=intrface.Redirection();
                    if(yesNo.equals("Y"))break;
                    else choice = 4 ;
                    break;
                case TURN_OFF_COOLER:
                    CPU.powerOffCooler(this.Actuator);
                    yesNo=intrface.Redirection();
                    if(yesNo.equals("Y"))break;
                    else choice = 4 ;
                    break;
                case EXIT:
                    intrface.DisplayMessage("Shutting down the system .. ");
                    Tools.wait(1000);
                    break;
                default:
                    intrface.DisplayMessage("Please choose a number between 1 .. 4");
            }
        }while(choice!=4);
    }
    public static class SmartDeviceBuilder{
        Subscriber1 s1;
        Subscriber2 s2;
        Publisher p;
        private User user ;
        private IInterface intrface;
        private ICentralProcessingUnit CPU;
        private ISensor Sensor;
        private IActuator Actuator;
        public SmartDeviceBuilder(){
            intrface = new NetworkInterface();
            CPU = new CentralProcessingUnit();
            Sensor = new TemperatureSensor();
        }
        public SmartDeviceBuilder Publisher(){
            p = new Publisher();
            return this;
        }
        public SmartDeviceBuilder Subscribers(){
            if(p != null){
                s1 = new Subscriber1();
                s2 = new Subscriber2();
                p.attach(s1);
                p.attach(s2);
            }
            return this;
        }
        public SmartDeviceBuilder Actuator(){
            Actuator = new Actuator(p,intrface);
            return  this;
        }
        public SmartDevice build(){
            return new SmartDevice(this);
        }

    }
}
