//package com.markit.android;
//
///**
// * Created by annagotsis on 12/7/16.
// */
//
//import android.content.Context;
//import android.content.Intent;
//import android.support.v7.widget.RecyclerView;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//import android.widget.TextView;
//
//
//import java.util.List;
//
//public class ConversationAdapter extends RecyclerView.Adapter<ConversationAdapter.ViewHolder> {
//    private final List<ConversationItem> listOfConversations;
//    private final Context context;
//
//    public ConversationAdapter(List<ConversationItem> listOfConversations, Context context) {
//        this.listOfConversations = listOfConversations;
//        this.context = context;
//    }
//
//    @Override
//    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
//        View view = LayoutInflater.from(parent.getContext()).inflate(
//                R.layout.chat_list_users, null);
//        return new ViewHolder(view, context);
//    }
//
//    @Override
//    public void onBindViewHolder(ViewHolder holder, int position) {
//        holder.conversationName.setText(listOfConversations.get(position).getUsername());
//        holder.conversationMessage.setText(listOfConversations.get(position).getLastMessage());
//        holder.conversationName.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent chat = new Intent(ConversationAdapter.this, MainChatActivity.class);
//                //final String itemID = model.getItemID();
//                chat.putExtra("uid", conversationID);
//                ConversationAdapter.this.startActivity(chat);
//            }
//        });
//    }
//
//    @Override
//    public int getItemCount() {
//        return listOfConversations.size();
//    }
//
//
//    public static class ViewHolder extends RecyclerView.ViewHolder {
//        final TextView conversationName;
//        final TextView conversationMessage;
//        private final Context context;
//
//        public ViewHolder(View itemView, Context context) {
//            super(itemView);
//            this.context = context;
//            itemView.setOnClickListener(this);
//            conversationName = (TextView) itemView.findViewById(R.id.list_item_username);
//            conversationMessage = (TextView) itemView.findViewById(R.id.list_item_message);
//        }
//
//        @Override
//        public void onClick(View v) {
//            Intent chat = new Intent(ConversationAdapter.this, MainChatActivity.class);
//            //final String itemID = model.getItemID();
//            chat.putExtra("uid", conversationID);
//            context.startActivity(chat);
//        }
//    }
//
//    public class ConversationItem {
//        private final int conversationID;
//        private final String username;
//        private final String last_message;
//
//        public ConversationItem(int conversationID, String username, String last_message) {
//            this.conversationID = conversationID;
//            this.username = username;
//            this.last_message = last_message;
//        }
//
//        public int getConversationID() {
//            return conversationID;
//        }
//
//        public String getUsername() {
//            return username;
//        }
//
//        public String getLastMessage() {
//            return last_message;
//        }
//    }
//}