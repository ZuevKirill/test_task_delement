
 /*menu drop down*/

 $("#header-nav-menu").click(function() {
     $(".nav_item-right").toggleClass("activ");
     $(".bodyW").toggleClass("wbody__active");
     $("#body").css("overflow", "hidden");

 })
 $(".bodyW").click(function() {
     $(".bodyW").removeClass("wbody__active");
     $("nav").removeClass("activ");
     $("nav").removeClass("activ");
     $("#body").css("overflow", "auto");
     $(".popup_body_sm").removeClass("popupactiv");
     $(".popup_body_sm").css("height", "auto");

 })
 $("#header-nav-menu--close").click(function() {
         $(".bodyW").removeClass("wbody__active");
         $("nav").removeClass("activ");
         $("#body").css("overflow", "auto");
     })
     /*menu drop down*/

 /*HEADER STIKY*/
 window.onscroll = function() { HeaderHightClass() };

 var header = document.getElementById("Header");
 var gamburger = document.getElementById("header-nav-menu");

 var sticky = header.offsetTop;

 function HeaderHightClass() {


     if (window.pageYOffset > sticky + 100) {
         header.classList.add("sticky");
     } else {
         header.classList.remove("sticky");
     }
 }
//var popupSmWidth = $( ".popup_sm" ).height();
$('.btn:contains(Let’s Talk)').click(function() {
    $(".popup_body_sm").addClass("popupactiv");
    //$( "#body" ).css("position" , "fixed");
    //$( "#body" ).css("overflow-y" , "scroll");
    //$( "#body" ).css("width" , "100%");
    //$( "#body" ).css("overflow", "hidden");
    //$( ".pages__wrap" ).css("overflow-y", "scroll");
    $(".bodyW").toggleClass("wbody__active");
})
$(".popup_body_sm__close").click(function() {

    //$( "#body" ).css("position" , "static");
    //$( "#body" ).css("overflow-y" , "scroll");
    //$( "#body" ).css("width" , "100%");
    $(".popup_body_sm").removeClass("popupactiv");
    //$( "#body" ).css("overflow" , "auto");
    $(".bodyW").removeClass("wbody__active");
    //$( ".popup_body_sm" ).css("height" , "auto");
})