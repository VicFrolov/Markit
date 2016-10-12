package com.markit.android;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

public class MobileView extends AppCompatActivity {
    String[] mobileArray = {"Android","IPhone", "WindowsMobile", "Windows7","Mac OSX", "Ubuntu","WebOS"};
    private ListView listView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_view);

        ArrayAdapter adapter = new ArrayAdapter<String>(this, R.layout.activity_list_view, mobileArray);
        listView = (ListView) findViewById(R.id.mobile_list);
        listView.setAdapter(adapter);
    }
}
