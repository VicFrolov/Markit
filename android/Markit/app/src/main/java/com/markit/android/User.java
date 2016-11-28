package com.markit.android;

/**
 * Created by pcross on 11/27/16.
 */

public class User {
    private String email;
    private String firstName;
    private String lastName;
    private String hub;
    private String username;

    public User(String email, String firstName, String lastName, String hub, String username) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.hub = hub;
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

    public String getHub() {
        return hub;
    }

    public void setHub(String hub) {
        this.hub = hub;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
