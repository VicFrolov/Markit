//package com.markit.android;
//
//import android.app.Fragment;
//import android.content.Intent;
//import android.os.Bundle;
//import android.net.Uri;
//import android.content.ContentResolver;
//import android.support.annotation.Nullable;
//import android.support.design.widget.FloatingActionButton;
//import android.support.v4.view.GravityCompat;
//import android.support.v4.widget.DrawerLayout;
//import android.support.v7.widget.Toolbar;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.Menu;
//import android.view.MenuItem;
//import android.view.ViewGroup;
//import android.widget.ImageView;
//import com.markit.android.Item;
//import android.os.Bundle;
//import android.nfc.Tag;
//import android.app.Activity;
//import android.support.v4.app.FragmentActivity;
//import android.support.v7.app.AppCompatActivity;
//import android.support.v7.widget.CardView;
//import android.support.v7.widget.LinearLayoutManager;
//import android.support.v7.widget.RecyclerView;
//import android.util.Log;
//import android.widget.ListView;
//import android.widget.TextView;
//import android.widget.Toast;
//
//import com.firebase.client.Firebase;
//import com.google.firebase.database.DatabaseError;
//import com.google.firebase.database.ValueEventListener;
//import com.google.firebase.database.DataSnapshot;
//import com.firebase.client.FirebaseError;
//import com.google.firebase.database.ChildEventListener;
//import com.google.firebase.database.DatabaseReference;
//import com.google.firebase.database.FirebaseDatabase;
//
//
//import java.util.ArrayList;
//
//
//import static android.content.ContentValues.TAG;
//import static com.markit.android.FireBase.BASE_URL;
//
///**
// * Created by Anna Gotsis on 11/19/2016.
// */
//public class CardFragment extends Fragment {
//
//    private RecyclerView.Adapter adapter;
//    //private RecyclerView.LayoutManager llm;
//    public static String BASE_URL = "https://markit-80192.firebaseio.com/";
//    private ArrayList<Item> currentItems = new ArrayList<>();
//    RecyclerView recList;
//    private DatabaseReference itemDatabase;
//    CardView cardView;
//    Firebase ref;
//
//
//    @Override
//    public void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//
//        //adapter = new CardRecyclerAdapter(currentItems);
//        //getActivity.setTitle("CardView");
//        //recList = (RecyclerView) findViewById(R.id.cardView);
//        recList.setHasFixedSize(false);
//        LinearLayoutManager llm = new LinearLayoutManager(getActivity());
//        llm.setOrientation(LinearLayoutManager.VERTICAL);
////        if (currentItems.size() > 0 & recList != null) {
////            recList.setAdapter(new CardRecyclerAdapter(currentItems));
////        }
//        recList.setLayoutManager(llm);
//        //Firebase.setAndroidContext(this);
//        initializeList();
//    }
//
//    @Override
//    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
//
//        View view = inflater.inflate(R.layout.fragment_card, container, false);
//        recList = (RecyclerView) view.findViewById(R.id.cardView);
//        recList.setHasFixedSize(false);
//        LinearLayoutManager llm = new LinearLayoutManager(getActivity());
//        llm.setOrientation(LinearLayoutManager.VERTICAL);
//        if (currentItems.size() > 0 & recList != null) {
//            recList.setAdapter(new CardRecyclerAdapter(currentItems));
//        }
//        recList.setLayoutManager(llm);
//
//        return view;
//    }
//
//    @Override
//    public void onActivityCreated(Bundle savedInstanceState) {
//        super.onActivityCreated(savedInstanceState);
//    }
//
//    public class CardRecyclerAdapter extends RecyclerView.Adapter<CardViewHolder> {
//
//        private ArrayList<Item> currentItems;
//
//        public CardRecyclerAdapter(ArrayList<Item> Data) {
//            currentItems = Data;
//        }
//
//        public CardViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
//            View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.content_card_view, viewGroup, false);
//            return new CardViewHolder(itemView);
//        }
//
//        @Override
//        public void onBindViewHolder(CardViewHolder holder, int position) {
//            Item i = currentItems.get(position);
//            holder.title.setText(currentItems.get(position).getTitle());
//            holder.price.setText("$ " + currentItems.get(position).getPrice());
//            holder.uid.setText(currentItems.get(position).getUid());
//            holder.likeImageView.setTag(R.drawable.ic_favorite_black_48px);
//            holder.cardView.setCardBackgroundColor(currentItems.get(position).getIntValue());
//            //holder.feedI = i;
//        }
//
//        @Override
//        public int getItemCount() {
//            return currentItems.size();
//        }
//    }
//
//    public class CardViewHolder extends RecyclerView.ViewHolder {
//        TextView title;
//        TextView price;
//        TextView uid;
//        TextView tags;
//        ImageView photo;
//        ImageView likeImageView;
//        CardView cardView;
//        //com.markit.android.CardRecyclerAdapter.ItemClickListener itemClickListener;
//        //public Item feedI;
//
//        public CardViewHolder(View itemView) {
//            super(itemView);
//            cardView = (CardView) itemView;
//            photo = (ImageView) itemView.findViewById(R.id.photo);
//            title = (TextView) itemView.findViewById(R.id.title);
//            price = (TextView) itemView.findViewById(R.id.price);
//            uid = (TextView) itemView.findViewById(R.id.uid);
//            //likeImageView  = (ImageView) itemView.findViewById(R.id.likeImageView);
//
////            likeImageView.setOnClickListener(new View.OnClickListener() {
////                @Override
////                public void onClick(View v) {
////                    int id = (int)likeImageView.getTag();
////                    if(id == R.drawable.ic_favorite_black_48px){
////                        likeImageView.setTag(R.drawable.ic_favorite_black_48px);
////                        likeImageView.setImageResource(R.drawable.ic_favorite_black_48px);
////                        Toast.makeText(getActivity(),title.getText()+" added to favourites",Toast.LENGTH_SHORT).show();
////                    }else{
////                        likeImageView.setTag(R.drawable.ic_favorite_black_48px);
////                        likeImageView.setImageResource(R.drawable.ic_favorite_black_48px);
////                        Toast.makeText(getActivity(),title.getText()+" removed from favourites",Toast.LENGTH_SHORT).show();
////                    }
////                }
////            });
//            //tags = (TextView) itemView.findViewById(R.id.tags);
//
////            itemView.setOnClickListener(new View.OnClickListener() {
////                @Override
////                public void onClick(View v) {
////                    Intent intent = new Intent(v.getContext(),CardViewActivity.class);
////                    v.getContext().startActivity(intent);
////                    Toast.makeText(v.getContext(),title.getTitle(),Toast.LENGTH_SHORT).show();
////                }
////            });
//        }
//    }
//        public void initializeList() {
//            ref = new Firebase(BASE_URL);
//            itemDatabase = FirebaseDatabase.getInstance().getReference().child("itemsByHub");
//           itemDatabase.addValueEventListener(new ValueEventListener() {
//                @Override
//                public void onDataChange(DataSnapshot dataSnapshot) {
//                    for (DataSnapshot items : dataSnapshot.child("Loyola Marymount University").getChildren()) {
//                        String itemName = (String) items.child("title").getValue();
//                        String itemDescription = (String) items.child("description").getValue();
//                        String itemPrice = (String) items.child("price").getValue();
//                        String[] itemTags = {(String) items.child("tags").getValue()};
//                        String itemUID = (String) items.child("uid").getValue();
//                        Item newItem = new Item(itemName, itemDescription, itemPrice, itemTags, itemUID);
//                        Log.i(TAG, itemName + "");
//                        currentItems.add(newItem);
//                    }
//
////                    adapter = new CardRecyclerAdapter(currentItems);
////                    //cardView = (CardView) itemView;
////                    recList.setAdapter(adapter);
//                }
//
//                @Override
//                public void onCancelled(DatabaseError databaseError) {
//                }
//            });
//            //itemDatabase.addListenerForSingleValueEvent(itemListener);
//        }
//    }
//
//
