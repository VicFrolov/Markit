package com.markit.android;

import java.util.Date;

/**
 * Created by annagotsis on 11/30/16.
 */

public class User {

    private String dateCreated;
    private String email;
    private String firstName;
    private String lastName;
    private String uid;
    private String hub;
    private String username;
//    private String[] favorites;
//    private String[] itemsForSale;


    public User() {
        this.email = "none";
        this.firstName = "none";
        this.lastName = "none";
        this.uid = "none";
        this.hub = "none";
        this.username = "none";
//        this.favorites = new String[1];
//        favorites[0] = "none";
//        this.itemsForSale = new String[1];
//        itemsForSale[0] = "none";
    }

    public User(String email, String firstName, String lastName, String uid, String username) {
        dateCreated = new Date().toString();
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
//        this.favorites = favorites;
        this.uid = uid;
        //this.hub = hub;
        this.username = username;
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

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getHub() {
        return hub;
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

    public void setDateCreated(String date) {
        this.dateCreated = dateCreated;
    }
}
