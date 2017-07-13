"use strict";
// This script is use for: 


/*
    Summary:
        Hellow message
*/
(function ($) {

    var wgl = $("#wgl"),
        wgl_principles = $("#wgl_principles"),
        children_h4 = $(wgl_principles).children("h4"),
        wgl_backround = $("#wgl_backround"),
        // Variable, for remembering last hide element's.
        hideRemember = 0;

    // Show h4
    $.each(children_h4, function (index, value) {
        $(this).delay(500 * Math.log(index * Math.pow(2.71, index))).fadeIn("slow");

        /*
            Summary: IF we show 2 h4 - Begin to hide shown element
        */
        if (index > 1) {
            for (var i = hideRemember; i <= index; i += 1) {
                children_h4.eq(i).delay(500 * Math.log(i * Math.pow(2.71, i))).hide("slow");
                console.log(i);
            }
            hideRemember = index + 1;
        }
    })
        .promise()
        .done(function () {

            /*
                Uncomment that, to hide 'Hellow message and show main page'
            */
            
            //// Hide 'Hellow message'
            //wgl.fadeOut("fast").promise().done(function () {

            //    // Show main page block's
            //    $.each($(".body-content.container > .row > div"), function (index, value) {

            //        $(this).fadeIn("fast");
            //        $(this).delay(500 * Math.log(index * Math.pow(2.71, index))).fadeIn("slow");
            //    });
            //})
        });

    
})($);


/*--
    Summary:
        Resize of the main 'rows' (First child div element's of the content div)
--*/
(function ($) {
    
    // GET: User height
    var userX = $(document).outerHeight();
    // SET: Height of each row
    $(".body-content.container > .row ").innerHeight(userX / 3 + "px");
})($);

/*--
    Summary:
        Change background image on hover
--*/
(function ($) {

    // Handler: Hover on the block
    $(".body-content.container > .row > div").hover(function (event) {
        event.stopPropagation();

        /*--
            Summary: Change body background
            TODO: Make a few second to wait second change - DONE. Two possible way.
        --*/
        (function () {
            // CHECK: Body is animated? Don't change for this time it's background
            if ($("body").is(":animated")) {
                //$("body").stop();
                return;
            }

            // GET: Current backgound image
            var currentBackground = $("body").css("background-image"),
                existingBackground = ["wgl.jpg", "worldgl.jpg", "worldglobal.jpg"], // TODO: Hardcoding.
                randomBackground;

            currentBackground = currentBackground.substring(currentBackground.indexOf("image") + "image".length + 1);
            currentBackground = currentBackground.substring(0, currentBackground.indexOf("\""));

            // Remove current background from array
            existingBackground.splice(existingBackground.indexOf(currentBackground), 1);
            // Get next backgound
            randomBackground = Math.ceil(Math.random() * existingBackground.length) - 1;

            // SET: New body background
            $("body").animate({
                backgroundImage: "none"

            }, 'fast', function () {
                $(this).css({
                    backgroundImage: "url(Content/image/" + existingBackground[randomBackground] + ")"
                })
            });
        })();
        
    }, function () {
        // Nothing to do, when leaving block
        return;
    });
})($);