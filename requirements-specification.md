#Requirements Specification

##5

##5.1 Introduction

This requirements specification is for Markit, a selling and trading application for Web, iOS, and Android. Users will be able to sell used items to specific college communities as well as purchase these items from sellers in the application. Each user will have a profile containing basic personal information, payment preferences, a list of items the user is selling, a list of items the user has shown interest in purchasing, and a list of tags the user is interested in purchasing. Users will search for purchasable items by location, with the option of filtering by tags. A list of these items will be shown to the user. When a user finds an item they would like to purchase, they will communicate with the seller in the application using a chat system.  The remainder of this document is structured as follows: section 5.3 contains the functional requirements, section 5.4 contains the performance requirements, and section 5.5 contains the environment requirements.

##5.3  Functional Requirements
Each university shall have their own “College Hub” in which all the items that are being sold at that college are listed. Markit shall allow users to easily look through items in their own college hub and in those of other schools around them. Users shall be able to communicate with each other through a messenger in order to make the purchasing process easy for both parties. Users shall be able to tag an item and will be notified when an item with that tag is posted for sale. Users will be able to interact with the items and other users in the ways described in the functional requirements below.

##5.3.1 General requirements
5.3.1.1 The app should include a map view
5.3.1.2 The app shall include a “card” view for postings
5.3.1.3 The card view shall include graphic displays for each posting
5.3.1.4 The card view shall include a basic overview of the item in text below the graphic for each posting
5.3.1.5 The card view page will be able to be refreshed
5.3.1.6 The app will include a chat system
5.3.1.7 The all shall include a profile page where ratings, watch lists, and tags can be viewed
5.3.1. 8 The app will include a chat system
5.3.1.9 The chat system should include a built in offer system
5.3.1.10 The app shall include a watch list where users can save items they want to see later
5.3.1.11 The app shall include a tagging system where users can list tags relevant to items they are searching for
5.3.1.12 The webapp shall share all data with the other 2 branches of the app
5.3.1.13 The webapp shall be compatible with mobile devices as well as full sized computing devices.
5.3.1.14 The webapp should have a top navigation bar that is visible throughout all relevant pages of the application
5.3.1.15 The navigation bar should include a search bar
5.3.1.16 The GUI subsystem for iOS should include a menu bar at the bottom of the screen to navigate between pages
5.3.1.17 The GUI subsystem for Android shall include a menu bar at the top of the main  window to navigate between pages
5.3.1.18 The GUI for Android shall include a “card” view for postings 

##5.3.2 Profile Requirements
5.3.2.1 The user shall be able to choose their username upon registration
5.3.2.2 The user shall be able to choose their password upon registration
5.3.2.3 The user shall have to provide an .edu email upon registration
5.3.2.4 The user shall be required to confirm their email upon registration
5.3.2.5 The user should be able to alternatively register with their facebook account
5.3.2.6 The user shall be notified if a username is already registered
5.3.2.7 The user shall be notified if an .edu is already registered
5.3.2.8 The user should be notified if a facebook account is already associated with another user
5.3.2.9 The user shall be able to cancel or exit the registration screen at any point.
5.3.2.10 An account that has been registered but has not been confirmed should be deleted after a week.
5.3.2.11 The user shall provide a username or email within the username/email input field
5.3.2.12 The user shall provide a password within the password input field.
5.3.2.13 The user shall be notified if the username/email and password combination is incorrect.
5.3.2.14 The user should be locked out from their account for a few minutes upon 10 consecutive incorrect password combinations with one email.
5.3.2.15 The user shall be able to reset their password.
5.3.2.16 The user shall have the ability to change their profile photo.
5.3.2.17 The user should have the ability to change their display name.
5.3.2.18 The user shall have the ability to change their password.
5.3.2.19 The user should have the ability to change their preference of payment.
5.3.2.20 The user shall have the ability to delete their account.
5.3.2.21 The user should be able to add or remove items from their watchlist.
5.3.2.22 The user should be able to view another user’s profile.
5.3.2.23 The user should be able to see what another user is currently selling.
5.3.2.24 The user should be able to see what another user has sold in the past.
5.3.2.25 The user shall be able to see another user’s rating.
5.3.2.26 The user should be able to report another user.

5.3.3 Posting Requirements
5.3.3.1 The GUI subsystem shall have college hubs in which products are listed under the college or university from where they are being sold. 
5.3.3.2 The user shall be able to scroll through college hubs other than their own.
5.3.3.3 The user shall be able to choose which products they are interested in or want to buy within hubs
5.3.3.4 The GUI subsystem should include a button which allows the user to save products they are interested in into their profile.
5.3.3.5 The GUI subsystem should include a button which allows the user to buy a product they are looking at
5.3.3.6 This button should lead the user to the messenger.
5.3.3.7 The user should be able to search/filter their hub feed via tags
5.3.3.8 The user may be able to filter their hub feed via price
5.3.3.9 The GUI subsystem should include a picture of the product, description, and a price. 
5.3.3.10 The user should be able to click on the card view to access this information and more.
5.3.3.10.1 The user should be able to see the rating/reviews of the person selling the product. 
5.3.3.10.2 The user should be able to click on the seller in order to view their profile.
5.3.3.10.3 The user should be able to see and click on other items that the seller is selling.
5.3.3.10.4 There should be a “message” button which the user clicks on to message the seller about the product. This button should lead to the messenger. 
5.3.3.10.5 There should be a “interested” button the user clicks to save the product to their profile 
5.3.3.11 The GUI subsystem shall include a button in which the user will take a picture of their product and thus post it to the hub and their profile.
5.3.3.12 The GUI subsystem should include tags which the user sets for the product they are posting.
5.3.3.13 The user should be able to choose among many already defined tags. 
5.3.3.14 The user should be able to search through already defined tags. 
5.3.3.15 The user should be able to create a custom tag
5.3.3.16 The GUI subsystem should include a text box for a description on the item being sold.
5.3.3.17 The user’s description should be limited to a certain amount of characters
5.3.3.18 The GUI subsystem should include a “price” field where the user sets the price of the item.
5.3.3.19 The GUI subsystem may include a button that allows the user to remove the product from their profile and the hub.

##5.3.4 Searching Requirements
5.3.4.1 The GUI subsystem shall provide text entry fields into which the user may type values.
5.3.4.2 The GUI subsystem shall include predetermined categories in which both buyers and sellers can list their product under.
5.3.4.3 The user shall be able to view all items under one specific category.
5.3.4.4 The GUI subsystem shall include more specific categories (or filters) of the product such as color and shape.
5.3.4.5 The GUI subsystem shall include predetermined tags that each user can specify for their product.
5.3.4.6 The user shall be able to choose specific tags to have under their profile
5.3.4.7 The user shall be notified when an item with a tag that they have saved is posted.


