$(document).ready(function () {
    var seconds = 00;
    var tens = 00;
    var $appendTens = $("#tens");
    var $appendSeconds = $("#seconds");
    var $buttonStart = $("#button-start");
    var $buttonStop = $("#button-stop");
    var $buttonReset = $("#button-reset");

    var interval;

    //TIMER FUNCTIONALITY
    $buttonStart.on("click", function() {
        console.log("start clicked");
        setTimerStyleStart();
        clearInterval(interval);
        interval = setInterval(startTimer, 10);
        startAnimations();
    });

    $buttonStop.on("click", function() {
        if( tens != 00 || seconds != 00 ) {
            setTimerStylePause();
        }
        clearInterval(interval);
        pauseAnimations();
    });

    $buttonReset.on("click", function() {
        clearInterval(interval);
        tens = "00";
        seconds = "00";
        setTimerStyleDefault();
        resetAnimations();
        $appendTens.text(tens);
        $appendSeconds.text(seconds);
    })

    function startTimer() {
        tens++;

        if (tens < 9) {
            $appendTens.text("0" + tens);
        }

        if (tens > 9) {
            $appendTens.text(tens);
        }

        if (tens > 99) {
            console.log("seconds");
            seconds++;
            $appendSeconds.text("0" + seconds);
            tens = 0;
            $appendTens.text("0" + 0);
        }

        if (seconds > 9) {
            $appendSeconds.text(seconds);
        }
    }

    //JQUERY TIMER STYLE
    var $clock = $("#timer");
    $clock.addClass("timer-background");
    initializeClockStyle();

    //JQUERY TIMER COLORING
    function initializeClockStyle() {
        $clock.css({
            "background-color": "grey",
            width: "max-content",
            padding: "10px",
            "padding-left": "50px",
            "padding-right": "50px",
        });
    }

    function setTimerStyleDefault() {
        $clock.css({
            "background-color": "grey",
            opacity: "1.0",
        });
    }

    function setTimerStyleStart() {
        $clock.css({
            "background-color": "green",
        });
    }

    function setTimerStylePause() {
        $clock.css({
            "background-color": "red",
            opacity: "1.0",
        });
    }

    //JQUERY TIMER OPACITY
    var opacity = 1.0;
    var lighten = false;
    var animating = false;

    var $liquid = $("#liquid");
    var baseLiquidHeight = parseInt($liquid.css("height"));
    var baseTopMargin = parseInt($liquid.css("margin-top"));
    var liquidHeight = baseLiquidHeight;
    var margin = baseTopMargin;
    var increment = baseLiquidHeight/1000;

    function decreaseLiquidHeight() {
        if( liquidHeight <= 0 ) {
            clearInterval(beer_interval);
            $("#drunk").show();
        }
        liquidHeight -= increment;
        var h = liquidHeight + 'px';

        margin += increment;
        var m = margin + 'px';

        $liquid.css({
            height: h,
            "margin-top": m
        });
    }

    function startAnimations() {
        if (animating == false ) {
            animating = true;

            //beer animation
            beer_interval = setInterval(decreaseLiquidHeight,10);

            //lighting animations
            if( lighten == true ) {
                lighten_interval = setInterval(lightenTimer,10);
            } else {
                darken_interval = setInterval(darkenTimer,10);
            }
        }
    }

    function pauseAnimations() {
        clearInterval(beer_interval);
        clearInterval(lighten_interval);
        clearInterval(darken_interval);
        animating = false;
    }

    function resetAnimations() {
        pauseAnimations();
        $clock.css({opacity:1.0});
        $liquid.css({
            height: baseLiquidHeight,
            "margin-top": baseTopMargin
        });
        liquidHeight = baseLiquidHeight;
        margin = baseTopMargin;
        $("#drunk").hide();
    }

    function lightenTimer() {
        opacity += 0.005;
        $clock.css({opacity: opacity});
        if( opacity >= 1.0 ) {
            lighten = false;
            clearInterval(lighten_interval);
            darken_interval = setInterval(darkenTimer,10);
        }
    }

    function darkenTimer() {
        opacity -= 0.005;
        $clock.css({opacity: opacity});
        if( opacity <= 0.8 ) {
            ligten = true;
            clearInterval(darken_interval);
            lighten_interval = setInterval(lightenTimer,10);
        }
    }

    //JQUERY BUTTON STYLE
    $("button").addClass("timer-buttons");
    setButtonStyle();

    function setButtonStyle() {
        $(".timer-buttons").css({
            "background-color": "plum",
            "border-radius": "100px",
            "border-style": "inset",
            "border-color": "black",
            "box-shadow": "rgb(82, 240, 46) -2px 2px, rgb(212, 255, 137) -4px 4px, rgb(153, 242, 155) -6px 6px",            padding: "10px",
            margin: "10px",
        });
    }

    //JQUERY TIMER WRAPPER STYLE
    $(".wrapper").css({
        display: "grid",
        "justify-items": "center",
        "margin-top": "100px",
        "background-image": "url('https://motionarray.imgix.net/preview-332773-5onAFfsTTqQ42Ezp-large.jpg?w=1400&q=60&fit=max&auto=format')",
        "border-radius": "10px",
        "border-color": "black",
        "border-style": "dashed",
        "min-width": "100px",
        "font-style": "italic",
        "box-shadow": "rgb(82, 240, 46) -2px 2px, rgb(137, 170, 255) -4px 4px, rgb(153, 242, 155) -6px 6px",
        "text-shadow": "rgba(46, 240, 56, 0.4) 1px 1px, rgba(22, 255, 112, 0.3) 2px 2px",
    });
    
});