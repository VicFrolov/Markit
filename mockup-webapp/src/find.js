$(function() {
    var getListings = require('./firebase.js')['getListings'];

   if (window.location.pathname == "/find/find.html") {
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
    }

    // getListings(function (input) {
    //     console.log(Object.keys(input));
    //     var objectNames = Object.keys(input);
    //     var objects = [];

    //     for (var i = 0; i < objectNames.length; i++) {
    //         objects.push(input[objectNames[i]]);
    //     };

    // });

    console.log(getListings());
});