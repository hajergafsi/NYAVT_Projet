package Cooler.Observer;

public class Subscriber1 implements IObserver{
    @Override
    public void update(String m) {
        System.out.println("Message sent to subscriber1 ->" + m);
    }
}
