var btn = $(".plan-card .btn"),
    url = [];

for(i = 0; i < $(".plan-card").length; i++){
    url.push($(".plan-card").eq(i).find(".btn").attr("href")); 
}

$(document).ready(function(){	
    if($(window).width() <= 768) {
        btn.attr({"href" : "javascript:void(0)", "title" : "Saiba Mais"}).text("Saiba Mais");
        btn.click(function() {
            var e = $(this);
            spinner();
            setTimeout(function(){ 
                e.parent().addClass("-active");
                e.closest("ul").children().not(e.parent()).removeClass("-active").find(".plan-card-description p, .plan-card-description .title.-plan-price").hide();
                e.prev().find("p, .title.-plan-price").show();
                e.closest("ul").children().not(e.parent()).find(".btn").text("Saiba Mais").attr({"href" : "javascript:void(0)", "title" : "Saiba Mais"});
                e.text("Assinar").attr({"href" : url[e.parent().index()], "title" : "Assinar"});
            }, 3000);   
        });   
    }
});	