#Requirements Specification

#5

##5.1 Introduction

This requirements specification is for Markit, a selling and trading application for Web, iOS, and Android. Users will be able to sell used items to specific college communities as well as purchase these items from sellers in the application. Each user will have a profile containing basic personal information, payment preferences, a list of items the user is selling, a list of items the user has shown interest in purchasing, and a list of tags the user is interested in purchasing. Users will search for purchasable items by location, with the option of filtering by tags. A list of these items will be shown to the user. When a user finds an item they would like to purchase, they will communicate with the seller in the application using a chat system.  The remainder of this document is structured as follows: section 5.3 contains the functional requirements, section 5.4 contains the performance requirements, and section 5.5 contains the environment requirements.<br />
[flowchart]: https://github.com/VicFrolov/Markit/blob/master/AppViewFlow.png
![alt text][flowchart]

##5.3  Functional Requirements
Each university shall have their own “College Hub” in which all the items that are being sold at that college are listed. Markit shall allow users to easily look through items in their own college hub and in those of other schools around them. Users shall be able to communicate with each other through a messenger in order to make the purchasing process easy for both parties. Users shall be able to tag an item and will be notified when an item with that tag is posted for sale. Users will be able to interact with the items and other users in the ways described in the functional requirements below.

**5.3.1 General requirements** <br />
5.3.1.1 The app should include a map view <br />
5.3.1.2 The app shall include a “card” view for postings <br />
5.3.1.3 The card view shall include graphic displays for each posting <br />
5.3.1.4 The card view shall include a basic overview of the item in text below the graphic for each posting <br />
5.3.1.5 The card view page should be able to be refreshed <br />
5.3.1.6 The app should include a chat system <br />
5.3.1.7 The all shall include a profile page where ratings, watch lists, and tags can be viewed <br />
5.3.1.8 The app should include a chat system <br />
5.3.1.9 The chat system should include a built in offer system <br />
5.3.1.10 The app shall include a watch list where users can save items they want to see later <br />
5.3.1.11 The app shall include a tagging system where users can list tags relevant to items they are searching for. <br />
5.3.1.12 The webapp shall share all data with the other 2 branches of the app <br />
5.3.1.13 The webapp shall be compatible with mobile devices as well as full sized computing devices. <br />
5.3.1.14 The webapp should have a top navigation bar that is visible throughout all relevant pages of the application <br />
5.3.1.15 The navigation bar should include a search bar <br />
5.3.1.16 The GUI subsystem for iOS should include a menu bar at the bottom of the screen to navigate between pages <br />
5.3.1.17 The GUI subsystem for Android shall include a menu bar at the top of the main  window to navigate between pages <br />
5.3.1.18 The GUI for Android shall include a “card” view for postings 

**5.3.2 Profile Requirements**<br />
5.3.2.1 The user shall be able to choose their username upon registration <br />
5.3.2.2 The user shall be able to choose their password upon registration <br />
5.3.2.3 The user shall have to provide an .edu email upon registration <br />
5.3.2.4 The user shall be required to confirm their email upon registration <br />
5.3.2.5 The user should be able to alternatively register with their facebook account <br />
5.3.2.6 The user shall be notified if a username is already registered <br />
5.3.2.7 The user shall be notified if an .edu is already registered <br />
5.3.2.8 The user should be notified if a facebook account is already associated with another user <br />
5.3.2.9 The user shall be able to cancel or exit the registration screen at any point. <br />
5.3.2.10 An account that has been registered but has not been confirmed should be deleted after a week. <br />
5.3.2.11 The user shall provide a username or email within the username/email input field <br />
5.3.2.12 The user shall provide a password within the password input field. <br />
5.3.2.13 The user shall be notified if the username/email and password combination is incorrect. <br />
5.3.2.14 The user should be locked out from their account for a few minutes upon 10 consecutive incorrect password combinations with one email. <br />
5.3.2.15 The user shall be able to reset their password. <br />
5.3.2.16 The user shall have the ability to change their profile photo. <br />
5.3.2.17 The user should have the ability to change their display name. <br />
5.3.2.18 The user shall have the ability to change their password. <br />
5.3.2.19 The user should have the ability to change their preference of payment. <br />
5.3.2.20 The user shall have the ability to delete their account. <br />
5.3.2.21 The user should be able to add or remove items from their watchlist. <br />
5.3.2.22 The user should be able to view another user’s profile.<br /> 
5.3.2.23 The user should be able to see what another user is currently selling.<br />
5.3.2.24 The user should be able to see what another user has sold in the past.<br />
5.3.2.25 The user shall be able to see another user’s rating.<br />
5.3.2.26 The user should be able to report another user.

**5.3.3 Posting Requirements**<br />
5.3.3.1 The GUI subsystem shall have college hubs in which products are listed under the college or university from where they are being sold. <br />
5.3.3.2 The user shall be able to scroll through college hubs other than their own.<br />
5.3.3.3 The user shall be able to choose which products they are interested in or want to buy within hubs<br />
5.3.3.4 The GUI subsystem should include a button which allows the user to save products they are interested in into their profile.<br />
5.3.3.5 The GUI subsystem should include a button which allows the user to buy a product they are looking at<br />
5.3.3.6 This button should lead the user to the messenger.<br />
5.3.3.7 The user should be able to search/filter their hub feed via tags<br />
5.3.3.8 The user may be able to filter their hub feed via price<br />
5.3.3.9 The GUI subsystem should include a picture of the product, description, and a price. <br />
5.3.3.10 The user should be able to click on the card view to access this information and more.<br />
5.3.3.10.1 The user should be able to see the rating/reviews of the person selling the product. <br />
5.3.3.10.2 The user should be able to click on the seller in order to view their profile.<br />
5.3.3.10.3 The user should be able to see and click on other items that the seller is selling.<br />
5.3.3.10.4 There should be a “message” button which the user clicks on to message the seller about the product. This button should lead to the messenger. <br />
5.3.3.10.5 There should be a “interested” button the user clicks to save the product to their profile <br />
5.3.3.11 The GUI subsystem shall include a button in which the user will take a picture of their product and thus post it to the hub and their profile.<br />
5.3.3.12 The GUI subsystem should include tags which the user sets for the product they are posting.<br />
5.3.3.13 The user should be able to choose among many already defined tags. <br />
5.3.3.14 The user should be able to search through already defined tags. <br />
5.3.3.15 The user should be able to create a custom tag<br />
5.3.3.16 The GUI subsystem should include a text box for a description on the item being sold.<br />
5.3.3.17 The user’s description should be limited to a certain amount of characters<br />
5.3.3.18 The GUI subsystem should include a “price” field where the user sets the price of the item.<br />
5.3.3.19 The GUI subsystem may include a button that allows the user to remove the product from their profile and the hub.<br />

**5.3.4 Searching Requirements**<br />
5.3.4.1 The GUI subsystem shall provide text entry fields into which the user may type values.<br />
5.3.4.2 The GUI subsystem shall include predetermined categories in which both buyers and sellers can list their product under.<br />
5.3.4.3 The user shall be able to view all items under one specific category.<br />
5.3.4.4 The GUI subsystem shall include more specific categories (or filters) of the product such as color and shape.<br />
5.3.4.5 The GUI subsystem shall include predetermined tags that each user can specify for their product.<br />
5.3.4.6 The user shall be able to choose specific tags to have under their profile<br />
5.3.4.7 The user shall be notified when an item with a tag that they have saved is posted.<br />

##5.4 Performance Requirements
5.4.1 The sales postings features shall load a picture, price, and general description of the item within 3 seconds from the time of the request.<br />
5.4.2 The email address provided shall notify the user if it is valid (i.e., it ends with .edu) within 1 second of typing a character.<br />
5.4.3 The sign-up page shall reject an email address that does not end with .edu within 3 seconds of typing the email.<br />
5.4.4 The login page shall allow a user to use the app within 5 seconds of pressing the login button.<br />
5.4.5 Items in the listing shall be tagged by common keywords or by user's choice.<br />
5.4.6 The user shall display the main home (“hub”) page of the academic institution of their choosing within 5 seconds of logging in.<br />
5.4.7 User accounts shall provide options to alter personal information.<br />
5.4.8 Search results shall load within 5 seconds.<br />
5.4.9 Refreshing sales postings shall take no more than 3 seconds<br />
5.4.10 Switching between the main tab bar items shall take no more than 1 second.<br />
5.4.11 The application shall be capable of supporting at least 20,000 users.<br />
5.4.12 The application shall require no more than 15% of CPU utilization.<br />
5.4.13 The database shall be able to handle at least 1,000 read transactions per hour.<br />

##5.5 Environment Requirements

**5.5.1 Development Environment Requirements**<br />
5.5.1.1 Developing the iOS version of the application shall require Xcode 8 and Swift 3.<br />
5.5.1.2 Developing the iOS version of the application shall require Firebase authentication and database dependencies.<br />
5.5.1.3 Developing the iOS version of the application shall require SwiftyJSON for accessing JSON objects.<br />
5.5.1.4 Developing the Android version of the application shall require Android Studio.<br />
5.5.1.5 The database storage and retrieval shall require using Google's Firebase.<br />

**5.5.2 Execution Environment Requirements**<br />
5.5.2.1 Hardware Requirements<br />
The application shall not require any special computing hardware to operate.<br />

**5.5.2.2 Software Requirements**<br />
5.5.2.2.1 The application shall be accessed through devices that use iOS 9.0 and up on the following devices: <br />
* iPhone 4
* iPhone 4s
* iPhone 5
* iPhone 5s
* iPhone 5c
* iPhone 6
* iPhone 6s
* iPhone 6 plus
* iPhone 6s plus
* iPhone SE
* iPhone 7
* iPhone 7 plus

5.5.2.2.2 The application shall be accessed through Android 6.0 Marshmallow on the following devices:<br />
* Samsung Galaxy S6 edge+
* Samsung Galaxy Note5
* Samsung Galaxy S6 edge
* Samsung Galaxy S6
* Samsung Galaxy Note 4
* Samsung Galaxy S5
* Samsung Galaxy Alpha
* Samsung Galaxy A8
* Samsung Galaxy A7
* Sony Xperia Z5 Premium
* Sony Xperia Z5
* Sony Xperia Z5 Compact
* Sony Xperia Z3+ / Z4
* Sony Xperia C5 Ultra
* Sony Xperia C4
* Sony Xperia M5
* Sony Xperia M4 Aqua
* Sony Xperia Z3 / Z3v
* Sony Xperia Z3 Compact
* Sony Xperia Z2
* Sony Xperia Z Ultra GPE
* LG V10
* LG G4
* LG G Flex2
* LG G4 Stylo
* LG G3
* HTC One M9 Plus
* HTC One E9 Plus
* HTC One M9
* HTC One E9
* HTC One ME
* HTC Butterfly 3
* HTC Desire 826
* HTC One (M8)
* HTC One (E8)
* HTC One (M8 Eye)
* HTC Desire 820
* HTC Desire 816
* Motorola Moto X Pure Edition (3rd gen)
* Motorola Moto X Style (3rd gen)
* Motorola Moto X Play
* Motorola Moto X Force
* Motorola Moto G (3rd gen)
* Motorola Moto G Turbo
* Motorola Moto E (3rd gen)
* Motorola DROID Turbo 2
* Motorola Moto MAXX 2
* Motorola Moto X Pure edition (2nd gen)
* Motorola DROID Turbo
* Motorola Moto MAXX
* Motorola Moto Turbo
* Motorola Moto G (2nd gen) and Moto G 4G (2nd gen)
* Lenovo K3 Note
* Lenovo A7000
* Lenovo A7000 Plus
* Lenovo Vibe S1
* Lenovo Vibe P1
* Asus Zenfone 2 series
* Asus Zenfone 2 Laser
* Asus Zenfone 2 Deluxe
* Asus Zenfone Selfie
* Asus Zenfone Go

5.5.2.2.3 The application shall be accessed through the following web browsers:<br />
* Google Chrome 53.0 and up
* Firefox 50.0
* Safari 9.1
* Microsoft Edge 20.1
 
 # Reviewer Comments
 1. Very nice work on the introduction.  The diagram communicates the operations well.
 2. Section 5.3.1: change "general" to "system" requirements, and use "the system" throughout this section in the requirements.  Using "the app" and "the card view" and "the chat system" breaks this section into smaller sections.
 3. Be careful of the specific language: "shall", "will", and "should" all have very specific meanings.  DO NOT number any "will" or "should" statements.
 4. In Section 5.3.2, re-word the statements from the system point of view.  "The profile system shall..." should be the focus.  "The user" is not a <em>part</em> of your system.  For example: "The profile system shall allow the user to....."
 5. Same thing goes sfor Section 5.3.3 and 5.3.4 -- focus on the part of the system that performs the "posting" or the "searching" and make the language say it allows or facilitates the user interaction.
 6. Section 5.4.2, the email address will not do the notifying, your system will.
 7. Section 5.3.5, what are "common keywords" allowed?
 8. Section 5.4.7, what personal information will be stored?  How is it protected?
 9. Section 5.4.12, how is this measured/verified?
 10. Section 5.4.13, how is this measured/verified?
 
 NICE WORK!!
 
