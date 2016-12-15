$(function() {
    var auth = require('./firebase.js')["auth"];
    let uid;
    
    var getProfilePicture = require('./firebase.js')["getProfilePicture"];

    auth.onAuthStateChanged(function(user) {
        if (user) {
            uid = auth.currentUser.uid;
            
            $("#navbar-placeholder").load("../navbar/navbar-logged-in.html", function () {
                let profilePic = $('#navbar-user-photo');

                console.log('fuck you');
                $(".dropdown-button").dropdown();

                $(".button-collapse").sideNav();

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


                Promise.resolve(getProfilePicture(uid)).then(url => {
                    profilePic.attr('src', url);
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