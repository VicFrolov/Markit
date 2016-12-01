package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.markit.android.MarketItem;
import com.markit.android.R;

import java.util.ArrayList;

/**
 * Created by pcross on 10/15/16.
 */

public class ItemsAdapter extends ArrayAdapter<MarketItem> {
    Context context;
    public ItemsAdapter(Context context, ArrayList<MarketItem> items) {
        super(context, 0, items);
        this.context = context;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        //Get the data item for this position
        MarketItem item = getItem(position);
        //Check if an existing view is being reused, otherwise inflate the view
        //@TODO Currently hard-coded have to make it modular for layout
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.template_activity_list_view, parent, false);
        }
        TextView itemTitle = (TextView) convertView.findViewById(R.id.itemTitle);
        TextView itemPrice = (TextView) convertView.findViewById(R.id.itemPrice);
        TextView itemDescription = (TextView) convertView.findViewById(R.id.itemDescription);
        //Populates data
        itemTitle.setText(item.getTitle());
        itemPrice.setText("$ "+item.getPrice());
        itemDescription.setText(item.getDescription());
        //Adding Listener to name and tag
        itemTitle.setTag(item.getId());
        itemTitle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String uid = (String) view.getTag();
                Intent itemDetail = new Intent(context, ItemDetail.class);
                itemDetail.putExtra("uid",uid);
                context.startActivity(itemDetail);
            }
        });
        // Return view to screen
        return convertView;
    }
}
