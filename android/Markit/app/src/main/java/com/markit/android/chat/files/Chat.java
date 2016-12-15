package com.markit.android.chat.files;

import java.util.Date;

/**
 * Created by annagotsis on 11/26/16.
 */

public class Chat {

    String user;
    String text;
    String uid;
    String date;
    String type;

    public Chat() {
    }

    public Chat(String text) {
        this.text = text;
    }

    Chat(String text, String user, String date, String type) {
        this.text = text;
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

    public String getText() {
        return text;
    }
}
