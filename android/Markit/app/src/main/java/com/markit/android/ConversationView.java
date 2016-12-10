package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.View;
import android.widget.TextView;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

/**
 * Created by annagotsis on 12/7/16.
 */

public class ConversationView extends BaseActivity {


    private Context context = this;
    private LinearLayoutManager llm;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference messageRef = database.getReference().child("users/" + getUID() + "/chats");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chatlist_view);

        final RecyclerView conversationsList = (RecyclerView) findViewById(R.id.messagesRecyclerView);

        if (conversationsList != null) {
            conversationsList.setHasFixedSize(true);
        }

        llm = new LinearLayoutManager(this);
        conversationsList.setLayoutManager(llm);

        FirebaseRecyclerAdapter<ConversationItem, ConversationViewHolder> adapter = new FirebaseRecyclerAdapter<ConversationItem, ConversationView.ConversationViewHolder>(
                ConversationItem.class, R.layout.chat_list_users, ConversationView.ConversationViewHolder.class, messageRef) {
            @Override
            public void populateViewHolder(ConversationView.ConversationViewHolder conversationViewHolder, ConversationItem model, int position) {
                conversationViewHolder.conversationName.setText(model.getSeller());
                //conversationViewHolder.conversationMessage.setText(model.getLastMessage());
                final String conversationID = model.getId();
                conversationViewHolder.conversationName.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Intent chat = new Intent(ConversationView.this, MainChatActivity.class);
                        //final String itemID = model.getItemID();
                        chat.putExtra("uid", conversationID);
                        ConversationView.this.startActivity(chat);
                    }
                });
            }
        };
        conversationsList.setAdapter(adapter);

    }

    public static class ConversationViewHolder extends RecyclerView.ViewHolder {
        final TextView conversationName;
        //final TextView conversationMessage;
        final TextView conversationID;
        private final Context context;

        public ConversationViewHolder(View itemView, Context context) {
            super(itemView);
            this.context = context;
            //itemView.setOnClickListener(this);
            conversationName = (TextView) itemView.findViewById(R.id.list_item_username);
            //conversationMessage = (TextView) itemView.findViewById(R.id.list_item_message);
            conversationID = (TextView) itemView.findViewById(R.id.conversationID);
        }

    }
}


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
