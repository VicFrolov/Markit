package com.markit.android;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;
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
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        mAuth = FirebaseAuth.getInstance();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Firebase.setAndroidContext(this);
        emailView = (EditText) findViewById(R.id.email);
        passwordView = (EditText) findViewById(R.id.password);
        confirmPasswordView = (EditText) findViewById(R.id.password2);
        profileClick();

        //Firebase boiler plate code
        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                if (user != null) {
                    // User is signed in

                } else {
                    // User is signed out
                    //Log.d(TAG, "onAuthStateChanged:signed_out");
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
        Firebase userRef = new  Firebase("http://markit-80192.firebaseio.com");
        String email = emailView.getText().toString();
        String password = passwordView.getText().toString();
        String confirmPassword = confirmPasswordView.getText().toString();
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
            //If there was an error. Probably going to focusview on the problem.
            emailView.requestFocus();
        } else {
          //Attempt to register account

            //Toast.makeText(MainActivity.this, "Got to the else condition", Toast.LENGTH_LONG).show();
            mAuth.createUserWithEmailAndPassword(email, password)
                    .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(Task<AuthResult> task) {


                            // If sign in fails, display a message to the user. If sign in succeeds
                            // the auth state listener will be notified and logic to handle the
                            // signed in user can be handled in the listener.
                            if (!task.isSuccessful()) {
                                Toast.makeText(MainActivity.this, task.getException().getMessage(),
                                        Toast.LENGTH_SHORT).show();
                            } else{
                                Toast.makeText(MainActivity.this, "Account Successfully Registered", Toast.LENGTH_LONG).show();
                                startActivity(new Intent(MainActivity.this, LoginActivity.class));
                            }

                            // ...
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
