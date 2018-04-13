var page = 0,
    z = 0,
    pages = $(".book-page").children().length,
    content = $(".book-page-content").find("p"),
    total = content.outerHeight();
// Pages
for(i = 0; i <= pages; i++) { 
    $(".book-page").eq(i).css("z-index", pages-i);
}
// Helpers
if(pages>0){
    $(".book").append("<ul class='book-pagination'></ul>");
    $(".book").append("<ul class='book-navigation'></ul>");
    for(var k = 0; k < pages-1; k++) { 
        $(".book-pagination").append("<li></li>");
    }
    for(var j = 0; j < 2; j++){
        switch(j){
            case 0:
                alt = "Backwards",
                disabled = true
            break;
            case 1:
                alt = "Afterwards",
                disabled = ($(window).width() >= 768) ? true : false
            break;
        }
        $(".book-navigation").append("<button class='navigator "+((disabled == true) ? "_disabled" : '')+"'><img src='assets/imgs/svg/arrow.svg' alt='"+alt+"'></button>");
    }    
    if($(window).width() > 768){
        var page = 1;
        $(".book-page").eq(1).find("p").css({"opacity" : 0});
        setTimeout(function(){ 
            $(".book-page").eq(1).css({"animation" : "pagingForwards 4s forwards", "z-index" : pages});
            $(".book-pagination").children().eq(1).addClass("-active");
        }, 1500);   
        setTimeout(function(){ 
            $(".book-page").eq(1).find("p").css({"transform" : "rotateY(180deg)", "transform-origin" : "center center", "opacity" : 1});
            $(".book-navigation").children().eq(1).removeClass("_disabled");
        }, 2800);   
    }        
}
// Functions

function navigator(){
    if($(window).width() > 768){
        if(page >= 2){
            $(".navigator").eq(0).removeClass("_disabled");
        } else {
            $(".navigator").eq(0).addClass("_disabled")
        }
    } else {
        if(page >= 1){
            $(".navigator").eq(0).removeClass("_disabled");
        } else {
            $(".navigator").eq(0).addClass("_disabled")
        }    
    } 
    if(page >= pages-2){
        $(".navigator").eq(1).addClass("_disabled")
    } else {
        $(".navigator").eq(1).removeClass("_disabled");
    }                  
}
function forwards(){
    if(page >= 1){
        if($(window).width() > 768){
            $(".book-page").eq(page).addClass("-flip").removeClass("-flip-over").css("z-index", pages);
            setTimeout(function(){ 
                $(".book-page").eq(page).find(".book-page-content").css("opacity", 0);
            }, 1200);
        } else {
            $(".book-page").eq(page).toggle();
            $(".book-page").eq(page).next().toggle();
        }
        $(".book-pagination").children().eq(page).addClass("-active");
    }
}
function backwards(){
    if(page <= pages){
        if($(window).width() > 768){
            var nzindex = pages-1 - page;
            $(".book-page").eq(page+1).removeClass("-flip").addClass("-flip-over");
            setTimeout(function(){ $(".book-page").eq(page+1).css("z-index", nzindex) }, 1200);
            setTimeout(function(){ 
                $(".book-page").eq(page+1).find(".book-page-content").css("opacity", 1)
            }, 1200);   
            $(".book-pagination").children().eq(page+1).removeClass("-active");    
        } else {
            $(".book-page").eq(page+1).toggle();
            $(".book-page").eq(page+1).next().toggle();
        }           
        $(".book-pagination").children().eq(page+1).removeClass("-active")
    }
}

$( ".navigator" ).each(function() {
    $(this).click(function() {
        var index = $(this).index();
        (index) ? (page < pages) ? page++ : '' : (page >= 0) ? page-- : '';
        
        navigator();
       
        if(index){
            forwards();
        } else {
            backwards();
        }
    }); 
});
$(window).resize(function(){ 
    window.location.href = window.location.href;
    window.location.reload();
});
$(document).ready(function () {
    $("body").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction == "left"){
                (page < pages-2) ? page++ : '';
                forwards();
            } else {
                ($(window).width() > 768) ? (page >= 2) ? page-- : '' : (page >= 0) ? page-- : '' ;
                backwards();
            }
            console.log(page + " " + pages);
            navigator();                  
        }
    }); 
});