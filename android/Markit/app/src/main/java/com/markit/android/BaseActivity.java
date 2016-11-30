package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.FrameLayout;

public class BaseActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    public DrawerLayout layout;
    public FrameLayout drawerFrame;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        System.out.println("CREATING BASE ACTIVITY");
        super.onCreate(savedInstanceState);
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

//    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//        // Inflate the menu; this adds items to the action bar if it is present.
//        getMenuInflater().inflate(R.menu.base, menu);
//        return true;
//    }

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
        if (id ==- R.id.nav_card_view) {
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
        super.setTitle("Markeet");
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
