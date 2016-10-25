# 6.0 Architectural Design Document

## 6.1 Introduction
This document provides a comprehensive architectural overview of the system, using a number of different architectural views to depict different aspects of the system. It is intended to capture and convey the significant architectural decisions which have been made on the system. This Software Architecture Document provides an architectural overview of the Markit (working title) app. 

MarkIt is a new application for selling and purchasing used goods within a college community. It aims to simplify the whole buying experience by implementing systems to seamlessly unify the buyer and seller on a college campus. The application will be available through three different platforms via Android, iOS, and web. Unlike similar applications like Ebay or craigslist, this service is aimed towards students in college. This adds a level of security and reliability since accounts will be tied to a valid .edu email address. The base functionality of this application will enable users to search, sell, purchase, and track goods for sale. One of the central features of our application will be our robust implementation of user profiles. On their profiles, users will be able to show what items they are interested in potentially buying. Additionally, users will be able to clearly indicate their preferred forms of payment (e.g., cash, check, or Venmo). Finally, and perhaps most importantly, user profiles will be tied to user reviews, which can be made by both buyers and sellers. This feature will allow users to gauge the trustworthiness of each other.

### 6.1.1 System Objectives
Markit is an application designed for college students to sell and buy used items from one another.  Buying these items will be at the convenience of the user.  Users will be able to search for items specific to a university and be able to maintain a list of items that they would like to buy, receiving notification once those items become available in the designated region.  Items will therefore be organized based on three parameters: where the item is being sold, what kind of item it is, and who is selling the item.  Organizing items in this way ensures that users will be able to easily find all items available in specific college communities, easily find a specific type of item, and easily maintain their own set of items they have posted for sale.

### 6.1.2 Hardware, Software, and Human Interfaces
* Hardware: Wireless networking, Hard-wired networking, GPS connection
* Software: Who even knows
* Human: Keyboard, Mouse, Touchscreen, Computer monitor

## 6.2 CSCI Descriptions
Application - Markit

* Settings (all activities extend this, it is an option over all activities)
    * getProfileActivity()
    * getNewListingActivity()
    * getProfileActivity().getProfilePageFragment().watchlist()
    * getProfileActivity().getProfilePageFragment().mytags()
    * changeHub()
    * getMessagesActivity()

* Notifications (also an option over all activities) 
    * getPostActivity()
    * getMessagesActivity()
        
* Main Activity - CardView        
    * displayPosts()
    * getPostActivity()
    * getLoginActivity()

* LogIn Activity  
    * logIn()
    * getRegistrationActivity()
    * getMainActivity()

* New Listing Activity 
   * postNewListing()
        
* Profile Activity
    * getProfilePageFragment().watchlist()
    * getProfilePageFragment().mytags()
                
* Profile Fragment - Watchlist            
    * getWatchlistItems();
                
* Profile Fragment - My Tags            
    * getMyTags()
        
* Post Activity 
    * addToWatchlist()
    * makeOffer()

* Firebase DataBase CSC   
    * All calls to this database are implemented within the functions displayed under each activity above. 

### 6.2.1 Concept of Execution

### 6.2.2 Interface Design
Below we will list all the components of our app that make up the user experience. That is, the links between activities in the app and all options presented at every activity. Here, you can get a sense of the flow of the app and how it will be used. 

#### 6.2.2.1 Interface Identification and Diagrams
![interface](images/interface.PNG)

#### 6.2.2.2 Project Interactions
This project's database management and retrieval is handled by Firebase. Everything is sent and stored in Firebase as a string of characters or as file. User information, posts, ratings, hubs, tags, listings, pricing, descriptions, and more are stored as JSON-like file structure with in Firebase. For example an item for sale is stored as:
```
title: "title",
description: "description",
hub: "hub",
price: num,
seller: UID,
image: image
```
 
Email and password authentication is also handled by Firebase's authentication system. Email and passwords have the following guidelines:
```
Email: A valid .edu email
Password: A string of characters with the minimum length of 8 characters
```

In addition Firebase also will handle our chat system within the application. Within Firebase all chats will be linked, stored, and retrieved.

## 6.3 Preliminary User Manual

__If using iOS or Android:__

1.  Go to the App/Google Play Store and download Markit. The application is free so there are no monetary transactions required. <br/>
2.  Open the application. First-time users will be greeted with a Login/Sign-up screen. There is an option to skip this step and go straight to Search for an item using the bottom tab bar. <br/>
3.  If you would like to post an item or message a seller of a particular item, login or sign-up for an account. If you would like to simply search for an item on sale, skip to #7. <br/>
4.  For first-time users, sign-up for a new account by tapping the Profile tab and then tapping the “Sign-up” button. Note: In order to use the application, you must sign-up with a valid .edu email address. <br/>
5.  To sign up for an account, tap on the Profile tab located at the bottom-right corner of the screen. <br/>
    I.   The next screen gives you the option to either login or sign-up for a new account. <br/>
    II.  Tap on the sign-up button. <br/>
    III. You will be prompted for your first and last name. Tap the > button after entering the required information. <br/>
    IV.  The next screen will prompt you to enter a username and password. Tap the > button after entering the required information. Note: If the texts that you enter are valid, there should be a check at the right side. You will be notified if the username is taken or invalid or taken to the Profile page if there are no errors. <br/>

6.  For returning users, login to your account by tapping the Profile tab and tapping the “Login” button. Enter your username and password for your account and tap the > button to login.
7.  To search for items, make sure that you are at the Search page. <br/>
    I.   Items on this page are shown using a map view, a card view, or a list view. In the map view, the items are shown based on the location of the user. In the card view, the items are shown as images that contain their price, the username of the person who posted them, and the item name as labeled by the seller. In the list view, the items are shown without the images. <br/>
    II   Tap on the "Sort by" button to arrange the items based on price, user rating, or location.
    III. Tap on the search box at the very top of the page to search by item name or by tags. <br/>
    IV.  Type a keyword such as “table”, “couch”, “phone”, etc. <br/>
    V.  The listings should change to reflect the items with names that match the keyword(s) either partially or in full. <br/>
    VI.   Tap on an item that interests you. You will see more information about the item such as a brief description or the location of the vendor. <br/>
    VII.  From here, add the item to your "watchlist" or message the vendor directly. <br/>

8.  To post an item, tap on the Post tab (located in the middle of the bottom tab bar). The next screen shows the items you have currently posted for sale along with items that have already been sold. <br/>
    I.   Tap on the + button at the top-right corner of the screen. The next page will take you to where you can make a new posting. <br/>
    II.  Tap on the “Add Photo” box. Here, you can use your photos library to select a picture for the object or take a picture using your camera. (Note: that you would have to give Markit access to use your camera). Tap on the “Submit” button to confirm. The box should update to show the picture you selected. <br/>
    III. Tap on the “Add Title” box. Here, you can add the name you want to call this item. Tap on the “Submit Title” button to confirm. <br/>
    IV.  Tap on the “Price” box. Here, you can add the price you want to sell your item for. Tap “Submit Price” button to confirm. <br/>
    V.   Tap on the “Add Description” box. Here, you can add a description of the item such as its color and dimensions. Tap “Submit Description” to confirm. <br/>
    VI.  Tap on the “Add Tags” box. Here, you can place up to five tags for your item so that other users looking for similar items can view your posting. Tap “Submit” to confirm. <br/>
    VII. By now, each of the boxes in this page should be filled out with the information you entered. Select the date that you wish to sell the item by. Tap on “Post” to post your item. <br/>

9.  To view or send messages, tap on the Messages tab at the bottom of the screen. This also allows a buyer to send an offer for the posted item. The seller will be notified of the message and will be able to accept or decline the offer. <br/>
10. To select up to three hubs or view listings from your selected hub(s), tap on the Hub tab at the bottom of the screen. <br/>
    I.  The page shows the top listings for the hub(s) and the items you’ve added to the "watchlist. <br/>
    II. Tap on the ![hub-swap-button](../iOS/Markit/Markit/Assets.xcassets/ic_swap_calls.imageset/ic_swap_calls_2x-1.png) button if you wish to view your current hubs or to edit them. <br/>

11. To edit your profile, tap the Profile tab located at the bottom of the screen. The profile page contains the profile picture, username, rating, preferred payment, and notifications. Tap on the Edit button at the upper-right corner of the screen. <br/>
    I.  At the Profile page, tap on Edit button at the upper-right corner of the screen. <br/>
    II. Items on the page will become editable. If you wish to change your profile picture, for example, tap on the current profile picture to change it. <br/>

__If using a web browser:__

1.  Open the browser of your choice and enter the following URL: (link_to_markit)
2.  If you would like to post an item or message a seller of a particular item, login or sign-up for an account. If you would like to simply search for an item on sale, skip to step #5.
3.  For first-time users, sign-up for a new account by clicking on the upper-right button labeled “Sign-up”. Note: In order to use the application, you must sign-up with a valid .edu email address. You would need to enter your first name, last name, username, and password.
4.  For returning users, login to your account by clicking on the upper-right button labeled “Login”. Enter your username and password for your account.
5.  At the home screen, type the keyword(s) of the item you want to look for at the search bar located at the top of the screen. The items with the keywords should appear in the screen along with the price, vendor, and the name of the item.
6.  Click on an item that interests you. This allows you to add the item to your "watchlist", or contact the seller through a direct message option.
7.  To post an item, click on your Profile at the top-right corner. A drop-down menu should appear. Click on Post an Item. You will be redirected to a page where you can upload the image, name, price, description, and tags of the item.
8.  To change/view your hubs (up to 3), click on your Profile to make the drop-down menu appear then click on Hubs. You will be redirected to a page where you can modify your selected hubs by selecting from a list of colleges.