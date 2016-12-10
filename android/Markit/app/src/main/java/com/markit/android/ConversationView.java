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

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

import static com.markit.android.ItemDetail.seller;

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
    //DatabaseReference conversationRef = database.getReference().child("users/" + getUID() + "/chats");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chatlist_view);

        firebaseAuth = FirebaseAuth.getInstance();
        firebaseAuth.addAuthStateListener(this);
        //firebaseAuth.getCurrentUser().getUid();

        conversationsList = (RecyclerView) findViewById(R.id.messagesRecyclerView);

        if (conversationsList != null) {
            conversationsList.setHasFixedSize(true);
        }

        llm = new LinearLayoutManager(this);
        conversationsList.setLayoutManager(llm);

        ValueEventListener itemListener = new ValueEventListener() {

            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                for (DataSnapshot convos : dataSnapshot.child("users/" + getUID() + "/chats/").getChildren()) {
                    //String conversationName = (String) convos.child(seller).getValue();
                    String itemUID = (String) convos.child("uid").getValue();
                    //DataSnapshot usernameRef = dataSnapshot.child("users").child(itemUID).child("username");

                    //TODO need to find seller (or eventually person who you're chatting
                    // what exactly do I map conversationName to?
                    DataSnapshot sellerRef = dataSnapshot.child(ItemDetail.conversationKey + "/context/" + seller);
                    //String username = (String) usernameRef.getValue();
                    String conversationName = (String) sellerRef.getValue();
//                    String conversationName = (String) convos.child(seller).getValue();
                    ConversationItem newConvo = new ConversationItem(conversationName, itemUID);
                    conversations.add(newConvo);
                    //its printing out the two conversations that I have but its saying they're null
                    Log.i(TAG, conversationName +"");
                }

                ConversationAdapter iAdapter = new ConversationAdapter(ConversationView.this, conversations);
                conversationsList.setAdapter(iAdapter);
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

//        FirebaseRecyclerAdapter<ConversationItem, ConversationViewHolder> adapter = new FirebaseRecyclerAdapter<ConversationItem, ConversationView.ConversationViewHolder>(
//                ConversationItem.class, R.layout.chat_list_users, ConversationView.ConversationViewHolder.class, conversationRef) {
//            @Override
//            public void populateViewHolder(ConversationView.ConversationViewHolder conversationViewHolder, ConversationItem model, int position) {
//                conversationViewHolder.conversationName.setText(model.getSeller());
//                //conversationViewHolder.conversationMessage.setText(model.getLastMessage());
//                //final String conversationID = model.getId();
//                Log.i(TAG, conversationViewHolder.conversationName.toString()+"");
//                conversationViewHolder.conversationName.setOnClickListener(new View.OnClickListener() {
//                    @Override
//                    public void onClick(View view) {
//                        Intent chat = new Intent(ConversationView.this, MainChatActivity.class);
//                        //final String itemID = model.getItemID();
//                        chat.putExtra("uid", ItemDetail.conversationKey);
//                        ConversationView.this.startActivity(chat);
//                    }
//                });
//            }
//        };
//        conversationsList.setAdapter(adapter);
//    }
//
//    public static class ConversationViewHolder extends RecyclerView.ViewHolder {
//        TextView conversationName;
//        //final TextView conversationMessage;
//        TextView conversationID;
//        Context context;
//
//        public ConversationViewHolder(View itemView) {
//            super(itemView);
//            context = itemView.getContext();
//            //itemView.setOnClickListener(this);
//            conversationName = (TextView) itemView.findViewById(R.id.list_item_username);
//            //conversationMessage = (TextView) itemView.findViewById(R.id.list_item_message);
//            conversationID = (TextView) itemView.findViewById(R.id.conversationID);
//        }
//
//    }
//
//    @Override
//    public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
//
//    }
//}


//public class ConversationView extends BaseActivity {
//
//    private Context context = this;
//    private LinearLayoutManager llm;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_chatlist_view);
//
//        final RecyclerView conversationsList = (RecyclerView) findViewById(R.id.messagesRecyclerView);
//
//        ValueEventListener getConvo = new ValueEventListener() {
//            @Override
//            public void onDataChange(DataSnapshot dataSnapshot) {
//                ArrayList<ConversationItem> listOfConversations = new ArrayList<>();
//
//                for (DataSnapshot userSnapshot : dataSnapshot.getChildren()) {
//                    listOfConversations.add(new ConversationItem(0, userSnapshot.getKey(), "last_message"));
//                }
//
////                llm = new LinearLayoutManager(this);
////                conversationsList.setLayoutManager(llm);
//
//                conversationsList.setLayoutManager(new StaggeredGridLayoutManager(1, 1));
//                conversationsList.setAdapter(new ConversationAdapter(listOfConversations, getApplicationContext()));
//            }
//            @Override
//            public void onCancelled(DatabaseError databaseError) {
//
//            }
//        };
//    }
//}











