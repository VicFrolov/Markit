package com.markit.android;

import java.util.List;

/**
 * Created by annagotsis on 12/7/16.
 */

public class ConversationItem {
    public String conversationID;
    public String itemID;
    public String otherUser;

    public ConversationItem() {
    }

    public ConversationItem(String conversationID, String otherUser, String itemID) {
        this.otherUser = otherUser;
        this.conversationID = conversationID;
        this.itemID = itemID;
    }

    public ConversationItem(String otherUser, String itemID) {
        this.otherUser = otherUser;
        this.itemID = itemID;
    }

    public String getConversationID() {
        return conversationID;
    }


    public String getOtherUser() {
        return otherUser;
    }

}