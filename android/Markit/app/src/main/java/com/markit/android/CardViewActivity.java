package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.os.Bundle;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.v4.app.FragmentManager;
import android.support.v4.view.ViewCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.markit.android.base.files.BaseActivity;
import com.markit.android.newlisting.files.NewListing;
import com.markit.android.profile.files.Profile;

import java.util.ArrayList;


public class CardViewActivity extends BaseActivity {

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    private static final String TAG = "CardView";
    private ArrayList<MarketItem> itemObjectArray = new ArrayList<>();
    DatabaseReference rootDatabase = database.getReference();
    DatabaseReference mDatabaseReference = database.getReference().child("items");
//    DatabaseReference mDatabaseReference = database.getReference().child("itemsByHub");
    DatabaseReference userDatabase = mDatabaseReference.child("users").child("1yVB2s3vMjdRnDCA60SlfGIarOA3").child("userHub");
    //DatabaseReference userDatabase = rootDatabase.child("users").child(getUID()).child("userHub");
    private boolean loggedIn;
    //private ListView cardListView;
    private RecyclerView recList;
    private LinearLayoutManager llm;
    private Context context = this;
    private Menu optionsMenu;
    private Bundle hubInfo;
    private String hub;


//    DatabaseReference mDatabaseReference = database.getReference().child("itemsByHub");
//    DatabaseReference userDatabase= mDatabaseReference.child("users").child(getUID()).child("userHub");

    public interface OnGetDataListener {
        public void onStart();
        public void onSuccess(DataSnapshot data);
        public void onFailed(DatabaseError error);
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setContentView(R.layout.activity_card_view);
        hub = "Loyola Marymount University";
        hubInfo = getIntent().getExtras();
//<<<<<<< HEAD

//        if (hubInfo == null && isLoggedIn()) {
//            ValueEventListener getHub = new ValueEventListener() {
//                @Override
//                public void onDataChange(DataSnapshot dataSnapshot) {
//                    hub = (String) dataSnapshot.getValue();
//                    //populateCardView(hub);
//                }
//
//                @Override
//                public void onCancelled(DatabaseError databaseError) {
//
//                }
//            };
//            userDatabase.addListenerForSingleValueEvent(getHub);
//
//        } else if (hubInfo != null) {
//            hub = hubInfo.getString("hub");
//            userDatabase.setValue(hub);
//            //populateCardView(hub);
//        } else {
//            hub = "Loyola Marymount University";
//            //populateCardView(hub);
//        }
//=======
        if (hubInfo == null && isLoggedIn()) {
            ValueEventListener getHub = new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    hub = (String) dataSnapshot.getValue();

                }

                @Override
                public void onCancelled(DatabaseError databaseError) {

                }
            };
            userDatabase.addListenerForSingleValueEvent(getHub);

        } else if (hubInfo != null) {
            hub = hubInfo.getString("hub");
            userDatabase.setValue(hub);

        } else {
            hub = "Loyola Marymount University";

        }
//>>>>>>> fc7609f4495dd499fe4dac689f2bb8f4a6378ed1
        Toast.makeText(this, hub, Toast.LENGTH_SHORT ).show();

        setContentView(R.layout.activity_card_view);


        final Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final CollapsingToolbarLayout collapsingToolbar = (CollapsingToolbarLayout) findViewById(R.id.toolbar_layout);
        AppBarLayout appBar = (AppBarLayout) findViewById(R.id.app_bar);

        appBar.addOnOffsetChangedListener(new AppBarLayout.OnOffsetChangedListener() {
            @Override
            public void onOffsetChanged(AppBarLayout appBarLayout, int verticalOffset) {
//                SearchView searchView = (SearchView) optionsMenu.findItem(R.id.search_listings).getActionView();
                if ((collapsingToolbar.getHeight() + verticalOffset) < 2 * (ViewCompat.getMinimumHeight(collapsingToolbar))) {
                    toolbar.getNavigationIcon().setColorFilter(getResources().getColor(R.color.cardview_dark_background), PorterDuff.Mode.SRC_ATOP);
                    toolbar.getOverflowIcon().setColorFilter(getResources().getColor(R.color.cardview_dark_background), PorterDuff.Mode.SRC_ATOP);
//                    toolbar.getMenu().findItem(R.id.search_listings).getIcon().setColorFilter(getResources().getColor(R.color.cardview_dark_background), PorterDuff.Mode.SRC_ATOP);
//                    searchView.setBackgroundColor(Color.parseColor("#000000"));
                } else {
                    toolbar.getNavigationIcon().setColorFilter(getResources().getColor(R.color.cardview_light_background), PorterDuff.Mode.SRC_ATOP);
                    toolbar.getOverflowIcon().setColorFilter(getResources().getColor(R.color.cardview_light_background), PorterDuff.Mode.SRC_ATOP);
//                    toolbar.getMenu().findItem(R.id.search_listings).getIcon().setColorFilter(getResources().getColor(R.color.cardview_light_background), PorterDuff.Mode.SRC_ATOP);
//                    searchView.setBackgroundColor(Color.parseColor("#FFFFFF"));
                }
            }
        });

        //populateCardView();
        ImageView hubPicture = (ImageView) findViewById(R.id.hub_image);
        hubPicture.setImageResource(R.drawable.sample_lmu_photo);
        hubPicture.setScaleType(ImageView.ScaleType.CENTER_CROP);

        DrawerLayout drawer = super.getDrawerLayout();
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();


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
//                DrawerLayout drawer = CardViewActivity.super.getDrawerLayout();
//                drawer.openDrawer(GravityCompat.END);
//                CardViewActivity.super.openNavDrawer();
            }
        });

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_drawer);
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        CardViewActivity.this.optionsMenu = menu;
        getMenuInflater().inflate(R.menu.menu_card_view, menu);


//        final Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
//        setSupportActionBar(toolbar);
//
//        final CollapsingToolbarLayout collapsingToolbar = (CollapsingToolbarLayout) findViewById(R.id.toolbar_layout);
//        AppBarLayout appBar = (AppBarLayout) findViewById(R.id.app_bar);
//
//        appBar.addOnOffsetChangedListener(new AppBarLayout.OnOffsetChangedListener() {
//            @Override
//            public void onOffsetChanged(AppBarLayout appBarLayout, int verticalOffset) {
////                SearchView searchView = (SearchView) optionsMenu.findItem(R.id.search_listings).getActionView();
//                if ((collapsingToolbar.getHeight() + verticalOffset) < 2 * (ViewCompat.getMinimumHeight(collapsingToolbar))) {
//                    toolbar.getNavigationIcon().setColorFilter(getResources().getColor(R.color.cardview_dark_background), PorterDuff.Mode.SRC_ATOP);
//                    toolbar.getOverflowIcon().setColorFilter(getResources().getColor(R.color.cardview_dark_background), PorterDuff.Mode.SRC_ATOP);
//                    toolbar.getMenu().findItem(R.id.search_listings).getIcon().setColorFilter(getResources().getColor(R.color.cardview_dark_background), PorterDuff.Mode.SRC_ATOP);
////                    searchView.setBackgroundColor(Color.parseColor("#000000"));
//                } else {
//                    toolbar.getNavigationIcon().setColorFilter(getResources().getColor(R.color.cardview_light_background), PorterDuff.Mode.SRC_ATOP);
//                    toolbar.getOverflowIcon().setColorFilter(getResources().getColor(R.color.cardview_light_background), PorterDuff.Mode.SRC_ATOP);
//                    toolbar.getMenu().findItem(R.id.search_listings).getIcon().setColorFilter(getResources().getColor(R.color.cardview_light_background), PorterDuff.Mode.SRC_ATOP);
////                    searchView.setBackgroundColor(Color.parseColor("#FFFFFF"));
//                }
//            }
//        });

        return true;
    }


    public void FindItem (View view) {

    }



    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.watching) {
            startActivity(new Intent(CardViewActivity.this, FavoritesListView.class));
            return true;
        }
        if (id == R.id.change_hub) {
            FragmentManager fm = getSupportFragmentManager();
            ChangeHubFragment changeHubFragment = ChangeHubFragment.newInstance("Change Hub");
            changeHubFragment.show(fm,"fragment_change_hub");
            return true;
        }
        if (id == R.id.sign_out) {
            FirebaseAuth.getInstance().signOut();
        }
        return super.onOptionsItemSelected(item);
    }
//
//<<<<<<< HEAD  TODO related to pervious left in git merge, alternative impleentation
//=======
    public void populateCardView (final String hub) {
        final RecyclerView recList = (RecyclerView) findViewById(R.id.recList);
        if (recList != null) {
            recList.setHasFixedSize(true);
        }
        llm = new LinearLayoutManager(this);
        //llm.setReverseLayout(true);
        recList.setLayoutManager(llm);

        DatabaseReference itemDatabase = mDatabaseReference.child(hub);
        final DatabaseReference userDatabase = database.getReference().child("users");

        ValueEventListener itemListener = new ValueEventListener() {

            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                for (DataSnapshot items : dataSnapshot.child("itemsByHub").child(hub).getChildren()) {
                    String itemName = (String) items.child("title").getValue();
                    String itemDescription = (String) items.child("description").getValue();
                    String itemPrice = (String) items.child("price").getValue();
                    String itemUID = (String) items.child("uid").getValue();
                    String itemID = (String) items.child("id").getValue();
                    DataSnapshot usernameRef = dataSnapshot.child("users").child(itemUID).child("username");
                    String username = (String) usernameRef.getValue();
                    MarketItem newItem = new MarketItem(itemName, itemDescription, itemPrice, itemUID, itemID, username);

                    itemObjectArray.add(newItem);


                }


                CardViewAdapter iAdapter = new CardViewAdapter(CardViewActivity.this,itemObjectArray);

                recList.setAdapter(iAdapter);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        };
        rootDatabase.addListenerForSingleValueEvent(itemListener);

    }

//>>>>>>> fc7609f4495dd499fe4dac689f2bb8f4a6378ed1
    @Override
    public void onStart() {
        if (hub == null) {
            hub = "Loyola Marymount University";
        }
        populateCardView(hub);
        super.onStart();
        CollapsingToolbarLayout collapsingToolbarLayout = (CollapsingToolbarLayout) findViewById(R.id.toolbar_layout);
        collapsingToolbarLayout.setCollapsedTitleTextColor(Color.parseColor("#F4A49D"));
        collapsingToolbarLayout.setTitle("Markit");
//        collapsingToolbarLayout.
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
        TextView id;
        TextView tags;
        ImageView photo;
        Context context;
        ImageView likeImageView;

        public CardViewHolder(View itemView) {
            super(itemView);
            context = itemView.getContext();
            photo = (ImageView) itemView.findViewById(R.id.photo);
            title = (TextView) itemView.findViewById(R.id.title);
            price = (TextView) itemView.findViewById(R.id.price);
            uid = (TextView) itemView.findViewById(R.id.username);
            id = (TextView) itemView.findViewById(R.id.id);
//            likeImageView.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View itemView) {
//                    int id = (int)likeImageView.getTag();
//                    if (id == R.drawable.ic_favorite_border_black_48px){
//                        likeImageView.setTag(R.drawable.ic_favorite_black_48px);
//                        likeImageView.setImageResource(R.drawable.ic_favorite_black_48px);
//                        Toast.makeText(context, title.getText()+" added to favorites", Toast.LENGTH_SHORT).show();
//                    }else{
//                        likeImageView.setTag(R.drawable.ic_favorite_border_black_48px);
//                        likeImageView.setImageResource(R.drawable.ic_favorite_border_black_48px);
//                        Toast.makeText(context,title.getText()+" removed from favorites",Toast.LENGTH_SHORT).show();
//                    }
//                }
//            });
        }

    }
}