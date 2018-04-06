var i = 0, 
    content = $(".about-box-content").find("p"),
    total = content.outerHeight();

// Click Scrolling

($(".about-box-content>p").outerHeight() < $(".about-box-content").outerHeight()) ? $(".text-down").addClass("-disabled") : '';

$(window).resize(function() {
    ($(".about-box-content>p").outerHeight() < $(".about-box-content").outerHeight()) ? $(".text-down").addClass("-disabled") : $(".text-down").removeClass("-disabled");
});    
    
function textScrolling(e){
    var e = $(e);
    if($(".about-box-content>p").outerHeight() > $(".about-box-content").outerHeight()){
        if(e.attr("class") == "text-up"){
            (i < 0) ? i++ : '';
            (i*40 > -total - -150) ? $(".text-down").removeClass("-disabled") : '';
            (i >= 0 && !$(".text-up").is(".-disabled")) ? $(".text-up").addClass("-disabled") : '';
            (i*40 > -total*0.99) ? $(".about-box-pagination li:nth-child(4)").removeClass("-active") : '';   
            (i*40 > -total*0.66) ? $(".about-box-pagination li:nth-child(3)").removeClass("-active") : '';
            (i*40 > -total*0.33) ? $(".about-box-pagination li:nth-child(2)").removeClass("-active") : '';       
        } else {
            (i*40 > -total - -150) ? i-- : '';
            (i*40 < -total - -150) ? $(".text-down").addClass("-disabled") : '';
            (i < 0 && $(".text-up").is(".-disabled")) ? $(".text-up").removeClass("-disabled") : '';
            (i*40 < -total*0.99 + 150) ? $(".about-box-pagination li:nth-child(4)").addClass("-active") : '';   
            (i*40 < -total*0.66) ? $(".about-box-pagination li:nth-child(3)").addClass("-active") : '';
            (i*40 < -total*0.33) ? $(".about-box-pagination li:nth-child(2)").addClass("-active") : '';       
        }    
        content.css("top", i*40);
    }
}

// Mousewheel

$(document).ready(function () {
    $(".about-box-content").bind("mousewheel", function(event, delta) {
        if($(this).find("p").outerHeight() > $(this).outerHeight()){
            (delta < 0) ? (i*40 > -total - -150) ? i-- : '' : (i < 0) ? i++ : '';
            (i*40 > -total - -150) ? $(".text-down").removeClass("-disabled") : '';
            (i >= 0 && !$(".text-up").is(".-disabled")) ? $(".text-up").addClass("-disabled") : '';
            (i*40 < -total - -150) ? $(".text-down").addClass("-disabled") : '';
            (i < 0 && $(".text-up").is(".-disabled")) ? $(".text-up").removeClass("-disabled") : '';
    
            (i*40 > -total*0.99) ? $(".about-box-pagination li:nth-child(4)").removeClass("-active") : '';   
            (i*40 > -total*0.67) ? $(".about-box-pagination li:nth-child(3)").removeClass("-active") : '';
            (i*40 > -total*0.33) ? $(".about-box-pagination li:nth-child(2)").removeClass("-active") : '';  
    
            (i*40 < -total*0.99 + 150) ? $(".about-box-pagination li:nth-child(4)").addClass("-active") : '';   
            (i*40 < -total*0.66) ? $(".about-box-pagination li:nth-child(3)").addClass("-active") : '';
            (i*40 < -total*0.33) ? $(".about-box-pagination li:nth-child(2)").addClass("-active") : '';   
    
            $(this).find("p").css("top", i*40);
        }
    });
    $(".about-box").hover(function() {
        $("body").css("overflow","hidden")
    }, function() {
        $("body").css("overflow","auto")
    });    
});