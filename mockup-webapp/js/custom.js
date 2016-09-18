$(function() {
    $('#login-popup').hide();

    $('.carousel.carousel-slider').carousel({full_width: true});

    $('#login-button').on('click', function () {
        $('#login-popup').fadeIn();
    });

    $(document).mouseup(function (e) {
        var popup = $('#login-popup');
        console.log(!popup.is(e.target));
        if (popup.is(e.target)) {
            popup.fadeOut();
        }
    });    

});