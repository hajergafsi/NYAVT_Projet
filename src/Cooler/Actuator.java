package Cooler;

import Cooler.Observer.ISubject;

public class Actuator implements IActuator{
    boolean isOn;
    ISubject publisher;
    private IInterface intrface;
    public Actuator(ISubject p,IInterface intrface){
        isOn = false;
        this.intrface = intrface;
        publisher = p;
    }
    public void PowerOn() {
        if(!isOn){
            isOn=true;
            if(publisher != null)publisher.notify("Cooler powered on !");
            intrface.DisplayMessage("Cooler powered on !");
        }
        else {
            intrface.DisplayMessage("Cooler already on ! Cancelling ...");
        }
        Tools.wait(1000);
    }


    public void PowerOff() {
        if(isOn){
            isOn=false;
            if(publisher != null)publisher.notify("Cooler powered off !");
            intrface.DisplayMessage("Cooler powered off !");
        } else {
            intrface.DisplayMessage("Cooler already off ! Cancelling ...");
        }
        Tools.wait(1000);
    }
}
