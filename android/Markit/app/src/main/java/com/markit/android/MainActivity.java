package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import com.google.firebase.auth.UserProfileChangeRequest;
import com.markit.android.*;
import com.firebase.client.Firebase;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.AuthResult;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

public class MainActivity extends AppCompatActivity {
    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private EditText emailView;
    private EditText passwordView;
    private EditText confirmPasswordView;
    private EditText displayNameView;
    private String displayName;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        mAuth = FirebaseAuth.getInstance();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Firebase.setAndroidContext(this);
        emailView = (EditText) findViewById(R.id.email);
        passwordView = (EditText) findViewById(R.id.password);
        confirmPasswordView = (EditText) findViewById(R.id.password2);
        displayNameView = (EditText) findViewById(R.id.displayName);
        profileClick();
        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                if (user != null) {
                    //startActivity(new Intent(LoginActivity.this, Profile.class));
                    UserProfileChangeRequest update = new UserProfileChangeRequest.Builder().setDisplayName(displayName).build();
                    user.updateProfile(update).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {
                            if (task.isSuccessful()) {
                                String text  = "Account Registered " + displayName;
                                //Toast.makeText(MainActivity.this, text, Toast.LENGTH_LONG).show();
                            }
                        }
                    });
                    startActivity(new Intent(MainActivity.this, Registration2Activity.class));

                }
            }
        };

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

    private void profileClick(){
        Button profileButton = (Button) findViewById(R.id.profile_button);
        profileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptRegister();
            }
        });
    }

    private void attemptRegister() {
        String email = emailView.getText().toString();
        String password = passwordView.getText().toString();
        String confirmPassword = confirmPasswordView.getText().toString();
        displayName = displayNameView.getText().toString();
        boolean cancel = false;

        if (!isEmailValid(email)) {
            emailView.setError("Please enter in a valid .edu email");
            cancel = true;
        }

        if(!isPasswordValid(password)) {
            passwordView.setError("Your password sucks enter a better one");
            cancel = true;
        }

        if(!passwordMatch(password, confirmPassword)) {
            passwordView.setError("Your passwords do not match");
            cancel = true;
        }

        if (cancel) {
            emailView.requestFocus();
        } else {
          //Attempt to register account


            mAuth.createUserWithEmailAndPassword(email, password)
                    .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(Task<AuthResult> task) {



                            if (!task.isSuccessful()) {
                                Toast.makeText(MainActivity.this, task.getException().getMessage(),
                                        Toast.LENGTH_SHORT).show();
                            } else{


                            }

                        }
                    });


        }

    }

    private boolean isEmailValid(String email) {
        return email.contains("@") && email.contains(".edu");
    }

    private boolean isPasswordValid(String password) {
        return password.length() > 5;
    }
    private boolean passwordMatch(String password, String confirmedPassword) {
        return password.equals(confirmedPassword);
    }
}
