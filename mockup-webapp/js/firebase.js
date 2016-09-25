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


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('user is signed in');
            $("#navbar-placeholder").load("../navbar/navbar-signup.html");
        } else {
            console.log('user is NOT signed in');
        }
    });


    var addListing = function (item, description, tags, price) {
        database.ref('mockup-post/').push({
            item: item,
            description: description,
            tags: tags,
            price: price
        });
    };

    $("main").on('click', '#addListing', function (e) {
        e.preventDefault();
        var itemTitle = $("#item-post-title").val();
        var itemDescription = $("#item-post-description").val();
        var itemTags = $("#item-post-tags").val();
        var itemPrice = $("#item-post-price").val();

        if (itemTitle && itemDescription && itemTags && itemPrice) {
            addListing(itemTitle, itemDescription, itemTags, itemPrice);
            $("main").val("Item has been Posted :)");
        } else {
            alert("please enter a username and comment");
        }
    });    

});