package Cooler;

public class CoolerPowerOff implements IProcess{
    private IActuator Actuator ;
    public CoolerPowerOff(IActuator actuator){
        Actuator = actuator;
    }
    @Override
    public void executeProcess() {
        Actuator.PowerOff();
    }
}
