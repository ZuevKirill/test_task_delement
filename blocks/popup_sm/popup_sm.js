//var popupSmWidth = $( ".popup_sm" ).height();
$( '.imgcolumblogo__item' ).click(function() {
      $( ".popup_body_sm" ).addClass("popupactiv");
      //$( "#body" ).css("position" , "fixed");
      //$( "#body" ).css("overflow-y" , "scroll");
      //$( "#body" ).css("width" , "100%");
      //$( "#body" ).css("overflow", "hidden");
      //$( ".pages__wrap" ).css("overflow-y", "scroll");
      $( ".bodyW" ).toggleClass("wbody__active");
    })
$( ".popup_body_sm__close" ).click(function() {
      
      //$( "#body" ).css("position" , "static");
      //$( "#body" ).css("overflow-y" , "scroll");
      //$( "#body" ).css("width" , "100%");
      $( ".popup_body_sm" ).removeClass("popupactiv");
      //$( "#body" ).css("overflow" , "auto");
      $( ".bodyW" ).removeClass("wbody__active");
      //$( ".popup_body_sm" ).css("height" , "auto");
    })
