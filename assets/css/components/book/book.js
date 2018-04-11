var i = 0, 
    page = 0,
    pages = $(".book-page").children().length,
    content = $(".book-page-content").find("p"),
    total = content.outerHeight();
// Pages
for(i = 0; i <= pages; i++) { 
    // $(".book-page").eq(i).find("p").prepend("<span class='book-page-marker'>Pág. "+i+"</span>");
    $(".book-page").eq(i).css("z-index", -i),
    $(".book-page").eq(0).css("z-index", 0)
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
                disabled = false
            break;
        }
        $(".book-navigation").append("<button class='navigator "+((disabled == true) ? "_disabled" : '')+"'><img src='assets/imgs/svg/arrow.svg' alt='"+alt+"'></button>");
    }    
}
// Functions
$( ".navigator" ).each(function() {
    $(this).click(function() {
        var index = $(this).index();
        (index) ? (page < pages-1) ? page++ : '' : (page >= 1) ? page-- : '';
        (index) ? (page >= pages-2) ? $(".navigator").eq(1).addClass("_disabled") : '' : (page < pages) ? $(".navigator").eq(1).removeClass("_disabled") : '';
        (index) ? (page >= 1) ? $(".navigator").eq(0).removeClass("_disabled") : '' : (page < 1) ? $(".navigator").eq(0).addClass("_disabled") : '';
        if(index){
            if(page<pages){
                $(".book-page").eq(page).addClass("-flip").css("z-index", page);
                if($(window).width() > 414){
                    setTimeout(function(){ $(".book-page").eq(page).find("p").css("transform","rotateY(180deg)") }, 1200);
                }
                $(".book-pagination").children().eq(page).addClass("-active");
            }
        } else {
            if(page>=0){
                $(".book-page").eq(page+1).removeClass("-flip").css("z-index", "-"+page);
                if($(window).width() > 414){
                    setTimeout(function(){ $(".book-page").eq(page+1).find("p").css("transform","rotateY(0deg)") }, 1200);
                }
                $(".book-pagination").children().eq(page+1).removeClass("-active");
            }
        }
    }); 
});
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
                (page < pages-1) ? page++ : '';
                (page >= pages-2) ? $(".navigator").eq(1).addClass("_disabled") : '';
                (page >= 1) ? $(".navigator").eq(0).removeClass("_disabled") : '';
                if(page<pages){
                    $(".book-page").eq(page).addClass("-flip").css("z-index", page);
                    if($(window).width() > 414){
                        setTimeout(function(){ $(".book-page").eq(page).find("p").css("transform","rotateY(180deg)") }, 1200);
                    }
                }        
                $(".book-pagination").children().eq(page).addClass("-active");
            } else {
                (page >= 1) ? page-- : '';
                (page < pages) ? $(".navigator").eq(1).removeClass("_disabled") : '';
                (page < 1) ? $(".navigator").eq(0).addClass("_disabled") : '';
                if(page>=0){
                    $(".book-page").eq(page+1).removeClass("-flip").css("z-index", "-"+page);
                    if($(window).width() > 414){
                        setTimeout(function(){ $(".book-page").eq(page+1).find("p").css("transform","rotateY(0deg)") }, 1200);
                    }
                }                
                $(".book-pagination").children().eq(page+1).removeClass("-active");
            }
        }
    }); 
});