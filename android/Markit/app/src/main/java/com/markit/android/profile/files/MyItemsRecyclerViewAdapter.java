package com.markit.android.profile.files;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.markit.android.R;
import com.markit.android.profile.files.TagsFragment.OnListFragmentInteractionListener;

import java.util.List;
import java.util.Arrays;

/**
 * Created by Joseph on 12/14/2016.
 */

public class MyItemsRecyclerViewAdapter extends RecyclerView.Adapter<MyItemsRecyclerViewAdapter.ViewHolder> {

    private final List<String[]> mValues;
    private final TagsFragment.OnListFragmentInteractionListener mListener;

    public MyItemsRecyclerViewAdapter(List<String[]> items, TagsFragment.OnListFragmentInteractionListener listener) {
        mValues = items;
        mListener = listener;
    }

    @Override
    public MyItemsRecyclerViewAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_tags, parent, false);
        return new MyItemsRecyclerViewAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final MyItemsRecyclerViewAdapter.ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mIdView.setText(mValues.get(position)[(mValues.get(position).length - 1)]);
        holder.mContentView.setText(Arrays.toString(mValues.get(position)).replace("[", "").replace("]", ""));

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
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mIdView;
        public final TextView mContentView;
        public String[] mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mIdView = (TextView) view.findViewById(R.id.itemTitle);
            mContentView = (TextView) view.findViewById(R.id.content);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mContentView.getText() + "'";
        }
    }
}
