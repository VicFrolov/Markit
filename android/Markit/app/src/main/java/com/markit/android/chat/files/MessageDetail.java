package com.markit.android.chat.files;


import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.firebase.client.Firebase;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.ValueEventListener;
import com.markit.android.BaseActivity;
import com.markit.android.ItemDetail;
import com.markit.android.R;
import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.markit.android.R.id.message_text;

public class MessageDetail extends BaseActivity implements FirebaseAuth.AuthStateListener {

    public static final String TAG = "Chat";
    private FirebaseAuth firebaseAuth;
    private Button sendButton;
    private EditText editMessage;
    private Button backButton;
    private MessageAdapter iAdapter;
    public FirebaseRecyclerAdapter recViewAdapter;
    private ArrayList<Chat> messages = new ArrayList<>();
    public Context context = this;
    private String conversationID;

    private RecyclerView messageList;
    private LinearLayoutManager llm;
    String chatKey;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference chatRefPush = database.getReference().child("chats/" + ItemDetail.conversationKey + "/messages");
    DatabaseReference convoRef = database.getReference().child("users/" + getUID() + "/chats/");
    // DatabaseReference chatRef = convoRef.child(ItemDetail.conversationKey + "/messages");
//    DatabaseReference sellerRef = database.getReference().child("users/" + ItemDetail.otherUser + "/chats/" + ItemDetail.conversationKey + "/messages");


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_continue_chat);

        Bundle idInfo = getIntent().getExtras();

        if (idInfo != null) {
            conversationID = idInfo.getString("conversationID");
        } else {
            conversationID = "-KX9d_FL3zJVZgvnl8TW";
        }

        firebaseAuth = FirebaseAuth.getInstance();
        firebaseAuth.addAuthStateListener(this);

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference chatRef = database.getReference().child("chats/" + ItemDetail.conversationKey + "/messages");
        //DatabaseReference convoRef = database.getReference().child("users/" + getUID() + "/chats/" + conversationID);
        DatabaseReference convoRef = database.getReference().child("users/" + getUID() + "/chats/");

        backButton = (Button) findViewById(R.id.backButton);

        sendButton = (Button) findViewById(R.id.sendButton);
        editMessage = (EditText) findViewById(R.id.messageEdit);

        messageList = (RecyclerView) findViewById(R.id.messagesList);


//        backButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(MainChatActivity.this, ChatListView.class));
//            }
//        });

        llm = new LinearLayoutManager(this);
        llm.setReverseLayout(false);

        messageList.setHasFixedSize(false);
        messageList.setLayoutManager(llm);

        //populateAdapter();


        //attachRecyclerViewAdapter();

//        FirebaseRecyclerAdapter<Chat, MessageViewHolder> adapter = new FirebaseRecyclerAdapter<Chat, MessageDetail.MessageViewHolder>(
//                Chat.class, R.layout.chat_message, MessageDetail.MessageViewHolder.class, chatRefPush) {
//            @Override
//            public void populateViewHolder(MessageDetail.MessageViewHolder messageViewHolder, Chat model, int position) {
//                //messageViewHolder.sender.setText(model.getUser());
//                messageViewHolder.messageText.setText(model.getMessage());
//
//            FirebaseUser currentUser = firebaseAuth.getCurrentUser();
//                if (currentUser != null) {
//                    messageViewHolder.setIsSender(true);
//                } else {
//                    messageViewHolder.setIsSender(false);
//                }
//                Log.i(TAG, messageViewHolder.messageText.toString() );
//            }
//        };
//        messageList.setAdapter(adapter);


        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //fix to get username not uid
                String uid = firebaseAuth.getCurrentUser().getUid();
                String user = uid;
                String type = "text";
                Date date = new Date();
                SimpleDateFormat fmt = new SimpleDateFormat("EEE MMM dd yyyy, HH:mm:ss 'GMT'Z '('z')'");
                String newDate = fmt.format(date);

                //message item itself
                Chat message = new Chat(editMessage.getText().toString(), user, newDate, type);

                chatRefPush.push().setValue(message, new DatabaseReference.CompletionListener() {
                    @Override
                    public void onComplete(DatabaseError databaseError, DatabaseReference reference) {
                        if (databaseError != null) {
                            Log.e(TAG, "Failed to write message", databaseError.toException());
                        }
                    }
                });

//                sellerRef.push().setValue(message, new DatabaseReference.CompletionListener() {
//                    @Override
//                    public void onComplete(DatabaseError databaseError, DatabaseReference reference) {
//                        if (databaseError != null) {
//                            Log.e(TAG, "Failed to write message", databaseError.toException());
//                        }
//                    }
//                });

                editMessage.setText("");
            }
        });

//        llm = new LinearLayoutManager(this);
//        llm.setReverseLayout(false);
//
//        messageList.setHasFixedSize(false);
//        messageList.setLayoutManager(llm);
//
//        FirebaseRecyclerAdapter<Chat, MessageViewHolder> adapter = new FirebaseRecyclerAdapter<Chat, MessageDetail.MessageViewHolder>(
//                Chat.class, R.layout.chat_message, MessageDetail.MessageViewHolder.class, chatRef) {
//            @Override
//            public void populateViewHolder(MessageDetail.MessageViewHolder messageViewHolder, Chat model, int position) {
//                //messageViewHolder.sender.setText(model.getUser());
//                messageViewHolder.messageText.setText(model.getMessage());
//
//                FirebaseUser currentUser = firebaseAuth.getCurrentUser();
//                if (currentUser != null) {
//                    messageViewHolder.setIsSender(true);
//                } else {
//                    messageViewHolder.setIsSender(false);
//                }
//
//            }
//        };
//        messageList.setAdapter(adapter);
//        Log.i(TAG,  );
    }

    @Override
    public void onStart() {
        super.onStart();
        //attachRecyclerViewAdapter();
        populateAdapter();
    }

    @Override
    public void onStop() {
        super.onStop();
        if (recViewAdapter != null) {
            recViewAdapter.cleanup();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (firebaseAuth != null) {
            firebaseAuth.removeAuthStateListener(this);
        }
    }

    @Override
    public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
        updateUI();
    }

    //This sends messages & attaches all messages to the activity
    //need to specify conversation
//    public void attachRecyclerViewAdapter() {
//
//        ValueEventListener messageListener = new ValueEventListener() {
//            @Override
//            public void onDataChange(DataSnapshot dataSnapshot) {
//                //Should map to all conversations
//                for (DataSnapshot msgs : dataSnapshot.child("chats" + conversationID).getChildren()) {
//                    //String conversationName = (String) convos.child(seller).getValue();
//
//                    //THIS SHOULD MAP TO EACH PARTICULAR CONVERSATION
//                    // String convoID = (String) msgs.child(conversationID).getValue();
//
//                    //TextView messageText = (TextView) findViewById(R.id.message_text);
//                    String messageText = (String) msgs.child("/messages").getValue();
//
//                    //messageText.setText((String) msgs.child("/messages" + message).getValue());
//                    Chat newMessage = new Chat(messageText);
//
//                    messages.add(newMessage);
//                    //String messageText = (String) msgs.child("messages/" + "text").getValue();
//                    //String messageText = (String) convos.child(ItemDetail.conversationKey + "messages/" + "text").getValue();
//
//                    //String sender = (String) msgs.child("messages/" + "sender").getValue();
//
//                    //DataSnapshot senderRef = dataSnapshot.child(ItemDetail.conversationKey + "messages/");
//                    //String sender = (String) convos.child("sender").getValue();
//                    //String username = (String) usernameRef.getValue();
//                    //String conversationName = (String) sellerRef.getValue();
////                    String conversationName = (String) convos.child(seller).getValue();
////                        ArrayList<String> messageList = (ArrayList<String>) dataSnapshot.child("messages").getValue();
////                        String messageString = "Tags: ";
////                        for (String message : messageList) {
////                            messageString = messageString + message + " ";
////                        }
////                        messages.setText(messageString);
//                    Log.i(TAG, messageText);
//                }
////                editMessage.setText("");
//
//                MessageAdapter iAdapter = new MessageAdapter(MessageDetail.this, messages);
//                messageList.setAdapter(iAdapter);
//            }
//
//            @Override
//            public void onCancelled(DatabaseError databaseError) {
//
//            }
//        };
//
//        convoRef.addListenerForSingleValueEvent(messageListener);
//    }


    public void populateAdapter() {
        recViewAdapter = new FirebaseRecyclerAdapter<Chat, MessageDetail.MessageViewHolder>(
                Chat.class, R.layout.chat_message, MessageDetail.MessageViewHolder.class, chatRefPush) {
            @Override
            public void populateViewHolder(MessageDetail.MessageViewHolder messageViewHolder, Chat model, int position) {
                //messageViewHolder.sender.setText(model.getUser());
                messageViewHolder.messageText.setText(model.getMessage());

                FirebaseUser currentUser = firebaseAuth.getCurrentUser();
                if (currentUser != null) {
                    messageViewHolder.setIsSender(true);
                } else {
                    messageViewHolder.setIsSender(false);
                }
                Log.i(TAG, messageViewHolder.messageText.toString() );
            }
        };

        // Scroll to bottom on new messages
        recViewAdapter.registerAdapterDataObserver(new RecyclerView.AdapterDataObserver() {
            @Override
            public void onItemRangeInserted(int positionStart, int itemCount) {
                llm.smoothScrollToPosition(messageList, null, recViewAdapter.getItemCount());
            }
        });

        messageList.setAdapter(recViewAdapter);
    }


    public boolean isSignedIn() {
        return (firebaseAuth.getCurrentUser() != null);
    }

    public void updateUI() {
        // Sending only allowed when signed in
        sendButton.setEnabled(isSignedIn());
        editMessage.setEnabled(isSignedIn());
    }

    public static class Chat {

        String user;
        String message;
        String uid;
        String date;
        String type;

        public Chat() {
        }

        public Chat(String message) {
            this.message = message;
        }

        Chat(String message, String sender, String date, String type) {
            this.message = message;
            this.date = date;
            this.user = sender;
            this.type = type;

        }

        public String getUser() {
            return user;
        }

        public String getUid() {
            return uid;
        }

        public String getMessage() {
            return message;
        }
    }


    public static class MessageViewHolder extends RecyclerView.ViewHolder {
        TextView messageText;
        Context context;
        TextView messageTime;

        public MessageViewHolder(View itemView) {
            super(itemView);
            context = itemView.getContext();
            messageTime = (TextView) itemView.findViewById(R.id.message_time);
            messageText = (TextView) itemView.findViewById(R.id.message_text);
        }

        public void setIsSender(Boolean isSender) {
            FrameLayout left_arrow = (FrameLayout) itemView.findViewById(R.id.left_arrow);
            FrameLayout right_arrow = (FrameLayout) itemView.findViewById(R.id.right_arrow);
            RelativeLayout messageContainer = (RelativeLayout) itemView.findViewById(R.id.message_container);
            LinearLayout lmessage = (LinearLayout) itemView.findViewById(R.id.lmessage);
            int color;
            if (isSender) {
                color = ContextCompat.getColor(itemView.getContext(), R.color.wallet_holo_blue_light);
                left_arrow.setVisibility(View.GONE);
                right_arrow.setVisibility(View.VISIBLE);
                messageContainer.setGravity(Gravity.END);
            } else {
                color = ContextCompat.getColor(itemView.getContext(), R.color.wallet_secondary_text_holo_dark);
                left_arrow.setVisibility(View.VISIBLE);
                right_arrow.setVisibility(View.GONE);
                messageContainer.setGravity(Gravity.START);
            }

            lmessage.setBackgroundColor(color);
        }

//        public void setUser(String user) {
//            TextView field = (TextView) itemView.findViewById(R.id.user);
//            field.setText(user);
//        }

        public void setMessage(String text) {
            TextView field = (TextView) itemView.findViewById(message_text);
            field.setText(text);
        }

    }
}

