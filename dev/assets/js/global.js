// --------------------------------------------------
// ----- Global for header, footer, search, etc -----
// --------------------------------------------------
// remove no-js class
$('body').removeClass('no-js');
// class additions
if (navigator.userAgent.indexOf('Opera Mini') > -1) {
    $('body').addClass('opmini');
}
if (navigator.userAgent == 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; NOKIA; Lumia 800)') {
    $('body').addClass('iemobile9');
}
// check is box-sizing is supported
Modernizr.addTest("boxsizing", function () {
    return Modernizr.testAllProps("boxSizing") && (document.documentMode === undefined || document.documentMode > 7);
});
if (Modernizr.boxsizing) {
    $('body').addClass('boxsizing');
} else {
    if ($('body').hasClass('boxsizing')) {
        $('body').removeClass('boxsizing');
    }
}
// check if iOS device
Modernizr.addTest('isios', function(){
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
});

// Global Initialize
$(document).ready(function () {
    /* LOADING & LOGO SCALING
     *************************/
    var loaderScale = 1;

    function scaleLoader() {
        $('.loader').css('transform', 'scale(' + loaderScale + ')');
        // adjust transition duration for subsequent scaling
        setTimeout(function() {
            $('.loader').css('transition-duration', '0s')
        }, 750);
    }
    // calculate scale
    function calcLoaderScale() {

        initLoaderWidth = $('.loader .word').outerWidth();
        targetLoaderWidth = $(window).width() * 1.525;
        loaderScale = targetLoaderWidth / initLoaderWidth;
    }
    setTimeout(calcLoaderScale, 300);
    

    // on load (real)
    var initLoadTime = new Date();
    
    $('#main').imagesLoaded({
        background: 'img.bg'
    }, function() {
        // calculate time to load images
        var loadTime = new Date() - initLoadTime;
        // calculate extra time to add on to loading animation for 'circle' to complete spin
        var extraTime = 1000 - (loadTime % 1000);
        setTimeout(function() {
            $('body').addClass('loaded');
            scaleLoader();
        }, extraTime);
    });

    /* HOME PANELS
     *************************/
    $('.home-panel').click(function() {
        var $this = $(this);
        // set active panel
        $this.addClass('active').css('overflow', 'visible');
        // set background shade class
        if ($this.filter('[data-shade=dark]').hasClass('active')) {
            $('body').addClass('dark-bg');
        } else {
            $('body').removeClass('dark-bg');
        }
    });
    // On panel click
    $('.home-panel').click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        setTimeout(function() {
            window.location = href
        }, 450);
    });


     // Replace img src based on device screen size
    if ($('img.responsive').length) {
        responsiveImages();
    }
    // Convert inline image to background
    if ($('img.bg').length) {
        swapImgSource();
        $(window).load(function() {
            swapImgSource();
        })
    }

    // Additional class support for breakpoints
    $(window).resize(function () {
        // Replace img src based on device screen size
        if ($('img.responsive').length) {
            responsiveImages();
        }
        // Convert inline image to background
        if ($('img.bg').length) {
            swapImgSource();
        }
        calcLoaderScale();
        scaleLoader();
    });

    $(window).trigger('resize');

});

// -------- IMAGES --------
var windowWidth = $(window).width();
// Replace img src based on device screen size
var desktopBreak = 1000,
tabletBreak = 700,
smartBreak = 320,
screenWidth = 0,
screenHeight = 0,
screenType = 'feature';

function resetScreenVars() {
    screenWidth = $(window).width();
    screenHeight = $(window).height();
    if (screenWidth > desktopBreak) {
        screenType = 'desktop';
    } else if (screenWidth >= tabletBreak) {
        screenType = 'tablet';
    } else if (screenWidth >= smartBreak) {
        screenType = 'smart';
    } else {
        screenType = 'feature';
    }
}

function responsiveImages() {
    resetScreenVars();
    $('img.responsive').each(function () {
        var src = $(this).attr('src');
        src = src.replace(/(feature|smart|tablet|desktop)/, screenType);
        $(this).attr('src', src);        
    });
}

// Convert inline image to background
function swapImgSource() {
    resetScreenVars();
    $('img.bg').each(function () {
        var src = $(this).attr('src');
        var p = $(this).parent();
        $(this).attr('src', src);
        if (screenType == 'feature') {
            // clean up
            p.css('background-image', 'none');
            $(this).addClass('hide');
        } else {
            p.css('background-image', "url(" + src + ")");
            p.addClass("cover");
        }
    });
}