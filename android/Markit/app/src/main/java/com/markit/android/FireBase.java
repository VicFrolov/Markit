package com.markit.android;

import android.content.Context;
import android.support.annotation.NonNull;

import com.firebase.client.Firebase;

/**
 * Created by Anna Gotsis on 11/19/2016.
 */

public class FireBase {
    public static final String BASE_URL = "https://markit-80192.firebaseio.com/";
    public static final String FIRE_BASE_ITEM = "item";

    public static Firebase firebase;

    private FireBase() {

    }
    public static Firebase getInstance(@NonNull Context c) {
        Firebase.setAndroidContext(c);
        if (firebase == null) {
            firebase = new Firebase(BASE_URL).child(FIRE_BASE_ITEM);
        }
        return firebase;
    }
}
