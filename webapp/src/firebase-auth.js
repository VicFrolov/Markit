$(function() {
    var auth = require('./firebase.js')["auth"];

    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log('user is signed in');
            $("#navbar-placeholder").load("../navbar/navbar-logged-in.html", function () {
                $(".dropdown-button").dropdown();
                $("#navbar-logout-button").click(function () {
                    auth.signOut();
                });

                $('#navbar-message').click(function()  {
                    $('ul.tabs').tabs('select_tab', 'profile-messages');
                });

                $('#navbar-notifications').click(function () {
                    $('ul.tabs').tabs('select_tab', 'profile-tagslist');
                });

                $('#navbar-settings').click(function () {
                    $('ul.tabs').tabs('select_tab', 'profile-settings');
                });
                
            });
        } else {
            console.log('user is NOT signed in');
            $("#navbar-placeholder").load("../navbar/navbar-signup.html", function () {
                $(".dropdown-button").dropdown();
            });
        }
    });

});