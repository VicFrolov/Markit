package com.markit.android;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

public class NewListing extends AppCompatActivity {
    final int CAMERA_REQUEST = 1888;
    TextView mTitleButton;
    TextView mDescriptionButton;
    TextView mPriceButton;
    TextView mImageButton;
    static final String TAGS = "mikesmessage";

    EditText mTitleEdit;
    EditText mDescriptionEdit;
    EditText mPriceEdit;
    ImageView mImage;
    //Matrix mImageMatrix;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_listing);

        mTitleButton = (TextView) findViewById(R.id.add_title_TV);
        mTitleEdit = (EditText) findViewById(R.id.add_title_ET);
        mDescriptionButton = (TextView) findViewById(R.id.add_description_TV);
        mDescriptionEdit = (EditText) findViewById(R.id.add_description_ET);
        mPriceButton = (TextView) findViewById(R.id.price_TV);
        mPriceEdit = (EditText) findViewById(R.id.price_ET);
        mImageButton = (TextView) findViewById(R.id.add_photo);
        mImage = (ImageView) findViewById(R.id.imageView);
        //mImageMatrix = new Matrix();
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

    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == CAMERA_REQUEST && resultCode == Activity.RESULT_OK) {
            Bitmap photo = (Bitmap) data.getExtras().get("data");
            mImage.setImageBitmap(photo);
//            mImage.setScaleType(ImageView.ScaleType.MATRIX);
//            mImageMatrix.postRotate(90);
//            mImage.setImageMatrix(mImageMatrix);
            mImageButton.setVisibility(View.INVISIBLE);
            mImage.setVisibility(View.VISIBLE);
        }
    }
}
