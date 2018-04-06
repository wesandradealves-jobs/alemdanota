function mobileNavigation(e){
    var e = $(e),
        nav = $(".navigation.-mobile");
    nav.toggleClass("-active"),
    e.parent().toggleClass("-active");
}
function copyright() {
    $(".main").append("<a class='copyright' target='_blank' title='Concebido por Innominatum Consultoria' href='http://innominatum.eu/'><img alt='Concebido por Innominatum Consultoria' src='assets/imgs/svg/copyright.svg' height='35'/></a>")
}

jQuery(document).ready(function(){	
    setInterval(copyright, 1000);
});	