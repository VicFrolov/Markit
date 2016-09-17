$(function() {

        // $('.dropdown-button').dropdown({
        //     inDuration: 300,
        //     outDuration: 225,
        //     hover: true, // Activate on hover
        //     belowOrigin: true, // Displays dropdown below the button
        //     alignment: 'right' // Displays dropdown with edge aligned to the left of button
        // });

    $("nav").mouseenter(function(){
        $(this).animate({
            "margin-left": "0%",
            width: "100%"
        });
        
        $(".brand-logo").animate({
            "margin-left": "40px"
        });

        $("nav ul li").animate({
            "padding-right": "10px",
            "padding-left": "10px"
        });
    });

    $("nav").mouseleave(function(){
        $(this).animate({
            "margin-left": "7%",
            width: "84%"
        });

        $(".brand-logo").animate({
            "margin-left": "0px"
        });
       
        $("nav ul li").animate({
            "padding-right": "0px",
            "padding-left": "0px"
        })
    });    

}); // End Document Ready