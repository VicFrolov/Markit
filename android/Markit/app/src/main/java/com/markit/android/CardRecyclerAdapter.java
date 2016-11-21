//package com.markit.android;
//
//import android.support.v7.widget.CardView;
//import android.support.v7.widget.RecyclerView;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//import android.widget.ImageView;
//import android.widget.TextView;
//
//import com.firebase.ui.database.FirebaseRecyclerAdapter;
//import com.google.firebase.database.DatabaseReference;
//import com.google.firebase.database.FirebaseDatabase;
//
//import java.util.ArrayList;
//
///**
// * {@link RecyclerView.Adapter} that can display a {@link Item} and makes a call to the
// * specified {@link ItemClickListener}.
//
// */
//public class CardRecyclerAdapter extends RecyclerView.Adapter<CardRecyclerAdapter.CardViewHolder> {
//
//        private ArrayList<Item> currentItems;
//
//
//        public CardRecyclerAdapter(ArrayList<Item> currentItems) {
//            this.currentItems = currentItems;
//        }
//
//        public CardViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
//            View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.content_card_view, viewGroup, false);
//            return new CardViewHolder(itemView);
//        }
//        @Override
//        public void onBindViewHolder(CardViewHolder holder, int position) {
//            Item i = currentItems.get(position);
//            holder.title.setText(currentItems.get(position).getTitle());
//            holder.price.setText("$ "+currentItems.get(position).getPrice());
//            holder.uid.setText(currentItems.get(position).getUid());
//            holder.feedI = i;
//        }
//
//        @Override
//        public int getItemCount() {
//            return currentItems.size();
//        }
//
//        public void onAttachedToRecyclerView(RecyclerView cardRecyclerView) {
//            super.onAttachedToRecyclerView(cardRecyclerView);
//
////        CardRecyclerAdapter adapter = new CardRecyclerAdapter(currentItems);
////        cardRecyclerView.setAdapter(adapter);
//        }
//
//        public interface ItemClickListener  {
//
//        }
//
//    private static class CardViewHolder extends RecyclerView.ViewHolder {
//        TextView title;
//        TextView price;
//        TextView uid;
//        TextView tags;
//        ImageView photo;
//        CardView cardView;
//        ItemClickListener itemClickListener;
//
//        public CardViewHolder(View itemView) {
//            super(itemView);
//            cardView = (CardView) itemView.findViewById(R.id.card_view);
//            photo = (ImageView) itemView.findViewById(R.id.photo);
//            title = (TextView) itemView.findViewById(R.id.title);
//            price = (TextView) itemView.findViewById(R.id.price);
//            uid = (TextView) itemView.findViewById(R.id.uid);
//        }
//    }
//    FirebaseRecyclerAdapter<Item, CardViewHolder> adapter;
//    DatabaseReference ref = FirebaseDatabase.getInstance().getReference();
//
//    RecyclerView recycler = (RecyclerView) findViewById(R.id.recList);
//    recycler.setHasFixedSize(true);
//    recycler.setLayoutManager(new LinearLayoutManager(this));
//
//    adapter = new FirebaseRecyclerAdapter<Item, CardViewHolder>(Item.class, R.id.layout.content_card_view, CardViewHolder.class, ref) {
//        public void populateViewHolder(ItemViewHolder ItemViewHolder, Item item, int position) {
//            CardViewHolder.title.setText(currentItems.get(position).getTitle());
//            CardViewHolder.price.setText("$ "+currentItems.get(position).getPrice());
//            CardViewHolder.uid.setText(currentItems.get(position).getUid());
//        }
//    };
//    recycler.setAdapter(adapter);
//
////        public static class CardViewHolder extends RecyclerView.ViewHolder {
////            TextView title;
////            TextView price;
////            TextView uid;
////            TextView tags;
////            ImageView photo;
////            CardView cardView;
////            ItemClickListener itemClickListener;
////            public Item feedI;
////
////            public CardViewHolder(View itemView) {
////                super(itemView);
////                cardView = (CardView) itemView.findViewById(R.id.card_view);
////                photo = (ImageView) itemView.findViewById(R.id.photo);
////                title = (TextView) itemView.findViewById(R.id.title);
////                price = (TextView) itemView.findViewById(R.id.price);
////                uid = (TextView) itemView.findViewById(R.id.uid);
////                //tags = (TextView) itemView.findViewById(R.id.tags);
////
////                itemView.setOnClickListener(new View.OnClickListener() {
////                    @Override
////                    public void onClick(View v) {
////                        Intent intent = new Intent(v.getContext(),CardViewActivity.class);
////                        v.getContext().startActivity(intent);
////                        Toast.makeText(v.getContext(),feedI.getTitle(), Toast.LENGTH_SHORT).show();
////                    }
////                });
////            }
////        }
//    }
//
