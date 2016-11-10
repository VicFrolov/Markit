public class FirebaseHelper {

    DatabaseReference db;
    Boolean saved = null;
    ArrayList<Item> items = new ArrayList<>();

    public FirebaseHelper(DatabaseReference db) {
        this.db = db;
    }

//    public Boolean save(Item item) {
//        if(item = null) {
//            saved = false;
//        } else {
//            try {
//                db.child("Item").push().setValue(item);
//                saved = true;
//            } catch (DatabaseException e) {
//                e.printStackTrace();
//                saved = false;
//            }
//        }
//        return saved;
//    }

    private void fetchData(DataSnapshot dataSnapshot) {
        items.clear();

        for (DataSnapshot ds : dataSnapshot.getChildren()) {
            Item item = ds.getValue(Item.class);
            items.add(item);
        }
    }

    public ArrayList<Item> retrieve() {
        db.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot);
            }
            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot);
            }
            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }
        });
        return items;
    }
}

public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
    TextView title;
    TextView price;
    TextView uid;
    ImageView photo;

    ItemClickListener itemClickListener;

    public MyViewHolder(View itemView) {
        super(itemView);

        photo = (ImageView) itemView.findViewById(R.id.photo);
        title = (TextView) itemView.findViewById(R.id.title);
        price = (TextView) itemView.findViewById(R.id.price);
        uid = (TextView) itemView.findViewById(R.id.uid);

        itemView.setOnClickListener(this);
    }

    public void setItemClickListener(ItemClickListener itemClickListener) {
        this.itemClickListener = itemClickListener;
    }
    @Override

    public void onClick(View view) {
        this.itemClickListener.onItemClick (this.getLayoutPosition());
    }
}

public class RecyclerAdapter extends RecyclerView.Adapter<MyViewHolder> {
    Context context;
    ArrayList<Item> items;

    public RecyclerAdapter(Context context, ArrayList<Item> items) {
        this.context = context;
        this.items = items;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context).inflate(R.layout.card_list_view, parent, false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        final Item i = items.get(position);

        holder.title.setText(i.getTitle());
        holder.price.setPrice(i.getPrice());
        holder.uid.setuid(i.getuid());
        //holder.photo

        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(int pos) {
                openDetailActivity(i.getTitle(), i.getPrice(), i.getuid());
            }
        });
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    // private void openDetailActivity(String details) {
    // 	Intent x = new Intent(context, DetailActivity.class);

    // 	x.putExtra
    // }
}

public interface ItemClickListener {
    void onItemClick(int pos);
}
