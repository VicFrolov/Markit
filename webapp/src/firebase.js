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
var imageNewItemRef = firebase.storage().ref();
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
    
    var nameTest = "image2";
    // var uploadTask = imageNewItemRef.child('images/' + 'image1').put(images[0]);

    images[0] = images[0].substr(22);
    console.log(images[0]);

    console.log('before')
    var message = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
    imageNewItemRef.child(nameTest).putString(images[0], 'base64').then(function(snapshot) {
        console.log('Uploaded a base64 string!');
    });
    console.log("lol")

    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    //   function(snapshot) {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //     switch (snapshot.state) {
    //       case firebase.storage.TaskState.PAUSED: // or 'paused'
    //         console.log('Upload is paused');
    //         break;
    //       case firebase.storage.TaskState.RUNNING: // or 'running'
    //         console.log('Upload is running');
    //         break;
    //     }
    //   }, function(error) {
    //   switch (error.code) {
    //     case 'storage/unauthorized':
    //       // User doesn't have permission to access the object
    //       break;

    //     case 'storage/canceled':
    //       // User canceled the upload
    //       break;

    //     case 'storage/unknown':
    //       // Unknown error occurred, inspect error.serverResponse
    //       break;
    //   }
    // }, function() {
    //   // Upload completed successfully, now we can get the download URL
    //   var downloadURL = uploadTask.snapshot.downloadURL;
    //   console.log(downloadURL);
    // });
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