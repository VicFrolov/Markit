"use strict"

$(() => {
    const getRecentItemsInHub = require('./firebase.js')['getRecentItemsInHub'];
    const getImage = require('./firebase.js')["getImage"];

    $('.slider').slider();
    $('ul.tabs').tabs();
    $('.parallax').parallax();


    const tagsList = [
                    'Table',
                    'Desk',
                    'Computer',
                    'Electronics',
                    'iPhone',
                    'Cell-Phone',
                    'Apple',
                    'Macbook',
                    'Chair',
                    'Leather',
                    'Clothing',
                    'Bedroom',
                    'Bathroom',
                    'Couch',
                    'Kitchen',
                    'Living-Room',
                    'Dinner-Table'
    ];

    const campusList = ['UCLA', 'Loyola Marymount University'];
    const initializeTagTextExt = require('./new-post.js')['initializeTagTextExt']
    let blurbLeft = true;

    const fadingBlurbs = (blurbSide) => {
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

    const mostRecentItemsFirstDiv = $('#first-div-results-holder');
    const showMostRecentItemsFirstDiv = (items) => {
        let imagePaths = []
        const str = $('#first-div-results-template').text();
        const compiled = _.template(str);

        mostRecentItemsFirstDiv.empty();
        mostRecentItemsFirstDiv.prepend(compiled({items: items}));


        for (let item in items) {
            imagePaths.push(items[item]['id']);
        }

        for (let i = 0; i < imagePaths.length; i += 1) {
            ((x)=> {
                getImage(imagePaths[x] + '/imageOne', (url) => {
                    $(`#${imagePaths[x]}`).attr({src: url});
                });
            })(i);
        }
    };

    $("#search-button-main-page").on('click', () => {
        const keysInput = $("#main-keys").val().toLowerCase().trim().split(/\s+/);
        const hubInput = $('#main-campus').textext()[0].tags()._formData;
        const tagsInput = $('#main-tags').textext()[0].tags()._formData;
        const priceMaxInput = $("#main-price").val().length > 0 ?  $("#main-price").val() : "9999";

        for (let i = 0; i < tagsInput.length; i += 1) {
            tagsInput[i] = tagsInput[i].toLowerCase();

        }
        
        window.location.href = `/find/find.html#key=${keysInput}?hub=${hubInput}?tags=${tagsInput}?priceMin=1?priceMax=${priceMaxInput}`;
    });

    const scrollAmount = 420;
    $('#scroll-left').on('click', () => {
        const leftPos = $('.outside-scroll-container').scrollLeft();
        $(".outside-scroll-container").animate({ scrollLeft:  leftPos - scrollAmount }, 500);
    });

    $('#scroll-right').on('click', () => {
        const leftPos = $('.outside-scroll-container').scrollLeft();
        $(".outside-scroll-container").animate({ scrollLeft:  leftPos + scrollAmount }, 500);
    });    

    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {

        setTimeout(() => { fadingBlurbs(blurbLeft) }, 1000);
        initializeTagTextExt('#main-tags', tagsList);
        initializeTagTextExt('#main-campus', campusList);
        getRecentItemsInHub('Loyola Marymount University', showMostRecentItemsFirstDiv, 4);

    }
});