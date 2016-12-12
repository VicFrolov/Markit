package com.markit.android;

import android.nfc.Tag;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import com.markit.android.ItemsAdapter;

import com.firebase.client.FirebaseError;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.markit.android.MarketItem;
import java.util.ArrayList;

public class MobileView extends AppCompatActivity {
    private static final String TAG = "MobileView";
    private ArrayList<MarketItem> itemObjectArray = new ArrayList<>();
    private DatabaseReference itemDatabase;
    private ListView listView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_view);
        itemDatabase = FirebaseDatabase.getInstance().getReference().child("itemsByHub");
        ValueEventListener itemListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                //@TODO Make it not hard-coded, Also tags needs to retrieve list from database
                for (DataSnapshot items : dataSnapshot.child("Loyola Marymount University").getChildren()) {
                    String itemName = (String) items.child("title").getValue();
                    String itemDescription = (String) items.child("description").getValue();
                    String itemPrice = (String) items.child("price").getValue();
                    //String [] itemTags = {"desk"};//{(String) items.child("tags").getValue()};
                    String itemUID = (String) items.child("uid").getValue();
                    String itemID = (String) items.child("id").getValue();
                    MarketItem newItem = new MarketItem(itemName, itemDescription, itemPrice, itemUID, itemID);
                    Log.i(TAG,itemName+"");
                    itemObjectArray.add(newItem);
                }

                ItemsAdapter iAdapter = new ItemsAdapter(MobileView.this,itemObjectArray);
                listView = (ListView) findViewById(R.id.mobile_list);
                listView.setAdapter(iAdapter);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        };
        itemDatabase.addListenerForSingleValueEvent(itemListener);


    }
}

