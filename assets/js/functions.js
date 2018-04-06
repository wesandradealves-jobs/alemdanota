function mobileNavigation(e){
    var e = $(e),
        nav = $(".navigation.-mobile");
    nav.toggleClass("-active"),
    e.parent().toggleClass("-active");
}