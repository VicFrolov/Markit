$(function () {
    $('.parallax').parallax();
    var getFavoriteObjects = require('./firebase.js')['getFavoriteObjects'];
    var itemImagesRef = require('./firebase.js')["itemImagesRef"];
    var auth = require('./firebase.js')["auth"];
    var getImage = require('./firebase.js')["getImage"];



    var mostRecentItems = $('#hub-most-recent');
    var showFavoritesInSidebar = function(items) {
        var str = $('#hub-most-recent').text();
        var compiled = _.template(str);

        $('#hub-recent-holder').empty();
        $('#hub-recent-holder').append(compiled({items: items}));

        for (var i = 0; i < items.length; i += 1) {
            (function (x) {
                getImage(items[x]['id'] + '/imageOne', function(url) {
                    tagToAdd = ".card-image img:eq(" + x  + " )";
                    $(tagToAdd).attr({src: url});
                });
            })(i);
        }
    };

    auth.onAuthStateChanged(function(user) {
        if (user && $(mostRecentItems).length > 0) {
            getFavoriteObjects(showFavoritesInSidebar);
        } else if (!user && $(mostRecentItems).length > 0) {
            window.location.href = "../index.html";

        }
    }); 
    

});