package com.markit.android.profile.files;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.markit.android.MyItemsRecyclerViewAdapter;
import com.markit.android.R;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link ProfilePageFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link ProfilePageFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ProfilePageFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
//    private static final String ARG_PARAM1 = "param1";
//    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnListFragmentInteractionListener mListener;
    protected static MyItemsRecyclerViewAdapter iAdapter;

    public ProfilePageFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment ProfilePageFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static ProfilePageFragment newInstance() {
        ProfilePageFragment fragment = new ProfilePageFragment();
        Bundle args = new Bundle();
//        args.putString(ARG_PARAM1, param1);
//        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        System.out.print("new instance baby!");
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
//            mParam1 = getArguments().getString(ARG_PARAM1);
//            mParam2 = getArguments().getString(ARG_PARAM2);
                System.out.print("ProfileFragement Start ");
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile_page, container, false);
        System.out.print("Help! Someone HELP!");
        RecyclerView recyclerView = (RecyclerView)  view.findViewById(R.id.my_items);
//        TODO this if statement is kinda pointless, but we'll address that later
        if (recyclerView instanceof RecyclerView) {
            Context context = view.getContext();
//            RecyclerView recyclerView = (RecyclerView) view;
            // TODO: add compatability for multiple columns
            recyclerView.setLayoutManager(new LinearLayoutManager(context));

            this.iAdapter = new MyItemsRecyclerViewAdapter(Profile.items, mListener);
            recyclerView.setAdapter(iAdapter);
        }
        return inflater.inflate(R.layout.fragment_profile_page, container, false);
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onListFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentInteraction(Object o);
    }
}






//package com.markit.android;
//
//import android.content.Context;
//import android.content.Intent;
//import android.net.Uri;
//import android.os.Bundle;
//import android.support.v4.app.Fragment;
//import android.support.v7.widget.LinearLayoutManager;
//import android.support.v7.widget.RecyclerView;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//import android.graphics.drawable.Drawable;
//import android.widget.ImageView;
//import android.widget.TextView;
//
//import com.firebase.ui.database.FirebaseRecyclerAdapter;
//import com.google.firebase.database.DatabaseReference;
//import com.google.firebase.database.FirebaseDatabase;
//import com.markit.android.R;
//import com.squareup.picasso.Picasso;
//
//import static com.markit.android.R.id.container;
//
///**
// * A simple {@link Fragment} subclass.
// * Activities that contain this fragment must implement the
// * {@link ProfilePageFragment.OnFragmentInteractionListener} interface
// * to handle interaction events.
// * Use the {@link ProfilePageFragment#newInstance} factory method to
// * create an instance of this fragment.
// */
//public class ProfilePageFragment extends Fragment {
//    // TODO: Rename parameter arguments, choose names that match
//    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
////    private static final String ARG_PARAM1 = "param1";
////    private static final String ARG_PARAM2 = "param2";
//
//    // TODO: Rename and change types of parameters
//    private String mParam1;
//    private String mParam2;
//
//    private OnFragmentInteractionListener mListener;
//
//    public ProfilePageFragment() {
//        // Required empty public constructor
//    }
//
//    /**
//     * Use this factory method to create a new instance of
//     * this fragment using the provided parameters.
//     *
//     * //@param param1 Parameter 1.
//     * @param //param2 Parameter 2.
//     * @return A new instance of fragment ProfilePageFragment.
//     */
//    // TODO: Rename and change types and number of parameters
//    public static ProfilePageFragment newInstance() {
//        ProfilePageFragment fragment = new ProfilePageFragment();
//        Bundle args = new Bundle();
////        args.putString(ARG_PARAM1, param1);
////        args.putString(ARG_PARAM2, param2);
//        fragment.setArguments(args);
//        return fragment;
//    }

//    private RecyclerView profileRecList;
//    private LinearLayoutManager llm;
//    private Context context;
//
//
//    FirebaseDatabase database = FirebaseDatabase.getInstance();
//    DatabaseReference mDatabaseReference = database.getReference().child("itemsByUser");

//    @Override
//    public void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        if (getArguments() != null) {
////            mParam1 = getArguments().getString(ARG_PARAM1);
////            mParam2 = getArguments().getString(ARG_PARAM2);
//        }
//    }
//
//    @Override
//    public View onCreateView(LayoutInflater inflater, ViewGroup container,
//                             Bundle savedInstanceState) {
//        // Inflate the layout for this fragment
//        View rootView = inflater.inflate(R.layout.fragment_profile_page, container, false);
//        //TextView profileName = (TextView) rootView.findViewById(R.id.profile_name);
//        return rootView;
//    }

//            profileRecList = (RecyclerView) findViewById(R.id.profileRecList);
//            if (profileRecList != null) {
//                profileRecList.setHasFixedSize(true);
//            }
//
//            llm = new LinearLayoutManager(this);
//            profileRecList.setLayoutManager(llm);
//
//            FirebaseRecyclerAdapter<ItemObject, ProfilePageFragment.CardViewHolder> adapter = new FirebaseRecyclerAdapter<ItemObject, ProfilePageFragment.CardViewHolder>(
//                    ItemObject.class, R.layout.fragment_profile_page, ProfilePageFragment.CardViewHolder.class, mDatabaseReference) {
//                @Override
//                public void populateViewHolder(ProfilePageFragment.CardViewHolder cardViewHolder, ItemObject model, int position) {
//                    cardViewHolder.title.setText(model.getTitle());
//
//                    final String itemID = model.getId();
//                    cardViewHolder.title.setOnClickListener(new View.OnClickListener() {
//                        @Override
//                        public void onClick(View view) {
//                            Intent itemDetail = new Intent(ProfilePageFragment.this, ItemDetail.class);
//                            //final String itemID = model.getItemID();
//                            itemDetail.putExtra("uid", itemID);
//                            ProfilePageFragment.this.startActivity(itemDetail);
//                        }
//                    });
//                    cardViewHolder.price.setText("$ " + model.getPrice());
//                    cardViewHolder.uid.setText(model.getUid());
//                    //cardViewHolder.id.setText(model.getId());
//                    //Picasso.with(context).load(model.getImageUrl()).into(cardViewHolder.photo);
//                }
//            };
//            profileRecList.setAdapter(adapter);
//        }
//    }
//
//    // TODO: Rename method, update argument and hook method into UI event
//    public void onButtonPressed(Uri uri) {
//        if (mListener != null) {
//            mListener.onFragmentInteraction(uri);
//        }
//    }
//
//    @Override
//    public void onAttach(Context context) {
//        super.onAttach(context);
//        if (context instanceof OnFragmentInteractionListener) {
//            mListener = (OnFragmentInteractionListener) context;
//        } else {
//            throw new RuntimeException(context.toString()
//                    + " must implement OnFragmentInteractionListener");
//        }
//    }
//
//    @Override
//    public void onDetach() {
//        super.onDetach();
//        mListener = null;
//    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
//    public interface OnFragmentInteractionListener {
//        // TODO: Update argument type and name
//        void onFragmentInteraction(Uri uri);
//    }
//
//    public static class CardViewHolder extends RecyclerView.ViewHolder {
//        TextView title;
//        TextView price;
//        TextView uid;
//        TextView id;
//        TextView tags;
//        ImageView photo;
//        Context context;
//
//        public CardViewHolder(View itemView) {
//            super(itemView);
//            context = itemView.getContext();
//            photo = (ImageView) itemView.findViewById(R.id.photo);
//            title = (TextView) itemView.findViewById(R.id.title);
//            price = (TextView) itemView.findViewById(R.id.price);
//            uid = (TextView) itemView.findViewById(R.id.username);
//            id = (TextView) itemView.findViewById(R.id.id);
//        }
//
//    }
//}
