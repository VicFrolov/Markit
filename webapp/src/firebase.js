var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database')
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
var imageNewItemRef = firebase.storage().ref('images/itemImages');

// var itemsByHub = database.ref('itemsByHub/' + hub);
// var itemsByUser = database.ref('itemsByUser/' + uid);

var addListing = function (title, description, tags, price, hub, uid, images) {
    itemsRef.push({
        title: title,
        description: description,
        tags: tags,
        price: price,
        uid: uid
    });
    database.ref('itemsByHub/' + hub).push({
        title: title,
        description: description,
        tags: tags,
        price: price,
        uid: uid
    });
    database.ref('itemsByUser/' + uid).push({
        title: title,
        description: description,
        tags: tags,
        price: price,
        uid: uid
    });
    
    var imageNames = ["imageOne", "imageTwo", "imageThree", "imageFour"];


    for (var i = 0; i < images.length; i += 1) {
        images[i] = images[i].replace(/^.*base64,/g, '');
        var uploadTask = imageNewItemRef.child('fakeUID' + '/' +  imageNames[i]).putString(images[i], 'base64');

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
    }

};

var getListings = function (callback) {
    itemsRef.once("value").then(function(snapshot) {
        callback(snapshot.val())
    }, function (error) {
        console.log(error)
    });
};

var filterListings = function (keywords, hubs, tags, price_range) {
    listingsRef.orderByChild()
};

var signIn = function (email, password) {
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
};

var createAccount = function () {
    auth.createUserWithEmailAndPassword($("#sign-up-email").val(), $("#sign-up-password").val()).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
};

var addHub = function (hub) {
    database.ref('hubs/' + hub).push();
};

var addCategory = function (category) {
    database.ref('categories/' + category).push();
};

module.exports = {
    auth,
    signIn,
    getListings,
    addListing,
    addHub,
    addCategory,
    filterListings,
    createAccount
};