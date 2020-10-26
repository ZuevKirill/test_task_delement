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