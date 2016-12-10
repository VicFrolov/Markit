package com.markit.android.login.files;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.firebase.client.Firebase;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.markit.android.R;
import com.markit.android.User;
import com.markit.android.profile.files.Profile;

import java.util.ArrayList;
import java.util.Date;

public class Registration2Activity extends AppCompatActivity {
    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private String uid;
    private EditText firstNameView;
    private String firstName;
    private EditText lastNameView;
    private String lastName;
    private Spinner dropdown;
    private ArrayList<String> favorites;
    private AutoCompleteTextView hubView;
    private String hub;
    private Button finishRegistrationView;
    private DatabaseReference mDatabase;
    private String username;
    private String email;
    private boolean IsconfigChange ;
    private DatabaseReference hubList;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mAuth = FirebaseAuth.getInstance();
        setContentView(R.layout.activity_registration2);
        Firebase.setAndroidContext(this);
        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                if (user != null) {
                    //uid = user.getUid();
                    //String text = "The user id for this user is " + uid;
                    //Toast.makeText(Registration2Activity.this, text, Toast.LENGTH_LONG).show();
                    username= user.getDisplayName();
                    //email = user.getEmail();

                } else {
                    startActivity(new Intent(Registration2Activity.this, LoginActivity.class));
                }
            }
        };
        hubList = FirebaseDatabase.getInstance().getReference().child("hubs");
        ValueEventListener hubEventListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                ArrayList<String> hubList = new ArrayList<String>();
                for(DataSnapshot hubs :dataSnapshot.getChildren()) {
                    hubList.add(hubs.getKey());
                }
                dropdown = (Spinner) findViewById(R.id.hubSpinner);
                ArrayAdapter<String> adapter = new ArrayAdapter<String>(Registration2Activity.this, android.R.layout.simple_spinner_dropdown_item, hubList);
                dropdown.setAdapter(adapter);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        };
        hubList.addListenerForSingleValueEvent(hubEventListener);

        firstNameView = (EditText)findViewById(R.id.firstName);
        lastNameView = (EditText)findViewById(R.id.lastName);
        FirebaseUser fUser = FirebaseAuth.getInstance().getCurrentUser();
        String uid = fUser.getUid();
        String displayName = fUser.getDisplayName();
        String email = fUser.getEmail();
        //String favorites = fUser.getFavorites();
        favorites = new ArrayList<String>();
        postUserInfo(uid,displayName,email,favorites);
    }



    public void postUserInfo(final String uid, final String username, final String email, final ArrayList<String> favorites) {
        Button finishRegistration = (Button) findViewById(R.id.finishRegistration);
        finishRegistration.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mDatabase = FirebaseDatabase.getInstance().getReference();

                //User user = new User(firstName,lastName,username,email,hub,favorites);
                firstName = firstNameView.getText().toString();
                lastName = lastNameView.getText().toString();
                hub = dropdown.getSelectedItem().toString();
                ArrayList<String> paymentPreference = new ArrayList<String>();
                paymentPreference.add("Cash");
                String date = new Date().toString();
                favorites.add("None");
                User user = new User(email,firstName,lastName,hub,username,uid,paymentPreference,date,favorites);
                mDatabase.child("users").child(uid).setValue(user);
                startActivity(new Intent(Registration2Activity.this,Profile.class));
            }
        });
    }
}