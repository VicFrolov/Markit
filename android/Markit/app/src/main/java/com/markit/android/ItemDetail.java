package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.firebase.ui.storage.images.FirebaseImageLoader;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;


public class ItemDetail extends BaseActivity {
    private String itemID;
    private String itemName;
    private String itemPrice;
    private String item;
    private DatabaseReference itemDatabase;
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

        final DatabaseReference rootDatabase = FirebaseDatabase.getInstance().getReference();
        itemDatabase = FirebaseDatabase.getInstance().getReference().child("items").child(itemID);
        storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReferenceFromUrl("gs://markit-80192.appspot.com");
        final StorageReference pathRef = storageRef.child("images/itemImages/");
        final Button favorites = (Button) findViewById(R.id.addToWatch);
        ValueEventListener itemDetails = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                String uid = (String) dataSnapshot.child("items").child(itemID).child("uid").getValue();
                TextView uidTitle = (TextView) findViewById(R.id.uidTitle);
                TextView description = (TextView) findViewById(R.id.descriptionItemDetail);
                TextView price = (TextView) findViewById(R.id.priceItemDetail);
                TextView tags = (TextView) findViewById(R.id.tagsItemDetail);
                uidTitle.setText((String) dataSnapshot.child("items").child(itemID).child("title").getValue());
                description.setText("Description: " + (String) dataSnapshot.child("items").child(itemID).child("description").getValue());
                price.setText("Price: $"+(String) dataSnapshot.child("items").child(itemID).child("price").getValue());
                ArrayList <String> tagList= (ArrayList<String>) dataSnapshot.child("items").child(itemID).child("tags").getValue();
                String itemPathRef = itemID + "/imageOne";
                StorageReference pathReference = pathRef.child(itemPathRef);
                ImageView imageView = (ImageView) findViewById(R.id.imageItemDetail);
                Glide.with(ItemDetail.this).using(new FirebaseImageLoader()).load(pathReference).into(imageView);
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


        rootDatabase.addListenerForSingleValueEvent(itemDetails);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(ItemDetail.this, MainChatActivity.class));
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

}