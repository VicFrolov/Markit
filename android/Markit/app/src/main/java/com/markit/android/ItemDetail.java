package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.TextView;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import java.util.ArrayList;


public class ItemDetail extends BaseActivity {
    private String uid;
    private String itemName;
    private String itemPrice;
    private String item;
    private DatabaseReference itemDatabase;
    private String conversationKey;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_detail);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Bundle uidInfo = getIntent().getExtras();

        if (uidInfo != null) {
            uid = uidInfo.getString("uid");
        } else{
            uid = "-KX9d_FL3zJVZgvnl8TW";
        }
        itemDatabase = FirebaseDatabase.getInstance().getReference().child("items").child(uid);
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        final DatabaseReference chatRef = database.getReference().child("users/" + getUID() + "/chats" + "/conversationID");


        ValueEventListener itemDetails = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
//                for (DataSnapshot itemInfo : dataSnapshot.getChildren()) {
//                    TextView uidTitle = (TextView) findViewById(R.id.uidTitle);
//                    uidTitle.setText(itemInfo.getValue(String.class));
//                }
//               Object specificItem = dataSnapshot.getValue();
                TextView uidTitle = (TextView) findViewById(R.id.uidTitle);
                TextView description = (TextView) findViewById(R.id.descriptionItemDetail);
                TextView price = (TextView) findViewById(R.id.priceItemDetail);
                TextView tags = (TextView) findViewById(R.id.tagsItemDetail);
                uidTitle.setText((String) dataSnapshot.child("title").getValue());
                description.setText("Description: " + (String) dataSnapshot.child("description").getValue());
                price.setText("Price: $"+(String) dataSnapshot.child("price").getValue());
                //String className = dataSnapshot.child("tags").getValue().getClass().getName();
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
                conversationKey = chatRef.push().getKey();
//                String uid = firebaseAuth.getCurrentUser().getUid();
                //String user = "User " + uid.substring(0, 6);
                startActivity(new Intent(ItemDetail.this, MainChatActivity.class));
//                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
//                        .setAction("Action", null).show();
            }
        });
    }

}