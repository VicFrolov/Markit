var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

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
var listingsRef = firebase.database().ref('mockup-post/');

var addListing = function (item, description, tags, price, uid) {
    database.ref('mockup-post/').push({
        item: item,
        description: description,
        tags: tags,
        price: price,
        uid: uid
    });
};


var currentListings;

var getListings = function() {
    listingsRef.once("value").then(function (snapshot) {
        currentListings = snapshot.val();
        for (var items in currentListings) {
            console.log(currentListings[items]["description"])
        }
    }, function (error) {
        console.log(error)
    });
};

getListings()

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

module.exports = {
    auth: auth,
    signIn: signIn,
    getListings: getListings,
    addListing: addListing
};