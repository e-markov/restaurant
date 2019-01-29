//WOW - delay animation when scrolling
var wow = new WOW(
  {
    boxClass:     'wow',
    animateClass: 'animated',
    offset:       100,
    mobile:       true,
    live:         true,
    callback:     function(box) {
    },
    scrollContainer: null,
    resetAnimation: true,
  }
);
wow.init();

$(function() {
  $('a[href^="#"]').on('click', function(event) {
    event.preventDefault();
    var section = $(this).attr("href"),
        top = $(section).offset().top;
    $('html, body').animate({scrollTop: top}, 500);
  });
});

$(function() {
    $('.header-icon').on('click', function() {
      $('.header').toggleClass('header-open');
    });
    $('.header-bar-item').on('click', function () {
      $('.header').removeClass('header-open');
  });
});

$(function() {
  $(window).scroll(function() {
    var header = $('.header, .header-logo');
    header.toggleClass('scrolled', $(this).scrollTop() > header.height());
  });
});