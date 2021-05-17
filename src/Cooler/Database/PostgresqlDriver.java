package Cooler.Database;

import Cooler.ICoolerDatabase;
import Cooler.User;
import Cooler.Tools;

import java.sql.*;
public class PostgresqlDriver implements ICoolerDatabase {

    public User AuthenticateUser(String Usrname, String password) {
        User user =null;

        System.out.println("Connecting to the Cooler Authentication System , please wait ...");
        Tools.wait(2000);


        try
        {
            /***** Bağlantı kurulumu *****/
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5433/Cooler",
                    "postgres", "12345678");
            if (conn != null){
                System.out.println("Connected to the database, Authentication in progress...");
                Tools.wait(2000);
            }

            else
                System.out.println("Acces to connection refused !");


            String sql= "SELECT *  FROM \"Users\" WHERE \"Username\"='"+ Usrname +"' AND \"Password\" ='"+ password+"'";

            /***** Sorgu çalıştırma *****/
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            /***** Bağlantı sonlandırma *****/
            conn.close();

            int user_id;
            String Username;
            String Password;

            while(rs.next())
            {
                /***** Kayda ait alan değerlerini değişkene ata *****/
                user_id  = rs.getInt("id");
                Username = rs.getString("Username");
                Password = rs.getString("Password");

                /***** Ekrana yazdır *****/
                user = new User(Username,Password);
            }

            /***** Kaynakları serbest bırak *****/
            rs.close();
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }


}
