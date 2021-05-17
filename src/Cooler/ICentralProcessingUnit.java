package Cooler;

public interface ICentralProcessingUnit {
    public void powerOnCooler(IActuator Actuator);
    public void powerOffCooler(IActuator Actuator);
    public double SendTemperature(ISensor Sensor);
    public void SetTemp(double temp);
}
