package com.markit.android;

/**
 * Created by annagotsis on 12/7/16.
 */

public class ConversationItem {
    private String conversationID;
    private final String sender;
    private final String last_message;

    public ConversationItem(String conversationID, String sender, String last_message) {
        this.conversationID = conversationID;
        this.sender = sender;
        this.last_message = last_message;
    }

    public String getId() {
        return conversationID;
    }

    public void setId(String conversationID) {
        this.conversationID = conversationID;
    }

    public String getSender() {
        return sender;
    }

    public String getLastMessage() {
        return last_message;
    }
}