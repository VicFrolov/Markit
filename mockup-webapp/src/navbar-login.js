$(function () {
    var fb = require('./firebase.js');
    var signIn = fb["signIn"];

    $('#navbar-placeholder').on('click', '#login-button', function () {
        $('#login-popup').fadeIn();
    });

    $(document).mouseup(function (e) {
        var popup = $('#login-popup');
        if (popup.is(e.target)) {
            popup.fadeOut();
        }
    });

    $('body').on('keypress click', function(e) {
        if (e.which === 13 || e.type === 'click') {
            signIn($('#email').val(), $('#password').val());
        };
    });
});