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
    for(var k = 0; k < pages; k++) { 
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
                disabled = false
            break;
        }
        $(".book-navigation").append("<button class='navigator "+((disabled == true) ? "_disabled" : '')+"'><img src='assets/imgs/svg/arrow.svg' alt='"+alt+"'></button>");
    }    
}
// Functions

function navigator(){
    if(page >= 1){
        $(".navigator").eq(0).removeClass("_disabled");
    } else {
        $(".navigator").eq(0).addClass("_disabled")
    }
    if(page >= pages-1){
        $(".navigator").eq(1).addClass("_disabled")
    } else {
        $(".navigator").eq(1).removeClass("_disabled");
    }       
}
function forwards(){
    if(page >= 1){
        $(".book-page").eq(page).addClass("-flip").removeClass("-flip-over").css("z-index", pages);
        setTimeout(function(){ $(".book-page").eq(page).find("p").css("transform", "rotateY(180deg)") }, 1000);
        $(".book-pagination").children().eq(page).addClass("-active");

        if($(window).width() >= 768){
            if(page >= pages-1){
                setTimeout(function(){ $(".book-page").eq(pages-1).find(".book-page-content").css("opacity", "0") }, 900);
            } 
        }
    }
}
function backwards(){
    if(page <= pages){
        var nzindex = pages-1 - page;
        $(".book-page").eq(page+1).removeClass("-flip").addClass("-flip-over");
        setTimeout(function(){  $(".book-page").eq(page+1).css("z-index", nzindex) }, 1200);
        setTimeout(function(){ $(".book-page").eq(page+1).find("p").css("transform", "rotateY(0deg)") }, 1000);                
        $(".book-pagination").children().eq(page+1).removeClass("-active");    

        if($(window).width() >= 768){
            if(page < pages-1){
                setTimeout(function(){ $(".book-page").eq(pages-1).find(".book-page-content").css("opacity", "1") }, 900);
            }        
        }
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
    // $(".book-page-content").bind("mousewheel", function(event, delta) {
    //     if(content.outerHeight() > $(this).outerHeight()){
    //         (delta < 0) ? (z*40 > -total) ? z-- : '' : (z < 0) ? z++ : '';
    //         $(this).find("p").css("top", z*40);  
    //     }
    // });
    $("body").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction == "left"){
                (page < pages) ? page++ : '';
                forwards();
            } else {
                (page >= 0) ? page-- : '';
                backwards();
            }
            navigator();                  
        }
    }); 
});