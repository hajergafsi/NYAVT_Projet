package Cooler.Observer;

public class Subscriber2 implements IObserver{
    @Override
    public void update(String m) {
        System.out.println("Message sent to subscriber2 ->" + m);
    }
}
