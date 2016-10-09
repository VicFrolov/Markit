package com.markit.android;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
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

public class Registration2Activity extends AppCompatActivity {
    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private String uid;
    private EditText firstNameView;
    private String firstName;
    private EditText lastNameView;
    private String lastName;
    private AutoCompleteTextView hubView;
    private String hub;
    private Button finishRegistrationView;


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
                    uid = user.getUid();

                } else {
                    startActivity(new Intent(Registration2Activity.this, LoginActivity.class));
                }
            }
        };
        firstNameView = (EditText)findViewById(R.id.firstName);
        lastNameView = (EditText)findViewById(R.id.lastName);
        hubView = (AutoCompleteTextView)findViewById(R.id.hub);
        firstName = firstNameView.getText().toString();
        lastName = lastNameView.getText().toString();
        hub = hubView.getText().toString();
        postUserInfo(firstName,lastName,hub,uid);
    }

    public void postUserInfo(String firstName, String lastName, String hub, String uid) {
        Button finishRegistration = (Button) findViewById(R.id.finishRegistration);
        finishRegistration.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                
            }
        });
    }
}
