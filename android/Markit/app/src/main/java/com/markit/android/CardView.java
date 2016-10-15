package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

public class CardView extends BaseActivity {

    private boolean loggedIn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        System.out.println("CREATING CARD VIEW ACTIVITY");

        super.onCreate(savedInstanceState);
        super.setContentView(R.layout.activity_card_view);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.nav_menu_button);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(CardView.this, Profile.class));
            }
        });



        FloatingActionButton notifications = (FloatingActionButton) findViewById(R.id.notifications_button);
        notifications.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                System.out.println("IT WORKS");
                System.out.println(CardView.super.drawerFrame);
                System.out.println(CardView.super.drawerFrame.getChildCount());
                for(int i = 0; i<CardView.super.drawerFrame.getChildCount(); i++){
                    System.out.println("CHILD " + i + ":");
                    System.out.println(CardView.super.drawerFrame.getChildAt(i));
                    System.out.println(CardView.super.drawerFrame.getChildAt(i).findViewById(R.id.notifications_button));
                }

                DrawerLayout drawer = CardView.super.getDrawerLayout();
                System.out.println(drawer);
                System.out.println(getWindow().getCurrentFocus());
                drawer.openDrawer(GravityCompat.END);
                CardView.super.openNavDrawer();
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
            startActivity(new Intent(CardView.this, Profile.class));
            return true;
        }
        if (id == R.id.watching) {
            return true;
        }
        if (id == R.id.change_hub) {
            return true;
        }
        if (id == R.id.edit_tags) {
            Intent tagPage = new Intent(CardView.this, Profile.class);
            tagPage.putExtra("ARG_SECTION_NUMBER", 2);
            startActivity(tagPage);
            return true;
        }
        if (id == R.id.new_listing) {
            startActivity(new Intent(CardView.this, NewListing.class));
            return true;
        }
        if (id == R.id.notifications) {
            startActivity(new Intent(CardView.this, Notifications.class));
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public boolean isLoggedIn(){
        return loggedIn;
    }

    public void setLoggedIn(boolean b) {
        loggedIn = b;
    }

}
