$(document).ready(function () {
    //Menu Toggle
    $('.c-nav__toggle').on('click', function () {
        $('.c-header__mobileMenu').toggleClass('active');
    });
    $('.c-footer__socialToggle').on('click', function () {
        $(this).parent().siblings('.c-footer__socialList').slideToggle();
    });
    $('.c-footer__menuToggle').on('click', function () {
        $(this).parent().siblings('.c-footer__footerMenu').slideToggle();
    });
    $('.c-blog__mobileNav > h3 > span').on('click', function () {
        $('.c-blog__categoryList').slideToggle();
    });

    // textarea scroll
    $('textarea.c-contact__formField').on('keydown', function () {
        console.log(this.scrollHeight);
        var self = this;
       setTimeout(function(){
        $(self).outerHeight(42).outerHeight(self.scrollHeight > 42 ? self.scrollHeight : 42);
       },10)
    });


    //Range Slider
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 10000,
        values: [0, 10000],
        create: function (event, ui) {
            $("#range-1a").val(0);
            $("#range-1b").val(10000);
        },
        slide: function (event, ui) {
            $(".from_value").text('$' + ui.values[0]);
            $("#range-1a").val(ui.values[0]);
            $(".to_value").text('$' + ui.values[1]);
            $("#range-1b").val(ui.values[1]);
        }
    });
    $('#range-1a').on('input', function () {
        $(".from_value").text('$' + $(this).val());
        $("#slider-range").slider("option", { values: [$(this).val(), $("#range-1b").val()] });
    });
    $('#range-1b').on('input', function () {
        $(".to_value").text('$' + $(this).val());
        $("#slider-range").slider("option", { values: [$("#range-1a").val(), $(this).val()] });
    });


    //header sticky
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        //>=, not <=
        if (scroll >= 30) {
            //clearHeader, not clearheader - caps H
            $(".c-header__wrapper").addClass("c-sticky");
        } else {
            $(".c-header__wrapper").removeClass("c-sticky");
        }
    });



if($('.team-slider').length){
    $('.team-slider').slick({
        // autoplay: true,
        // autoplaySpeed: 2000,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: $(".c-team__arrow-right"),
        prevArrow: $(".c-team__arrow-left")
    });
}
    

// scroll scheduale button to contact form
jQuery(document).ready(function(){
    jQuery(".set-width").click(function(){
        jQuery('html , body').animate({
             scrollTop: jQuery(".c-contact__wrapper").offset().top - 100
        },2000);
    });
});




});






$(window).on('load', function () {
    if (screen.width == 1366) {
        $('.changeTwo').removeClass('three wide');
        $('.changeTwo').addClass('two wide');
        $('.changeFour').removeClass('three wide');
        $('.changeFour').addClass('four wide');
    }
});


// tab designs
$('.tabular.menu .item').tab();



// jQuery for side bar sticky

jQuery(window).on("load", function () {
    function setScroll(itemSelector, cb) {
        var sideItem = jQuery(itemSelector);
        if (!sideItem || sideItem.length < 1) {
            return
        }
        sideItem.removeAttr("style").removeClass("sick-abs").removeClass("sick-fixed");
        var offset = sideItem.offset();
        var parentOffset = sideItem.parent().offset();
        var parentHeight = sideItem.parent().height();
        var itemHeight = sideItem.outerHeight();
        var width = sideItem.outerWidth();
        var leftSetAbs = offset.left - parentOffset.left;
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var fixTopPos = 0;
        var whenScrollPos = offset.top
        var whenStop = parentHeight + parentOffset.top - itemHeight
        console.log("whenScrollPos", whenScrollPos);
        console.log("leftSetAbs", leftSetAbs);
        jQuery(window).scroll(function () {
            if (parentHeight !== sideItem.parent().height()) {
                parentHeight = sideItem.parent().height()
                whenStop = parentHeight + parentOffset.top - itemHeight
            }
            if (windowWidth > 992) {
                var scrollPos = jQuery(this).scrollTop();
                // console.log("scrollPos",scrollPos);
                console.log("parentHeight", parentHeight);
                console.log("itemHeight", itemHeight);
                if (parentHeight > itemHeight) {
                    if (scrollPos > whenStop) {
                        sideItem.removeClass("sick-fixed").addClass("sick-abs").css({
                            position: "absolute",
                            top: parentHeight - itemHeight + "px",
                            width: width + "px",
                            left: leftSetAbs + "px"
                        });
                        console.log("scrollPos", scrollPos);
                    } else if (whenScrollPos <= scrollPos) {
                        sideItem.removeClass("sick-abs").addClass("sick-fixed").removeAttr("style").css({
                            // width: width + "px",
                            top: fixTopPos + "100px",
                            left: offset.left + "px"
                        });
                        sideItem[0].style.setProperty("width", width + "px", "important")

                    } else {
                        sideItem.removeAttr("style").removeClass("sick-abs").removeClass("sick-fixed");
                    }
                } else {
                    sideItem.removeAttr("style").removeClass("sick-abs").removeClass("sick-fixed");
                }
            } else {
                sideItem.removeAttr("style").removeClass("sick-abs").removeClass("sick-fixed");
            }
            if (typeof cb === 'function') {
                cb()
            }
        });
    }

    setScroll(".right-sidebar");
    jQuery(window).resize(function () {
        jQuery(window).unbind("scroll")
        setScroll(".right-sidebar");
    })
});