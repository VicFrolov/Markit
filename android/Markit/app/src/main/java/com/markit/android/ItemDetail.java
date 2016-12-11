package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;

import java.util.ArrayList;
import java.util.List;


public class ItemDetail extends BaseActivity implements FirebaseAuth.AuthStateListener {
    private String uid;
    private String itemName;
    private String itemPrice;
    private String item;
    private String itemID;
    private DatabaseReference itemDatabase;
    public static String conversationKey;
    private FirebaseAuth firebaseAuth;
    //public List<Chat> messages;
    //public static String seller;
    public static String otherUser;
    //public String buyer;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference convoRef = database.getReference().child("users/" + getUID() + "/chats/");
    //DatabaseReference convoRef = database.getReference().child("chats");


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_detail);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        final Bundle uidInfo = getIntent().getExtras();

        if (uidInfo != null) {
            uid = uidInfo.getString("uid");
        } else{
            uid = "-KX9d_FL3zJVZgvnl8TW";
        }

        itemDatabase = FirebaseDatabase.getInstance().getReference().child("items").child(uid);

        firebaseAuth = FirebaseAuth.getInstance();
        firebaseAuth.addAuthStateListener(this);


        ValueEventListener itemDetails = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
//                for (DataSnapshot itemInfo : dataSnapshot.getChildren()) {
//                    TextView uidTitle = (TextView) findViewById(R.id.uidTitle);
//                    uidTitle.setText(itemInfo.getValue(String.class));
//                }
//               Object specificItem = dataSnapshot.getValue();
                TextView uidTitle = (TextView) findViewById(R.id.uidTitle);
                TextView userId = (TextView) findViewById(R.id.userId);
                TextView description = (TextView) findViewById(R.id.descriptionItemDetail);
                TextView price = (TextView) findViewById(R.id.priceItemDetail);
                TextView tags = (TextView) findViewById(R.id.tagsItemDetail);
                otherUser = (String) dataSnapshot.child("uid").getValue();
                userId.setText(otherUser);
                uidTitle.setText((String) dataSnapshot.child("title").getValue());
                description.setText("Description: " + (String) dataSnapshot.child("description").getValue());
                price.setText("Price: $"+(String) dataSnapshot.child("price").getValue());
                ArrayList <String> tagList= (ArrayList<String>) dataSnapshot.child("tags").getValue();
                String tagString = "Tags: ";
                for(String tag : tagList) {
                    tagString = tagString + tag + " ";
                }
                tags.setText(tagString);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        };

        itemDatabase.addListenerForSingleValueEvent(itemDetails);

        FloatingActionButton newMessage = (FloatingActionButton) findViewById(R.id.newMessage);
        newMessage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ItemDetail.conversationKey = convoRef.push().getKey();
                DatabaseReference contextRef = convoRef.child(conversationKey + "/context");
                DatabaseReference sellerRef = database.getReference().child("users/" + otherUser + "/chats/" + conversationKey  + "/context");
                String itemId = uid;

                ConversationItem conversation = new ConversationItem(conversationKey, otherUser, itemId);
                contextRef.setValue(conversation);
                sellerRef.setValue(conversation);
                startActivity(new Intent(ItemDetail.this, NewConversationActivity.class));
            }
        });

        }
    @Override
    public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {

    }
}
