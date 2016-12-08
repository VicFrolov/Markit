package com.markit.android;


import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.format.DateFormat;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.firebase.client.Firebase;
import com.firebase.client.core.Context;
import com.firebase.ui.database.FirebaseListAdapter;
import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;

import static com.markit.android.R.id.backButton;
import static com.markit.android.R.id.conversationID;
import static com.markit.android.R.id.message_text;

public class MainChatActivity extends BaseActivity implements FirebaseAuth.AuthStateListener {

    public static final String TAG = "Chat";
    private FirebaseAuth firebaseAuth;
    private Button sendButton;
    private EditText editMessage;
    private Button backButton;

    private RecyclerView recyclerView;
    private LinearLayoutManager llm;
    private FirebaseRecyclerAdapter<Chat, ChatHolder> recViewAdapter;
    String chatKey;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference chatRef = database.getReference().child("users/" + getUID() + "/chats" + "/conversationID" + "/messages");
    //DatabaseReference conversationRef = chatRef.child(getID()).child("messages");
    //.child("items").child("itemID").child("conversationID")
    //intent.putExtra("uid", item)


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        firebaseAuth = FirebaseAuth.getInstance();
        firebaseAuth.addAuthStateListener(this);

        backButton = (Button) findViewById(R.id.backButton);

        sendButton = (Button) findViewById(R.id.sendButton);
        editMessage = (EditText) findViewById(R.id.messageEdit);

//        backButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(MainChatActivity.this, ChatListView.class));
//            }
//        });

        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //fix to get username not uid
                String uid = firebaseAuth.getCurrentUser().getUid();
                String user = uid.substring(0, 6);
                chatKey = chatRef.push().getKey();

                Chat chat = new Chat(user, uid, editMessage.getText().toString(), chatKey);
                chatKey = chatRef.push().getKey();
                chatRef.push().setValue(chat, new DatabaseReference.CompletionListener() {
                    @Override
                    public void onComplete(DatabaseError databaseError, DatabaseReference reference) {
                        if (databaseError != null) {
                            Log.e(TAG, "Failed to write message", databaseError.toException());
                        }
                    }
                });

                editMessage.setText("");
            }
        });

        recyclerView = (RecyclerView) findViewById(R.id.messagesList);

        llm = new LinearLayoutManager(this);
        llm.setReverseLayout(false);

        recyclerView.setHasFixedSize(false);
        recyclerView.setLayoutManager(llm);
    }

    @Override
    public void onStart() {
        super.onStart();
        attachRecyclerViewAdapter();
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

    //This sends messages
    private void attachRecyclerViewAdapter() {
        Query lastFifty = chatRef.limitToLast(50);
        recViewAdapter = new FirebaseRecyclerAdapter<Chat, ChatHolder>(
                Chat.class, R.layout.chat_message, ChatHolder.class, lastFifty) {

            @Override
            public void populateViewHolder(ChatHolder chatView, Chat chat, int position) {
                chatView.setUser(chat.getUser());
                chatView.setMessage(chat.getMessage());

                FirebaseUser currentUser = firebaseAuth.getCurrentUser();
                if (currentUser != null && chat.getUid().equals(currentUser.getUid())) {
                    chatView.setIsSender(true);
                } else {
                    chatView.setIsSender(false);
                }
            }
        };

        // Scroll to bottom on new messages
        recViewAdapter.registerAdapterDataObserver(new RecyclerView.AdapterDataObserver() {
            @Override
            public void onItemRangeInserted(int positionStart, int itemCount) {
                llm.smoothScrollToPosition(recyclerView, null, recViewAdapter.getItemCount());
            }
        });

        recyclerView.setAdapter(recViewAdapter);
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
        String chatId;
        private long messageTime;

        public Chat() {
        }

        public Chat(String user, String uid, String message, String chatId) {
            this.user = user;
            this.message = message;
            this.uid = uid;
            this.chatId = chatId;
        }

        public String getUser() {
            return user;
        }

        public String getUid() {
            return uid;
        }

        public String getChatId() {
            return chatId;
        }

        public String getMessage() {
            return message;
        }

        public long getMessageTime() {
            return messageTime;
        }

        public void setMessageTime(long messageTime) {
            this.messageTime = messageTime;
        }
    }

    public static class ChatHolder extends RecyclerView.ViewHolder {
        View view;

        public ChatHolder(View itemView) {
            super(itemView);
            view = itemView;
        }

        public void setIsSender(Boolean isSender) {
            FrameLayout left_arrow = (FrameLayout) view.findViewById(R.id.left_arrow);
            FrameLayout right_arrow = (FrameLayout) view.findViewById(R.id.right_arrow);
            RelativeLayout messageContainer = (RelativeLayout) view.findViewById(R.id.message_container);
            LinearLayout lmessage = (LinearLayout) view.findViewById(R.id.lmessage);

            int color;
            if (isSender) {
                color = ContextCompat.getColor(view.getContext(), R.color.wallet_holo_blue_light);

                left_arrow.setVisibility(View.GONE);
                right_arrow.setVisibility(View.VISIBLE);
                messageContainer.setGravity(Gravity.END);
            } else {
                color = ContextCompat.getColor(view.getContext(), R.color.wallet_secondary_text_holo_dark);

                left_arrow.setVisibility(View.VISIBLE);
                right_arrow.setVisibility(View.GONE);
                messageContainer.setGravity(Gravity.START);
            }

            lmessage.setBackgroundColor(color);
//            ((RotateDrawable) left_arrow.getBackground()).getDrawable()
//                    .setColorFilter(color, PorterDuff.Mode.SRC);
//            ((RotateDrawable) right_arrow.getBackground()).getDrawable()
//                    .setColorFilter(color, PorterDuff.Mode.SRC);
        }

        public void setUser(String user) {
            TextView field = (TextView) view.findViewById(R.id.user);
            field.setText(user);
        }

        public void setMessage(String message) {
            TextView field = (TextView) view.findViewById(message_text);
            field.setText(message);
        }
    }
}