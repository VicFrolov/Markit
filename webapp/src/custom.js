"use strict" 
$(function() {
    $('.slider').slider();
    $('ul.tabs').tabs();
    $('.parallax').parallax();

    let blurbLeft = true;

    let fadingBlurbs = (blurbSide) => {
        console.log(blurbLeft);
        if (blurbSide) {
            $(".main-info-left").fadeIn(2000).delay(3000).fadeOut('slow', function() {
                blurbLeft = !blurbLeft;
                fadingBlurbs(blurbLeft);
            });
        } else {
            $(".main-info-right").fadeIn(2000).delay(3000).fadeOut('slow', function() {
                blurbLeft = !blurbLeft;
                fadingBlurbs(blurbLeft);
            });
        }
    }

    if (window.location.pathname === "/index.html") {
        setTimeout(() => { fadingBlurbs(blurbLeft) }, 1000);
    }


});

    
