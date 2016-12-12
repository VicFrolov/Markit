package com.markit.android.chat.files;

import java.util.Date;

/**
 * Created by annagotsis on 11/26/16.
 */

public class Chat {

    String user;
    String message;
    String uid;
    String date;
    String type;

    public Chat() {
    }

    public Chat(String message) {
        this.message = message;
    }

    Chat(String message, String user, String date, String type) {
        this.message = message;
        this.date = date;
        this.user = user;
        this.type = type;

    }

    public String getUser() {
        return user;
    }

    public String getUid() {
        return uid;
    }

    public String getMessage() {
        return message;
    }
}
