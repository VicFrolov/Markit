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


    var newListing = function() {
        return $("<div></div>").addClass("col l4 m4 s12").append(
            $("<div></div>").addClass("card find-result").append(
                $("<div></div>").addClass("card-image waves-effect waves-block waves-light").append(
                    $("<img/>").addClass("activator").attr({
                        src: "./iphone-sample.jpg"
                    })
                )
            ).append(
                $("<div></div>").addClass("card-content").append(
                    $("<span></span>").addClass("card-title activator grey-text text-darken-4").text(
                            "iPhone 6s 32 GB used"
                    ).append(
                        $("<i></i>").addClass("material-icons right").text("more_vert")
                    )
                ).append(
                    $("<p></p>").append(
                        $("<a></a>").attr({
                            href: "#"
                        }).text(
                            "view item"
                        )
                    )
                )
            ).append(
                $("<div></div>").addClass("card-reveal").append(
                    $("<span></span>").addClass("card-title grey-text text-darken-4").text(
                        "Description"
                    ).append(
                        $("<i></i>").addClass("material-icons right").text(
                            "close"
                        )
                    ).append(
                        $("<p></p>").text(
                            "DETAILED INFO ABOUT STOOPD IPHONE"
                        )
                    )
                )
            )
        );
    };

    var postListings = function(n) {
        for (var i = 0; i < n; i += 1) {
            $("#find-content").append(newListing())
        }
    };

    postListings(4);

});