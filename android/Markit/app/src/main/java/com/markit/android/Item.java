package com.markit.android;

/**
 * Created by pcross on 10/15/16.
 */

public class Item {
    private String description;
    private String price;
    //private String[] tags;
    private String title;
    private String uid;
    //private String username;

    public Item() {
//        this.description = "No description";
//        this.price = "0";
//        this.tags = new String[1];
//        tags[0] = "None";
//        this.title = "No Title";
//        this.uid = "None";
    }

    public Item(String title, String description, String price, String [] tags, String uid) {
        this.title = title;
        this.description = description;
        this.price = price;
        //this.tags = tags;
        this.uid = uid;
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

//    public String[] getTags() {
//        return tags;
//    }

//    public void setTags(String[] tags) {
//        this.tags = tags;
//    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }


}
