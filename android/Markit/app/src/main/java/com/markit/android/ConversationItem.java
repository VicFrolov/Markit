package com.markit.android;

import java.util.List;

/**
 * Created by annagotsis on 12/7/16.
 */

public class ConversationItem {
    private String conversationID;
    //private String itemId;
    private String sender;
    //private List<Chat> messages;
    //private final String last_message;

    public ConversationItem(){
    }

    public ConversationItem(String conversationID, String sender) {
        this.conversationID = conversationID;
        this.sender = sender;
        //this.messages = messages;
        //this.itemId = itemId;
        //this.last_message = last_message;
    }

    public String getId() {
        return conversationID;
    }

//    public String getItemId() {
//        return itemId;
//    }

    public void setId(String conversationID) {
        this.conversationID = conversationID;
    }

//    public void setItemId(String itemId) {
//        this.itemId = itemId;
//    }

    public String getSender() {
        return sender;
    }

//    public List<Chat> getMessages() {
//        return messages;
//    }

//    public String getLastMessage() {
//        return last_message;
//    }
}