package com.markit.markit;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.support.v7.widget.Toolbar;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;
import com.Markit.android.R;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.google.firebase.auth.FirebaseAuth;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.Map;

public class MainActivity extends AppCompatActivity {
    private FirebaseAuth mAuth;
    private EditText emailView;
    private EditText passwordView;
    private EditText confirmPasswordView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Firebase.setAndroidContext(this);
        emailView = (EditText) findViewById(R.id.email);
        passwordView = (EditText) findViewById(R.id.password);
        confirmPasswordView = (EditText) findViewById(R.id.password2);
        profileClick();



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
            userRef.createUser(email,password, new Firebase.ValueResultHandler<Map<String, Object>>(){
                @Override
                public void onSuccess(Map<String, Object> result) {
                    Toast.makeText(MainActivity.this, "Account successfully registered", Toast.LENGTH_LONG).show();
                    startActivity(new Intent(MainActivity.this, LoginActivity.class));
                }

                @Override
                public void onError(FirebaseError firebaseError) {
                    Toast.makeText(MainActivity.this, firebaseError.toString(), Toast.LENGTH_LONG).show();
                }
            });


        }

    }

    private boolean isEmailValid(String email) {
        return email.contains("@") && email.contains(".edu");
    }

    private boolean isPasswordValid(String password) {
        return password.length() > 4;
    }
    private boolean passwordMatch(String password, String confirmedPassword) {
        return password.equals(confirmedPassword);
    }
}
