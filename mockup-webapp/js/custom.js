$(function() {
    $('.carousel.carousel-slider').carousel({full_width: true});
    
    //pop up for login buttnon
    $('#login-popup').hide();
    $('#login-button').on('click', function () {
        $('#login-popup').fadeIn();
    });
    
    $(document).mouseup(function (e) {
        var popup = $('#login-popup');
        if (popup.is(e.target)) {
            popup.fadeOut();
        }
    });

    //sign in:
    $("#sign-in-button").on('click', function() {
        console.log("attempting sign in...");
        firebase.auth().signInWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    });
});