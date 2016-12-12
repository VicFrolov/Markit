package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.markit.android.chat.files.MessageDetail;
import com.markit.android.chat.files.Chat;
import com.markit.android.ItemDetail;

import java.util.ArrayList;

public class ConversationAdapter extends
        RecyclerView.Adapter<ConversationAdapter.ConversationViewHolder> {

    private ArrayList<ConversationItem> conversations;
    public static String conversationId;
    public static String otherUser;
    public String TAG = "conversationID";
    private Context context;

    public ConversationAdapter(Context context, ArrayList<ConversationItem> conversations) {
        this.context = context;
        this.conversations = conversations;
    }

    private Context getContext() {
        return context;
    }


    @Override
    public ConversationAdapter.ConversationViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(context);

        View contactView = inflater.inflate(R.layout.chat_list_users, parent, false);
        ConversationViewHolder viewHolder = new ConversationViewHolder(contactView);
        return viewHolder;
    }

    public void updateData(ArrayList<ConversationItem> conversations) {
        conversations.clear();
        conversations.addAll(conversations);
        notifyDataSetChanged();
    }

    public void addItem(int position, ConversationItem viewModel) {
        conversations.add(position, viewModel);
        notifyItemInserted(position);
    }

    public void removeItem(int position) {
        conversations.remove(position);
        notifyItemRemoved(position);
    }

    @Override
    public void onBindViewHolder(ConversationAdapter.ConversationViewHolder viewHolder, int position) {
        ConversationItem convo = conversations.get(position);
        //conversationName = the person you're chatting (the seller right now, that needs to be fixed)
        TextView conversationName = viewHolder.conversationName;
        TextView conversationId = viewHolder.conversationId;
        //final String conversationId = viewHolder.conversationID.toString();
        final String conversationID = convo.getConversationID();
        final String otherUser = convo.getOtherUser();
        conversationId.setText(convo.getConversationID());
        conversationName.setText(convo.getOtherUser());
        conversationName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent chat = new Intent(context, MessageDetail.class);
                //final String itemID = model.getItemID();
                chat.putExtra("conversationID", conversationID);
                chat.putExtra("otherUser", otherUser);
                Log.i(TAG, conversationID);
                context.startActivity(chat);
            }
        });
    }

    //Returns the total count of items in the list
    @Override
    public int getItemCount() {
        return conversations.size();
    }



    public static class ConversationViewHolder extends RecyclerView.ViewHolder {
        TextView conversationName;
        //final TextView conversationMessage;
        TextView conversationId;
        Context context;

        public ConversationViewHolder(View itemView) {
            super(itemView);
            context = itemView.getContext();
            //itemView.setOnClickListener(this);
            conversationName = (TextView) itemView.findViewById(R.id.list_item_username);
            //conversationMessage = (TextView) itemView.findViewById(R.id.list_item_message);
            conversationId = (TextView) itemView.findViewById(R.id.conversationID);
        }

    }
}