//package com.markit.android;
//
//import android.content.Context;
//import android.os.Bundle;
//import android.support.v4.app.Fragment;
//import android.support.v7.widget.GridLayoutManager;
//import android.support.v7.widget.LinearLayoutManager;
//import android.support.v7.widget.RecyclerView;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//
//import com.firebase.ui.database.FirebaseRecyclerAdapter;
//import com.google.firebase.database.DatabaseReference;
//import com.google.firebase.database.FirebaseDatabase;
//import com.markit.android.dummy.DummyContent;
////import com.markit.android.dummy.DummyContent.DummyItem;
//import com.squareup.picasso.Picasso;
//
///**
// * A fragment representing a list of Items.
// * <p/>
// * Activities containing this fragment MUST implement the {@link OnFragmentInteractionListener}
// * interface.
// */
//public class WatchListFragment extends Fragment {
//
//    // TODO: Customize parameter argument names
//    private static final String ARG_COLUMN_COUNT = "column-count";
//    // TODO: Customize parameters
//    private int mColumnCount = 1;
//    private OnFragmentInteractionListener mListener;
//    private LinearLayoutManager llm;
//    private Context context;
//    private RecyclerView watchlistRecyclerView;
//
//    /**
//     * Mandatory empty constructor for the fragment manager to instantiate the
//     * fragment (e.g. upon screen orientation changes).
//     */
//
//    public interface OnFragmentInteractionListener {
//        // TODO: Update argument type and name
//        void onListFragmentInteraction(ItemObject item);
//    }
//
//    public WatchListFragment() {
//    }
//
//    // TODO: Customize parameter initialization
//    @SuppressWarnings("unused")
//    public static WatchListFragment newInstance(int columnCount) {
//        WatchListFragment fragment = new WatchListFragment();
//        Bundle args = new Bundle();
//        args.putInt(ARG_COLUMN_COUNT, columnCount);
//        fragment.setArguments(args);
//        return fragment;
//    }
//
//    @Override
//    public void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//
//        if (getArguments() != null) {
//            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
//        }
//    }
//
//    @Override
//    public View onCreateView(LayoutInflater inflater, ViewGroup container,
//                             Bundle savedInstanceState) {
//        View view = inflater.inflate(R.layout.fragment_watchlist_list, container, false);
//
//        FirebaseDatabase database = FirebaseDatabase.getInstance();
//        DatabaseReference mDatabaseReference = database.getReference().child("items");
//
//        if (view instanceof RecyclerView) {
//            context = getContext();
//
//            watchlistRecyclerView = (RecyclerView) view.findViewById(R.id.watchlistRecyclerView);
//            llm = new LinearLayoutManager(context);
//            watchlistRecyclerView.setHasFixedSize(true);
//
//            FirebaseRecyclerAdapter<ItemObject, FavoritesListView.FavoritesViewHolder> adapter = new FirebaseRecyclerAdapter<ItemObject, FavoritesListView.FavoritesViewHolder>(
//                    ItemObject.class, R.layout.watchlist_item, FavoritesListView.FavoritesViewHolder.class, mDatabaseReference) {
//                @Override
//                public void populateViewHolder(FavoritesListView.FavoritesViewHolder cardViewHolder, ItemObject model, int position) {
//                    cardViewHolder.itemTitle.setText(model.getTitle());
//                    cardViewHolder.itemPrice.setText("$ " + model.getPrice());
//                    Picasso.with(context).load(model.getImageUrl()).into(cardViewHolder.itemPhoto);
//                }
//            };
//            watchlistRecyclerView.setAdapter(adapter);
//            watchlistRecyclerView.setLayoutManager(llm);
//        }
//        return view;
//
//
////        // Set the adapter
////        if (view instanceof RecyclerView) {
////            Context context = view.getContext();
////            RecyclerView watchlistRecyclerView = (RecyclerView) view;
////            llm = new LinearLayoutManager(context);
//////            if (mColumnCount <= 1) {
//////                recyclerView.setLayoutManager(new LinearLayoutManager(context));
//////            } else {
//////                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
//////            }
////            watchlistRecyclerView.setAdapter(adapter);
//////        }
//////        return view;
////        }
//
//    }
//        @Override
//        public void onAttach(Context context){
//            super.onAttach(context);
//            try {
//                mCallback = (OnFragmentInteractionListener) context;
//            if (context instanceof OnFragmentInteractionListener) {
//                mListener = (OnFragmentInteractionListener) context;
//            } else {
//                throw new RuntimeException(context.toString()
//                        + " must implement OnListFragmentInteractionListener");
//            }
//        }
//
//    @Override
//    public void onListItemClick(RecyclerView l, View v, int position, long id) {
//        // Send the event to the host activity
//        mCallback.onArticleSelected(position);
//    }
//
//        @Override
//        public void onDetach () {
//            super.onDetach();
//            mListener = null;
//        }
//
//        /**
//         * This interface must be implemented by activities that contain this
//         * fragment to allow an interaction in this fragment to be communicated
//         * to the activity and potentially other fragments contained in that
//         * activity.
//         * <p/>
//         * See the Android Training lesson <a href=
//         * "http://developer.android.com/training/basics/fragments/communicating.html"
//         * >Communicating with Other Fragments</a> for more information.
//         */
////        public interface OnFragmentInteractionListener {
////            // TODO: Update argument type and name
////            void onListFragmentInteraction(ItemObject item);
////        }
//
//    }

package com.markit.android;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.markit.android.dummy.DummyContent;
import com.markit.android.dummy.DummyContent.DummyItem;

/**
 * A fragment representing a list of Items.
 * <p/>
 * Activities containing this fragment MUST implement the {@link OnFragmentInteractionListener}
 * interface.
 */
public class WatchListFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnFragmentInteractionListener mListener;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public WatchListFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static WatchListFragment newInstance(int columnCount) {
        WatchListFragment fragment = new WatchListFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_watchlist_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            recyclerView.setAdapter(new MyWatchListRecyclerViewAdapter(DummyContent.ITEMS, mListener));
        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentInteraction(DummyItem item);
    }
}