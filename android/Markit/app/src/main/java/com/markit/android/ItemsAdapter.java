package com.markit.android;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.markit.android.Item;
import com.markit.android.R;

import java.util.ArrayList;

/**
 * Created by pcross on 10/15/16.
 */

public class ItemsAdapter extends ArrayAdapter<Item> {
    public ItemsAdapter(Context context, ArrayList<Item> items) {
        super(context, 0, items);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        //Get the data item for this position
        Item item = getItem(position);
        //Check if an existing view is being reused, otherwise inflate the view
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.template_activity_list_view, parent, false);
        }
        TextView itemTitle = (TextView) convertView.findViewById(R.id.itemTitle);
        TextView itemPrice = (TextView) convertView.findViewById(R.id.itemPrice);
        TextView itemDescription = (TextView) convertView.findViewById(R.id.itemDescription);
        //Populates data
        itemTitle.setText(item.getTitle());
        itemPrice.setText(item.getPrice());
        itemDescription.setText(item.getDescription());
        // Return view to screen
        return convertView;
    }
}
