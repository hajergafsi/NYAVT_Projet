package Cooler;

public class Main {

    public static void main(String[] args) {
        SmartDevice SD = new SmartDevice.SmartDeviceBuilder()
                .Publisher()
                .Subscribers()
                .Actuator()
                .build();
        SD.Start();
    }
}
