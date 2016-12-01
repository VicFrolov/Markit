package com.markit.android;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import android.widget.ImageView;
import android.widget.TextView;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.squareup.picasso.Picasso;

public class FavoritesListView extends AppCompatActivity {

    private static final String TAG = "Favorites";
    private LinearLayoutManager llm;
    private Context context = this;
    private RecyclerView watchlistRecyclerView;

    //TODO filter to get favorites only
    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference mDatabaseReference = database.getReference().child("items");
            //.child("users").child("uid").child("favorites");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_watchlist);

        watchlistRecyclerView = (RecyclerView) findViewById(R.id.watchlistRecyclerView);
        if (watchlistRecyclerView != null) {
            watchlistRecyclerView.setHasFixedSize(true);
        }
        llm = new LinearLayoutManager(this);
        watchlistRecyclerView.setLayoutManager(llm);

        FirebaseRecyclerAdapter<ItemObject, FavoritesListView.FavoritesViewHolder> adapter = new FirebaseRecyclerAdapter<ItemObject, FavoritesListView.FavoritesViewHolder>(
                ItemObject.class, R.layout.watchlist_item, FavoritesListView.FavoritesViewHolder.class, mDatabaseReference) {
            @Override
            public void populateViewHolder(FavoritesListView.FavoritesViewHolder viewHolder, ItemObject model, int position) {
                viewHolder.itemTitle.setText(model.getTitle());
                final String itemID = model.getId();
                viewHolder.itemTitle.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Intent itemDetail = new Intent(FavoritesListView.this, ItemDetail.class);
                        //final String itemID = model.getItemID();
                        itemDetail.putExtra("uid", itemID);
                        FavoritesListView.this.startActivity(itemDetail);
                    }
                });
                viewHolder.itemPrice.setText("$ " + model.getPrice());
                Picasso.with(context).load(model.getImageUrl()).into(viewHolder.itemPhoto);
            }
        };
        watchlistRecyclerView.setAdapter(adapter);
    }
    public static class FavoritesViewHolder extends RecyclerView.ViewHolder {
        TextView itemTitle;
        TextView itemPrice;
        ImageView itemPhoto;
        Context context;

        public FavoritesViewHolder(View itemView) {
            super(itemView);
            context = itemView.getContext();
            itemPhoto = (ImageView) itemView.findViewById(R.id.itemPhoto);
            itemTitle = (TextView) itemView.findViewById(R.id.itemTitle);
            itemPrice = (TextView) itemView.findViewById(R.id.itemPrice);
        }
    }
}
