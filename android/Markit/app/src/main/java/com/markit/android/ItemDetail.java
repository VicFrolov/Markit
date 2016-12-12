package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import com.markit.android.base.files.BaseActivity;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.markit.android.chat.files.NewConversationActivity;

import java.util.ArrayList;


public class ItemDetail extends BaseActivity implements FirebaseAuth.AuthStateListener {
    private String uid;
    private String itemName;
    private String itemPrice;
    private String item;
    private String itemID;
    private DatabaseReference itemDatabase;
    public static String conversationKey;
    private FirebaseAuth firebaseAuth;
   // public static String seller;
    //public List<Chat> messages;
    //public static String seller;
    public static String otherUser;
    //public String buyer;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference convoRef = database.getReference().child("users/" + getUID() + "/chats/");
    //DatabaseReference convoRef = database.getReference().child("chats");

    private FirebaseStorage storage;
    private boolean inFavorites;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_detail);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Bundle idInfo = getIntent().getExtras();
        if (idInfo != null) {
            itemID = idInfo.getString("id");
        } else{
            itemID = "-KX9d_FL3zJVZgvnl8TW";
        }

//        itemDatabase = FirebaseDatabase.getInstance().getReference().child("items").child(uid);
//
        firebaseAuth = FirebaseAuth.getInstance();
        firebaseAuth.addAuthStateListener(this);


        final DatabaseReference rootDatabase = FirebaseDatabase.getInstance().getReference();

//        itemDatabase = FirebaseDatabase.getInstance().getReference().child("items").child(itemID);
        ItemDetail.this.itemDatabase = rootDatabase.child("items").child(itemID);
        storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReferenceFromUrl("gs://markit-80192.appspot.com");
        final StorageReference pathRef = storageRef.child("images/itemImages/");
        final Button favorites = (Button) findViewById(R.id.addToWatch);

        ValueEventListener itemDetails = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                String uid = (String) dataSnapshot.child("items").child(itemID).child("uid").getValue();
                TextView uidTitle = (TextView) findViewById(R.id.uidTitle);
                TextView userId = (TextView) findViewById(R.id.userId);
                TextView description = (TextView) findViewById(R.id.descriptionItemDetail);
                TextView price = (TextView) findViewById(R.id.priceItemDetail);
                TextView tags = (TextView) findViewById(R.id.tagsItemDetail);

                otherUser = (String) dataSnapshot.child("uid").getValue();
                userId.setText(otherUser);

//                sellerRef = database.getReference().child("users/" + userId + "/chats/");
                uidTitle.setText((String) dataSnapshot.child("title").getValue());
                description.setText("Description: " + (String) dataSnapshot.child("description").getValue());
                price.setText("Price: $"+(String) dataSnapshot.child("price").getValue());
                //String className = dataSnapshot.child("tags").getValue().getClass().getName();
//                TODO this line below broke, something about a conversion from HashMap to ArrayList
//                ArrayList <String> tagList= (ArrayList<String>) dataSnapshot.child("tags").getValue();

                String tagString = "Tags: ";

//                TODO same for this for loop, commented out to avoid using tagList
//                for(String tag : tagList) {
//                    tagString = tagString + tag + " ";
//                }

                tags.setText(tagString);
                    if (dataSnapshot.child("users").child(getUID()).child("favorites").child(itemID).getValue() == null) {
                        inFavorites = false;
                    } else {
                        inFavorites = (Boolean) dataSnapshot.child("users").child(getUID()).child("favorites").child(itemID).getValue();
                    }
                    if (inFavorites) {

                        favorites.setText("Remove from Favorites");

                    } else {
                        favorites.setText("Add to Favorites");
                    }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        };

        itemDatabase.addListenerForSingleValueEvent(itemDetails);
//        rootDatabase.addListenerForSingleValueEvent(itemDetails);
        FloatingActionButton newMessage = (FloatingActionButton) findViewById(R.id.newMessage);
        newMessage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ItemDetail.conversationKey = convoRef.push().getKey();
                //String conversationID = convoRef.push().getKey();
                DatabaseReference contextRef = convoRef.child(conversationKey + "/context");
                DatabaseReference sellerRef = database.getReference().child("users/" + otherUser + "/chats/" + conversationKey  + "/context");
                String itemId = itemID;

                ConversationItem myConversation = new ConversationItem(conversationKey, otherUser, itemId);
                contextRef.setValue(myConversation);
                ConversationItem theirConversation = new ConversationItem(conversationKey, getUID(), itemId);
                sellerRef.setValue(theirConversation);
                startActivity(new Intent(ItemDetail.this, NewConversationActivity.class));
            }
        });

        favorites.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                if (inFavorites){
                    rootDatabase.child("users").child(getUID()).child("favorites").child(itemID).setValue(false);
                    favorites.setText("Add to favorites");
                    inFavorites = false;
                } else {
                    rootDatabase.child("users").child(getUID()).child("favorites").child(itemID).setValue(true);
                    favorites.setText("Remove from Favorites");
                    inFavorites = true;
                }
            }
        });

    }

    @Override
    public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {

    }
}
