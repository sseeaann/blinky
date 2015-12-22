$(function(){

  var $form = $('#mc-embedded-subscribe-form'),
      $signup = $('#signup'),
      $formSuccess = $('#signup-success'),
      $header = $('header'),
      $logo = $('#logo'),
      $contactOverlay = $('.contactOverlay'),
      $body = $('body'),
      $content = $('header .content'),
      $modalC = $('.modal .modalContent'),
      $mainC = $('main .container'),
      $overShadow = $('.overlay-shadow'),
      endAnimation = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      counter = 0,
      $window = $(window),
      $errMsg = $('#errorMessage'),
      $sidePhone = $('.side-phone'),
      isMobile = false;


  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
  }

  $logo.click(function(){
    counter++;
    if(counter <= 2){
      $(this).addClass('swing').one(endAnimation, function(){
        $(this).removeClass('swing');
      });
    } else if(counter === 3){
      $(this).addClass('hinge').one(endAnimation, function(){
        $(this).removeClass('hinge').addClass('flipInY').one(endAnimation, function(){
          $(this).removeClass('flipInY');
        });
        counter = 0;
      });
    }
  });

  $('.social').mouseover(function(){
    $(this).addClass('animated scaleDown').one(endAnimation, function(){
      $(this).removeClass('scaleDown');
    });
  });

// SCROLL Codes
  $(window).scroll(function(){
    var wScroll = $(this).scrollTop(),
        docViewBottom = wScroll + $window.height(),
        $footer = $('footer'),
        footerTop = $footer.offset().top;


    if(wScroll > 0){
      if(isMobile === false){
        $overShadow.css({
          'opacity' : 'calc('+ wScroll * 0.00137 +')'
        });
        $header.css({
          'background-size' : 'calc('+ wScroll/35 + '% + 100%)'
        });
        $content.css({
          'transform' : 'translate(0px, '+ wScroll / 6 +'%)',
          'opacity': 1 - (wScroll / 730)
        });
      }

      if(footerTop + 200 <= docViewBottom){
        $('#comingSoon').addClass('animated lightSpeedIn').one(endAnimation, function(){
          $(this).removeClass('lightSpeedIn').addClass('bump');
          $('#app-store').animate({'opacity':'1'}, 750);
        });
      }

    } else {
      $overShadow.css({
        'opacity' : '0'
      });
      $header.css({
        'background-size' : '100%'
      });
      $content.css({
        'transform' : 'translate(0px, 0%)',
        'opacity': 1
      });
      $('#comingSoon').css({
        'opacity' : 1
      });
      if(footerTop + 200 <= docViewBottom){
        $('#comingSoon').addClass('animated bump');
      }
    }

    if(wScroll > $sidePhone.offset().top - ($(window).height() / 2)){
      $sidePhone.addClass('fadeInUp');
    }


  });


// Mailchimp highjack
  $form.submit(function(e){
    e.preventDefault();
    if(!isValidEmail($form)){
      $errMsg.remove();
      $('#errors').append("<p id='errorMessage'>A valid email is required.</p>");
      $("input[type='email']").css({'color':'red'});
    } else {
      submitSubscribeForm($form);
    }
  });

  function isValidEmail($form) {
    var email = $form.find("input[type='email']").val();
    if (!email || !email.length) {
        return false;
    } else if (email.indexOf("@") === -1) {
        return false;
    }
    return true;
  }

  function submitSubscribeForm($form) {
    $.ajax({
      type: 'GET',
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'jsonp',
      jsonp: 'c',
      contentType: 'application/json; charset=utf-8',

      // error: function(error){
      //   console.log(error, ' err err err');
      // },

      success: function(data){
        var resultMessage = data.msg || "Sorry, unable to subscribe. Please try again later.";

        if(data.result !== "success"){
          if(data.msg && data.msg.indexOf('already subscribed') >= 0){
            resultMessage = "Looks like you've already subscribed. Thanks!";
            $errMsg.remove();
            $('#errors').append("<p id='errorMessage'>"+ resultMessage +"</p>");
          }
        } else {
          $form[0].reset();
          $formSuccess.fadeIn();
          $signup.hide();
        }
      }
    });
  }


// Functions
  function flipIn(){
    setTimeout(function(){
      $logo.addClass('animated flipInY').one(endAnimation, function(){
        $(this).removeClass('flipInY');
      });
    }, 500);
  }

  flipIn();

});
