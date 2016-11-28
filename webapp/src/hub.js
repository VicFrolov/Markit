$(function () {
    $('.parallax').parallax();
    var getFavoriteObjects = require('./firebase.js')['getFavoriteObjects'];
    var itemImagesRef = require('./firebase.js')["itemImagesRef"];


    var getImage = function(address, callback) {
        itemImagesRef.child(address).getDownloadURL().then(function(url) {
            callback(url);
        }).catch(function(error) {
            console.log("error image not found");
            console.log("error either in item id, filename, or file doesn't exist");
        });
    };

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

    getFavoriteObjects(showFavoritesInSidebar);

});