package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.firebase.client.Firebase;
import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.markit.android.base.files.BaseActivity;

import java.util.ArrayList;

import static com.markit.android.ItemDetail.otherUser;

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

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference conversationRef = database.getReference();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chatlist_view);

        firebaseAuth = FirebaseAuth.getInstance();
        firebaseAuth.addAuthStateListener(this);

//        Firebase.setAndroidContext(this);

        conversationsList = (RecyclerView) findViewById(R.id.messagesRecyclerView);

        if (conversationsList != null) {
            conversationsList.setHasFixedSize(true);
        }

        llm = new LinearLayoutManager(this);
        llm.setReverseLayout(false);
        llm.setStackFromEnd(false);
        conversationsList.setLayoutManager(llm);

        ValueEventListener itemListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                for (DataSnapshot convos : dataSnapshot.child("users/" + getUID()+ "/chats").getChildren()) {
                    //String conversationName = (String) convos.child(seller).getValue();
                    String otherUser = (String) convos.child("context/" + "otherUser").getValue();
                    String itemUID = (String) convos.child("itemID").getValue();
                    String conversationID = (String) convos.child("context/" +"conversationID").getValue();
                    //DataSnapshot usernameRef = dataSnapshot.child("users").child(itemUID).child("username");

                    //TODO need to find seller (or eventually person who you're chatting
                    // what exactly do I map conversationName to?
                    DataSnapshot sellerRef = dataSnapshot.child(ItemDetail.conversationKey + "/context");
                    //String username = (String) usernameRef.getValue();
                    String conversationName = (String) sellerRef.getValue();
//                    String conversationName = (String) convos.child(seller).getValue();
                    ConversationItem newConvo = new ConversationItem(conversationID, otherUser, itemUID);
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









