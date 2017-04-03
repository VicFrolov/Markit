"use strict"

$(() => {
    $('.carousel.carousel-slider').carousel({full_width: true});
    let getImage = require('./firebase.js')["getImage"];
    let itemImagesRef = require('./firebase.js')["itemImagesRef"];

    let itemId;

    const showItemBasedOnHash = () => {
        if (location.hash.length > 0) {
            itemId = location.hash.split("=")[1];
            getImage(itemId + '/imageOne', (url) => {
                $('#image-1').attr({src: url});
            });
            $('#item-title');
            $('#item-description');
            $('#item-price').html('$999');

        }
    };

    showItemBasedOnHash();

});
