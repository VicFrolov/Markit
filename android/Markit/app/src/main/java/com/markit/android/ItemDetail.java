package com.markit.android;

import android.content.ClipData;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.firebase.ui.storage.images.FirebaseImageLoader;
import com.google.android.gms.ads.formats.NativeAd;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
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

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


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
    //public List<Chat> messages;
    //public static String seller;
    public static String otherUser;
    public static String otherUsername;
    public static String username;
    //public String buyer;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    //DatabaseReference usernameReference = database.getReference().child("users/" + getUID() + "/username/");
    DatabaseReference convoRef = database.getReference().child("users/" + getUID() + "/chats/");
    DatabaseReference currentUserName = database.getReference().child("users/" + getUID() + "/username/");
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

        //DatabaseReference currentUsername = database.getReference().child("users/" + getUID() + "/username/")


        final DatabaseReference rootDatabase = FirebaseDatabase.getInstance().getReference();

//        itemDatabase = FirebaseDatabase.getInstance().getReference().child("items").child(itemID);
        ItemDetail.this.itemDatabase = rootDatabase.child("items").child(itemID);
        storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReferenceFromUrl("https://firebasestorage.googleapis.com/v0/b/markit-80192.appspot.com/o/");
        final StorageReference pathRef = storageRef.child("images/itemImages/");
        final Button favorites = (Button) findViewById(R.id.addToWatch);

        ValueEventListener itemDetails = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                DataSnapshot itemRef = dataSnapshot.child("items").child(itemID);

                String username;

                TextView uidTitle = (TextView) findViewById(R.id.uidTitle);
                TextView userId = (TextView) findViewById(R.id.userId);
                TextView description = (TextView) findViewById(R.id.descriptionItemDetail);
                TextView price = (TextView) findViewById(R.id.priceItemDetail);
                TextView tags = (TextView) findViewById(R.id.tagsItemDetail);

                otherUser = (String) itemRef.child("uid").getValue();
                username = (String) dataSnapshot.child("users").child(otherUser).child("username").getValue();
                userId.setText("Seller: "+username);
//                sellerRef = database.getReference().child("users/" + userId + "/chats/");
                uidTitle.setText((String) itemRef.child("title").getValue());
                description.setText("Description: " + (String) itemRef.child("description").getValue());
                price.setText("Price: $"+(String) itemRef.child("price").getValue());
                //String className = dataSnapshot.child("tags").getValue().getClass().getName();
                //TODO this line below broke, something about a conversion from HashMap to ArrayList
                //ArrayList <String> tagList= (ArrayList<String>) dataSnapshot.child("tags").getValue();

                String tagString = "Tags: ";

//                TODO same for this for loop, commented out to avoid using tagList
                for(DataSnapshot tag :  itemRef.child("tags").getChildren()) {
                    tagString = tagString + (String)tag.getValue() + " ";
                }
                tags.setText(tagString);

                ImageView photo = (ImageView) findViewById(R.id.imageItemDetail);
                String itemPathRef = itemID + "/imageOne";
                StorageReference pathReference = pathRef.child(itemPathRef);
                Glide.with(ItemDetail.this).using(new FirebaseImageLoader()).load(pathReference).into(photo);

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

        //itemDatabase.addListenerForSingleValueEvent(itemDetails);
        rootDatabase.addListenerForSingleValueEvent(itemDetails);

        FloatingActionButton newMessage = (FloatingActionButton) findViewById(R.id.newMessage);
        newMessage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//
//                startActivity(new Intent(ItemDetail.this, NewConversationActivity.class));
//            }

                ItemDetail.conversationKey = convoRef.push().getKey();

                String itemPathRef = itemID + "/imageOne";
                StorageReference pathReference = pathRef.child(itemPathRef);

                System.out.println(pathRef);
                System.out.println(itemPathRef);

                StorageReference storageRef =FirebaseStorage.getInstance().getReference();
                StorageReference imageRef = storageRef.child("images/itemImages/" + itemID + "/imageOne");

                imageRef.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                    @Override
                    public void onSuccess(Uri uri) {
                        String itemImageURL = uri.toString();

                        DatabaseReference contextRef = convoRef.child(conversationKey + "/context");
                        DatabaseReference sellerRef = database.getReference().child("users/" + otherUser + "/chats/" + conversationKey  + "/context");

                        String itemId = itemID;

                        Date date = new Date();
                        SimpleDateFormat fmt = new SimpleDateFormat("EEE MMM dd yyyy, HH:mm:ss 'GMT'Z '('z')'");
                        String newDate = fmt.format(date);

                        ConversationItem myConversation = new ConversationItem(conversationKey, itemId, itemImageURL, otherUser, otherUsername, newDate, true);
                        contextRef.setValue(myConversation);
                        ConversationItem theirConversation = new ConversationItem(conversationKey, itemId, itemImageURL, getUID(), username, newDate, false);
                        sellerRef.setValue(theirConversation);

                        startActivity(new Intent(ItemDetail.this, NewConversationActivity.class));
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        // Handle any errors
                    }
                });


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