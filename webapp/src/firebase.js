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

//testing yo
var imageNewItemRef = firebase.storage().ref('images/itemImages');
//end testing yo

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
    
    var nameTest = "image3";
    images[0] = images[0].substr(22);
    imageNewItemRef.child(nameTest).putString(images[0], 'base64').then(function(snapshot){
        console.log('image uploaded successfully');
    });

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