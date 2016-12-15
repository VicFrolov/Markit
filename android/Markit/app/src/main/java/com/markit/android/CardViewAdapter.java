package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

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
    private boolean lock = false;

    public CardViewAdapter(Context context, ArrayList<MarketItem> items) {
        this.context = context;
        this.items = items;
    }

    private Context getContext() {
        return context;
    }

    public void swap(ArrayList<MarketItem> newItems) {

            lock = true;
            items.clear();
            for (MarketItem singleItem : newItems) {
                items.add(singleItem);
            }
            notifyDataSetChanged();

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


        TextView title = viewHolder.title;
        TextView price = viewHolder.price;
        TextView uid = viewHolder.uid;
        TextView id  = viewHolder.id;
        ImageView photo = viewHolder.photo;
        final ImageView likeImage = viewHolder.likeImage;

//        TODO wrap this so objects that have previously been liked start with a filled heart
        likeImage.setTag(R.drawable.ic_favorite_border_black_48px);
        likeImage.setColorFilter(Color.parseColor("#F4A49D"));

        final String itemID = item.getId();
        final String titleText = item.getTitle();
        title.setText(item.getTitle());
        price.setText("$ " + item.getPrice());
        uid.setText(item.getUsername());

        title.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent itemDetail = new Intent(context, ItemDetail.class);
                itemDetail.putExtra("id", itemID);
                context.startActivity(itemDetail);
            }
        });
        likeImage.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View itemView) {
                int id = (int) likeImage.getTag();
                if (id == R.drawable.ic_favorite_border_black_48px){
                    likeImage.setTag(R.drawable.ic_favorite_black_48px);
                    likeImage.setImageResource(R.drawable.ic_favorite_black_48px);
                    likeImage.setColorFilter(Color.parseColor("#F4A49D"));
                    Toast.makeText(context, titleText +" added to favorites", Toast.LENGTH_SHORT).show();
                }else{
                    likeImage.setTag(R.drawable.ic_favorite_border_black_48px);
                    likeImage.setImageResource(R.drawable.ic_favorite_border_black_48px);
                    likeImage.setColorFilter(Color.parseColor("#F4A49D"));
                    Toast.makeText(context,titleText+" removed from favorites",Toast.LENGTH_SHORT).show();
                }
                }
            });

        String itemPathRef = itemID + "/imageOne";
        StorageReference pathReference = pathRef.child(itemPathRef);
        Glide.with(context).using(new FirebaseImageLoader()).load(pathReference).into(photo);
    }

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
        ImageView likeImage;

        public ViewHolder(View itemView) {
            super(itemView);
            context = itemView.getContext();
            photo = (ImageView) itemView.findViewById(R.id.photo);
            title = (TextView) itemView.findViewById(R.id.title);
            price = (TextView) itemView.findViewById(R.id.price);
            uid = (TextView) itemView.findViewById(R.id.username);
            id = (TextView) itemView.findViewById(R.id.id);
            likeImage = (ImageView) itemView.findViewById(R.id.like_image_view);
        }
    }



}
