$(function () {
    $('.parallax').parallax();
    var getRecentItemsInHub = require('./firebase.js')['getRecentItemsInHub'];
    var itemImagesRef = require('./firebase.js')["itemImagesRef"];
    var auth = require('./firebase.js')["auth"];
    var getImage = require('./firebase.js')["getImage"];



    var mostRecentItems = $('#hub-most-recent');
    var showMostRecentItems = function(items) {
        var imagePaths = []
        var str = $('#hub-most-recent').text();
        var compiled = _.template(str);

        $('#hub-recent-holder').empty();
        $('#hub-recent-holder').append(compiled({items: items}));


        for (var item in items) {
            imagePaths.push(items[item]['id']);
        }

        for (var i = 0; i < imagePaths.length; i += 1) {
            (function (x) {
                getImage(imagePaths[x] + '/imageOne', function(url) {
                    tagToAdd = ".hub-recent img:eq(" + x  + " )";
                    $(tagToAdd).attr({src: url});
                });
            })(i);
        }

    };

    auth.onAuthStateChanged(function(user) {
        if (user && $(mostRecentItems).length > 0) {
            getRecentItemsInHub('Loyola Marymount University', showMostRecentItems);
        } else if (!user && $(mostRecentItems).length > 0) {
            window.location.href = "../index.html";

        }
    }); 
    

});