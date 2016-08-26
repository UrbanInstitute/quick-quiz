// JavaScript Document

$(document).ready(function () {
	
	(function () {

    var scrollHandle = 0,
        scrollStep = 5,
        fixTable = $("#parent");

    //Start the scrolling process
    $(".panner").on("mousedown", function () {
        var data = $(this).data('scrollModifier'),
            direction = parseInt(data, 10);

        $(this).addClass('active');

        startScrolling(direction, scrollStep);
    });

    //Kill the scrolling
    $(".panner").on("mouseup", function () {
        stopScrolling();
        $(this).removeClass('active');
    });

    //Actual handling of the scrolling
    function startScrolling(modifier, step) {
        if (scrollHandle === 0) {
            scrollHandle = setInterval(function () {
                var newOffset = fixTable.scrollLeft() + (scrollStep * modifier);

                fixTable.scrollLeft(newOffset);
            }, 10);
        }
    }

    function stopScrolling() {
        clearInterval(scrollHandle);
        scrollHandle = 0;
    }

}());
	
	});