package Cooler;

public interface IInterface {
    public User login(ICoolerDatabase CoolerSystemDatabase);
    public void DisplayMessage(String Message);
    public int DisplaySelectionMenu();
    public void cleanScreen();
    public String Redirection();
    public void DisplayTemperature(double temp);
}
