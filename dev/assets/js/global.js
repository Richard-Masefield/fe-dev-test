var searchVisible = false;
var isMobile = false;
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
Modernizr.addTest("boxsizing", function() {
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
Modernizr.addTest('isios', function() {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
});
// Global Initialize
$(document).ready(function() {
    // Appliance Scroller
    checkScrollerSize();
    
    //Search
    function setSearchVisible(visible) {
        if (screenType == "smart") isMobile = true;
        if (visible == searchVisible) return;
        searchVisible = visible;
        $(".search-box")[searchVisible ? "addClass" : "removeClass"]("active");
        if (searchVisible) {
            $(".search-box input").attr("placeholder", isMobile ? "Search..." : "Start typing").val("");
            setTimeout(function() {
                $(".site-header .search-box input").focus();
            }, 100);
        }
    }
    // SEARCH BAR
    $("header .search").click(function() {
        setSearchVisible(!searchVisible);
    });
    $("header .search-box input").blur(function() {
        setSearchVisible(false);
    });
    $("header .search-box .close").click(function() {
        setSearchVisible(false);
    })
    $(".menu").click(function(e) {
        e.preventDefault();
        $("header").toggleClass("open");
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
    $(window).resize(function() {
        //check if we need the scrollers
        checkScrollerSize();
        // Replace img src based on device screen size
        if ($('img.responsive').length) {
            responsiveImages();
        }
        // Convert inline image to background
        if ($('img.bg').length) {
            swapImgSource();
        }
    });
    $(window).trigger('resize');
});

function checkScrollerSize(){
  
    app = $('.appliances');
    row = $('.appliances .row');
    li = $('.appliances li');
    ul = $('.appliances ul');
        if(screenType =="smart"){
            $eval = (row.width()/3) - 11;
            if($eval >= 140){
                $(li).css('width', $eval)
                $(ul).css('width', $eval*7)
            }            
        }else{
            $(li).css('width', '')
            $(ul).css('width', '')
        }
    resetScreenVars();
    if(screenType == "smart"){
        if($(window).width() < $('.appliances ul').width()){
            $('.arrow').addClass('active');
        }   
    }else{
        if($('.arrow').hasClass('active')) $('.arrow').removeClass('active');
    }
}
// -------- IMAGES --------
var windowWidth = $(window).width();
// Replace img src based on device screen size
var desktopBreak = 1000,
    tabletBreak = 767,
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
    $('img.responsive').each(function() {
        var src = $(this).attr('src');
        src = src.replace(/(feature|smart|tablet|desktop)/, screenType);
        $(this).attr('src', src);
    });
}
// Convert inline image to background
function swapImgSource() {
    resetScreenVars();
    $('img.bg').each(function() {
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