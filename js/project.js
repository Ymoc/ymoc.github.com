$(function() {
    $("#leftBar li").mouseenter(function() {

            $(this).stop(true,true).animate({
                "top": "-6px"
            }, 300).stop(true,true).animate({
                "top": "6px"
            }, 300).stop(true,true).animate({
                "top": "0"
            }, 300);
    })
})
