// Basic configs
var page = ($(window).width() > 434) ? 2 : 1,
    pages = $(".book-page").children().length,
    content = $(".book-page-content").find("p"),
    total = content.outerHeight();
// Pages
    // Sets the z-index of the pages and flips the first pages
    for(i = 0; i <= pages; i++) { 
        $(".book-page").eq(i).css("z-index", pages-i);
        if($(window).width() > 434){
            if(i < 2 && pages > 1){
                $(".book-page").eq(i).addClass("-flip");
            }
        }
    }
// Functions (Forwarding and backwarding of the current pages)
function forwards(){
    if($(window).width() > 434){
        if(page <= pages-2){
            page+=2;
            (page >= pages-1) ? $(".navigator").eq(1).addClass("_disabled") : '';
            (page >= 2) ? $(".navigator").eq(0).removeClass("_disabled") : '';
            $(".book-page:nth-child("+page+")").addClass("-flip").removeClass("-flip-over").prev().addClass("-flip").removeClass("-flip-over");
            $(".book-pagination > li:nth-child("+page+")").prev().addClass("-active");
            $(".book-pagination > li:nth-child("+page+")").addClass("-active");
            (page == pages) ? $(".book-pagination > li").last().addClass("-active") : '';
            setTimeout(function(){ 
                $(".book-page:nth-child("+page+")").css("z-index", pages+page).prev().css("z-index", (pages+page)-1),
                $(".book-page:nth-child("+page+")").find(".book-page-content").css("transform", "rotateY(180deg)");
            }, 1900);  
        }
    } else {
        if(page < pages){
            page++;
            (page >= pages) ? $(".navigator").eq(1).addClass("_disabled") : '';
            (page >= 1) ? $(".navigator").eq(0).removeClass("_disabled") : '';
            $(".book-pagination > li:nth-child("+page+")").addClass("-active");
            $(".book-page:not(:nth-child("+page+"))").hide();
            $(".book-page:nth-child("+page+")").show();
        }
    }
    console.log(page + " de " + pages);
}
function backwards(){
    if($(window).width() > 434) {
        if(page >= 4){
            page-=2;
            (page < pages) ? $(".navigator").eq(1).removeClass("_disabled") : '';
            (page <= 2) ? $(".navigator").eq(0).addClass("_disabled") : '';
            $(".book-page:nth-child("+(page+2)+")").removeClass("-flip").addClass("-flip-over").prev().removeClass("-flip").addClass("-flip-over");  
            $(".book-pagination > li:nth-child("+(page+2)+")").removeClass("-active").prev().removeClass("-active");
            (page < pages) ? $(".book-pagination > li").last().removeClass("-active") : '';
            setTimeout(function(){ 
                $(".book-page:nth-child("+(page+2)+")").css("z-index", (pages-page)-1).prev().css("z-index", pages-page);
            }, 1200); 
        }
    } else {
        if(page >= 2){
            page--;
            (page < pages) ? $(".navigator").eq(1).removeClass("_disabled") : '';
            (page == 1) ? $(".navigator").eq(0).addClass("_disabled") : '';

            $(".book-pagination > li:nth-child("+(page+1)+")").removeClass("-active");
            $(".book-page:not(:nth-child("+page+"))").hide();
            $(".book-page:nth-child("+page+")").show();
        }
    }
    console.log(page + " de " + pages);
}

// Helpers
function helpers(){
    // Insert pagination and navigation plus enabling the first ones pages on the pagination component
    $(".book").append("<ul class='book-pagination'></ul>").prepend("<ul class='book-navigation'></ul>");
    for(pagination = 0; ($(window).width() > 434 ? pagination < pages-1 : pagination < pages); pagination++) { 
        $(".book-pagination").append("<li "+(( ($(window).width() > 434) ? pagination < 2 : pagination < 1 ) ? 'class="-active"' : '')+"></li>");
        if(pagination < 2){
            switch(pagination){
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
    // Click Capability
    $( ".navigator" ).click(function() {
        ($(this).index() > 0) ? forwards() : backwards()
    });         
}
$(document).ready(function () {
    // $(window).resize(function(){ 
    //     if($(window).width() < 768){
    //         window.location.href = window.location.href;
    //         window.location.reload();
    //     }
    // });
    if(pages > 1){
        // Flipping first page
        if($(window).width() > 434){
            setTimeout(function(){ 
                $(".book-page:nth-child(2)").css("z-index", pages).find(".book-page-content").css("transform", "rotateY(180deg)");
            }, 1200);   
        }
        // Loader
        spinner();
    }
    if(pages > 3){
        setTimeout(function(){ 
            // Swipe Capability
            $("body").swipe( {
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    if(direction == "left"){
                        forwards()
                    } else {
                        backwards()                       
                    }
                }
            }); 
            // Adding Helpers   
            helpers();     
            // Keypress Capability
            document.onkeydown = checkKey;
            function checkKey(e) {
                e = e || window.event;
                if (e.keyCode == '37') {
                    ($(window).width() > 434) ? forwards() : backwards() 
                }
                else if (e.keyCode == '39') {
                    ($(window).width() > 434) ? backwards() : forwards() 
                }
            }     
        }, 3000);  
    }    
});