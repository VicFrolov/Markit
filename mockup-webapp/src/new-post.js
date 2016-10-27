$(function() {
    var addListing = require('./firebase.js')['addListing'];
    var auth = require('./firebase.js')['auth'];

    $('input.autocomplete').autocomplete({
        data: {
            "Loyola Marymount University": null,
            "UCLA": null,
            "Berkeley": 'http://placehold.it/250x250',
            "Donglehorn University": null
        }
    });

    $("main").on('click', '#add-listing', function (e) {
        e.preventDefault();
        var itemTitle = $("#item-post-title").val();
        var itemDescription = $("#item-post-description").val();
        var itemTags = $("#item-post-tags").val();
        var itemPrice = $("#item-post-price").val();
        var itemHub = $("#autocomplete-input").val();
        var itemUid = auth.currentUser.uid;
        console.log(itemUid);

        if (itemTitle && itemDescription && itemTags && itemPrice) {
            addListing(itemTitle, itemDescription, itemTags, itemPrice, itemHub, itemUid);
            $("main").text("Item has been Posted :)");
        } else {
            alert("please enter a username and comment");
        }
    });

});