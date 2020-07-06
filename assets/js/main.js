
(function($) {
  "use strict";

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  $('.navbar-toggler').on('click', function() {
    if (!$('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  /*--/ Star ScrollTop /--*/
  $('.scrolltop-mf').on("click", function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  /*--/ Star Counter /--*/
  $('.counter').counterUp({
    delay: 15,
    time: 2000
  });

  /*--/ Star Scrolling nav /--*/
  var mainNav_height = $('#mainNav').outerHeight() - 22;
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var scrollto = target.offset().top - mainNav_height;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      var scrollto_initial = $(initial_nav).offset().top - mainNav_height;
      $('html, body').animate({
        scrollTop: scrollto_initial
      }, 1000, "easeInOutExpo");
    }
  }

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll').on("click", function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: navHeight
  });
  /*--/ End Scrolling nav /--*/

  /*--/ Navbar Menu Reduce /--*/
  $(window).trigger('scroll');
  $(window).on('scroll', function() {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-expand-md').addClass('navbar-reduce');
      $('.navbar-expand-md').removeClass('navbar-trans');
    } else {
      if (!$('#navbarDefault').hasClass('show')) {
        $('.navbar-expand-md').removeClass('navbar-reduce');
      }
      $('.navbar-expand-md').addClass('navbar-trans');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  /*--/ Star Typed /--*/
  if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
    var typed = new Typed('.text-slider', {
      strings: typed_strings.split(','),
      typeSpeed: 50,
      loop: true,
      backDelay: 800,
      backSpeed: 100
    });
  }

  /*--/ Testimonials owl /--*/
  $('#testimonial-mf').owlCarousel({
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox({
      'share': false
    });
  });

})(jQuery);



jQuery(document).ready(function ($) {
  //set animation timing
  var animationDelay = 2500,
      //loading bar effect
      barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
      //letters effect
      lettersDelay = 50,
      //type effect
      typeLettersDelay = 150,
      selectionDuration = 500,
      typeAnimationDelay = selectionDuration + 800,
      //clip effect 
      revealDuration = 600,
      revealAnimationDelay = 1500;

  initHeadline();


  function initHeadline() {
      //insert <i> element for each letter of a changing word
      singleLetters($('.cd-headline.letters').find('b'));
      //initialise headline animation
      animateHeadline($('.cd-headline'));
  }

  function singleLetters($words) {
      $words.each(function () {
          var word = $(this),
              letters = word.text().split(''),
              selected = word.hasClass('is-visible');
          for (i in letters) {
              if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
              letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
          }
          var newLetters = letters.join('');
          word.html(newLetters);
      });
  }

  function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function () {
          var headline = $(this);

          if (headline.hasClass('loading-bar')) {
              duration = barAnimationDelay;
              setTimeout(function () {
                  headline.find('.cd-words-wrapper').addClass('is-loading')
              }, barWaiting);
          } else if (headline.hasClass('clip')) {
              var spanWrapper = headline.find('.cd-words-wrapper'),
                  newWidth = spanWrapper.width() + 10
                  spanWrapper.css('width', newWidth);
          } else if (!headline.hasClass('type')) {
              //assign to .cd-words-wrapper the width of its longest word
              var words = headline.find('.cd-words-wrapper b'),
                  width = 0;
              words.each(function () {
                  var wordWidth = $(this).width();
                  if (wordWidth > width) width = wordWidth;
              });
              headline.find('.cd-words-wrapper').css('width', width);
          };

          //trigger animation
          setTimeout(function () {
              hideWord(headline.find('.is-visible').eq(0))
          }, duration);
      });
  }

  function hideWord($word) {
      var nextWord = takeNext($word);

      if ($word.parents('.cd-headline').hasClass('type')) {
          var parentSpan = $word.parent('.cd-words-wrapper');
          parentSpan.addClass('selected').removeClass('waiting');
          setTimeout(function () {
              parentSpan.removeClass('selected');
              $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
          }, selectionDuration);
          setTimeout(function () {
              showWord(nextWord, typeLettersDelay)
          }, typeAnimationDelay);

      } else if ($word.parents('.cd-headline').hasClass('letters')) {
          var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
          hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
          showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
          $word.parents('.cd-words-wrapper').animate({
              width: '2px'
          }, revealDuration, function () {
              switchWord($word, nextWord);
              showWord(nextWord);
          });

      } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
          $word.parents('.cd-words-wrapper').removeClass('is-loading');
          switchWord($word, nextWord);
          setTimeout(function () {
              hideWord(nextWord)
          }, barAnimationDelay);
          setTimeout(function () {
              $word.parents('.cd-words-wrapper').addClass('is-loading')
          }, barWaiting);

      } else {
          switchWord($word, nextWord);
          setTimeout(function () {
              hideWord(nextWord)
          }, animationDelay);
      }
  }

  function showWord($word, $duration) {
      if ($word.parents('.cd-headline').hasClass('type')) {
          showLetter($word.find('i').eq(0), $word, false, $duration);
          $word.addClass('is-visible').removeClass('is-hidden');

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
          $word.parents('.cd-words-wrapper').animate({
              'width': $word.width() + 10
          }, revealDuration, function () {
              setTimeout(function () {
                  hideWord($word)
              }, revealAnimationDelay);
          });
      }
  }

  function hideLetter($letter, $word, $bool, $duration) {
      $letter.removeClass('in').addClass('out');

      if (!$letter.is(':last-child')) {
          setTimeout(function () {
              hideLetter($letter.next(), $word, $bool, $duration);
          }, $duration);
      } else if ($bool) {
          setTimeout(function () {
              hideWord(takeNext($word))
          }, animationDelay);
      }

      if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
          var nextWord = takeNext($word);
          switchWord($word, nextWord);
      }
  }

  function showLetter($letter, $word, $bool, $duration) {
      $letter.addClass('in').removeClass('out');

      if (!$letter.is(':last-child')) {
          setTimeout(function () {
              showLetter($letter.next(), $word, $bool, $duration);
          }, $duration);
      } else {
          if ($word.parents('.cd-headline').hasClass('type')) {
              setTimeout(function () {
                  $word.parents('.cd-words-wrapper').addClass('waiting');
              }, 200);
          }
          if (!$bool) {
              setTimeout(function () {
                  hideWord($word)
              }, animationDelay)
          }
      }
  }

  function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
  }

  function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
  }

  function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
  }
});