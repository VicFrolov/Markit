//package com.markit.android;
//
//import android.support.v7.widget.RecyclerView;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//import android.widget.TextView;
//
////import com.markit.android.WatchListFragment.OnListFragmentInteractionListener;
//import com.markit.android.WatchListFragment.OnFragmentInteractionListener;
//import com.markit.android.dummy.DummyContent.DummyItem;
//
//import java.util.List;
//import com.markit.android.MarketItem;
//
//import com.firebase.client.Firebase;
//
//
///**
// * {@link RecyclerView.Adapter} that can display a {@link DummyItem} and makes a call to the
// * specified {@link OnFragmentInteractionListener}.
// * TODO: Replace the implementation with code for your data type.
// */
//public class MyWatchListRecyclerViewAdapter extends RecyclerView.Adapter<MyWatchListRecyclerViewAdapter.ViewHolder> {
//
//    private final List<DummyItem> mValues;
//    private final OnFragmentInteractionListener mListener;
//
//    public MyWatchListRecyclerViewAdapter(List<DummyItem> items, OnFragmentInteractionListener listener) {
//        mValues = items;
//        mListener = listener;
//    }
//
//    @Override
//    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
//        View view = LayoutInflater.from(parent.getContext())
//                .inflate(R.layout.fragment_watchlist, parent, false);
//        return new ViewHolder(view);
//    }
//
//    @Override
//    public void onBindViewHolder(final ViewHolder holder, int position) {
//        holder.mItem = mValues.get(position);
//        holder.mIdView.setText(mValues.get(position).id);
//        holder.mContentView.setText(mValues.get(position).content);
//
//        holder.mView.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                if (null != mListener) {
//                    // Notify the active callbacks interface (the activity, if the
//                    // fragment is attached to one) that an item has been selected.
//                    mListener.onListFragmentInteraction(holder.mItem);
//                }
//            }
//        });
//    }
//
//    @Override
//    public int getItemCount() {
//        return mValues.size();
//    }
//
//    public class ViewHolder extends RecyclerView.ViewHolder {
//        public final View mView;
//        public final TextView mIdView;
//        public final TextView mContentView;
//        public DummyItem mItem;
//
//        public ViewHolder(View view) {
//            super(view);
//            mView = view;
//            mIdView = (TextView) view.findViewById(R.id.id);
//            mContentView = (TextView) view.findViewById(R.id.content);
//        }
//
//        @Override
//        public String toString() {
//            return super.toString() + " '" + mContentView.getText() + "'";
//        }
//    }
//}
////
////public class MyWatchListRecyclerViewAdapter extends RecyclerView.Adapter<MyWatchListRecyclerViewAdapter.ItemViewHolder> {
////    private static final int MAX_WIDTH = 50;
////    private static final int MAX_HEIGHT = 80;
////
////    private List<Item> myItems;
////
////
////    public static class ItemViewHolder extends RecyclerView.ViewHolder {
////        //public ImageView myItemPhoto;
////        public TextView myItemTitle;
////        public TextView myItemPrice;
////
////        public ItemViewHolder(View v) {
////            super(v);
////            myItemTitle = (TextView) v.findViewById(R.id.itemTitle);
////            myItemPrice = (TextView) v.findViewById(R.id.itemPrice);
////        }
////    }
////
////        public MyWatchListRecyclerViewAdapter(List<Item> myItems) {
////            myItems = myItems;
////        }
////
////        @Override
////        public MyWatchListRecyclerViewAdapter.ItemViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
////            View v = LayoutInflater.from(parent.getContext())
////                    .inflate(R.layout.activity_watchlist, parent, false);
////
////            ItemViewHolder itemViewHolder = new ItemViewHolder(v);
////            return itemViewHolder;
////        }
////
////        @Override
////        public void onBindViewHolder(MyWatchListRecyclerViewAdapter.ItemViewHolder holder, final int position) {
////            holder.myItemTitle.setText(myItems.get(position).getTitle());
////            holder.myItemPrice.setText(myItems.get(position).getPrice());
////            // holder.mDeleteBtn.setOnClickListener(new View.OnClickListener() {
////            //     @Override
////            //     public void onClick(View v) {
////            //         Firebase myFirebaseRef = new Firebase(MainActivity.BASE_URL);
////            //         String itemName = myItems.get(position).getName();
////            //         myFirebaseRef.child(myItems.get(position).getId()).removeValue();
////            //         Snackbar.make(v, itemName + " deleted from Firebase", Snackbar.LENGTH_LONG)
////            //                 .setAction("Action", null).show();
////            //     }
////            // });
////        }
////
////        @Override
////        public int getItemCount() {
////        return myItems.size();
////        }
////
////    }
////
////
////
////
