/*$( '.btn--red:contains(Зарегистрироваться)' ).click(function() {
      $( ".popup_body" ).addClass("popupactiv");
      $( ".pages" ).css("overflow", "hidden");
      $( "#body" ).css("overflow" , "hidden");
    })*/

$('.btn--red:contains(Зарегистрироваться)').click(function() {
    $(".popup_body").addClass("popupactiv");
    $(".bodyW").toggleClass("wbody__active");
    /*$( ".pages" ).css("overflow", "hidden");
    $( "#body" ).css("overflow" , "hidden");*/
})
$(".popup_body__close").click(function() {
    $(".pages").css("overflow", "auto");
    $(".bodyW").removeClass("wbody__active");
    $(".popup_body, .popup_body__subscribe, .popup_body__expressaudit, .popup_body__materials, .popup_body__skype").removeClass("popupactiv");
})
$(".bodyW").click(function() {
    $(".bodyW").removeClass("wbody__active");
    $(".popup_body_sm").removeClass("popupactiv");
})
jQuery(document).ready(function($) {
    $(".form").submit(function() {
        var str = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/mail.php",
            data: str,
            success: function(msg) {

                if (msg == 'Отправленно') {
                    result = msg;
                    location.href = '/send.html';
                } else {
                    result = msg;
                }

                $('.submitb').text(result);
                $('.submitb').css("cursor", "default");
                $('.submitb').css("pointer-events", "none");
            }
        });
        return false
    });
});