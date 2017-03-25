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
                // blurbLeft = !blurbLeft;
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
    const mostRecentItemsSecondDiv = $('#second-div-results-holder');
    const showMostRecentItemsFirstDiv = (campus, numberOfResults, placeholderElement) => {
        Promise.resolve(getRecentItemsInHub(campus, numberOfResults)).then(items => {
            let imagePaths = []
            const str = placeholderElement.text();
            const compiled = _.template(str);

            placeholderElement.empty();
            placeholderElement.prepend(compiled({items: items}));


            for (let item in items) {
                imagePaths.push(items[item]['id']);
            }

            for (let i = 0; i < imagePaths.length; i += 1) {
                ((x)=> {
                    getImage(imagePaths[x] + '/imageOne', (url) => {
                        console.log(url)
                        $(`.${imagePaths[x]}`).attr({src: url});
                    });
                })(i);
            }
        });
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

    $('.left-scroll-arrow-container').on('click', function () {
        const $divToScroll = $($(this).parent().find('.outside-scroll-container'));
        const leftPos = $divToScroll.scrollLeft();

        if (leftPos === 0) {
            $divToScroll.animate({ scrollLeft:  0 }, 400);
        } else {
            $divToScroll.animate({ scrollLeft: leftPos - scrollAmount }, 400);
        }

        console.log(leftPos);
    });

    $('.right-scroll-arrow-container').on('click', function () {
        const $divToScroll = $($(this).parent().find('.outside-scroll-container'));
        const leftPos = $divToScroll.scrollLeft();
        if (leftPos <= scrollAmount * 2) {
            $divToScroll.animate({ scrollLeft:  leftPos + scrollAmount }, 400);
        }
        console.log(leftPos)
    });

    $('.campus-button-coming-soon').hover(function() {
        const $this = $(this);
        const schoolName = $this.text();
        $this.data('schoolName', schoolName);
        $this.text("Coming Soon");
    }, function () {
        const $this = $(this);
        $this.text($this.data('schoolName'));
    })

    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
        setTimeout(() => { fadingBlurbs(blurbLeft) }, 1000);
        initializeTagTextExt('#main-tags', tagsList);
        initializeTagTextExt('#main-campus', campusList);
        showMostRecentItemsFirstDiv('Loyola Marymount University', 5, mostRecentItemsFirstDiv);
        showMostRecentItemsFirstDiv('UCLA', 5, mostRecentItemsSecondDiv);
    }
});
