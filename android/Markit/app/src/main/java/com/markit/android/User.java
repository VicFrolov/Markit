package com.markit.android;
import java.util.Date;

import java.util.ArrayList;

/**
 * Created by annagotsis on 11/30/16.
 */

public class User {

    private String dateCreated;
    private String email;
    private String firstName;
    private String lastName;
    private String userHub;
    private String username;
    private String uid;
    private ArrayList <String> paymentPreference;
    private String dateCreated;

    public User(String email, String firstName, String lastName, String userHub, String username, String uid, ArrayList<String> paymentPreference, String dateCreated) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userHub = userHub;
        this.username = username;
        this.uid = uid;
        this.paymentPreference = paymentPreference;
        this.dateCreated = dateCreated;
    }

    public User(String email, String firstName, String lastName, String userHub, String username, String uid) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userHub = userHub;
        this.username = username;
        this.uid = uid;
    }

    public User(String email, String firstName, String lastName, String userHub, String username) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userHub = userHub;
        this.username = username;
    }

    public ArrayList<String> getPaymentPreference() {
        return paymentPreference;
    }

    public void setPaymentPreference(ArrayList<String> paymentPreference) {
        this.paymentPreference = paymentPreference;
    }

    public String getdateCreated() {
        return dateCreated;
    }

    public void setdateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getUid() {

        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

<<<<<<< HEAD
=======
    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

>>>>>>> 49c362c8210f60fb923d4dd851bbaf809f080775
    public String getUserHub() {
        return userHub;
    }

    public void setUserHub(String userHub) {
        this.userHub = userHub;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String[] getFavorites() {
        return favorites;
    }

    public void setFavorites(String[] favorites) {
        this.favorites = favorites;
    }

    public void setDateCreated(String date) {
        this.dateCreated = dateCreated;
    }
}
