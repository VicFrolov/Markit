package com.markit.android;

import java.util.Date;

/**
 * Created by annagotsis on 11/26/16.
 */

public class Chat {

    public String message;
    public String sender;
    public String recipient;
    public long messageTime;
    public Date mDate;

    private int mRecipientOrSenderStatus;


    // Required default constructor for Firebase object mapping
    @SuppressWarnings("unused")
    public Chat() {
    }

    public Date getDate() {
        return mDate;
    }

    public void setDate(Date date) {
        mDate = date;
    }

    Chat(String message, String recipient, String sender) {
        this.message = message;
        this.sender = sender;
        this.recipient = recipient;
    }

    public void setRecipientOrSenderStatus(int recipientOrSenderStatus) {
        this.mRecipientOrSenderStatus = recipientOrSenderStatus;
    }
    public int getRecipientOrSenderStatus() {
        return mRecipientOrSenderStatus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String user) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public long getMessageTime() {
        return messageTime;
    }

    public void setMessageTime(long messageTime) {
        this.messageTime = messageTime;
    }


}