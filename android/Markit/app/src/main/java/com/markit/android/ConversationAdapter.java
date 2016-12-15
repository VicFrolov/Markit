package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.firebase.ui.storage.images.FirebaseImageLoader;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.markit.android.chat.files.MessageDetail;
import com.markit.android.chat.files.Chat;
import com.markit.android.ItemDetail;
import com.markit.android.resources.RoundedImageView;

import java.io.Console;
import java.util.ArrayList;

public class ConversationAdapter extends
        RecyclerView.Adapter<ConversationAdapter.ConversationViewHolder> {

    private ArrayList<ConversationItem> conversations;
    public static String conversationId;
    public static String otherUser;
    public static String otherUsername;
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

        FirebaseStorage storage = FirebaseStorage.getInstance();
        String storageS = "https://firebasestorage.googleapis.com//v0/b/markit-80192.appspot.com/o/";
        StorageReference storageRef = storage.getReferenceFromUrl(storageS);
        final StorageReference pathRef = storageRef.child("images/itemImages/");

        TextView conversationName = viewHolder.conversationName;
        final ImageView itemPhoto = viewHolder.itemPhoto;

        final String conversationID = convo.getConversationID();
        final String otherUsername = convo.getOtherUsername();
        final String imageUrl = convo.getItemImageURL();

        final String itemID = convo.getItemID();

        conversationName.setText(convo.getOtherUsername());

        conversationName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent chat = new Intent(context, MessageDetail.class);
                //final String itemID = model.getItemID();
                chat.putExtra("conversationID", conversationID);
                chat.putExtra("otherUser", otherUsername);
                chat.putExtra("itemID", itemID);

                context.startActivity(chat);
            }
        });

        String itemPathRef = itemID + "/imageOne";
        StorageReference pathReference = pathRef.child(itemPathRef);
        //Glide.with(context).asBitmap().using(new FirebaseImageLoader()).load(pathReference).into(itemPhoto);
        Glide.with(context).using(new FirebaseImageLoader()).load(pathReference).asBitmap().into(itemPhoto);
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
        RoundedImageView itemPhoto;

        public ConversationViewHolder(View itemView) {
            super(itemView);
            context = itemView.getContext();
            //itemView.setOnClickListener(this);
            itemPhoto = (RoundedImageView) itemView.findViewById(R.id.itemPhoto);
            //itemID = (TextView) itemView.findViewById();
            conversationName = (TextView) itemView.findViewById(R.id.list_item_username);
            //conversationMessage = (TextView) itemView.findViewById(R.id.list_item_message);
            conversationId = (TextView) itemView.findViewById(R.id.conversationID);
        }

    }
}