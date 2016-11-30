package com.markit.android;

import android.annotation.TargetApi;
import android.content.Intent;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.firebase.client.Firebase;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.UserProfileChangeRequest;
import com.google.firebase.auth.api.model.StringList;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.IgnoreExtraProperties;

public class Registration2Activity extends AppCompatActivity {
    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private String uid;
    private EditText firstNameView;
    private String firstName;
    private EditText lastNameView;
    private String lastName;
    private String favorites;
    private AutoCompleteTextView hubView;
    private String hub;
    private Button finishRegistrationView;
    private DatabaseReference mDatabase;
    private String username;
    private String email;
    private boolean IsconfigChange ;

    @IgnoreExtraProperties
    public class User {
        public String firstName;
        public String lastName;
        public String hub;
        public String username;
        public String email;
        public String favorites;

        public User(){
            firstName = "";
            lastName = "";
            username = "";
            hub = "";
            email = "";
            favorites = "";
        }

        public User(String firstname, String lastname, String username, String email, String hub, String favorites) {
            firstName = firstname;
            lastName = lastname;
            username = this.username;
            email = this.email;
            hub = this.hub;
            favorites = this.favorites;

        }
    }
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
        firstNameView = (EditText)findViewById(R.id.firstName);
        lastNameView = (EditText)findViewById(R.id.lastName);
        hubView = (AutoCompleteTextView)findViewById(R.id.hub);
        FirebaseUser fUser = FirebaseAuth.getInstance().getCurrentUser();
        String uid = fUser.getUid();
        String displayName = fUser.getDisplayName();
        String email = fUser.getEmail();
        //String favorites = fUser.getFavorites();
        postUserInfo(uid,displayName,email,favorites);
    }



    public void postUserInfo(final String uid, final String username, final String email, final String favorites) {
        Button finishRegistration = (Button) findViewById(R.id.finishRegistration);
        finishRegistration.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mDatabase = FirebaseDatabase.getInstance().getReference();
                User user = new User(firstName,lastName,username,email,hub,favorites);
                firstName = firstNameView.getText().toString();
                lastName = lastNameView.getText().toString();
                hub = hubView.getText().toString();
                //mDatabase.child("usernames").child(uid).setValue(user);
                mDatabase.child("users").child(uid).child("firstName").setValue(firstName);
                mDatabase.child("users").child(uid).child("lastName").setValue(lastName);
                mDatabase.child("users").child(uid).child("userHub").setValue(hub);
                mDatabase.child("users").child(uid).child("email").setValue(email);
                mDatabase.child("users").child(uid).child("username").setValue(username);
                mDatabase.child("users").child(uid).child("favorites").setValue(favorites);
                startActivity(new Intent(Registration2Activity.this,Profile.class));
            }
        });
    }
}
