var i = 0;

// Click Scrolling

($(".about-box-content>p").outerHeight() < $(".about-box-content").outerHeight()) ? $(".text-down").addClass("_disabled") : '';

$(window).resize(function() {
    ($(".about-box-content>p").outerHeight() < $(".about-box-content").outerHeight()) ? $(".text-down").addClass("_disabled") : $(".text-down").removeClass("_disabled");
});    
    
function textScrolling(e){
    var e = $(e);
    if($(".about-box-content>p").outerHeight() > $(".about-box-content").outerHeight()){
        if(e.attr("class") == "text-up"){
            (i < 0) ? i++ : '';
            (i*40 > -$(".about-box-content p").outerHeight() - -150) ? $(".text-down").removeClass("_disabled") : '';
            (i >= 0 && !$(".text-up").is("._disabled")) ? $(".text-up").addClass("_disabled") : '';
            (i*40 > -$(".about-box-content p").outerHeight()*0.99) ? $(".about-box-pagination li:nth-child(4)").removeClass("-active") : '';   
            (i*40 > -$(".about-box-content p").outerHeight()*0.66) ? $(".about-box-pagination li:nth-child(3)").removeClass("-active") : '';
            (i*40 > -$(".about-box-content p").outerHeight()*0.33) ? $(".about-box-pagination li:nth-child(2)").removeClass("-active") : '';       
        } else {
            (i*40 > -$(".about-box-content p").outerHeight() + 40) ? i-- : '';
            (i*40 < -$(".about-box-content p").outerHeight() - -150) ? $(".text-down").addClass("_disabled") : '';
            (i < 0 && $(".text-up").is("._disabled")) ? $(".text-up").removeClass("_disabled") : '';
            (i*40 < -$(".about-box-content p").outerHeight()*0.99 + 150) ? $(".about-box-pagination li:nth-child(4)").addClass("-active") : '';   
            (i*40 < -$(".about-box-content p").outerHeight()*0.66) ? $(".about-box-pagination li:nth-child(3)").addClass("-active") : '';
            (i*40 < -$(".about-box-content p").outerHeight()*0.33) ? $(".about-box-pagination li:nth-child(2)").addClass("-active") : '';       
        }    
        $(".about-box-content").find("p").css("top", i*40);
    }
}

// Swipe

$("body").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if(direction == "up"){
            (i*40 > -$(".about-box-content p").outerHeight() + 40) ? i-- : '';
        } else {
            (i < 0) ? i++ : '';
        }
        (i*40 > -$(".about-box-content p").outerHeight() - -150) ? $(".text-down").removeClass("_disabled") : '';
        (i >= 0 && !$(".text-up").is("._disabled")) ? $(".text-up").addClass("_disabled") : '';
        (i*40 < -$(".about-box-content p").outerHeight() - -150) ? $(".text-down").addClass("_disabled") : '';
        (i < 0 && $(".text-up").is("._disabled")) ? $(".text-up").removeClass("_disabled") : '';

        (i*40 > -$(".about-box-content p").outerHeight()*0.99) ? $(".about-box-pagination li:nth-child(4)").removeClass("-active") : '';   
        (i*40 > -$(".about-box-content p").outerHeight()*0.67) ? $(".about-box-pagination li:nth-child(3)").removeClass("-active") : '';
        (i*40 > -$(".about-box-content p").outerHeight()*0.33) ? $(".about-box-pagination li:nth-child(2)").removeClass("-active") : '';  

        (i*40 < -$(".about-box-content p").outerHeight()*0.99 + 150) ? $(".about-box-pagination li:nth-child(4)").addClass("-active") : '';   
        (i*40 < -$(".about-box-content p").outerHeight()*0.66) ? $(".about-box-pagination li:nth-child(3)").addClass("-active") : '';
        (i*40 < -$(".about-box-content p").outerHeight()*0.33) ? $(".about-box-pagination li:nth-child(2)").addClass("-active") : '';   

        $(".about-box-content").find("p").css("top", i*40);       
        
    }
}); 

// Mousewheel

$(document).ready(function () {
    $(".about-box-content").bind("mousewheel", function(event, delta) {
        if($(this).find("p").outerHeight() >= $(this).outerHeight()){
            (delta < 0) ? (i*40 > -$(".about-box-content p").outerHeight() + 40) ? i-- : '' : (i < 0) ? i++ : '';
            (i*40 > -$(".about-box-content p").outerHeight() - -150) ? $(".text-down").removeClass("_disabled") : '';
            (i >= 0 && !$(".text-up").is("._disabled")) ? $(".text-up").addClass("_disabled") : '';
            (i*40 < -$(".about-box-content p").outerHeight() - -150) ? $(".text-down").addClass("_disabled") : '';
            (i < 0 && $(".text-up").is("._disabled")) ? $(".text-up").removeClass("_disabled") : '';
    
            (i*40 > -$(".about-box-content p").outerHeight()*0.99) ? $(".about-box-pagination li:nth-child(4)").removeClass("-active") : '';   
            (i*40 > -$(".about-box-content p").outerHeight()*0.67) ? $(".about-box-pagination li:nth-child(3)").removeClass("-active") : '';
            (i*40 > -$(".about-box-content p").outerHeight()*0.33) ? $(".about-box-pagination li:nth-child(2)").removeClass("-active") : '';  
    
            (i*40 < -$(".about-box-content p").outerHeight()*0.99 + 150) ? $(".about-box-pagination li:nth-child(4)").addClass("-active") : '';   
            (i*40 < -$(".about-box-content p").outerHeight()*0.66) ? $(".about-box-pagination li:nth-child(3)").addClass("-active") : '';
            (i*40 < -$(".about-box-content p").outerHeight()*0.33) ? $(".about-box-pagination li:nth-child(2)").addClass("-active") : '';   
    
            $(this).find("p").css("top", i*40);
        }
    });
    $(".about-box").hover(function() {
        $("body").css("overflow","hidden")
    }, function() {
        $("body").css("overflow","auto")
    });    
});