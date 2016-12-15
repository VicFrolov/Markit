package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.firebase.client.Firebase;
import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.firebase.ui.storage.images.FirebaseImageLoader;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.markit.android.base.files.BaseActivity;

import java.util.ArrayList;

//import static com.markit.android.ItemDetail.otherUser;

/**
 * Created by annagotsis on 12/7/16.
 */

public class ConversationView extends BaseActivity implements FirebaseAuth.AuthStateListener {
    public static final String TAG = "Conversation";
    public Context context = this;
    public LinearLayoutManager llm;
    private RecyclerView conversationsList;
    public FirebaseAuth firebaseAuth;
    private ArrayList<ConversationItem> conversations = new ArrayList<>();
    private String itemID;
    private FirebaseStorage storage;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference conversationRef = database.getReference();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chatlist_view);
        Bundle idInfo = getIntent().getExtras();
        if (idInfo != null) {
            itemID = idInfo.getString("id");
        } else{
            itemID = "-KX9d_FL3zJVZgvnl8TW";
        }

        firebaseAuth = FirebaseAuth.getInstance();
        firebaseAuth.addAuthStateListener(this);

        conversationsList = (RecyclerView) findViewById(R.id.messagesRecyclerView);

        if (conversationsList != null) {
            conversationsList.setHasFixedSize(true);
        }

        llm = new LinearLayoutManager(this);
        llm.setReverseLayout(false);
        llm.setStackFromEnd(false);
        conversationsList.setLayoutManager(llm);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        toolbar.setTitle("Messages");
        toolbar.setTitleTextColor(Color.parseColor("#F4A49D"));

        DrawerLayout drawer = super.getDrawerLayout();
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        ValueEventListener itemListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                for (DataSnapshot convos : dataSnapshot.child("users/" + getUID()+ "/chats").getChildren()) {
                    String otherUsername = (String) convos.child("context/" + "otherUsername").getValue();
                    String itemID = (String) convos.child("context/" + "itemID").getValue();
                    String conversationID = (String) convos.child("context/" + "conversationID").getValue();

                    DataSnapshot sellerRef = dataSnapshot.child(ItemDetail.conversationKey + "/context");

                    String conversationName = (String) sellerRef.getValue();
//
                    ConversationItem newConvo = new ConversationItem(conversationID, otherUsername, itemID);
                    conversations.add(newConvo);
                    //TODO map conversationID to username
                }

                ConversationAdapter iAdapter = new ConversationAdapter(ConversationView.this, conversations);
                conversationsList.setAdapter(iAdapter);
                iAdapter.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        };
        conversationRef.addListenerForSingleValueEvent(itemListener);
    }

    @Override
    public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {

    }
}









