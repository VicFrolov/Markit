package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import com.markit.android.base.files.BaseActivity;
import com.google.firebase.auth.FirebaseAuth;
import com.bumptech.glide.Glide;
import com.firebase.ui.storage.images.FirebaseImageLoader;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.markit.android.chat.files.MainChatActivity;
import com.google.firebase.storage.StorageReference;
import com.squareup.picasso.Picasso;
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
    public static String seller;
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
//<<<<<<< HEAD TODO check merge

//        itemDatabase = FirebaseDatabase.getInstance().getReference().child("items").child(uid);
//
        firebaseAuth = FirebaseAuth.getInstance();
        firebaseAuth.addAuthStateListener(this);


//=======

        final DatabaseReference rootDatabase = FirebaseDatabase.getInstance().getReference();
        itemDatabase = FirebaseDatabase.getInstance().getReference().child("items").child(itemID);
        storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReferenceFromUrl("gs://markit-80192.appspot.com");
        final StorageReference pathRef = storageRef.child("images/itemImages/");
        final Button favorites = (Button) findViewById(R.id.addToWatch);
//>>>>>>> fc7609f4495dd499fe4dac689f2bb8f4a6378ed1
        ValueEventListener itemDetails = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                String uid = (String) dataSnapshot.child("items").child(itemID).child("uid").getValue();
                TextView uidTitle = (TextView) findViewById(R.id.uidTitle);
                TextView userId = (TextView) findViewById(R.id.userId);
                TextView description = (TextView) findViewById(R.id.descriptionItemDetail);
                TextView price = (TextView) findViewById(R.id.priceItemDetail);
                TextView tags = (TextView) findViewById(R.id.tagsItemDetail);
                seller = uid;
                userId.setText(seller);
//<<<<<<< HEAD TODO double check this merge (should be good)
//                seller = (String) dataSnapshot.child("uid").getValue();
//                userId.setText(seller);
////                sellerRef = database.getReference().child("users/" + userId + "/chats/");
//                uidTitle.setText((String) dataSnapshot.child("title").getValue());
//                description.setText("Description: " + (String) dataSnapshot.child("description").getValue());
//                price.setText("Price: $"+(String) dataSnapshot.child("price").getValue());
//                //String className = dataSnapshot.child("tags").getValue().getClass().getName();
//                ArrayList <String> tagList= (ArrayList<String>) dataSnapshot.child("tags").getValue();
//=======
                uidTitle.setText((String) dataSnapshot.child("items").child(itemID).child("title").getValue());
                description.setText("Description: " + (String) dataSnapshot.child("items").child(itemID).child("description").getValue());
                price.setText("Price: $"+(String) dataSnapshot.child("items").child(itemID).child("price").getValue());
                ArrayList <String> tagList= (ArrayList<String>) dataSnapshot.child("items").child(itemID).child("tags").getValue();
                String itemPathRef = itemID + "/imageOne";
                StorageReference pathReference = pathRef.child(itemPathRef);
                ImageView imageView = (ImageView) findViewById(R.id.imageItemDetail);
                Glide.with(ItemDetail.this).using(new FirebaseImageLoader()).load(pathReference).into(imageView);
//>>>>>>> fc7609f4495dd499fe4dac689f2bb8f4a6378ed1
                String tagString = "Tags: ";
                for(String tag : tagList) {
                    tagString = tagString + tag + " ";
                }

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

//<<<<<<< HEAD
//        itemDatabase.addListenerForSingleValueEvent(itemDetails);
        rootDatabase.addListenerForSingleValueEvent(itemDetails);
        FloatingActionButton newMessage = (FloatingActionButton) findViewById(R.id.newMessage);
        newMessage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ItemDetail.conversationKey = convoRef.push().getKey();
                DatabaseReference contextRef = convoRef.child(conversationKey + "/context");
                DatabaseReference sellerRef = database.getReference().child("users/" + seller + "/chats/" + conversationKey  + "/context");
                //DatabaseReference sellerRef = database.getReference().child("chats/" + contextRef);
                String buyer = firebaseAuth.getCurrentUser().getUid();
                String itemId = uid;

                ConversationItem conversation = new ConversationItem(conversationKey, seller, buyer, itemId);
                contextRef.setValue(conversation);
                sellerRef.setValue(conversation);
                startActivity(new Intent(ItemDetail.this, MainChatActivity.class));
            }
        });
//=======



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
//>>>>>>> fc7609f4495dd499fe4dac689f2bb8f4a6378ed1

//        }
    @Override
    public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {

    }
}
