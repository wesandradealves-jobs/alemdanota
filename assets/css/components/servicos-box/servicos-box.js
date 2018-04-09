

(function() {
    'use strict';
    var x = 0;

    function boxNavigation(){
        var s = $("[box-navigation]"),
            o = s.children().length,
            f = $(".servicos-box"),
            elementTemplate,
            titles = [],
            content = [],
            count = 0,
            caption = "<div class='servicos-box-caption'><img src='assets/imgs/svg/services-caption.svg'/><p></p></div>",
            template = "<ul class='servicos-box-navigation'></ul>";

            s.children().eq(0).addClass("-active");
            if(o>=1){
                f.prepend(template);
                for(var i = 0; i < o; i++) { 
                    count+=1;
                    titles.push($("[box-navigation] > *").eq(i).find(".title").text()); 
                    content.push($("[box-navigation] > *").eq(i).find(".title").html()); 
                    elementTemplate = "<li "+((i==0) ? 'class="-active"' : '')+">" + "<a class='ico-"+count+"' href='javascript:void(0)'><img src='assets/imgs/svg/ico-"+count+".svg'/><span>"+content[i]+"</span></a>" + '</li>'; 
                    $(".servicos-box-navigation").append(elementTemplate); 
                }                
            }
            $( ".servicos-box-navigation" ).children().each(function() {
                var e = $(this);        
                    e.click(function() {
                        var i = e.index(),
                            width = e.parent().children().outerWidth() * e.parent().children().length,
                            el = $("[box-navigation]").children();
                        e.parent().find(".-active").not(e.parent()).removeClass("-active");
                        (e.is(".-active")) ? e.removeClass("-active") : e.addClass("-active");

                        el.removeClass("-active");
                        el.eq(i).addClass("-active");
                        if($(window).width() <= 414){
                            if($(window).width() <= 320){
                                $(".servicos-box-navigation").css("left", 80-180*e.index())
                            } else {
                                $(".servicos-box-navigation").css("left", 120-180*e.index())
                            }
                        }
                    });
            });          

            $(".servicos-box-navigation li").append(caption);
            for(var i = 0; i <= o; i++) { 
                $( ".servicos-box-navigation li" ).eq(i).find(".servicos-box-caption p").html(content[i]);
            }  
            $(window).resize(function() {
                if($(window).width() > 320 && $(window).width() <= 414){
                    $(".servicos-box-navigation").css("left", "120px")
                } else if($(window).width() <= 320){
                    $(".servicos-box-navigation").css("left", "80px")
                } else {
                    $(".servicos-box-navigation").css("left", 0)
                }
            });                     
    }
    boxNavigation();

    // Swipe
    $(".servicos-box").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            var e = $(this);
            if($(window).width() <= 414){
                x++;
                if($(".servicos-box-navigation").css("left") != "-460px"){
                    $(".servicos-box-navigation").css({"right" : "initial", "left" : 80-180*x});
                    $(".servicos-box-navigation").find(".-active").removeClass("-active");
                    $(".servicos-box-navigation").children().eq(x).addClass("-active");
                } else {
                    x = 0;
                    $(".servicos-box-navigation").find(".-active").removeClass("-active");
                    $(".servicos-box-navigation").children().eq(0).addClass("-active");
                    $(".servicos-box-navigation").css({"left" : 80});
                }
            }
        }
    });       
})();