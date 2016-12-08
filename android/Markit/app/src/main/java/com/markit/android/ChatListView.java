package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import com.markit.android.Chat;

/**
 * Created by root on 09/08/16.
 */

public class ChatListView extends BaseActivity {

    private static final String TAG = "Chat";
    private LinearLayoutManager llm;
    private Context context = this;
    private RecyclerView messagesRecyclerView;
    //private DatabaseReference database;
    private DatabaseReference chatRef;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference messageRef = database.getReference().child("users").child(getUID()).child("chats");
    //DatabaseReference conversationRef = messageRef.child(getConversationID()).child("context").child("sender");
    //chatRef = mDatabaseReference.child("chat");


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chatlist_view);

        messagesRecyclerView = (RecyclerView) findViewById(R.id.messagesRecyclerView);
        if (messagesRecyclerView != null) {
            messagesRecyclerView.setHasFixedSize(true);
        }
        llm = new LinearLayoutManager(this);
        messagesRecyclerView.setLayoutManager(llm);

        FirebaseRecyclerAdapter<Chat, ChatViewHolder> adapter = new FirebaseRecyclerAdapter<Chat, ChatListView.ChatViewHolder>(
                Chat.class, R.layout.list_item, ChatListView.ChatViewHolder.class, chatRef) {
            @Override
            public void populateViewHolder(ChatListView.ChatViewHolder viewHolder, Chat model, int position) {
                viewHolder.list_item_message.setText(model.getMessage());
                viewHolder.list_item_username.setText(model.getSender());
                final String conversationID = model.getConversationID();
                viewHolder.list_item_username.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Intent chat = new Intent(ChatListView.this, MainChatActivity.class);
                        //final String itemID = model.getItemID();
                        chat.putExtra("uid", conversationID);
                        ChatListView.this.startActivity(chat);
                    }
                });
                //Picasso.with(context).load(model.getImageUrl()).into(viewHolder.itemPhoto);
            }
        };
        messagesRecyclerView.setAdapter(adapter);
    }
    public static class ChatViewHolder extends RecyclerView.ViewHolder {
        TextView list_item_username;
        TextView list_item_message;
        //ImageView itemPhoto;
        Context context;

        public ChatViewHolder(View itemView) {
            super(itemView);
            context = itemView.getContext();
            list_item_message = (TextView) itemView.findViewById(R.id.list_item_message);
            list_item_username = (TextView) itemView.findViewById(R.id.list_item_username);
        }
    }
}

//    private DatabaseReference databaseRef;
//    private DatabaseReference chatRef;
//    private ListView listView;
//    private FirebaseAuth firebaseAuth;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.list_view);
//
//        listView = (ListView) findViewById(R.id.list_of_messages);
//
//        databaseRef = FirebaseDatabase.getInstance().getReference();
//        chatRef = databaseRef.child("chat");
//
//        final ListAdapter adapter = new FirebaseListAdapter<Chat>(this, Chat.class, R.layout.list_item, chatRef) {
//            protected void populateView(View view, Chat chat, int position) {
//                ((TextView) view.findViewById(R.id.list_item_username)).setText(chat.getSender());
//                ((TextView) view.findViewById(R.id.list_item_message)).setText(chat.getMessage());
//
//            }
//        };
//
////        Button goToChat = (Button) findViewById(R.id.messageDetails);
////        goToChat.setOnClickListener(new View.OnClickListener() {
////            @Override
////            public void onClick(View v) {
////                Intent chatDetail = new Intent(ChatListView.this, MainChatActivity.class);
////                //final String itemID = model.getItemID();
////                //chatDetail.putExtra("uid", itemID);
////                ChatListView.this.startActivity(chatDetail);
////            }
////        });
//
//        listView.setAdapter(adapter);
//
//        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
//            @Override
//            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
//                String uid = firebaseAuth.getCurrentUser().getUid();
//                String user = "User " + uid.substring(0, 6);
//
//                //Chat entry = (Chat)parent.getItemAtPosition(position);
//                //String message = entry.getMessage();
//
//                /// Chat entry = (Chat) parent.getAdapter().getItem(position);
//                Intent intent = new Intent(ChatListView.this, MainChatActivity.class);
//                //String message = entry.getMessage();
//                //startActivity(intent);
//
//                String messageClicked = (String) adapter.getItem(position);
////                Intent intent = new Intent(ChatListView.this, MainChatActivity.class);
////                startActivity(intent);
//
//                //String messageClicked = (Chat) parent.getAdapter().getItem(position);
//                intent.putExtra("message", messageClicked);
//                intent.putExtra("username", user);
//                startActivity(intent);
//
//            }
//        });
//    }
//}


//    private void scrollToBottom() {
//        listView.post(new Runnable() {
//            @Override
//            public void run() {
//                listView.setSelection(adapter.getCount() - 1);
//            }
//        });
//    }
//}





//    public ChatListAdapter(Query ref, Activity activity, int layout, String mUsername) {
//        super(ref, Chat.class, R.layout.list_item, activity);
//        this.mUsername = mUsername;
//    }

//    @Override
//    protected void populateView(View view, Chat chat, int position) {
//        // Map a Chat object to an entry in our listview
//        String user = chat.getUser();
//        TextView userText = (TextView) view.findViewById(R.id.user);
//        userText.setText(user + ": ");
//        // If the message was sent by this user, color it differently
//        if (user != null && user.equals(mUsername)) {
//            userText.setTextColor(Color.RED);
//        } else {
//            userText.setTextColor(Color.BLUE);
//        }
//        ((TextView) view.findViewById(R.id.message)).setText(chat.getMessage());
//    }


//public class MessageAdapter extends ArrayAdapter<Chat> {
//
//    MessageAdapter(Context context, int resource) {
//        super(context, resource);
//    }
//
//    @Override
//    public View getView(int position, View convertView, ViewGroup parent) {
//        ViewHolder viewHolder;
//
//        if(convertView == null){
//            LayoutInflater inflater = ((Activity) getContext()).getLayoutInflater();
//            convertView = inflater.inflate(R.layout.list_view, parent, false);
//
//            viewHolder = new ViewHolder();
//            viewHolder.username = (TextView) convertView.findViewById(R.id.list_item_username);
//            viewHolder.message = (TextView) convertView.findViewById(R.id.list_item_message);
//
//            convertView.setTag(viewHolder);
//        }else{
//            viewHolder = (ViewHolder) convertView.getTag();
//        }
//
//        Chat item = getItem(position);
//        if(item != null) {
//            viewHolder.username.setText(item.getUser());
//            viewHolder.message.setText(item.getMessage());
//        }
//
//        return convertView;
//    }
//
//    private static class ViewHolder{
//        TextView username;
//        TextView message;
//    }
//}