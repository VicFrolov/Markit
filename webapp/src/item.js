"use strict"

$(() => {
    $('.carousel.carousel-slider').carousel({full_width: true});
    let getImage = require('./firebase.js')["getImage"];
    let itemImagesRef = require('./firebase.js')["itemImagesRef"];
    let itemsRef = require('./firebase.js')["itemsRef"];
    let getItemsById = require('./firebase.js')["getItemsById"];
    let itemId;

    const showItemBasedOnHash = (item) => {
        if (location.hash.length > 0) {
            getImage(item.id + '/imageOne', (url) => {
                $('#image-1').attr({src: url});
            });

            $('#item-title').html(item.title);
            $('#item-description').html(item.description);
            $('#item-price').html('$' + item.price);
            $('#item-tags').html('Tags: ' + item.tags);

        }
    };

    const getItem = () => {
        let id = location.hash.split("=")[1];
        let item;
        Promise.resolve(getItemsById([id])).then((itemsObject) => {
            console.log(itemsObject[id]);
            item = itemsObject[id];
            return item;
        }).then((item) => {
            showItemBasedOnHash(item);
        })
    };

    getItem();
});
