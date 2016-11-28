package com.markit.android;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.firebase.client.Firebase;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.io.ByteArrayOutputStream;

public class NewListing extends AppCompatActivity {
    final int CAMERA_REQUEST = 1888;
    Button mTitleButton;
    Button mDescriptionButton;
    Button mPriceButton;
    Button mImageButton;
    DatabaseReference mdatabase;

    StorageReference mstorageRef;
    FirebaseStorage mStorage;
    FirebaseUser user;
    String itemKey;

    static final String TAGS = "mikesMessage";

    EditText mTitleEdit;
    EditText mDescriptionEdit;
    EditText mPriceEdit;
    ImageView mImage;
    Button mPostButton;
    Bitmap mPhotoBitmap;
    //Matrix mImageMatrix;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_listing);

        Firebase.setAndroidContext(this);

        mdatabase = FirebaseDatabase.getInstance().getReference();
        user = FirebaseAuth.getInstance().getCurrentUser();
        mStorage = FirebaseStorage.getInstance();
        mstorageRef = mStorage.getReferenceFromUrl("gs://markit-80192.appspot.com/");
        //StorageReference itemsImageRef = mstorageRef.child("images/itemImages/");

        //mstorageRef.child("images/itemImages/" + uploadedFile.getlastimagesegment());

        //Log.i(TAGS, itemsImageRef.toString());

        mTitleButton = (Button) findViewById(R.id.add_title_TV);
        mTitleEdit = (EditText) findViewById(R.id.add_title_ET);
        mDescriptionButton = (Button) findViewById(R.id.add_description_TV);
        mDescriptionEdit = (EditText) findViewById(R.id.add_description_ET);
        mPriceButton = (Button) findViewById(R.id.price_TV);
        mPriceEdit = (EditText) findViewById(R.id.price_ET);
        mImageButton = (Button) findViewById(R.id.add_photo);
        mImage = (ImageView) findViewById(R.id.imageView);
        mPostButton = (Button) findViewById(R.id.post_listing);

        Log.i(TAGS, "onCreate");


        mImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(cameraIntent, CAMERA_REQUEST);
            }
        });

        mImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(cameraIntent, CAMERA_REQUEST);
            }
        });

        mTitleButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mTitleButton.setVisibility(View.INVISIBLE);
                mTitleEdit.setVisibility(View.VISIBLE);
            }
        });
        mTitleEdit.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (event.getAction() == KeyEvent.ACTION_UP) {
                    if (keyCode == KeyEvent.KEYCODE_DPAD_CENTER || keyCode == KeyEvent.KEYCODE_ENTER) {
                        mTitleButton.setText(mTitleEdit.getText().toString());
                        mTitleEdit.setVisibility(View.INVISIBLE);
                        mTitleButton.setVisibility(View.VISIBLE);
                        return true;
                    }
                }
                return false;
            }
        });

        mDescriptionButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mDescriptionButton.setVisibility(View.INVISIBLE);
                mDescriptionEdit.setVisibility(View.VISIBLE);
            }
        });
        mDescriptionEdit.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if(event.getAction() == KeyEvent.ACTION_UP) {
                    if(keyCode == KeyEvent.KEYCODE_DPAD_CENTER || keyCode == KeyEvent.KEYCODE_ENTER) {
                        mDescriptionButton.setText(mDescriptionEdit.getText().toString());
                        mDescriptionEdit.setVisibility(View.INVISIBLE);
                        mDescriptionButton.setVisibility(View.VISIBLE);
                        return true;
                    }
                }
                return false;
            }
        });

        mPriceButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mPriceButton.setVisibility(View.INVISIBLE);
                mPriceEdit.setVisibility(View.VISIBLE);
            }
        });
        mPriceEdit.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if(event.getAction() == KeyEvent.ACTION_UP) {
                    if(keyCode == KeyEvent.KEYCODE_DPAD_CENTER || keyCode == KeyEvent.KEYCODE_ENTER) {
                        mPriceButton.setText(mPriceEdit.getText().toString());
                        mPriceEdit.setVisibility(View.INVISIBLE);
                        mPriceButton.setVisibility(View.VISIBLE);
                        return true;
                    }
                }
                return false;
            }
        });

        mPostButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mTitleButton.getText().toString().equalsIgnoreCase("Add Title")) {
                    Toast.makeText(NewListing.this, "No Title Added", Toast.LENGTH_LONG).show();

                } else if (mPriceButton.getText().toString().equalsIgnoreCase("Price")) {
                    Toast.makeText(NewListing.this, "No Price Added", Toast.LENGTH_LONG).show();

                } else if (mDescriptionButton.getText().toString().equalsIgnoreCase("Add Description")) {
                    Toast.makeText(NewListing.this, "No Description Added", Toast.LENGTH_LONG).show();
                } else {
                    String title = mTitleButton.getText().toString();
                    String price = mPriceButton.getText().toString();
                    String description = mDescriptionButton.getText().toString();
                    String tags = "truck";
                    writeNewListing(title, price, description, user.getUid(), tags, "Loyola Marymount University");

                    if (mPhotoBitmap != null) {
                        StorageReference pictureRef = mstorageRef.child("images/itemImages/" + itemKey);
                        mImage.setDrawingCacheEnabled(true);
                        mImage.buildDrawingCache();
                        Bitmap bitmap = mImage.getDrawingCache();
                        ByteArrayOutputStream baos = new ByteArrayOutputStream();
                        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
                        byte[] data = baos.toByteArray();

                        UploadTask uploadTask = pictureRef.putBytes(data);
                        uploadTask.addOnFailureListener(new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                Toast.makeText(NewListing.this, "Could not upload to Database", Toast.LENGTH_LONG).show();
                            }
                        }).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                            @Override
                            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                                Uri downloadUrl = taskSnapshot.getDownloadUrl();
                            }
                        });
                    }

                }

            }
        });
    }

    //Constructor for a new listing, very simple right now.
    public class Listing {

        public String title;
        public String description;
        public String price;
        public String uID;
        public String tags;


        public Listing()   {
            //Default constructor for calls to DataSnapshot.getValue(User.class)
        }

        public Listing(String title, String price, String description, String uID, String tags) {
            this.title = title;
            this.price = price;
            this.description = description;
            this.uID = uID;
            this.tags = tags;
        }
    }

    // very ugly way of doing it but only way I could find to post to all three, would not let me push an object
    public void writeNewListing (String title, String price, String description, String uID, String tags, String hub) {
        Listing listing1 = new Listing(title, price, description, uID, tags);
        DatabaseReference myPostRef = mdatabase.child("items").push();
        String myPostKey = myPostRef.getKey();
        itemKey = myPostKey;
        mdatabase.child("items").child(myPostKey).child("title").setValue(listing1.title);
        mdatabase.child("items").child(myPostKey).child("description").setValue(listing1.description);
        mdatabase.child("items").child(myPostKey).child("tags").setValue(listing1.tags);
        mdatabase.child("items").child(myPostKey).child("price").setValue(listing1.price);
        mdatabase.child("items").child(myPostKey).child("uid").setValue(listing1.uID);

        //myPostRef = mdatabase.child("itemsByHub").child(hub).push();
        //myPostKey = myPostRef.getKey();


        mdatabase.child("itemsByHub").child(hub).child(myPostKey).child("title").setValue(listing1.title);
        mdatabase.child("itemsByHub").child(hub).child(myPostKey).child("description").setValue(listing1.description);
        mdatabase.child("itemsByHub").child(hub).child(myPostKey).child("tags").setValue(listing1.tags);
        mdatabase.child("itemsByHub").child(hub).child(myPostKey).child("price").setValue(listing1.price);
        mdatabase.child("itemsByHub").child(hub).child(myPostKey).child("uid").setValue(listing1.uID);

        String myUserID = uID;

        mdatabase.child("itemsByUser").child(myUserID).child(myPostKey).child("title").setValue(listing1.title);
        mdatabase.child("itemsByUser").child(myUserID).child(myPostKey).child("description").setValue(listing1.description);
        mdatabase.child("itemsByUser").child(myUserID).child(myPostKey).child("tags").setValue(listing1.tags);
        mdatabase.child("itemsByUser").child(myUserID).child(myPostKey).child("price").setValue(listing1.price);
        mdatabase.child("itemsByUser").child(myUserID).child(myPostKey).child("uid").setValue(listing1.uID);




    }



    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == CAMERA_REQUEST && resultCode == Activity.RESULT_OK) {
            Bitmap photo = (Bitmap) data.getExtras().get("data");
            mImage.setImageBitmap(photo);
            mPhotoBitmap = photo;
            mImageButton.setVisibility(View.INVISIBLE);
            mImage.setVisibility(View.VISIBLE);
        }
    }

}
