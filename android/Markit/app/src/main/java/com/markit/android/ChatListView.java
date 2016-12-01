package com.markit.android;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.firebase.ui.database.FirebaseListAdapter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;


/**
 * Created by root on 09/08/16.
 */

public class ChatListView extends AppCompatActivity {

    private DatabaseReference databaseRef;
    private DatabaseReference chatRef;
    private ListView listView;
    private FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list_view);

        listView = (ListView) findViewById(R.id.list_of_messages);

        databaseRef = FirebaseDatabase.getInstance().getReference();
        chatRef = databaseRef.child("chat").child("users");

        final ListAdapter adapter = new FirebaseListAdapter<Chat>(this, Chat.class, R.layout.list_item, chatRef) {
            protected void populateView(View view, Chat chat, int position) {
                ((TextView) view.findViewById(R.id.list_item_username)).setText(chat.getUser());
                ((TextView) view.findViewById(R.id.list_item_message)).setText(chat.getMessage());

            }
        };

        listView.setAdapter(adapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String uid = firebaseAuth.getCurrentUser().getUid();
                String user = "User " + uid.substring(0, 6);

                //Chat entry = (Chat)parent.getItemAtPosition(position);
                //String message = entry.getMessage();

               /// Chat entry = (Chat) parent.getAdapter().getItem(position);
                Intent intent = new Intent(ChatListView.this, MainChatActivity.class);
                //String message = entry.getMessage();
                //startActivity(intent);

                String messageClicked = (String) adapter.getItem(position);
//                Intent intent = new Intent(ChatListView.this, MainChatActivity.class);
//                startActivity(intent);

                //String messageClicked = (Chat) parent.getAdapter().getItem(position);
                intent.putExtra("message", messageClicked);
                intent.putExtra("username", user);
                startActivity(intent);

            }
        });
    }
}


//    private void scrollToBottom() {
//        listView.post(new Runnable() {
//            @Override
//            public void run() {
//                listView.setSelection(adapter.getCount() - 1);
//            }
//        });
//    }





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