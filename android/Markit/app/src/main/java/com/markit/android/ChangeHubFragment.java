package com.markit.android;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

/**
 * Created by pcross on 11/28/16.
 */

public class ChangeHubFragment extends DialogFragment {
    //private EditText mEditText;
    private Spinner dropdown;
    //private DatabaseReference hubList;
    private Button doneButton;

    public ChangeHubFragment () {

    }

    public interface ChangeHubListener {
        void onFinishHub(String hub);
    }

    public static ChangeHubFragment newInstance(String title) {
        ChangeHubFragment frag = new ChangeHubFragment();
        Bundle args = new Bundle();
        args.putString("title", title);
        frag.setArguments(args);
        return frag;
    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstance) {
        return inflater.inflate(R.layout.fragment_change_hub, container);
    }

    @Override
    public void onViewCreated(final View view, @Nullable Bundle savedInstance) {
        super.onViewCreated(view, savedInstance);
        // Get field from view
        //mEditText = (EditText) view.findViewById(R.id.txt_your_name);
        // Fetch arguments from bundle and set title
        String title = getArguments().getString("title", "Enter Name");
        getDialog().setTitle(title);
        // Show soft keyboard automatically and request focus to field
        //mEditText.requestFocus();
//        getDialog().getWindow().setSoftInputMode(
//                WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);


        DatabaseReference hubList = FirebaseDatabase.getInstance().getReference().child("hubs");
        ValueEventListener hubEventListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                ArrayList<String> hubList = new ArrayList<String>();
                for(DataSnapshot hubs :dataSnapshot.getChildren()) {
                    hubList.add(hubs.getKey());
                }
                dropdown = (Spinner) view.findViewById(R.id.hubSpinnerFragment);
                ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_spinner_dropdown_item, hubList);
                dropdown.setAdapter(adapter);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        };
        hubList.addListenerForSingleValueEvent(hubEventListener);
        doneButton = (Button) view.findViewById(R.id.changeHubFragmentDone);
        doneButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                ChangeHubListener listener = (ChangeHubListener) getActivity();
                listener.onFinishHub(dropdown.getSelectedItem().toString());
                dismiss();
            }
        });
    }


}
