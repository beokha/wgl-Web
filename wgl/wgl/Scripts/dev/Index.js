"use strict";
// This script is use for: 



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