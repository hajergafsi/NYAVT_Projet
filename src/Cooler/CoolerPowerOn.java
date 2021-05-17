package Cooler;

public class CoolerPowerOn implements IProcess{
    private IActuator Actuator ;
    public CoolerPowerOn(IActuator actuator){
        Actuator = actuator;
    }
    @Override
    public void executeProcess() {
        Actuator.PowerOn();
    }
}
