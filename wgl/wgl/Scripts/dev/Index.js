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
            }
            hideRemember = index + 1;     
        }

        // Animate background
        if (index === 1) {
            (function (index) {
                hideAndShow($("#wgl_backround"), 1);
            })(index);
        }
    })
        .promise()
        .done(function () {

            /*
                Uncomment that, to hide 'Hellow message and show main page'
            */
            
            // Hide 'Hellow message'
            wgl.fadeOut("fast").promise().done(function () {

                // Show main page block's
                $.each($(".body-content.container > .row > div"), function (index, value) {

                    $(this).fadeIn("fast");
                    $(this).delay(500 * Math.log(index * Math.pow(2.71, index))).fadeIn("slow");
                });
            })
        });

    /*
        Summary:
            Hide and show
    */
    function hideAndShow(elem, index) {

        if (elem.css("opacity") > 0) { // DEVELOPMENT: DEBUG BACKGROUND - && false
            $(elem).delay(2250).animate({
                opacity: 0
            }, 1000).promise().done(function () {
                // Stop loop
                if (index === 0) {
                    return;
                }

                hideAndShow(elem, index -= 1);
            });
        } else if (elem.css("opacity") == 0) {
            $(elem).animate({
                opacity: 0.8
            }, 500, function () {
                /*
                    Summary:
                        Background. Show for a few second
                */


                // Animate border
                $(elem[0]).css("border-top", "0px solid whitesmoke").animate({
                    borderTopWidth: "2px",
                    borderLeftWidth: "2px",
                }, 750);
            }).promise().done(function () {

                // Stop loop
                if (index === 0) {
                    return;
                }

                hideAndShow(elem, index -= 1);
            });
        }
    }
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
    Summary: Nav block
--*/
(function ($) {

    var nav = $("#nav"), navY,

        // Variable: For circle
        circle, circleX, circleY, direction = true,
        circleHighestPosition, circleLowestPosition, circleMoveInterval;


    var variableInit = setInterval(function () {

        if ($(nav).is(":visible")) {
            // GET: Nav measurements
            navY = $(nav).innerHeight();

            // Mathematical calculation: For circle
            circle = $(nav).children(".circle");
            circleX = $(circle).position().left;
            circleY = $(circle).position().top;
            circleHighestPosition = navY - $(circle).height() - 15;
            circleLowestPosition = $(nav).offset().top + 10;

            // Circle move logic
            circleMoveInterval = setInterval(CircleMove, 200);

            // Stop circle while hover, and resue moving while mouse is left it
            $(circle).hover(function (e) {

                clearInterval(circleMoveInterval); 
            }, function (e) {

                // Don't change circle position, if we click on it
                if ($(circle).is(":visible")) {
                    circleMoveInterval = setInterval(CircleMove, 200);
                }
            });

            $(circle).on('click', function (e) {

                // Hide circle
                if ($(circle).is(":visible")) {
                    $(circle).css("display", "none");
                }

                // Show hide nav
                $("#hideNav").fadeIn("fast").on("click", function (e) { // And when click on background - show circle
                    e.stopPropagation();
                    e.preventDefault();

                    $(this).fadeOut("slow");

                    // Show circle
                    $(circle).css("display", "block");
                    //circleMoveInterval = setInterval(CircleMove, 200); // TODO: Some problem, when trying to move circle
                });
            });

            // Stop interval, that init our value - need to init at one time
            clearInterval(variableInit);
        }
    }, 50);

    function CircleMove() {

        // Not run while we don't see nav block
        if (!$(nav).is(":visible")) {
            return;
        }

        switch (direction) {
            case true:
                if (circleY >= circleHighestPosition) {
                    direction = false; // Change direction to reverse
                } else {
                    circleY += 10;
                }

                break;
            case false:
                if (circleY <= circleLowestPosition) {
                    direction = true; // Change direction
                } else {
                    circleY -= 10;
                }

                break;
        }

        // Change circle position
        $(circle).animate({
            top: circleY
        }, 10); // To change circle move - change this line and interval, that call this function
    }
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