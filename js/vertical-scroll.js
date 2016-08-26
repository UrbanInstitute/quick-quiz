$(document).ready(function () {
    var tableDiv = "body"
    var sidebarDiv = "body"
    function disableWindowScroll () {
        if (window.addEventListener) {
            window.addEventListener("DOMMouseScroll", onChildMouseWheel, false);
        }
        window.onmousewheel = document.onmousewheel = onChildMouseWheel;
    }

    function enableWindowScroll () {
        if (window.removeEventListener) {
            window.removeEventListener("DOMMouseScroll", onChildMouseWheel, false);
        }
        window.onmousewheel = document.onmousewheel = null;
    }

    var prevTop;
    function onChildMouseWheel (event) {
        var scrollTgt = 0;

        event = window.event || event;
        if (event.detail) {
            scrollTgt = -40 * event.detail;
        } else {
            scrollTgt = event.wheelDeltaY;
        }
        if (scrollTgt) {
            preventDefault(event);
            // if(jQuery.contains(document.getElementById("sidebar"), event.target)){
                $(sidebarDiv).scrollTop($(sidebarDiv).scrollTop() - scrollTgt);
                if($(sidebarDiv).scrollTop() == 0 && prevTop == 0){
                    if($(tableDiv).scrollTop() != 0){
                         $(tableDiv).scrollTop($(tableDiv).scrollTop() - scrollTgt);
                    }else{
                        enableWindowScroll();
                    }

                    resize();
                }
                else if($(sidebarDiv).scrollTop() == prevTop){
                    var tableScroll = $(tableDiv).scrollTop()
                    $(tableDiv).scrollTop($(tableDiv).scrollTop() - scrollTgt);
                    if(tableScroll == $(tableDiv).scrollTop()){
                        enableWindowScroll();
                    }
                }
                prevTop = $(sidebarDiv).scrollTop()
            // }
            // else{
            //     $(tableDiv).scrollTop($(tableDiv).scrollTop() - scrollTgt);
            //     if($(tableDiv).scrollTop() == 0 && prevTop == 0){
            //         if($(sidebarDiv).scrollTop() != 0){
            //             $(sidebarDiv).scrollTop($(sidebarDiv).scrollTop() - scrollTgt);
            //         }else{
            //             enableWindowScroll();
            //         }
            //     }else if($(tableDiv).scrollTop() == prevTop){
            //         resize();
            //         var overflow = $(sidebarDiv)[0].scrollHeight - $(sidebarDiv).innerHeight();
            //         if( $(sidebarDiv).scrollTop() < overflow){
            //             $(sidebarDiv).scrollTop($(sidebarDiv).scrollTop() - scrollTgt);
            //         }else{
            //             enableWindowScroll();
            //         }
            //     }
            //     prevTop = $(tableDiv).scrollTop()
            // }
        }
    }
    function resize(){
        var buffer =  ($(".navbar-toggle").css("display") == "none") ? 250 : 0;
        var h = $(window).height() - $(sidebarDiv).offset().top + buffer;
        $(sidebarDiv).height(h)
        var tHeight = $(window).height() - $(tableDiv).offset().top + buffer;
        $(tableDiv).height(tHeight);
    }
    resize();
    function preventDefault (event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.returnValue = false;
    }
    disableWindowScroll();
    $(window).scroll(function(){
        if($(tableDiv).offset().top - $(window).scrollTop() <= 200){
            disableWindowScroll();
        }
        else{
            enableWindowScroll();
        }
    });
});
