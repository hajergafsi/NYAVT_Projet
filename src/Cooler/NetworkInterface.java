package Cooler;
import java.io.IOException;
import java.util.Scanner;

public class NetworkInterface implements IInterface{
    private double Temperature;
    protected SmartDevice device ;
    public NetworkInterface(){}
    public User login(ICoolerDatabase CoolerSystemDatabase){

          System.out.println("Please enter your Username .. ");
          Scanner sc = new Scanner(System.in);
          String username = sc.nextLine();
          System.out.println("Please enter your Password .. ");
          String pass = sc.nextLine();
          User user = CoolerSystemDatabase.AuthenticateUser(username,pass);
          return user;
    }
    public void DisplayMessage(String Message){
        System.out.println();
        System.out.println(Message);
        System.out.println("****************************************");
        System.out.println();
    }

    public int DisplaySelectionMenu()
    {
        System.out.println("**********************************************");
        System.out.println("Main Menu");
        System.out.println("1-Check the Temperature");
        System.out.println("2-Power-On the Cooler");
        System.out.println("3-Power-Off the Cooler");
        System.out.println("4-Exit");
        System.out.println("Your choice:");
        Scanner sc = new Scanner(System.in);
        int choice = sc.nextInt();
        System.out.println("**********************************************");
        return choice;
    }

    public void DisplayTemperature(double temperature){
        DisplayMessage("Current Temperature = "+temperature+"°C");


    }
    public String Redirection(){
        System.out.println("Go back to main menu ? Y/N");
        Scanner sc = new Scanner(System.in);
        String cnt ;
        do {
            cnt = sc.nextLine();
            if(cnt.equals("Y")){
                System.out.println("Redirecting to main menu ... ");
                Tools.wait(1000);
                break;
            }
            else if(cnt.equals("N")) {
                Tools.wait(1000);
                break;
            }
            System.out.println("PLease type a valid answer ! ");
         }while(true);
        return cnt;
    }
    public void cleanScreen(){
        System.out.print("\033[H\033[2J");

        System.out.flush();
    }

}
