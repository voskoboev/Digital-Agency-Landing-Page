'use strict';

// scrollToTop()
// scrollToSolutions();

function scrollToTop() {
  const btn = $('.header__services-btn');

  btn.click(() => {
    $('html, body').animate({scrollTop: 0});
  });
}

function scrollToSolutions() {
  const btn = $('.header__start-btn');
  const position = $('.solutions').offset().top;

  btn.click(() => {
    $('html, body').animate({scrollTop: position});
  });
}