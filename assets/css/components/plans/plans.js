
// $(document).ready(function(){	
//     $(".-best-option").find("h2").append("<img class='best-option-ribbon' src='assets/imgs/svg/best-option.svg'/>");
//     $( ".plans-list-plans" ).children().hover(function() {
//         if($(this).index() == 1){
//             $(".plans-list-header").children().eq($(this).index()).addClass("hover");
//         }
//     }, function() {
//         if($(this).index() == 1){
//             $(".plans-list-header").children().eq($(this).index()).removeClass("hover");
//         }
//     });
// });	

// function closePlanDetail(e){
//     var e = $(e);
//     e.prevAll().not($("h2")).toggle();
//     e.prev(".custom-checkbox").find("input").prop( "checked", false );
//     e.remove();
// }
// function showPlanDetail(e){
//     var e = $(e);
//     e.prevAll().nextAll().not($("h2")).toggle();
//     e.closest("li").append("<a class='close-plan-detail' href='javascript:void(0)' onclick='closePlanDetail(this)'>Fechar</a>")
// }