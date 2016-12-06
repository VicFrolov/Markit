package com.markit.android;

/**
 * Created by annagotsis on 12/3/16.
 */

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;

public class WatchListViewAdapter extends RecyclerView.Adapter<WatchListViewAdapter.WatchListViewHolder> {

    private ArrayList<MarketItem> itemObjectArray;
    private Context context;
    //private final WatchListFragment.OnFragmentInteractionListener mListener;

    public WatchListViewAdapter(ArrayList<MarketItem> itemObjectArray) {
        this.context = context;
        this.itemObjectArray = itemObjectArray;
        //mListener = mListener;
    }

    private Context getContext() {
        return context;
    }

    @Override
    public WatchListViewAdapter.WatchListViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(context);

        View contactView = inflater.inflate(R.layout.watchlist_item, parent, false);
        WatchListViewHolder viewHolder = new WatchListViewHolder(contactView);
        return viewHolder;
    }


    @Override
    public void onBindViewHolder(final WatchListViewHolder viewHolder, int position) {
        MarketItem item = itemObjectArray.get(position);

        TextView title = viewHolder.title;
        TextView price = viewHolder.price;
        //TextView uid = watchlistHolder.uid;
        //TextView id  = viewHolder.id;
        ImageView photo = viewHolder.photo;
        final String itemID = item.getId();
        title.setText(item.getTitle());
        price.setText("$ " + item.getPrice());
        //uid.setText(item.getDescription());
        title.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent itemDetail = new Intent(context, ItemDetail.class);
                //final String itemID = model.getItemID();
                itemDetail.putExtra("id", itemID);
                context.startActivity(itemDetail);
            }
        });
        Picasso.with(context).load(item.getImageUrl()).into(photo);

//        viewHolder.itemView.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                if (null != mListener) {
//                    // Notify the active callbacks interface (the activity, if the
//                    // fragment is attached to one) that an item has been selected.
//                    mListener.onListFragmentInteraction(viewHolder.item);
//                }
//            }
//        });


    }

    //Returns the total count of items in the list
    @Override
    public int getItemCount() {
        return itemObjectArray.size();
    }

    public static class WatchListViewHolder extends RecyclerView.ViewHolder {
        public final TextView title;
        public final TextView price;
        public final ImageView photo;
        public final Context context;
        public final View mView;
        public MarketItem item;

        public WatchListViewHolder(View itemView) {
            super(itemView);
            mView = itemView;
            context = itemView.getContext();
            photo = (ImageView) itemView.findViewById(R.id.itemPhoto);
            title = (TextView) itemView.findViewById(R.id.itemTitle);
            price = (TextView) itemView.findViewById(R.id.itemPrice);

        }
    }
}