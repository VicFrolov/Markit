package com.markit.android;

import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.util.Log;
import com.markit.android.Item;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import com.firebase.client.Firebase;
import com.google.firebase.database.Query;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
//import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by Anna Gotsis on 11/20/2016.
 */

public class CardActivity extends CardViewActivity {

    private RecyclerView recList;
    private static final String TAG = "CardView";
    private LinearLayoutManager llm;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference mDatabaseReference = database.getReference();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //System.out.println("CREATING CARD VIEW ACTIVITY");
        super.onCreate(savedInstanceState);
        super.setContentView(R.layout.content_card_view);

        //CardView cardView = (CardView) findViewById(R.id.card_view);
        //Firebase.setAndroidContext(this);
        //final Firebase ref = new Firebase("https://markit-80192.firebaseio.com/");

        recList = (RecyclerView) findViewById(R.id.recList);
        if (recList != null) {
            recList.setHasFixedSize(true);
        }
        llm = new LinearLayoutManager(this);
        recList.setLayoutManager(llm);

        FirebaseRecyclerAdapter<Item, CardViewHolder> adapter = new FirebaseRecyclerAdapter<Item, CardViewHolder>(
                Item.class, R.layout.card_item, CardViewHolder.class,
                mDatabaseReference.child("items")) {
            @Override
            public void populateViewHolder(CardViewHolder cardViewHolder, Item model, int position) {
                cardViewHolder.title.setText(model.getTitle());
                cardViewHolder.price.setText("$ " + model.getPrice());
                cardViewHolder.uid.setText(model.getUid());
            }
        };
        recList.setAdapter(adapter);
    }
        public static class CardViewHolder extends RecyclerView.ViewHolder {
            TextView title;
            TextView price;
            TextView uid;
            TextView tags;
            ImageView photo;
            //CardView cardView;
            //CardRecyclerAdapter.ItemClickListener itemClickListener;

            public CardViewHolder(View itemView) {
                super(itemView);
                //cardView = (CardView) itemView.findViewById(R.id.card_view);
                photo = (ImageView) itemView.findViewById(R.id.photo);
                title = (TextView) itemView.findViewById(R.id.title);
                price = (TextView) itemView.findViewById(R.id.price);
                uid = (TextView) itemView.findViewById(R.id.uid);
            }
        }
    }
