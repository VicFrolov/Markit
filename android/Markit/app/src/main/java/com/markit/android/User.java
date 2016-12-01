package com.markit.android;

import java.util.Date;

import java.util.ArrayList;

/**
 * Created by annagotsis on 11/30/16.
 */

public class User {

    private String email;
    private String firstName;
    private String lastName;
    private String userHub;
    private String username;
    private String uid;
    private ArrayList <String> paymentPreference;
    private String dateCreated;

    public User(String email, String firstName, String lastName, String userHub, String username, String uid, ArrayList<String> paymentPreference, String dateCreated, ArrayList<String> favorites) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userHub = userHub;
        this.username = username;
        this.uid = uid;
        this.paymentPreference = paymentPreference;
        this.dateCreated = dateCreated;
        this.favorites = favorites;
    }

    private ArrayList <String> favorites;

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
    public String getUserHub() {
        return userHub;
=======
    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getHub() {
        return hub;
>>>>>>> 6dc7e15e062c4d69c589070228a7e7ed8d68133b
    }

    public void setHub(String userHub) {
        this.hub = userHub;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

<<<<<<< HEAD
    public ArrayList<String> getFavorites() {
        return favorites;
    }

    public void setFavorites(ArrayList<String> favorites) {
        this.favorites = favorites;
    }
=======
//    public String[] getItemsForSale() {
//        return itemsForSale;
//    }
//
//    public void setItemsForSale(String[] itemsForSale) {
//        this.itemsForSale = itemsForSale;
//    }
//
//    public String[] getFavorites() {
//        return favorites;
//    }
//
//    public void setFavorites(String[] favorites) {
//        this.favorites = favorites;
    //}
>>>>>>> 6dc7e15e062c4d69c589070228a7e7ed8d68133b

}
