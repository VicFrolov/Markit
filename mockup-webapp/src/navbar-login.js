firebase = require('../js/firebase.js');

$('#navbar-placeholder').on('click', '#login-button', function () {
    $('#login-popup').fadeIn();
});

$(document).mouseup(function (e) {
    var popup = $('#login-popup');
    if (popup.is(e.target)) {
        popup.fadeOut();
    }
});

$('body').on('click', '#sign-in-button', function() {
    signIn();
});
