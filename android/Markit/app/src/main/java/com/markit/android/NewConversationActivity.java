package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;
import java.util.List;

import static com.markit.android.ItemDetail.conversationKey;

/**
 * Created by annagotsis on 12/7/16.
 */

public class NewConversationActivity extends BaseActivity {

    public String conversationKey;
    private Button sendButton;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference convoRef = database.getReference().child("users/" + getUID() + "/chats/");
    DatabaseReference chatRef = convoRef.child(conversationKey + "/messages");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        //conversationKey = chatRef.push().getKey();

        sendButton = (Button) findViewById(R.id.sendButton);

        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //conversationKey = chatsRef.push().getKey();

//                String uid = firebaseAuth.getCurrentUser().getUid();
                //String user = "User " + uid.substring(0, 6);
                startActivity(new Intent(NewConversationActivity.this, MainChatActivity.class));

            }
        });

    }


    public static class ConversationItem {
        private String conversationID;
        private String itemId;
        private String sender;
        //private final String last_message;

        public ConversationItem(String conversationID, String sender, String itemId) {
            this.conversationID = conversationID;
            this.sender = sender;
            this.itemId = itemId;
            //this.last_message = last_message;
        }

        public ConversationItem(){

        }

        public String getId() {
            return conversationID;
        }

        public String getItemId() {
            return itemId;
        }

        public void setId(String conversationID) {
            this.conversationID = conversationID;
        }

        public void setItemId(String itemId) {
        this.itemId = itemId;
    }

        public String getSender() {
            return sender;
        }

//    public String getLastMessage() {
//        return last_message;
//    }
    }
}