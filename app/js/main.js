
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
$('.btn:contains(Let’s Talk)').click(function() {
    $(".popup_body_sm").addClass("popupactiv");

    $(".bodyW").toggleClass("wbody__active");
})
$(".popup_body_sm__close").click(function() {

    $(".popup_body_sm").removeClass("popupactiv");

    $(".bodyW").removeClass("wbody__active");
})


jQuery(document).ready(function($) {
    $(".form").submit(function() {
        var str = $(this).serialize();
        console.log(str);
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: str,
            success: function(msg) {
                if (msg == 'Отправленно') {
                    result = msg;
                    //location.href = '';
                } else {
                    result = msg;

                }

                //$('.submitb').text(result);
                $('.form').css("display", "none");
                $('.popup_sm__h1').text("You messege, send!");
                $('.submitb').css("display", "none");

            }
        });
        return false;
    });
});