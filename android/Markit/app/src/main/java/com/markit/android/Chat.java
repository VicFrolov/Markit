package com.markit.android;

import java.util.Date;

/**
 * Created by annagotsis on 11/26/16.
 */

public class Chat {

    String user;
    String text;
    String uid;
    String date;
    //Date newDate;
    //String chatId;
    //private long messageTime;

    public Chat() {
    }


    public Chat(String message, String sender, String date) {
        this.text = message;
        this.date = date;
        this.user = sender;

    }

    public String getUser() {
        return user;
    }

    public String getUid() {
        return uid;
    }

//        public String getChatId() {
//            return chatId;
//        }

    public String getMessage() {
        return text;
    }
}

//        public long getMessageTime() {
//            return messageTime;
//        }
//
//        public void setMessageTime(long messageTime) {
//            this.messageTime = messageTime;
//        }}