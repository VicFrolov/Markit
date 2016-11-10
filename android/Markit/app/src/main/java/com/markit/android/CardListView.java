import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.firebase.client.core.Context;
import com.markit.android.RecyclerAdapter;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class CardListView extends AppCompatActivity {
    private ArrayList<Item> items = new ArrayList<>();
    private DatabaseReference itemDatabase;
    private static RecyclerView.Adapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    static View.OnClickListener myOnClickListener;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_card_list_view);
        RecyclerView cardList = (RecyclerView) findViewById(R.id.card_list_view);
        LinearLayoutManager layoutManager = new LinearLayoutManager(context);
        cardList.setLayoutManager(layoutManager);

        myOnClickListener = new MyOnClickListener(this);

        itemDatabase = FirebaseDatabase.getInstance().getReference().child("itemsByHub");

        DatabaseReference ref = FirebaseDatabase.getInstance().getReference().child("itemsByHub");
        ValueEventListener itemListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for (DataSnapshot items : dataSnapshot.child("Loyola Marymount University").getChildren()) {
                    String title = (String) items.child("title").getValue();
                    String price = (String) items.child("price").getValue();
                    String username = (String) items.child("username").getValue();
                }
            }

            ImageView photo = (ImageView) findViewById(R.id.photo);
            TextView title = (TextView) findViewById(R.id.title);
            TextView price = (TextView) findViewById(R.id.price);
            TextView username = (TextView) findViewById(R.id.username);

        }
        RecyclerAdapter recyclerAdapter = new RecyclerAdapter(CardListView.this, items);
        cardList = (RecyclerView) findViewById(R.id.card_view);
        cardList.setAdapter(recyclerAdapter);


    }

    public static class MyOnClickListener implements View.OnClickListener {
        private final Context context;

        private MyOnClickListener(Context context) {
            this.context = context;
        }


            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
    }
    itemDatabase.addListenerForSingleValueEvent(itemListener);

}
