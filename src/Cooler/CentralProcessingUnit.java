package Cooler;

public class CentralProcessingUnit implements ICentralProcessingUnit{

    private double Temperature;
    private IProcess CheckTemp;
    private IProcess coolerPowerOn;
    private IProcess coolerPowerOff;
    public CentralProcessingUnit(){

    }
    public void SetTemp(double temp){
        Temperature = temp;
    }
    public void powerOnCooler(IActuator Actuator) {
        coolerPowerOn = new CoolerPowerOn(Actuator);
        coolerPowerOn.executeProcess();
    }

    public void powerOffCooler(IActuator Actuator) {
        coolerPowerOff = new CoolerPowerOff(Actuator);
        coolerPowerOff.executeProcess();
    }

    public double SendTemperature(ISensor Sensor) {
        CheckTemp = new CheckTheTemperature(Sensor,this);
        CheckTemp.executeProcess();
        return this.Temperature;
    }
}
