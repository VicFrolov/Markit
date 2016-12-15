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

import com.bumptech.glide.Glide;
import com.firebase.ui.storage.images.FirebaseImageLoader;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;

/**
 * Created by pcross on 12/3/16.
 */

public class CardViewAdapter extends
        RecyclerView.Adapter<CardViewAdapter.ViewHolder> {

    private ArrayList<MarketItem> items;
    private Context context;

    public CardViewAdapter(Context context, ArrayList<MarketItem> items) {
        this.context = context;
        this.items = items;
    }

    private Context getContext() {
        return context;
    }

    @Override
    public CardViewAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(context);

        View contactView = inflater.inflate(R.layout.card_item, parent, false);
        ViewHolder viewHolder = new ViewHolder(contactView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(CardViewAdapter.ViewHolder viewHolder, int position) {
        MarketItem item = items.get(position);

        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference httpsReference = storage.getReferenceFromUrl("https://firebasestorage.googleapis.com//v0/b/markit-80192.appspot.com/o/");
        final StorageReference pathRef = httpsReference.child("images/itemImages/");

        // TODO Set item views based on your views and data model -Peyton Cross

        TextView title = viewHolder.title;
        TextView price = viewHolder.price;
        TextView uid = viewHolder.uid;
        TextView id  = viewHolder.id;
        ImageView photo = viewHolder.photo;

        final String itemID = item.getId();
        title.setText(item.getTitle());
        price.setText("$ " + item.getPrice());
        uid.setText(item.getUsername());

        title.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent itemDetail = new Intent(context, ItemDetail.class);
                //final String itemID = model.getItemID();
                itemDetail.putExtra("id", itemID);
                context.startActivity(itemDetail);
            }
        });

        String itemPathRef = itemID + "/imageOne";
        StorageReference pathReference = pathRef.child(itemPathRef);
        Glide.with(context).using(new FirebaseImageLoader()).load(pathReference).into(photo);
    }

    //Returns the total count of items in the list
    @Override
    public int getItemCount() {
        return items.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView title;
        TextView price;
        TextView uid;
        TextView id;
        TextView tags;
        ImageView photo;
        Context context;

        public ViewHolder(View itemView) {
            super(itemView);
            context = itemView.getContext();
            photo = (ImageView) itemView.findViewById(R.id.photo);
            title = (TextView) itemView.findViewById(R.id.title);
            price = (TextView) itemView.findViewById(R.id.price);
            uid = (TextView) itemView.findViewById(R.id.username);
            id = (TextView) itemView.findViewById(R.id.id);
        }
    }


//    Context context;
//
//    public CardViewAdapter(Context context, ArrayList<MarketItem> items) {
//        super(context,0,items);
//        this.context = context;
//    }
//
//    @Override
//    public View getView(int position, View convertView, ViewGroup parent){
//        MarketItem item = getItem(position);
//        if (convertView == null) {
//            convertView = LayoutInflater.from(getContext()).inflate(R.layout.card_item, parent, false);
//        }
//        TextView title = (TextView) convertView.findViewById(R.id.title);
//        TextView price = (TextView) convertView.findViewById(R.id.price);
//        TextView uid = (TextView) convertView.findViewById(R.id.username);
//        TextView id  = (TextView) convertView.findViewById(R.id.id);
//        ImageView photo = (ImageView) convertView.findViewById(R.id.photo);
//        final String itemID = item.getId();
//        title.setText(item.getTitle());
//        price.setText("$ " + item.getPrice());
//        uid.setText(item.getDescription());
//        title.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent itemDetail = new Intent(context, ItemDetail.class);
//                //final String itemID = model.getItemID();
//                itemDetail.putExtra("id", itemID);
//                context.startActivity(itemDetail);
//            }
//        });
//        Picasso.with(context).load(item.getImageUrl()).into(photo);
//        return convertView;
//    }
}
