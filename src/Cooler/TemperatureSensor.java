package Cooler;
import java.util.*;
public class TemperatureSensor implements ISensor{
    private double Temperature ;
    private boolean isFunctional ;
    public TemperatureSensor(){
    }

    public double ReadTemperature() {
        double min = -40;
        double max = 100;
        Random r = new Random();
        Temperature = min + (max - min) * r.nextDouble();
        return Temperature;
    }
}
