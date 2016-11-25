var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');



firebase.initializeApp({
    // serviceAccount: "./MarkIt-3489756f4a28.json",
    apiKey: "AIzaSyCaA6GSHA0fw1mjjncBES6MVd7OIVc8JV8",
    authDomain: "markit-80192.firebaseapp.com",
    databaseURL: "https://markit-80192.firebaseio.com",
    storageBucket: "markit-80192.appspot.com",
    messagingSenderId: "4085636156"
});

var database = firebase.database();
var auth = firebase.auth();
var itemsRef = database.ref('items/');
var itemImagesRef = firebase.storage().ref('images/itemImages/');
var usersRef = database.ref('users/');

var addListing = function (title, description, tags, price, hubs, uid, images) {
    var imageNames = ["imageOne", "imageTwo", "imageThree", "imageFour"];
    var myDate = Date();
    var itemRef = itemsRef.push();
    var itemKey = itemRef.key;
    var lowerCasedTags = $.map(tags, function(n,i) {return n.toLowerCase();});

    var itemData = {
        title: title,
        description: description,
        tags: lowerCasedTags,
        price: price,
        uid: uid,
        id: itemKey,
        hubs: hubs,
        date: myDate
    };

    addTags(lowerCasedTags);
    addHubs(hubs);
    addNewListingToProfile(uid, itemKey);
    itemsRef.child(itemKey).set(itemData);
    database.ref('itemsByUser/' + uid + '/').child(itemKey).set(itemData);

    hubs.forEach(function(currentHub) {
        database.ref('itemsByHub/' + currentHub + '/').child(itemKey).set(itemData);
    });
    
    
    // adding images to storage
    for (var i = 0; i < images.length; i += 1) {
        (function(x) {
            images[x] = images[x].replace(/^.*base64,/g, '');
            var uploadTask = itemImagesRef.child(itemKey + '/' +  imageNames[x]).putString(images[x], 'base64');

            uploadTask.on('state_changed', function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function(error) {
                console.log("error uploading image");
            }, function() {
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);
            });
        })(i);
    }
};

var getListings = function (callback) {
    itemsRef.once("value").then(function(snapshot) {
        callback(snapshot.val());
    }, function (error) {
        console.log(error);
    });
};

var getFavorites = function (callback) {
    usersRef.child(auth.currentUser.uid + '/favorites/').once("value").then(function(snapshot) {
        callback(snapshot.val());
    }, function (error) {
        console.log(error);
    });
};


var removeFavorite = function (item) {
    usersRef.child(auth.currentUser.uid + '/favorites/' + item).remove();
    itemsRef.child(item + '/favorites/' + auth.currentUser.uid).remove();
};

var filterListings = function (keywords, hubs, tags, price_range) {
    listingsRef.orderByChild();
};

var signIn = function (email, password) {
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
};

var addNewListingToProfile = function(uid, itemID) {
    usersRef.child(uid + '/itemsForSale/' + itemID).set(true);
};

var addFavoriteToProfile = function(uid, itemID) {
    usersRef.child(uid + '/favorites/' + itemID).set(true);
    itemsRef.child(itemID + '/favorites/').child(auth.currentUser.uid).set(true);
};


var createAccount = function () {
    auth.createUserWithEmailAndPassword($("#sign-up-email").val(), 
        $("#sign-up-password").val()).then(function(user) {
            var newUser = firebase.auth().currentUser;
            newUserDBEntry(newUser);
        }, function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
    });    
};

var newUserDBEntry = function (user) {
    var firstName = $("#sign-up-first-name").val();
    var lastName = $("#sign-up-last-name").val();
    var username = $("#sign-up-username").val();
    var userHub = $("#sign-up-hub").val();
    var date =  Date();

    var userInfo = {
        uid: user.uid,
        email: user.email,
        username: username,
        userHub: userHub,
        firstName: firstName,
        lastName: lastName,
        dateCreated: date
    };
    usersRef.child(user.uid).set(userInfo);
};

var addTags = function(itemTags) {
    database.ref('tags/').once('value', function(snapshot) {
        var tagsInDB = snapshot.val();
        itemTags.forEach(function (tag) {
            if (tagsInDB.hasOwnProperty(tag)) {
                database.ref('tags/').child(tag).set(tagsInDB[tag] + 1);
            } else {
                database.ref('tags/').child(tag).set(1);
            }
        });
    }, function (errorObject) {
        console.log(errorObject.code);
    });
};

var addHubs = function(itemHubs) {
    database.ref('tags/').once('value', function(snapshot) {
        var hubsInDB = snapshot.val();
        itemHubs.forEach(function (hub) {
            if (hubsInDB.hasOwnProperty(hub)) {
                database.ref('hubs/').child(hub).set(hubsInDB[hub] + 1);
            } else {
                database.ref('hubs/').child(hub).set(1);
            }
        });
    }, function (errorObject) {
        console.log(errorObject.code);
    });
};

module.exports = {
    auth,
    signIn,
    getListings,
    addListing,
    addHubs,
    addTags,
    filterListings,
    createAccount,
    itemImagesRef,
    addFavoriteToProfile,
    getFavorites,
    removeFavorite
};