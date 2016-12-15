package com.markit.android.profile.files;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

//import com.markit.android.profile.files.WatchListFragment.OnListFragmentInteractionListener;
import com.bumptech.glide.Glide;
import com.firebase.ui.storage.images.FirebaseImageLoader;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.markit.android.ItemDetail;
import com.markit.android.MarketItem;
import com.markit.android.R;
//import com.markit.android.dummy.DummyContent.DummyItem;

import java.util.List;


/**
 * {@link RecyclerView.Adapter} that can display a {@link MarketItem} and makes a call to the
 * specified {@link WatchListFragment.OnListFragmentInteractionListener}.
 * TODO: Replace the implementation with code for your data type.
 */

public class MyWatchListRecyclerViewAdapter extends RecyclerView.Adapter<MyWatchListRecyclerViewAdapter.ViewHolder> {

    private final List<MarketItem> items;
    private final WatchListFragment.OnListFragmentInteractionListener mListener;
    private Context context;

    public MyWatchListRecyclerViewAdapter(List<MarketItem> items, WatchListFragment.OnListFragmentInteractionListener listener, Context context) {
        this.items = items;
        mListener = listener;
        this.context = context;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.card_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        //holder.mItem = mValues.get(position);
        final MarketItem item = items.get(position);
        holder.mIdView.setText(items.get(position).id);
        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReferenceFromUrl("gs://markit-80192.appspot.com");
        final StorageReference pathRef = storageRef.child("images/itemImages/");

        // TODO Set item views based on your views and data model -Peyton Cross
        TextView title = holder.title;
        TextView price = holder.price;
        TextView uid = holder.uid;
        TextView id  = holder.id;
        ImageView photo = holder.photo;
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
        //holder.mContentView.setText(mValues.get(position).content);

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    mListener.onListFragmentInteraction(holder.mItem);
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

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mIdView;
        public final TextView mContentView;
        public MarketItem mItem;
        TextView title;
        TextView price;
        TextView uid;
        TextView id;
        TextView tags;
        ImageView photo;
        Context context;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mIdView = (TextView) view.findViewById(R.id.id);
            mContentView = (TextView) view.findViewById(R.id.content);
            context = view.getContext();
            photo = (ImageView) view.findViewById(R.id.photo);
            title = (TextView) view.findViewById(R.id.title);
            price = (TextView) view.findViewById(R.id.price);
            uid = (TextView) view.findViewById(R.id.username);
            id = (TextView) view.findViewById(R.id.id);        }

        @Override
        public String toString() {
            return super.toString() + " '" + mContentView.getText() + "'";
        }
    }
}











//public class MyWatchListRecyclerViewAdapter extends RecyclerView.Adapter<MyWatchListRecyclerViewAdapter.ItemViewHolder> {
//    private static final int MAX_WIDTH = 50;
//    private static final int MAX_HEIGHT = 80;
//
//    private List<Item> myItems;
//
//
//    public static class ItemViewHolder extends RecyclerView.ViewHolder {
//        //public ImageView myItemPhoto;
//        public TextView myItemTitle;
//        public TextView myItemPrice;
//
//        public ItemViewHolder(View v) {
//            super(v);
//            myItemTitle = (TextView) v.findViewById(R.id.itemTitle);
//            myItemPrice = (TextView) v.findViewById(R.id.itemPrice);
//        }
//    }
//
//        public MyWatchListRecyclerViewAdapter(List<Item> myItems) {
//            myItems = myItems;
//        }
//
//        @Override
//        public MyWatchListRecyclerViewAdapter.ItemViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
//            View v = LayoutInflater.from(parent.getContext())
//                    .inflate(R.layout.activity_watchlist, parent, false);
//
//            ItemViewHolder itemViewHolder = new ItemViewHolder(v);
//            return itemViewHolder;
//        }
//
//        @Override
//        public void onBindViewHolder(MyWatchListRecyclerViewAdapter.ItemViewHolder holder, final int position) {
//            holder.myItemTitle.setText(myItems.get(position).getTitle());
//            holder.myItemPrice.setText(myItems.get(position).getPrice());
//            // holder.mDeleteBtn.setOnClickListener(new View.OnClickListener() {
//            //     @Override
//            //     public void onClick(View v) {
//            //         Firebase myFirebaseRef = new Firebase(MainActivity.BASE_URL);
//            //         String itemName = myItems.get(position).getName();
//            //         myFirebaseRef.child(myItems.get(position).getId()).removeValue();
//            //         Snackbar.make(v, itemName + " deleted from Firebase", Snackbar.LENGTH_LONG)
//            //                 .setAction("Action", null).show();
//            //     }
//            // });
//        }
//
//        @Override
//        public int getItemCount() {
//        return myItems.size();
//        }
//
//    }
//
//
//
//
