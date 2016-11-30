package com.markit.android;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.view.View;

import android.widget.ListView;
import android.widget.TextView;

import com.firebase.ui.database.FirebaseListAdapter;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class FavoritesListView extends AppCompatActivity {

    private static final String TAG = "Favorites";
    private ListView listView;

    //TODO filter to get favorites only
    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference mDatabaseReference = database.getReference().child("items");


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_watchlist);

        listView = (ListView) findViewById(R.id.watchlistView);
        //final ArrayList<ItemObject> currentItems = new ArrayList<>();

        FirebaseListAdapter<ItemObject> firebaseListAdapter = new FirebaseListAdapter<ItemObject>(
                this, ItemObject.class, R.layout.watchlist_item, mDatabaseReference) {
            @Override
            protected void populateView(View v, ItemObject model, int position) {
                ((TextView) v.findViewById(R.id.itemTitle)).setText(model.getTitle());
                ((TextView) v.findViewById(R.id.itemPrice)).setText("$ " + model.getPrice());
            }
        };
        listView.setAdapter(firebaseListAdapter);
    }
}
