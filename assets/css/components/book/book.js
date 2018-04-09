var i = 0, 
    k = 0,
    x = 0,
    z = 0,
    y = 0,
    l = $(".book-page-section").children().length,
    c = $(".book-page-content").find("p"),
    total = c.outerHeight();

for(i = 0; i <= l; i++) { 
    $(".book-page").eq(i).find("p").prepend("<span class='book-page-marker'>Pag. "+i+"</span>");
}
if(l>0){
    $(".book").append("<ul class='book-pagination'></ul>");
    for(var y = 0; y < l; y++) { 
        $(".book-pagination").append("<li></li>");
    }
}
function bookPageSwitch(e){
    var e = $(e);

        if($(window).width() <= 414){
            (e.index()) ? (x < l) ? x++ : '' : (x > 0) ? x-- : '';
            if(e.index() == 1){
                $(".book-page:nth-child("+(x+1)+")").show().addClass("-flip").css("transform-origin", "0 center"),
                $(".book-page:nth-child("+(x+1)+")").prevAll().removeClass("-flip").css("transform-origin", "right center").hide()
            } else{
                $(".book-page:nth-child("+(x+2)+")").hide().removeClass("-flip").css("transform-origin", "right center"),
                $(".book-page:nth-child("+(x+1)+")").show().addClass("-flip").css("transform-origin", "0 center")
            }
        } else {            
            (e.index()) ? (x < l-2) ? x+= 2 : '' : (x >= 2) ? x -= 2 : '';
            
            (e.index()) ? $(".book-page:nth-child("+x+")").addClass("-flip").css("transform-origin", "0 center") : $(".book-page:nth-child("+(x+2)+")").removeClass("-flip").css("transform-origin", "right center");
        }

        if($(window).width() > 414){
            (x >= 2) ? $(".book-navigation").children().eq(0).removeClass("_disabled") : (x < 2) ? $(".book-navigation").children().eq(0).addClass("_disabled") : '';
            (x >= l-2) ? $(".book-navigation").children().eq(1).addClass("_disabled") : (x < l-2) ? $(".book-navigation").children().eq(1).removeClass("_disabled") : '';

            if(e.index()){
                k+=2;
                $(".book-pagination > li:nth-child("+k+")").addClass('-active'),
                $(".book-pagination > li:nth-child("+(k+1)+")").addClass('-active')
            } else {
                k-=2;
                var pg = k+2;   
                $(".book-pagination > li:nth-child("+(k+3)+")").removeClass('-active'),
                $(".book-pagination > li:nth-child("+(k+2)+")").removeClass('-active')              
            }
        } else {
            (x >= 1) ? $(".book-navigation").children().eq(0).removeClass("_disabled") : (x <= 1) ? $(".book-navigation").children().eq(0).addClass("_disabled") : '';
            (x >= l-1) ? $(".book-navigation").children().eq(1).addClass("_disabled") : (x <= l) ? $(".book-navigation").children().eq(1).removeClass("_disabled") : '';
            if(e.index()){
                (x >= 1) ? $(".book-pagination").children().eq(x).addClass('-active') : '';
            } else {
                (x >= 0) ? $(".book-pagination").children().eq(x+1).removeClass('-active') : '';
            }
        }
}

$(document).ready(function () {
    $(".book-page-content").bind("mousewheel", function(event, delta) {
        if(c.outerHeight() > $(this).outerHeight()){
            (delta < 0) ? (z*40 > -total) ? z-- : '' : (z < 0) ? z++ : '';
            $(this).find("p").css("top", z*40);  
        }
    });
    $("body").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction == "left"){
                if($(window).width() > 414){
                    (x < l-2) ? x+= 2 : "";
                    (x >= 2) ? $(".book-navigation").children().eq(0).removeClass("_disabled") : '';
                    (x >= l-2) ? $(".book-navigation").children().eq(1).addClass("_disabled") : '';
                    $(".book-page:nth-child("+x+")").addClass("-flip").addClass("-flip").css("transform-origin", "0 center");

                    k+=2;
                    $(".book-pagination > li:nth-child("+k+")").addClass('-active'),
                    $(".book-pagination > li:nth-child("+(k+1)+")").addClass('-active')
                } else {
                    (x < l-1) ? x++ : '';
                    $(".book-pagination").children().eq(x).addClass('-active'),
                    (x >= 1) ? $(".book-navigation").children().eq(0).removeClass("_disabled") : '',
                    (x >= l-1) ? $(".book-navigation").children().eq(1).addClass("_disabled") : '',
                    $(".book-page:nth-child("+(x+1)+")").show().addClass("-flip"),
                    $(".book-page:nth-child("+(x+1)+")").prevAll().removeClass("-flip").hide()
                }
            } else {
                if($(window).width() > 414){
                    (x >= 2) ? x -= 2 : "";
                    (x < 2) ? $(".book-navigation").children().eq(0).addClass("_disabled") : '';
                    (x < l-2) ? $(".book-navigation").children().eq(1).removeClass("_disabled") : '';
                    $(".book-page:nth-child("+(x+2)+")").removeClass("-flip").css("transform-origin", "right center");

                    k-=2;
                    var pg = k+2;   
                    $(".book-pagination > li:nth-child("+(k+3)+")").removeClass('-active'),
                    $(".book-pagination > li:nth-child("+(k+2)+")").removeClass('-active')                     
                } else {
                    (x >= 1) ? x-- : '';
                    $(".book-pagination").children().eq(x+1).removeClass('-active'),
                    (x < 1) ? $(".book-navigation").children().eq(0).addClass("_disabled") : '',
                    (x < l-1) ? $(".book-navigation").children().eq(1).removeClass("_disabled") : '',
                    $(".book-page:nth-child("+(x+2)+")").hide().removeClass("-flip"),
                    $(".book-page:nth-child("+(x+1)+")").show().addClass("-flip")
                }
            }
        }
    }); 
    $(window).resize(function() {
        var i = 0;
        $(".book-page-content").find("p").css("top", 0);  
    });  
});