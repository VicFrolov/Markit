package com.markit.android;

import java.util.List;

/**
 * Created by annagotsis on 12/7/16.
 */

public class ConversationItem {
    public String conversationID;
    public String itemID;
    public String otherUsername;
    public String itemImageURL;
    public String latestPost;
    public String otherUser;
    public boolean readMessages;

    public ConversationItem() {
    }

    public ConversationItem(String conversationID, String otherUsername, String itemID, String itemImageURL) {
        this.otherUsername = otherUsername;
        this.conversationID = conversationID;
        this.itemID = itemID;
        this.itemImageURL = itemImageURL;
    }

    public ConversationItem(String conversationID, String otherUsername, String itemID) {
        this.otherUsername = otherUsername;
        this.conversationID = conversationID;
        this.itemID = itemID;
    }

    public ConversationItem(String otherUser, String itemID) {
        this.otherUser = otherUser;
        this.itemID = itemID;
    }

    public ConversationItem(String conversationID, String itemID, String itemImageURL, String otherUser, String otherUsername, String latestPost, Boolean readMessages) {
        this.otherUsername = otherUsername;
        this.conversationID = conversationID;
        this.itemID = itemID;
        this.itemImageURL = itemImageURL;
        this.otherUser = otherUser;
        this.latestPost = latestPost;
        this.readMessages = readMessages;
    }

    public ConversationItem(String conversationID, String itemID, String itemImageUrl, String otherUser, String otherUsername) {
        this.otherUsername = otherUsername;
        this.conversationID = conversationID;
        this.itemID = itemID;
        this.itemImageURL = itemImageURL;
        this.otherUser = otherUser;
        this.latestPost = latestPost;
    }

//    public ConversationItem(String conversationID, String itemID, String itemImageUrl, String latestPost, String otherUser, String otherUsername, Boolean readMessages) {
//        this.otherUsername = otherUsername;
//        this.conversationID = conversationID;
//        this.itemID = itemID;
//        this.itemImageUrl = itemImageUrl;
//        this.otherUser = otherUser;
//    }


    public String getConversationID() {
        return conversationID;
    }

    public String getItemID() {
        return itemID;
    }

    public String getOtherUsername() {
        return otherUsername;
    }

    public String getItemImageURL() {
        return itemImageURL;
    }

}