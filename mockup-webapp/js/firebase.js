$(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCaA6GSHA0fw1mjjncBES6MVd7OIVc8JV8",
        authDomain: "markit-80192.firebaseapp.com",
        databaseURL: "https://markit-80192.firebaseio.com",
        storageBucket: "markit-80192.appspot.com",
        messagingSenderId: "4085636156"
    };
    firebase.initializeApp(config);



    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('user is signed in');
        } else {
            console.log('user is NOT signed in');
        }
    });

});