$(function() {
    $('#navbar-placeholder').on('click', '#sign-up-button', function () {
        $('#sign-up-popup').fadeIn();
    });

    $(document).mouseup(function (e) {
        var popup = $('#sign-up-popup');
        if (popup.is(e.target)) {
            popup.fadeOut();
        }
    });

    $('body').on('click', '#create-account-button', function() {
        if (emailValid && passwordValid) {
            createAccount();
        }
    });    

    var nameSizeLimit = 3;
    
    $('body').on('keyup', '#sign-up-first-name', function() {
        if ($('#sign-up-first-name').val().length >= nameSizeLimit) {
            $('#first-name-unavailable').css('visibility','hidden');
            $('#first-name-available').show();
        } else {
            $('#first-name-unavailable').css('visibility','visible');
            $('#first-name-available').hide();
        }
    });

     $('body').on('keyup', '#sign-up-last-name', function() {
        if ($('#sign-up-last-name').val().length >= nameSizeLimit) {
            $('#last-name-unavailable').css('visibility','hidden');
            $('#last-name-available').show();
        } else {
            $('#last-name-unavailable').css('visibility','visible');
            $('#last-name-available').hide();
        }
    });

    $('body').on('keyup', '#sign-up-username', function() {
        if ($('#sign-up-username').val().length >= nameSizeLimit) {
            $('#username-unavailable').css('visibility','hidden');
            $('#username-available').show();
        } else {
            $('#username-unavailable').css('visibility','visible');
            $('#username-available').hide();
        }
    });

    var emailCheck = new RegExp(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/);
    var emailValid = false;
    var passwordSizeLimit = 8;
    var passwordValid = false;    

    $('body').on('keyup', '#sign-up-email', function() {
        if (emailCheck.test($('#sign-up-email').val())) {
            // var testEmail = firebase.auth().fetchProvidersForEmail($('#sign-up-email').val()).catch(function(error) {
            //     var errorCode = error.code;
            //     var errorMessage = error.message;
            // });
            // console.log(testEmail);
            // if (testEmail != 0) {
                emailValid = true;
                $('#email-unavailable').css('visibility','hidden');
                $('#email-available').show();
            //}
        } else {
            emailValid = false;
            $('#email-unavailable').css('visibility','visible');
            $('#email-available').hide();
        }
    });

    $('body').on('keyup', '#sign-up-password', function() {
        if ($('#sign-up-password').val().length >= passwordSizeLimit) {
            passwordValid = true;
            $('#password-unavailable').css('visibility','hidden');
            $('#password-available').show();
        } else {
            passwordValid = false;
            $('#password-unavailable').css('visibility','visible');
            $('#password-available').hide();
        }
    });    

});