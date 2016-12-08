//package com.markit.android;
//
///**
// * Created by annagotsis on 11/30/16.
// */
//
//import android.content.Context;
//import android.content.Intent;
//import android.graphics.Color;
//import android.graphics.drawable.Drawable;
//import android.support.v4.content.ContextCompat;
//import android.support.v7.widget.RecyclerView;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//import android.widget.ImageView;
//import android.widget.TextView;
//
//import java.util.List;
//
//
//public class UsersAdapter extends RecyclerView.Adapter<UsersAdapter.ViewHolderUsers> {
//
//    private List<User> listOfUsers;
//    private Context context;
//
//    //    private String mCurrentUserName;
////    private String mCurrentUserCreatedAt;
////
//    public UsersAdapter(Context context, List<User> listOfUsers) {
//        listOfUsers = listOfUsers;
//        context = context;
//    }
//
//    //
//    @Override
//    public ViewHolderUsers onCreateViewHolder(ViewGroup parent, int viewType) {
//        // Inflate layout for each row
//        return new ViewHolderUsers(context, LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_profile_page, parent, false));
//    }
//
//    @Override
//    public void onBindViewHolder(ViewHolderUsers holder, int position) {
////        holder.imageViewPicture.setImageBitmap();
//        holder.textViewContactName.setText(listOfContacts.get(position).contact_name);
//        //holder.textViewContactNumber.setText(listOfContacts.get(position).contact_number);
//    }
//
//    @Override
//    public int getItemCount() {
//        return listOfContacts.size();
//    }
//}
////
////    @Override
////    public void onBindViewHolder(ViewHolderUsers holder, int position) {
////
////        Users fireChatUser=mFireChatUsers.get(position);
////
////        // Set avatar
//////        int userAvatarId= ChatHelper.getDrawableAvatarId(fireChatUser.getAvatarId());
//////        Drawable  avatarDrawable= ContextCompat.getDrawable(mContext,userAvatarId);
//////        holder.getUserPhoto().setImageDrawable(avatarDrawable);
////
////        // Set username
////        holder.getUserFirstName().setText(fireChatUser.getFirstName());
////
////        // Set presence status
////        holder.getStatusConnection().setText(fireChatUser.getConnection());
////
////        // Set presence text color
////        if(fireChatUser.getConnection().equals(ReferenceUrl.KEY_ONLINE)) {
////            // Green color
////            holder.getStatusConnection().setTextColor(Color.parseColor("#00FF00"));
////        }else {
////            // Red color
////            holder.getStatusConnection().setTextColor(Color.parseColor("#FF0000"));
////        }
////
////    }
////
////    @Override
////    public int getItemCount() {
////        return mFireChatUsers.size();
////    }
////
////    public void refill(Users users) {
////
////        // Add each user and notify recyclerView about change
////        mFireChatUsers.add(users);
////        notifyDataSetChanged();
////    }
////
////    public void setNameAndCreatedAt(String userName, String createdAt) {
////
////        // Set current user name and time account created at
////        mCurrentUserName=userName;
////        mCurrentUserCreatedAt=createdAt;
////    }
////
////    public void changeUser(int index, Users user) {
////
////        // Handle change on each user and notify change
////        mFireChatUsers.set(index,user);
////        notifyDataSetChanged();
////    }
////
////
////
////    /* ViewHolder for RecyclerView */
////    public class ViewHolderUsers extends RecyclerView.ViewHolder implements View.OnClickListener{
////
////        private ImageView mUserPhoto; // User avatar
////        private TextView mUserFirstName; // User first name
////        private TextView mStatusConnection; // User presence
////        private Context mContextViewHolder;
////
////        public ViewHolderUsers(Context context, View itemView) {
////            super(itemView);
////            mUserPhoto=(ImageView)itemView.findViewById(R.id.profilePicture);
////            mUserFirstName=(TextView)itemView.findViewById(R.id.profile_name);
////            mStatusConnection=(TextView)itemView.findViewById(R.id.connectionStatus);
////            mContextViewHolder=context;
////
////            // Attach a click listener to the entire row view
////            itemView.setOnClickListener(this);
////        }
////
////        public ImageView getUserPhoto() {
////            return mUserPhoto;
////        }
////
////        public TextView getUserFirstName() {
////            return mUserFirstName;
////        }
////        public TextView getStatusConnection() {
////            return mStatusConnection;
////        }
////
////
////        @Override
////        public void onClick(View view) {
////
////            // Handle click on each row
////
////            int position=getLayoutPosition(); // Get row position
////
////            Users user=mFireChatUsers.get(position); // Get use object
////
////            // Provide current user username and time created at
////            user.setCurrentUserName(mCurrentUserName);
////            user.setCurrentUserCreatedAt(mCurrentUserCreatedAt);
////
////            // Create a chat activity
////            Intent chatIntent=new Intent(mContextViewHolder, MainChatActivity.class);
////
////            // Attach data to activity as a parcelable object
////            chatIntent.putExtra(ReferenceUrl.KEY_PASS_USERS_INFO,user);
////
////            // Start new activity
////            mContextViewHolder.startActivity(chatIntent);
////
////        }
////    }
////
////}