package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.markit.android.chat.files.MainChatActivity;

import java.util.ArrayList;

public class ConversationAdapter extends
        RecyclerView.Adapter<ConversationAdapter.ConversationViewHolder> {

    private ArrayList<ConversationItem> conversations;
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

    @Override
    public void onBindViewHolder(ConversationAdapter.ConversationViewHolder viewHolder, int position) {
        ConversationItem convo = conversations.get(position);

        // TODO Set item views based on your views and data model -Peyton Cross

        TextView conversationName = viewHolder.conversationName;
        TextView conversationID = viewHolder.conversationID;
        //final String conversationID = convo.getId();
        conversationName.setText(convo.getSeller());
        conversationName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent chat = new Intent(context, MainChatActivity.class);
                //final String itemID = model.getItemID();
                chat.putExtra("id", ItemDetail.conversationKey);
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
        TextView conversationID;
        Context context;

        public ConversationViewHolder(View itemView) {
            super(itemView);
            context = itemView.getContext();
            //itemView.setOnClickListener(this);
            conversationName = (TextView) itemView.findViewById(R.id.list_item_username);
            //conversationMessage = (TextView) itemView.findViewById(R.id.list_item_message);
            conversationID = (TextView) itemView.findViewById(R.id.conversationID);
        }

    }
}