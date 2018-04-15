var page = 2,
    pages = $(".book-page").children().length,
    content = $(".book-page-content").find("p"),
    total = content.outerHeight();
// Pages
    for(i = 0; i <= pages; i++) { 
        $(".book-page").eq(i).css("z-index", pages-i);
        if(i < 2 && pages > 0){
            $(".book-page").eq(i).addClass("-flip");
        }
    }
// Helpers
function helpers(){
    if(pages > 0){
        $(".book").append("<ul class='book-pagination'></ul>").prepend("<ul class='book-navigation'></ul>");
        for(pagination = 0; pagination < pages-1; pagination++) { 
            $(".book-pagination").append("<li "+((pagination < 2) ? 'class="-active"' : '')+"></li>");
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
        // Click
        $( ".navigator" ).click(function() {
            ($(this).index() > 0) ? forwards() : backwards()
        });         
    }    
}

function forwards(){
    (page <= pages-2) ? page+=2 : '';
    (page >= pages) ? $(".navigator").eq(1).addClass("_disabled") : '';
    (page >= 2) ? $(".navigator").eq(0).removeClass("_disabled") : '';
    $(".book-page:nth-child("+page+")").addClass("-flip").removeClass("-flip-over").prev().addClass("-flip").removeClass("-flip-over");
    setTimeout(function(){ 
        $(".book-pagination > li:nth-child("+page+")").prev().addClass("-active");
        $(".book-pagination > li:nth-child("+page+")").addClass("-active");
        $(".book-page:nth-child("+page+")").css("z-index", pages+page).prev().css("z-index", (pages+page)-1),
        $(".book-page:nth-child("+page+")").find(".book-page-content").css("transform", "rotateY(180deg)");
        (page == pages) ? $(".book-pagination > li").last().addClass("-active") : '';
    }, 1900);   
    console.log(page + " de " + pages);
}
function backwards(){
    (page >= pages-2) ? page-=2 : '';
    (page < pages) ? $(".navigator").eq(1).removeClass("_disabled") : '';
    (page <= 2) ? $(".navigator").eq(0).addClass("_disabled") : '';
    $(".book-page:nth-child("+(page+2)+")").removeClass("-flip").addClass("-flip-over").prev().removeClass("-flip").addClass("-flip-over");  
    setTimeout(function(){ 
        $(".book-pagination > li:nth-child("+(page+2)+")").removeClass("-active").prev().removeClass("-active");
        $(".book-page:nth-child("+(page+2)+")").css("z-index", (pages-page)-1).prev().css("z-index", pages-page);
        (page < pages) ? $(".book-pagination > li").last().removeClass("-active") : '';
    }, 1200); 
    console.log(page + " de " + pages);
}
// $(window).resize(function(){ 
//     window.locationef = window.location.href;
//     window.location.reload();
// });
$(document).ready(function () {
    if(pages>0){
        setTimeout(function(){ 
            // Swipe
            $("body").swipe( {
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    if(direction == "left"){
                        forwards()
                    } else {
                        backwards()                       
                    }
                }
            }); 
            $(".book-page").css("cursor", "grabbing");
            // Adding Helpers   
            helpers();            
            // Keypress
            document.onkeydown = checkKey;
            function checkKey(e) {
                e = e || window.event;
                if (e.keyCode == '37') {
                    forwards()
                }
                else if (e.keyCode == '39') {
                    backwards() 
                }
            }         
        }, 3000);  
        setTimeout(function(){ 
            $(".book-page:nth-child(2)").css("z-index", pages).find(".book-page-content").css("transform", "rotateY(180deg)");
        }, 1200);   
    }    
});