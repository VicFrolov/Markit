"use strict"

$(function() {
    $('.slider').slider();
    $('ul.tabs').tabs();
    $('.parallax').parallax();

    let initializeTagTextExt = require('./new-post.js')['initializeTagTextExt']

    let blurbLeft = true;

    let fadingBlurbs = (blurbSide) => {
        if (blurbSide) {
            $(".main-info-left").fadeIn(2000).delay(5000).fadeOut('slow', function() {
                blurbLeft = !blurbLeft;
                fadingBlurbs(blurbLeft);
            });
        } else {
            $(".main-info-right").fadeIn(2000).delay(5000).fadeOut('slow', function() {
                blurbLeft = !blurbLeft;
                fadingBlurbs(blurbLeft);
            });
        }
    }



    $("#search-button-main-page").on('click', () => {
        let keysInput = $("#main-keys").val().toLowerCase().trim().split(/\s+/);
        let hubInput = "";
        let tagsInput = $('#main-tags').textext()[0].tags()._formData;
        let priceMaxInput = $("#main-price").val().length > 0 ?  $("#main-price").val() : "9999";

        for (let i = 0; i < tagsInput.length; i += 1) {
            tagsInput[i] = tagsInput[i].toLowerCase();
        }
        
        window.location.href = `/find/find.html#key=${keysInput}?hub=${hubInput}?tags=${tagsInput}?priceMin=1?priceMax=${priceMaxInput}`;
    })

    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
        console.log("at index page");
        setTimeout(() => { fadingBlurbs(blurbLeft) }, 1000);
        initializeTagTextExt('#main-tags')

    }

});

    
