var auth = require('./firebase.js')["auth"];

auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log('user is signed in');
        $("#navbar-placeholder").load("../navbar/navbar-logged-in.html", function () {
            $(".dropdown-button").dropdown();
            $("#navbar-logout-button").click(function () {
                auth.signOut();
            })
        });
    } else {
        console.log('user is NOT signed in');
        $("#navbar-placeholder").load("../navbar/navbar-signup.html", function () {
            $(".dropdown-button").dropdown();
        });
    }
});