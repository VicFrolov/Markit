$(function() {
    var auth = require('./firebase.js')["auth"];
    let uid;
    
    var getProfilePicture = require('./firebase.js')["getProfilePicture"];
    var getUserInfo = require('./firebase.js')["getUserInfoProper"];

    auth.onAuthStateChanged(function(user) {
        if (user) {
            uid = auth.currentUser.uid;
            
            $("#navbar-placeholder").load("../navbar/navbar-logged-in.html", function () {
                let profilePic = $('#navbar-user-photo');
                let profileName = $('#profile-name');

                $(".dropdown-button").dropdown();

                $(".button-collapse").sideNav({
                    menuWidth: 300, // Default is 240
                    edge: 'right', // Choose the horizontal origin
                    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    draggable: true // Choose whether you can drag to open on touch screens
                });

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

                Promise.resolve(getUserInfo(uid)).then(userData => {
                    profileName.text(userData.firstName);
                });

            });
        } else {
            console.log('user is NOT signed in');
            $("#navbar-placeholder").load("../navbar/navbar-signup.html", function () {
                $(".dropdown-button").dropdown();

                console.log('rip');
                $(".button-collapse").sideNav({
                    menuWidth: 300, // Default is 240
                    edge: 'right', // Choose the horizontal origin
                    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    draggable: true // Choose whether you can drag to open on touch screens
                });                
            });
        }
    });

});