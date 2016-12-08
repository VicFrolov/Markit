package com.markit.android;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by annagotsis on 12/7/16.
 */

public class NewConversationActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        // Toolbar toolbar = (Toolbar) findViewById(R.id.newMessage);
        // toolbar.setTitle("New Conversation");
        // setSupportActionBar(toolbar);

        //RecyclerView recyclerView = (RecyclerView) findViewById(R.id.messagesRecyclerView);

        //ContactAdapter contactAdapter = new ContactAdapter(dummyContacts(), getApplicationContext());
        //recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));

        //recyclerView.setAdapter(contactAdapter);
    }

}