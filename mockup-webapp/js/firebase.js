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
    var database = firebase.database();
    var auth = firebase.auth();


    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log('user is signed in');
            $("#navbar-placeholder").load("../navbar/navbar-logged-in.html");
        } else {
            console.log('user is NOT signed in');
            $("#navbar-placeholder").load("../navbar/navbar-signup.html");
        }
    });


    //logout 
    $("header").on('click', '#navbar-logout-button', function () {
        auth.signOut().then(function() {
            console.log("successfully signed out user");
        }, function(error) {
            // An error happened.
        });
    });

    //ADD new listing
    var addListing = function (item, description, tags, price) {
        database.ref('mockup-post/').push({
            item: item,
            description: description,
            tags: tags,
            price: price
        });
    };

    var getListings = function() {
        database.ref('mockup-post/').snapshot.forEach()
    }

    

    $("main").on('click', '#addListing', function (e) {
        e.preventDefault();
        var itemTitle = $("#item-post-title").val();
        var itemDescription = $("#item-post-description").val();
        var itemTags = $("#item-post-tags").val();
        var itemPrice = $("#item-post-price").val();

        if (itemTitle && itemDescription && itemTags && itemPrice) {
            addListing(itemTitle, itemDescription, itemTags, itemPrice);
            $("main").text("Item has been Posted :)");
        } else {
            alert("please enter a username and comment");
        }
    });
    // END ADD new listing


});