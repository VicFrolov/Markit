$(function() {
    var createAccount = require('./firebase.js')["createAccount"];
    var sendVerificationEmail = require('./firebase.js')['sendVerificationEmail'];

    $('#navbar-placeholder').on('click', '#sign-up-button', function () {
        $('#sign-up-popup1').fadeIn();
    });

    $(document).mouseup(function (e) {
        var popup = $('#sign-up-popup1');
        if (popup.is(e.target)) {
            popup.fadeOut();
        }
    });

    $(document).mouseup(function (e) {
        var popup = $('#sign-up-popup2');
        if (popup.is(e.target)) {
            popup.fadeOut();
        }
    });

    var next = function () {
        $('#sign-up-popup1').fadeOut();
        $('#sign-up-popup2').fadeIn();
    };

    var firstNameValid = false;
    var lastNameValid = false;
    var usernameValid = false;
    var hubValid = false;
    var emailValid = false;
    var passwordValid = false;


    $('body').on('click', '#create-account-next-button', function() {
        if (checkNames()) {
            next();
        } else {
            if (!firstNameValid) {
                $('#first-name-unavailable').show();
            }
            if (!lastNameValid) {
                $('#last-name-unavailable').show();
            }
            if (!usernameValid) {
                $('#username-unavailable').show();
            }
        }
    });    

    $('body').on('click', '#create-account-button', function() {
        if (checkInput()) {
            createAccount();
            sendVerificationEmail();
        } else {
            if (!hubValid) {
                $('#hub-unavailable').show();
            }
            if (!emailValid) {
                $('#email-unavailable').show();
            }
            if (!passwordValid) {
                $('#password-unavailable').show();
            }
        }
    });    

    var checkNames = function () {
        return firstNameValid && lastNameValid && usernameValid;
    };

    var checkInput = function () {
        return firstNameValid && lastNameValid && usernameValid && hubValid && emailValid && usernameValid;
    };

    var nameSizeLimit = 1;
    
    $('body').on('keyup', '#sign-up-first-name', function() {
        if ($('#sign-up-first-name').val().length >= nameSizeLimit) {
            firstNameValid = true;
            $('#first-name-unavailable').hide();
            $('#first-name-available').show();
        } else {
            firstNameValid = false;
            $('#first-name-available').hide();
        }
    });

     $('body').on('keyup', '#sign-up-last-name', function() {
        if ($('#sign-up-last-name').val().length >= nameSizeLimit) {
            lastNameValid = true;
            $('#last-name-unavailable').hide();
            $('#last-name-available').show();
        } else {
            lastNameValid = false;
            $('#last-name-available').hide();
        }
    });

    $('body').on('keyup', '#sign-up-username', function() {
        if ($('#sign-up-username').val().length >= nameSizeLimit) {
            usernameValid = true;
            $('#username-unavailable').hide();
            $('#username-available').show();
        } else {
            usernameValid = false;
            $('#username-available').hide();
        }
    });

    $('body').on('keyup', '#sign-up-hub', function() {
        if ($('#sign-up-hub').val().length >= nameSizeLimit) {
            hubValid = true;
            $('#hub-unavailable').hide();
            $('#hub-available').show();
        } else {
            hubValid = false;
            $('#hub-available').hide();
        }
    });

    var emailCheck = new RegExp(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/);
    var passwordSizeLimit = 8; 

    $('body').on('keyup', '#sign-up-email', function() {
        if (emailCheck.test($('#sign-up-email').val())) {
            // var testEmail = firebase.auth().fetchProvidersForEmail($('#sign-up-email').val()).catch(function(error) {
            //     var errorCode = error.code;
            //     var errorMessage = error.message;
            // });
            // console.log(testEmail);
            // if (testEmail != 0) {
                emailValid = true;
                $('#email-unavailable').hide();
                $('#email-available').show();
            //} else {
            //     emailValid = false;
            //     $('#email-available').hide();
            // }
        } else {
            emailValid = false;
            $('#email-available').hide();
        }
    });

    $('body').on('keyup', '#sign-up-password', function() {
        if ($('#sign-up-password').val().length >= passwordSizeLimit) {
            passwordValid = true;
            $('#password-unavailable').hide();
            $('#password-available').show();
        } else {
            passwordValid = false;
            $('#password-available').hide();
        }
    });

    module.exports = {
        nameSizeLimit
    }    

});