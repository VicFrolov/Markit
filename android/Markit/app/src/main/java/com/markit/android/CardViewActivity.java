package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;

import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;


public class CardViewActivity extends BaseActivity {

    private boolean loggedIn;
    private RecyclerView recList;
    private static final String TAG = "CardView";
    private LinearLayoutManager llm;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference mDatabaseReference = database.getReference();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //System.out.println("CREATING CARD VIEW ACTIVITY");
        super.onCreate(savedInstanceState);
        super.setContentView(R.layout.activity_card_view);
        //startActivity(new Intent(CardViewActivity.this, CardActivity.class));

        recList = (RecyclerView) findViewById(R.id.recList);
        if (recList != null) {
            recList.setHasFixedSize(true);
        }
        llm = new LinearLayoutManager(this);
        recList.setLayoutManager(llm);

        FirebaseRecyclerAdapter<Item, CardViewActivity.CardViewHolder> adapter = new FirebaseRecyclerAdapter<Item, CardViewActivity.CardViewHolder>(
                Item.class, R.layout.card_item, CardViewActivity.CardViewHolder.class,
                mDatabaseReference.child("items")) {
            @Override
            public void populateViewHolder(CardViewActivity.CardViewHolder cardViewHolder, Item model, int position) {
                cardViewHolder.title.setText(model.getTitle());
                cardViewHolder.price.setText("$ " + model.getPrice());
                cardViewHolder.uid.setText(model.getUid());
            }
        };
        recList.setAdapter(adapter);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ImageView hubPicture = (ImageView) findViewById(R.id.hub_image);
        hubPicture.setImageResource(R.drawable.sample_lmu_photo);
        hubPicture.setScaleType(ImageView.ScaleType.CENTER_CROP);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.nav_menu_button);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(CardViewActivity.this, Profile.class));
            }
        });

        FloatingActionButton notifications = (FloatingActionButton) findViewById(R.id.notifications_button);
        notifications.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DrawerLayout drawer = CardViewActivity.super.getDrawerLayout();
                drawer.openDrawer(GravityCompat.END);
                CardViewActivity.super.openNavDrawer();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_card_view, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }
        if (id == R.id.profile) {
            startActivity(new Intent(CardViewActivity.this, Profile.class));
            return true;
        }
        if (id == R.id.watching) {
            return true;
        }
        if (id == R.id.change_hub) {
            return true;
        }
        if (id == R.id.edit_tags) {
            Intent tagPage = new Intent(CardViewActivity.this, Profile.class);
            tagPage.putExtra("ARG_SECTION_NUMBER", 2);
            startActivity(tagPage);
            return true;
        }
        if (id == R.id.new_listing) {
            startActivity(new Intent(CardViewActivity.this, NewListing.class));
            return true;
        }


        return super.onOptionsItemSelected(item);
    }

    public boolean isLoggedIn() {
        return loggedIn;
    }

    public void setLoggedIn(boolean b) {
        loggedIn = b;
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



