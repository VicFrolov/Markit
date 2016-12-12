package com.markit.android.chat.files;

/**
 * Created by annagotsis on 12/10/16.
 */

import android.content.Context;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.markit.android.R;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import java.util.List;

import static com.markit.android.R.id.message_text;

public class MessageAdapter extends
        RecyclerView.Adapter<MessageAdapter.MessageViewHolder> {

    public String TAG = "Sender";
    private List<Chat> messages;
    private Context context;
    public FirebaseAuth firebaseAuth;


    public MessageAdapter(Context context, List<Chat> messages) {
        this.context = context;
        this.messages = messages;
    }

    private Context getContext() {
        return context;
    }

    @Override
    public MessageAdapter.MessageViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(context);

        View contactView = inflater.inflate(R.layout.chat_message, parent, false);
        MessageViewHolder viewHolder = new MessageViewHolder(contactView);

        return viewHolder;
    }

    @Override
    public void onBindViewHolder(MessageAdapter.MessageViewHolder viewHolder, int position) {
        Chat message = messages.get(position);

//        FirebaseUser currentUser = firebaseAuth.getCurrentUser();
//        if (currentUser != null) {
//            viewHolder.setIsSender(true);
//        } else {
//            viewHolder.setIsSender(false);
//        }

//        FirebaseUser currentUser = firebaseAuth.getCurrentUser();
//        if (currentUser != null && message.getUser().equals(currentUser.getUid())) {
//            viewHolder.setIsSender(true);
//        } else {
//            viewHolder.setIsSender(false);
//        }

        TextView sender = viewHolder.sender;
        TextView messageText = viewHolder.messageText;
        messageText.setText(message.getMessage());
        //Log.i(TAG, sender.toString());
        //sender.setText(message.getUser());
    }

    @Override
    public int getItemCount() {
        return messages.size();
    }


    public static class MessageViewHolder extends RecyclerView.ViewHolder {
        TextView sender;
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

        public void setMessage(String text) {
            TextView field = (TextView) itemView.findViewById(R.id.message_text);
            field.setText(text);
        }

        public void setUser(String sender) {
            TextView field = (TextView) itemView.findViewById(R.id.user);
            field.setText(sender);
        }

    }
}
