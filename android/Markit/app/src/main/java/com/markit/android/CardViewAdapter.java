package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by pcross on 12/3/16.
 */

public class CardViewAdapter extends
        RecyclerView.Adapter<CardViewAdapter.ViewHolder> {

    private List<MarketItem> items;
    private Context context;
    ArrayList<MarketItem> models;

    public CardViewAdapter(ArrayList<MarketItem> items, Context context) {
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

        // TODO Set item views based on your views and data model -Peyton Cross

        TextView title = viewHolder.title;
        TextView price = viewHolder.price;
        TextView uid = viewHolder.uid;
        TextView id = viewHolder.id;
        // ImageView photo = viewHolder.photo;
        //Picasso.with(context).load(item.getImageUrl()).into(photo);
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
        Picasso.with(context).load(item.getImageUrl()).into(viewHolder.photo);
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
        //TextView tags;
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

    public void setFilter(List<MarketItem> models) {
        models = new ArrayList<>();
        models.addAll(models);
        notifyDataSetChanged();
    }
}

//    private final List<MarketItem> filteredItems;
//
//    private ItemFilter itemFilter;
//
//    public CardViewAdapter(Context context) {
//        this.items =new ArrayList<>();
//        this.filteredItems = new ArrayList<>();
//    }
//
//    @Override
//    public Filter getFilter() {
//        if(itemFilter == null)
//            itemFilter = new ItemFilter(this, items);
//        return itemFilter;
//    }
//
//    private static class ItemFilter extends Filter {
//
//        private final CardViewAdapter adapter;
//
//        private final List<MarketItem> originalList;
//
//        private final List<MarketItem> filteredList;
//
//        private ItemFilter(CardViewAdapter adapter, List<MarketItem> originalList) {
//            super();
//            this.adapter = adapter;
//            this.originalList = new LinkedList<>(originalList);
//            this.filteredList = new ArrayList<>();
//        }
//
//        @Override
//        protected FilterResults performFiltering(CharSequence constraint) {
//            filteredList.clear();
//            final FilterResults results = new FilterResults();
//
//            if (constraint.length() == 0) {
//                filteredList.addAll(originalList);
//            } else {
//                final String filterPattern = constraint.toString().toLowerCase().trim();
//
//                for (final MarketItem item : originalList) {
//                    if (item.getTitle().contains(filterPattern)) {
//                        filteredList.add(item);
//                    }
//                }
//            }
//            results.values = filteredList;
//            results.count = filteredList.size();
//            return results;
//        }
//
//        @Override
//        protected void publishResults(CharSequence constraint, FilterResults results) {
//            adapter.filteredItems.clear();
//            adapter.filteredItems.addAll((ArrayList<MarketItem>) results.values);
//            adapter.notifyDataSetChanged();
//        }
//    }


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

