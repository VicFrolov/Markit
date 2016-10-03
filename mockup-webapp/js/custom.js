$(function() {
    $('.slider').slider();

    // range slider
    var slider = document.getElementById('search-slider');
    noUiSlider.create(slider, {
        start: [0, 300],
        connect: true,
        step: 1,
        tooltips: true,
        range: {
            'min': 0,
            'max': 1500
        }
    });


    /**
        loading main data, slight timeOut so it 
        doesn't appear before the navbar does
    **/
    var loadMain = function () {
        $('main').fadeIn()
    }
    setTimeout(loadMain, 300);

    //pop up for login buttnon
    $('#navbar-placeholder').on('click', '#login-button', function () {
        console.log("it worked")
        $('#login-popup').fadeIn();
    });

     $('#navbar-placeholder').on('click', '#sign-up-button', function () {
        console.log("it worked")
        $('#sign-up-popup').fadeIn();
    });
    
    $(document).mouseup(function (e) {
        var popup = $('#login-popup');
        if (popup.is(e.target)) {
            popup.fadeOut();
        }
    });

    $(document).mouseup(function (e) {
        var popup = $('#sign-up-popup');
        if (popup.is(e.target)) {
            popup.fadeOut();
        }
    });

    //sign in:
    var signIn = function () {
        console.log("attempting sign in...");
        firebase.auth().signInWithEmailAndPassword($('#email').val(), $('#password').val()).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

   var createAccount = function () {
        firebase.auth().createUserWithEmailAndPassword($("#sign-up-email").val(), $("#sign-up-password").val()).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    $('body').on('click', '#sign-in-button', function() {
        signIn();
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

    var passwordSizeLimit = 8;
    var passwordValid = false;

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


    $('body').on('click', '#create-account-button', function() {
        if (emailValid && passwordValid) {
            createAccount();
        }
    });

});