package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.NavigationView;
import android.support.v4.app.FragmentManager;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ListView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class BaseActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener, ChangeHubFragment.ChangeHubListener {

    public DrawerLayout layout;
    public FrameLayout drawerFrame;
    private DatabaseReference itemDatabase;
    private ArrayList<MarketItem> itemObjectArray = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        System.out.println("CREATING BASE ACTIVITY");
        super.onCreate(savedInstanceState);
        itemDatabase = FirebaseDatabase.getInstance().getReference().child("itemsByHub");


    }
    @Override
    //TODO Reload current screen rather than CardView -Peyton
    public void onFinishHub(String hub) {


        Intent reload = new Intent(BaseActivity.this,CardViewActivity.class);
        reload.putExtra("hub", hub);
        BaseActivity.this.startActivity(reload);
    }
    @Override
    public void setContentView(int layoutResID) {
        layout = (DrawerLayout) getLayoutInflater().inflate(R.layout.activity_base, null);
        drawerFrame = (FrameLayout) layout.findViewById(R.id.base_frame);
        getLayoutInflater().inflate(layoutResID, drawerFrame, true);

        super.setContentView(layout);
    }

    public DrawerLayout getDrawerLayout() {
        return BaseActivity.this.layout;
    }
    public void openNavDrawer() {
        BaseActivity.this.layout.openDrawer(GravityCompat.END);
    }

    @Override
    public void onBackPressed() {
        BaseActivity.this.getDrawerLayout();
        if (layout.isDrawerOpen(GravityCompat.END)) {
            System.out.println("Drawer closed");
            layout.closeDrawer(GravityCompat.END);
        } else {
            super.onBackPressed();
        }
    }

    public boolean isLoggedIn() {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user != null) {
            return true;
        } else {
            return false;
            }
        }

    public String getUID () {
        if(isLoggedIn()) {
            return FirebaseAuth.getInstance().getCurrentUser().getUid();
        } else {
            return null;
        }
    }

    public void getItemsByHub() {
        ValueEventListener itemListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                //@TODO Make it not hard-coded, Also tags needs to retrieve list from database
                for (DataSnapshot items : dataSnapshot.child("Loyola Marymount University").getChildren()) {
                    String itemName = (String) items.child("title").getValue();
                    String itemDescription = (String) items.child("description").getValue();
                    String itemPrice = (String) items.child("price").getValue();
                    //String [] itemTags = {(String) items.child("tags").getValue()};
                    String itemUID = (String) items.child("uid").getValue();
                    String itemID = (String) items.child("id").getValue();
                    MarketItem newItem = new MarketItem(itemName, itemDescription, itemPrice, itemUID, itemID);
                    itemObjectArray.add(newItem);
                }


            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        };
        itemDatabase.addListenerForSingleValueEvent(itemListener);

    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        if (id == R.id.action_settings) {
            return true;
        }
        if (id == R.id.profile) {
            startActivity(new Intent(BaseActivity.this, Profile.class));
            return true;
        }
        if (id == R.id.watching) {
            startActivity(new Intent(BaseActivity.this, FavoritesListView.class));
            return true;
        }
        if (id == R.id.change_hub) {
            FragmentManager fm = getSupportFragmentManager();
            ChangeHubFragment changeHubFragment = ChangeHubFragment.newInstance("Change Hub");
            changeHubFragment.show(fm,"fragment_change_hub");
            return true;
        }
        if (id == R.id.edit_tags) {
            Intent tagPage = new Intent(BaseActivity.this, Profile.class);
            tagPage.putExtra("ARG_SECTION_NUMBER", 2);
            startActivity(tagPage);
            return true;
        }
        if (id == R.id.new_listing) {
            startActivity(new Intent(BaseActivity.this, NewListing.class));
            return true;
        }
        if (id == R.id.nav_card_view) {
            startActivity(new Intent(BaseActivity.this, CardViewActivity.class));
        }
        if (id == R.id.chat) {
            startActivity(new Intent(BaseActivity.this, MainChatActivity.class));
            return true;
        }

        return super.onOptionsItemSelected(item);
    }


    @Override
    public void setTitle(CharSequence title) {
        super.setTitle(R.string.app_name);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action
        } else if (id == R.id.nav_gallery) {

        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.END);
        return true;
    }
}
