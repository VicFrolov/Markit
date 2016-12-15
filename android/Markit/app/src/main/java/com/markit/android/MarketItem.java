package com.markit.android;

import com.google.firebase.database.IgnoreExtraProperties;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by pcross on 10/15/16.
 */
@IgnoreExtraProperties
public class MarketItem {
    public String description;
    public String price;
    public ArrayList<String> tags;
    public String title;
    public String uid;
    public String id;
    public String date;
    public String imageUrl;
    public String username;


    public MarketItem(String title, String description, String price, String uid, String id, String username) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.uid = uid;
        this.id = id;
        this.username = username;


    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public MarketItem(String description, String price, ArrayList<String> tags, String title, String uid, String id, String date, String imageUrl, String username) {

        this.description = description;
        this.price = price;
        this.tags = tags;
        this.title = title;
        this.uid = uid;
        this.id = id;
        this.date = date;
        this.imageUrl = imageUrl;
        this.username = username;
    }

    public MarketItem () {

    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public MarketItem(String description, String price, ArrayList<String> tags, String title, String uid, String id, String date, String imageUrl) {

        this.description = description;
        this.price = price;
        this.tags = tags;
        this.title = title;
        this.uid = uid;
        this.id = id;
        this.date = date;
        this.imageUrl = imageUrl;
    }

    public MarketItem(String title, String description, String price, String uid, String id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.uid = uid;
        this.id = id;
        String date = new Date().toString();

    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public ArrayList<String> getTags() {
        return tags;
    }

    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    //fix path to get username not userID, check firebase for that
    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getImageUrl(){
        return imageUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}