package Cooler;

public class CoolerDatabase implements ICoolerDatabase{
    private ICoolerDatabase database;

    public CoolerDatabase(ICoolerDatabase database) {
        this.database=database;
    }

    public User AuthenticateUser(String Usrname, String password) {
        return database.AuthenticateUser(Usrname,password);
    }
}
