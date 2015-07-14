$(function() {
    comeIn($('#vertical a'));
    // comeOut($('#vertical a'));
    // 首页头像效果
    picCircle();

})

function picCircle() {
    $('#vertical a').hover(function() {
        comeIn($(this));
    }, function() {
        comeOut($(this));
    })
}

function comeIn(thisTO) {
    thisTO.find('.front').stop().animate({
        "height": "0",
        "margin-top": "87px"
    },300, function() {
        $(this).hide().next().show();
        $(this).next().animate({
            'left': '21px'
        });

    })
}

function comeOut(thisOut) {
    thisOut.find('.front').next().stop().animate({
        "left": "-136px"
    }, 300,function() {
        $(this).hide().prev().show();
        $(this).prev().animate({
            'margin-top': '22px',
            "height": "115px"
        });
    })
}
