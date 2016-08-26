$(document).ready(function(){
    $(window).bind('scroll', function() {
        var navHeight = $("#box1").height();
        ($(window).scrollTop() > navHeight) ? $('nav').addClass('goToTop') : $('nav').removeClass('goToTop');
    });
});
