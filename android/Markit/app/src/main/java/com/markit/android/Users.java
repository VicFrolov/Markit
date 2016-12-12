//package com.markit.android;
//
//import android.os.Parcel;
//import android.os.Parcelable;
//
///**
// * Created by annagotsis on 11/30/16.
// */
//
//public class Users implements Parcelable {
//    private String email;
//    private String firstName;
//    private String provider;
//    private String lastName;
//    //private String hub;
//    private String username;
//    private String mRecipientUid;
//    private String connection;
//    private String createdAt;
//
//    private String mCurrentUserName;
//    private String mCurrentUserUid;
//    private String mCurrentUserEmail;
//    private String mCurrentUserCreatedAt;
//
////    public User(String email, String firstName, String lastName, String hub, String username) {
////        this.email = email;
////        this.firstName = firstName;
////        this.lastName = lastName;
////        this.hub = hub;
////        this.username = username;
////    }
//
//    private Users(Parcel parcelIn) {
//
//        //Remember the order used to read data is the same used to write them
//        firstName=parcelIn.readString();
//        provider=parcelIn.readString();
//        email=parcelIn.readString();
//        createdAt=parcelIn.readString();
//        connection=parcelIn.readString();
//        //avatarId=parcelIn.readInt();
//        mRecipientUid=parcelIn.readString();
//        mCurrentUserName=parcelIn.readString();
//        mCurrentUserUid=parcelIn.readString();
//        mCurrentUserEmail=parcelIn.readString();
//        mCurrentUserCreatedAt=parcelIn.readString();
//
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getProvider() {
//        return provider;
//    }
//
//    public String getCreatedAt() {
//        return createdAt;
//    }
//
//    public String getConnection(){
//        return connection;
//    }
//
//    public String getRecipientUid(){
//        return mRecipientUid;
//    }
//
//    public void setRecipientUid(String givenUserUid){
//        mRecipientUid =givenUserUid;
//    }
//
////    public String getHub() {
////        return hub;
////    }
////
////    public void setHub(String hub) {
////        this.hub = hub;
////    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//
//    /*Current user (or sender) info*/
//    public void setCurrentUserName(String currentUserName){
//        mCurrentUserName=currentUserName;
//    }
//
//    public void setCurrentUserEmail(String currentUserEmail) {
//        mCurrentUserEmail = currentUserEmail;
//    }
//
//    public void setCurrentUserCreatedAt(String currentUserCreatedAt) {
//        mCurrentUserCreatedAt = currentUserCreatedAt;
//    }
//
//    public void setCurrentUserUid(String currentUserUid){
//        mCurrentUserUid=currentUserUid;
//    }
//
//    public String getCurrentUserName(){
//        return mCurrentUserName;
//    }
//
//    public String getCurrentUserEmail() {
//        //Log.e("current user email  ", mCurrentUserEmail);
//        return mCurrentUserEmail;
//    }
//
//    public String getCurrentUserCreatedAt() {
//        return mCurrentUserCreatedAt;
//    }
//
//    public String getCurrentUserUid(){
//        return mCurrentUserUid;
//    }
//
//
//    /*create chat endpoint for firebase*/
//    public String getChatRef(){
//        return createUniqueChatRef();
//    }
//
//
//
//    private String createUniqueChatRef(){
//        String uniqueChatRef="";
//        if(createdAtCurrentUser()>createdAtRecipient()){
//            uniqueChatRef=cleanEmailAddress(getCurrentUserEmail())+"-"+cleanEmailAddress(getEmail());
//        }else {
//
//            uniqueChatRef=cleanEmailAddress(getEmail())+"-"+cleanEmailAddress(getCurrentUserEmail());
//        }
//        return uniqueChatRef;
//    }
//
//    private long createdAtCurrentUser(){
//        return Long.parseLong(getCurrentUserCreatedAt());
//    }
//
//    private long createdAtRecipient(){
//        return Long.parseLong(getCreatedAt());
//    }
//
//    private String cleanEmailAddress(String email){
//
//        //replace dot with comma since firebase does not allow dot
//        return email.replace(".","-");
//
//    }
//
//
//    /*Parcelable*/
//
//    @Override
//    public int describeContents() {
//        return 0; //ignore
//    }
//
//    @Override
//    public void writeToParcel(Parcel parcel, int i) {
//
//        //Store information using parcel method
//        //the order for writing and reading must be the same
//        parcel.writeString(firstName);
//        parcel.writeString(provider);
//        parcel.writeString(email);
//        parcel.writeString(createdAt);
//        parcel.writeString(connection);
//        //parcel.writeInt(avatarId);
//        parcel.writeString(mRecipientUid);
//        parcel.writeString(mCurrentUserName);
//        parcel.writeString(mCurrentUserUid);
//        parcel.writeString(mCurrentUserEmail);
//        parcel.writeString(mCurrentUserCreatedAt);
//
//    }
//
//
//
//    public static final Creator<Users> CREATOR= new Creator<Users>() {
//        @Override
//        public Users createFromParcel(Parcel parcel) {
//            return new Users(parcel);
//        }
//
//        @Override
//        public Users[] newArray(int size) {
//            return new Users[size];
//        }
//    };
//}