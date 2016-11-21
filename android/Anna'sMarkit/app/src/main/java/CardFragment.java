package com.example.annagotsis.annasmarkit;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;
//import com.markit.android.Item;
import android.os.Bundle;
import android.nfc.Tag;
import android.app.Activity;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.CardView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.widget.ListView;

import com.firebase.client.Firebase;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DataSnapshot;
import com.firebase.client.FirebaseError;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.markit.android.CardRecyclerAdapter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static com.markit.android.FireBase.firebase;
import static com.markit.android.R.id.itemDescription;
import static com.markit.android.R.id.itemPrice;
/**
 * Created by Anna Gotsis on 11/19/2016.
 */

public class CardFragment {
    private ArrayList<Item> currentItems = new ArrayList<>();
    RecyclerView recList;

    @Override
    public void onCreate (@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initializeList();
        getActivity.setTitle("CardView");
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_card, container, false);
        recList = (RecyclerView) view.findViewById(R.id.cardView);
        recList.setHasFixedSize(false);
        LinearLayoutManager llm = new LinearLayoutManager(getActivity());
        llm.setOrientation(LinearLayoutManager.VERTICAL);
        if (currentItems.size() > 0 & recList != null) {
            recList.setAdapter(adapter));
        }
        recList.setLayoutManager(llm);

        return view;
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
    }

    public class CardRecyclerAdapter extends RecyclerView.Adapter<CardRecyclerAdapter.CardViewHolder> {

        private ArrayList<Item> currentItems;


        public CardRecyclerAdapter(ArrayList<Item> Data) {
            currentItems = Data;
        }

        public CardViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
            View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.recycle_items, viewGroup, false);
            return new CardViewHolder(itemView);
        }
        @Override
        public void onBindViewHolder(CardViewHolder holder, int position) {
            Item i = currentItems.get(position);
            holder.title.setText(currentItems.get(position).getTitle());
            holder.price.setText("$ "+currentItems.get(position).getPrice());
            holder.uid.setText(currentItems.get(position).getUid());
            holder.likeImageView.setTag(R.drawable.ic_favorite_black_48px)
            //holder.feedI = i;
        }

        @Override
        public int getItemCount() {
            return currentItems.size();
        }
    }

    // public void onAttachedToRecyclerView(RecyclerView cardRecyclerView) {
    //     super.onAttachedToRecyclerView(cardRecyclerView);

//        CardRecyclerAdapter adapter = new CardRecyclerAdapter(currentItems);
//        cardRecyclerView.setAdapter(adapter);
    // }

    // public interface ItemClickListener  {

    // }
    public static class CardViewHolder extends RecyclerView.ViewHolder {
        TextView title;
        TextView price;
        TextView uid;
        TextView tags;
        ImageView photo;
        ImageView likeImageView;
        CardView cardView;
        ItemClickListener itemClickListener;
        //public Item feedI;

        public CardViewHolder(View itemView) {
            super(itemView);
            cardView = (CardView) itemView.findViewById(R.id.card_view);
            photo = (ImageView) itemView.findViewById(R.id.photo);
            title = (TextView) itemView.findViewById(R.id.title);
            price = (TextView) itemView.findViewById(R.id.price);
            uid = (TextView) itemView.findViewById(R.id.uid);
            likeImageView  = (ImageView) itemView.findViewById(R.id.likeImageView);

            likeImageView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int id = (int)likeImageView.getTag();
                    if(id == R.drawable.ic_favorite_black_48px){
                        likeImageView.setTag(R.drawable.ic_favorite_black_48px);
                        likeImageView.setImageResource(R.drawable.ic_favorite_black_48px);
                        Toast.makeText(getActivity(),titleTextView.getText()+" added to favourites",Toast.LENGTH_SHORT).show();
                    }else{
                        likeImageView.setTag(R.drawable.ic_favorite_black_48px);
                        likeImageView.setImageResource(R.drawable.ic_favorite_black_48px);
                        Toast.makeText(getActivity(),titleTextView.getText()+" removed from favourites",Toast.LENGTH_SHORT).show();
                    }
                }
            });
            //tags = (TextView) itemView.findViewById(R.id.tags);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(v.getContext(),CardViewActivity.class);
                    v.getContext().startActivity(intent);
                    Toast.makeText(v.getContext(),feedI.getTitle(),Toast.LENGTH_SHORT).show();
                }
            });
        }

        itemDatabase = FirebaseDatabase.getInstance().getReference().child("itemsByHub");
        ValueEventListener itemListener = new ValueEventListener() {
            public void initializeList() {
                listitems.clear();

                for (DataSnapshot items : dataSnapshot.child("Loyola Marymount University").getChildren()) {
                    String itemName = (String) items.child("title").getValue();
                    String itemDescription = (String) items.child("description").getValue();
                    String itemPrice = (String) items.child("price").getValue();
                    String[] itemTags = {(String) items.child("tags").getValue()};
                    String itemUID = (String) items.child("uid").getValue();
                    Item newItem = new Item(itemName, itemDescription, itemPrice, itemTags, itemUID);
                    Log.i(TAG, itemName + "");
                    currentItems.add(newItem);
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {

                }
            };
            itemDatabase.addValueEventListener(itemListener);
            adapter = new CardRecyclerAdapter(currentItems);
            cardView = (CardView) findViewById(R.id.card_view);
            recList.setAdapter(adapter);
        }

}
