package com.markit.android.profile.files;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.markit.android.CardViewActivity;
import com.markit.android.ConversationView;
import com.markit.android.FavoritesListView;
import com.markit.android.R;
import com.markit.android.WatchListFragment;
import com.markit.android.base.files.BaseActivity;
import com.markit.android.dummy.DummyContent.DummyItem;
import com.markit.android.login.files.LoginActivity;
import com.markit.android.newlisting.files.NewListing;

import java.util.ArrayList;

public class Profile extends BaseActivity implements WatchListFragment.OnFragmentInteractionListener,ProfilePageFragment.OnFragmentInteractionListener, TagsFragment.OnListFragmentInteractionListener {

    public void onListFragmentInteraction(Object d) {
//        TODO figure out what the fuck this thing is supposed to do
    }

    public void onListFragmentInteraction(DummyItem d) {
        // TODO make sure each of the datatypes being passed into each of these fragment interaciton methods is different or they will get confused with one antoher
    }

    public void onFragmentInteraction(Uri uri) {
//        TODO also figure out what the fuck this thing is supposed to do
    }

    /**
     * The {@link android.support.v4.view.PagerAdapter} that will provide
     * fragments for each of the sections. We use a
     * {@link FragmentPagerAdapter} derivative, which will keep every
     * loaded fragment in memory. If this becomes too memory intensive, it
     * may be best to switch to a
     * {@link android.support.v4.app.FragmentStatePagerAdapter}.
     */
    private SectionsPagerAdapter mSectionsPagerAdapter;

    /**
     * The {@link ViewPager} that will host the section contents.
     */
    private ViewPager mViewPager;
    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private int currentPage;

    private DatabaseReference mdatabase;
    private DatabaseReference tags;
    private FirebaseUser user;

    //TODO use database instead of a created ArrayList here
    protected static ArrayList<TagListItem> inputTags = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        mdatabase = FirebaseDatabase.getInstance().getReference();
        user = FirebaseAuth.getInstance().getCurrentUser();
        tags = mdatabase.child("users").child(user.getUid()).child("tagslist");

        tags.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                DataSnapshot tags = dataSnapshot;
                ArrayList<TagListItem> newTagList = new ArrayList<TagListItem>();
                for (DataSnapshot tagShot : tags.getChildren()) {
                    String key = tagShot.getKey();
                    Object value = tagShot.getValue();
                    TagListItem newItem = new TagListItem(key, value);
                    newTagList.add(newItem);
                }
                inputTags = newTagList;
            }
            @Override
            public void onCancelled(DatabaseError databaseError) {
                System.out.print("HELLLL NAWW!");
                throw databaseError.toException();
            }
        });

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = super.getDrawerLayout();
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_drawer);
        navigationView.setNavigationItemSelectedListener(this);


        // Create the adapter that will return a fragment for each of the three
        // primary sections of the activity.
        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        FloatingActionButton notificationsButton = (FloatingActionButton) findViewById(R.id.profileNotificationsButton);
        notificationsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Profile.super.openNavDrawer();
            }
        });


        mAuth = FirebaseAuth.getInstance();
        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                if (user != null) {
                    // User is signed in
                    Toast.makeText(Profile.this, "You should be logged in", Toast.LENGTH_LONG).show();
                    //Toast.makeText(Profile.this, user.getDisplayName(), Toast.LENGTH_LONG).show();
                    //Toast.makeText(Profile.this, user.getEmail(), Toast.LENGTH_LONG).show();

                } else {
                    Toast.makeText(Profile.this, "You are not logged in", Toast.LENGTH_LONG).show();
                    startActivity(new Intent(Profile.this, LoginActivity.class));

                }
                // ...
            }
        };


        // ...
    }

    @Override
    public void onStart() {
        super.onStart();
        mAuth.addAuthStateListener(mAuthListener);
    }

    @Override
    public void onStop() {
        super.onStop();
        if (mAuthListener != null) {
            mAuth.removeAuthStateListener(mAuthListener);
        }


    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_profile, menu);
        return true;
    }

    public String[] addTagSet() {
//TODO bring up a dialog modal and parse user input into individual tag strings
        NewTagSetDialog dialog = new NewTagSetDialog();
        dialog.show(getFragmentManager(), "NewTagSet");
        return null;
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
        if (id == R.id.nav_card_view) {
            startActivity(new Intent(Profile.this, CardViewActivity.class));
            return true;
        }
        if (id == R.id.sign_out) {
            FirebaseAuth.getInstance().signOut();
        }
        if (id == R.id.new_tag_set) {
            addTagSet();
        }
        if (id == R.id.watching) {
            startActivity(new Intent(Profile.this, FavoritesListView.class));
            return true;
        }
        if (id == R.id.chat) {
            startActivity(new Intent(Profile.this, ConversationView.class));
            return true;
        }
        if (id == R.id.new_listing) {
            startActivity(new Intent(Profile.this, NewListing.class));
            return true;
        }

            return super.onOptionsItemSelected(item);

    }


    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {
        /**
         * The fragment argument representing the section number for this
         * fragment.
         */
        private Button signOut;
        private static final String ARG_SECTION_NUMBER = "section_number";

        public PlaceholderFragment() {
        }

        /**
         * Returns a new instance of this fragment for the given section
         * number.
         */
        public static PlaceholderFragment newInstance(int sectionNumber) {
            PlaceholderFragment fragment = new PlaceholderFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_profile, container, false);
            TextView textView = (TextView) rootView.findViewById(R.id.section_label);
            signOut = (Button) rootView.findViewById(R.id.signOutButton);

            signOut.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    FirebaseAuth.getInstance().signOut();
                }
            });

//            FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
//            try {
//                textView.setText(user.getDisplayName());
//            } catch (Exception NullPointerException) {
//
//            }
            textView.setText(getString(R.string.section_format, getArguments().getInt(ARG_SECTION_NUMBER)));

            return rootView;
        }
    }

    /**
     * A {@link FragmentPagerAdapter} that returns a fragment corresponding to
     * one of the sections/tabs/pages.
     */
    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            // getItem is called to instantiate the fragment for the given page.
            // Return a PlaceholderFragment (defined as a static inner class below).

            currentPage = position;
            System.out.println(position);
            System.out.println(currentPage);

            switch (position) {
                case 0:
                    return ProfilePageFragment.newInstance();
                case 1:
                    return WatchListFragment.newInstance(1);
                case 2:
                    int COLUMN_COUNT = 1;
                    return TagsFragment.newInstance(COLUMN_COUNT);
            }
            return null;
//            return PlaceholderFragment.newInstance(position + 1);
        }

        @Override
        public int getCount() {
            // Show 3 total pages.
            return 3;
        }

        @Override
        public CharSequence getPageTitle(int position) {
            switch (position) {
                case 0:
                    return "My Profile";
                case 1:
                    return "Watch List";
                case 2:
                    return "Tags";
            }
            return null;
        }

    }


}
