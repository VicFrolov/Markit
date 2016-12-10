package com.markit.android;

import android.app.DialogFragment;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.provider.Settings;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.MultiAutoCompleteTextView;

import com.firebase.client.Firebase;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.PropertyName;
import com.google.firebase.database.ValueEventListener;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Created by Joseph on 11/19/2016.
 */

public class NewTagSetDialog extends DialogFragment {

    private ArrayList<String> tagsList = new ArrayList<>();
    DatabaseReference mdatabase;
    FirebaseUser user;
    DatabaseReference tagListRef;
    protected static String tagSetTitle;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.new_tag_set_dialog, container, false);
        mdatabase = FirebaseDatabase.getInstance().getReference();
        user = FirebaseAuth.getInstance().getCurrentUser();
        System.out.println(user.getUid());
        tagListRef = mdatabase.child("users").child(user.getUid()).child("tagslist");
        final MultiAutoCompleteTextView tagInput = (MultiAutoCompleteTextView) view.findViewById(R.id.tagInput);
        final MultiAutoCompleteTextView itemTitle = (MultiAutoCompleteTextView) view.findViewById(R.id.itemTitle);

        mdatabase.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                DataSnapshot tags = dataSnapshot.child("tags");

                for(DataSnapshot tagShot : tags.getChildren()) {
                    if (!tagsList.contains(tagShot.getKey())) {

                        tagsList.add(tagShot.getKey());
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                throw databaseError.toException();
            }
        });


        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_dropdown_item_1line, tagsList);

        tagInput.setAdapter(adapter);
        tagInput.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());

        Button saveButton = (Button) view.findViewById(R.id.save_tags);
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String inputValue = tagInput.getText().toString();
                String[] tagsResult1 = inputValue.split(", ");
                tagSetTitle = itemTitle.getText().toString();
                ArrayList<String> tagsResult2 = new ArrayList<String>(Arrays.asList(tagsResult1));
                //tagsResult[tagsResult.length] = tagSetTitle;
                tagListRef.child(tagSetTitle).setValue(tagsResult2);
                Profile.inputTags.add(tagsResult1);
                for(int i = 0; i < Profile.inputTags.size(); i++) {
                    System.out.println(Arrays.toString(Profile.inputTags.get(i)));
                }
                //Profile.inputTags = inputValue.split("\\s*(,|\\s)\\s*");
                dismiss();
            }
        });

        Button cancelButton = (Button) view.findViewById(R.id.cancel_tags);
        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dismiss();
            }
        });



        return view;
    }
}

