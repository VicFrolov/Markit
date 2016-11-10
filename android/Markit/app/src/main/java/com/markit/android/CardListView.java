import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;


public class CardListView extends AppCompatActivity {
    DatabaseReference db;
    FirebaseHelper helper;
    Adapter adapter;
    RecyclerView rv;
    EditText titleEditText;
    EditText priceEditText;
    EditText uidEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_card_view);
        //Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        //setSupportActionBar(toolbar);
        
        rv = (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));
        
        db = FirebaseDatabase.getInstance().getReference();
        helper = new FirebaseHelper(db);
        
        adapter = new RecyclerAdapter(this, helper.retrieve());
        rv.setAdapter(adapter);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayInputDialog();
            }
        });
    }

    private void displayInputDialog()
    {
        Dialog d = new Dialog(this);
        d.setTitle("Save To Firebase");
        d.setContentView(R.layout.input_dialog);
       	titleEditText= (EditText) d.findViewById(R.id.titleEditText);
        priceEditText= (EditText) d.findViewById(R.id.priceEditText);
        uidEditText= (EditText) d.findViewById(R.id.uidEditText);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);
        //SAVE
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //GET DATA
                String title = titleEditText.getText().toString();
                String price = priceEditText.getText().toString();
                String uid = uidEditText.getText().toString();
                //SET DATA
                Item i = new Item();
                i.setTitle(title);
                i.setPrice(price);
                i.setuid(uid);
                //SIMPLE VALIDATION
                if(title != null && title.length()>0)
                {
                    //THEN SAVE
                    if(helper.save(i))
                    {
                        //IF SAVED CLEAR EDITXT
                        titleEditText.setText("");
                        priceEditText.setText("");
                        uidEditText.setText("");
                        adapter = new RecyclerAdapter(MainActivity.this, helper.retrieve());
                        rv.setAdapter(adapter);
                    }
                }else
                {
                    Toast.makeText(MainActivity.this, "Name Must Not Be Empty", Toast.LENGTH_SHORT).show();
                }
            }
        });
        d.show();
    }
}
