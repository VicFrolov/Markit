package com.markit.android;

import android.app.DialogFragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.MultiAutoCompleteTextView;

/**
 * Created by Joseph on 11/19/2016.
 */

public class newTagSetDialog extends DialogFragment {

    private String[] tags;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        tags = new String[] {
          "table", "ball", "wax", "iPhone", "lamp", "book", "textbook", "miniFridge", "MacBook"
        };
        View view = inflater.inflate(R.layout.new_tag_set_dialog, container, false);
        final MultiAutoCompleteTextView tagInput = (MultiAutoCompleteTextView) view.findViewById(R.id.tagInput);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_dropdown_item_1line, tags);

        tagInput.setAdapter(adapter);
        tagInput.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());

        Button saveButton = (Button) view.findViewById(R.id.save_tags);
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String inputValue = tagInput.getText().toString();
                Profile.inputTags = inputValue.split("\\s*(,|\\s)\\s*");
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
