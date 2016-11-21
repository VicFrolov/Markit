//package com.markit.android;
//
//import android.support.v7.widget.CardView;
//import android.support.v7.widget.LinearLayoutManager;
//import android.support.v7.widget.RecyclerView;
//import android.view.View;
//import android.widget.ImageView;
//import android.widget.TextView;
//import android.support.v7.widget.RecyclerView.ViewHolder;
//
//import com.firebase.client.Firebase;
//import com.firebase.ui.database.FirebaseRecyclerAdapter;
//
//
///**
// * Created by Anna Gotsis on 11/19/2016.
// */
//
//private static class CardViewHolder extends RecyclerView.ViewHolder {
//    TextView title;
//    TextView price;
//    TextView uid;
//    TextView tags;
//    ImageView photo;
//    CardView cardView;
//    CardRecyclerAdapter.ItemClickListener itemClickListener;
//
//    public CardViewHolder(View itemView) {
//        super(itemView);
//        cardView = (CardView) itemView.findViewById(R.id.card_view);
//        photo = (ImageView) itemView.findViewById(R.id.photo);
//        title = (TextView) itemView.findViewById(R.id.title);
//        price = (TextView) itemView.findViewById(R.id.price);
//        uid = (TextView) itemView.findViewById(R.id.uid);
//    }
//    FirebaseRecyclerAdapter<Item, CardViewHolder> adapter;
//    Firebase ref = new Firebase("https://markit-80192.firebaseio.com/");
//        // DatabaseReference ref = FirebaseDatabase.getInstance().getReference();
//
//        RecyclerView recycler = (RecyclerView) findViewById(R.id.recList);
//        LinearLayoutManager llm = new LinearLayoutManager(this);
//        //llm.setOrientation(LinearLayoutManager.VERTICAL);
//        recycler.setLayoutManager(llm);
//        recycler.setHasFixedSize(true);
//
//
//        adapter = new FirebaseRecyclerAdapter<Item, CardViewHolder>(Item.class, R.layout.content_card_view, CardViewHolder.class, ref) {
//            @Override
//            public void populateViewHolder(CardViewHolder cardViewHolder, Item currentItems,int position){
//                cardViewHolder.title.setText(currentItems.getTitle());
//                cardViewHolder.price.setText("$ " + currentItems.getPrice());
//                cardViewHolder.uid.setText(currentItems.getUid());
//            }
//        };
//        recycler.setAdapter(adapter);
//    }
