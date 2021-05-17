package Cooler;

public class CheckTheTemperature implements IProcess{
    private ISensor Sensor ;
    private ICentralProcessingUnit CPU ;
    public CheckTheTemperature(ISensor sens, ICentralProcessingUnit cpu){
        Sensor = sens;
        CPU = cpu;
    }

    public void executeProcess() {
        CPU.SetTemp(Sensor.ReadTemperature()) ;
    }
}
