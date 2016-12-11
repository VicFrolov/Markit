package com.markit.android;

import java.util.List;

/**
 * Created by annagotsis on 12/7/16.
 */

public class ConversationItem {
    public String conversationID;
    public String itemID;
    public String seller;
    public String buyer;
    public String otherUser;

    public ConversationItem(){
    }

//    public ConversationItem(String conversationID, String sender, String itemID, String seller, List<Chat> messages) {
//        this.conversationID = conversationID;
//        //this.sender = sender;
//        this.seller = seller;
//        this.messages = messages;
//        this.itemID = itemID;
//        //this.last_message = last_message;
//    }

//    public ConversationItem(String conversationID, String seller, String buyer, String itemID) {
//        this.conversationID = conversationID;
//        this.seller = seller;
//        this.itemID = itemID;
//        this.buyer = buyer;
//    }

//    public ConversationItem(String seller, String buyer, String itemID) {
//        this.seller = seller;
//        this.itemID = itemID;
//        this.buyer = buyer;
//    }

    public ConversationItem(String conversationID, String otherUser, String itemID) {
        this.otherUser = otherUser;
        this.conversationID = conversationID;
        this.itemID = itemID;
    }

    public ConversationItem(String otherUser, String itemID) {
        this.otherUser = otherUser;
        this.itemID = itemID;
    }

//    public String getId() {
//        return conversationID;
//    }


    public String getOtherUser() {
        return otherUser;
    }


    public String getBuyer() {
        return buyer;
    }




//    public static class Chat {
//
//        String user;
//        String message;
//        String uid;
//        String chatId;
//        private long messageTime;
//
//        public Chat() {
//        }
//
//        public Chat(String user, String uid, String message, String chatId) {
//            this.user = user;
//            this.message = message;
//            this.uid = uid;
//            this.chatId = chatId;
//        }
//
//        public String getUser() {
//            return user;
//        }
//
//        public String getUid() {
//            return uid;
//        }
//
//        public String getChatId() {
//            return chatId;
//        }
//
//        public String getMessage() {
//            return message;
//        }
//
//        public long getMessageTime() {
//            return messageTime;
//        }
//
//        public void setMessageTime(long messageTime) {
//            this.messageTime = messageTime;
//        }
//    }
}