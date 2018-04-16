function mobileNavigation(e){
    var e = $(e),
        nav = $(".navigation.-mobile");
    nav.toggleClass("-active"),
    e.parent().toggleClass("-active");
}
function copyright() {
    $(".main")
    .append("<a class='copyright' target='_blank' title='Concebido por Innominatum Consultoria' href='http://innominatum.eu/'><img alt='Concebido por Innominatum Consultoria' src='assets/imgs/svg/copyright.svg' height='35'/> <span class='copyright-text'>Concebido por Innominatum Consultoria</span></a>")
}
function whatsapp(){
    var telefone = "5521973819591";
    var saudacao = "Olá! Meu nome é";
    var whatsappbutton = document.getElementById("whatsapp");
    var name = document.getElementById("user_nome").value;
    var msg = document.getElementById("user_msg").value;		
    var saudacaoencode = encodeURI(saudacao);		
    var url_base = "https://api.whatsapp.com/send?phone=" + telefone + "&text=" + saudacaoencode + "%20" + encodeURI(name) + "%20e%20" + encodeURI(msg);

    whatsappbutton.setAttribute("formaction", url_base);	
}
function spinner(){
    $(".book").append("<div class='loading-screen'><div class='loader'/></div></div>");
    setTimeout(function(){ 
        if($(".loading-screen").length){
            $(".loading-screen").remove();
        }
    }, 3000);       
}
$(document).ready(function(){	
    setTimeout( function(){ 
        copyright()
    }, 1000 );
});	