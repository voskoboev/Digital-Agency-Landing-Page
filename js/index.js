'use strict';

scrollToPoint();

function scrollToPoint() {
  scrollToTop();
  scrollToServices();
  scrollToPortfolio();
  scrollToOrder();
  scrollToPromo();
  scrollToClients();

  function scrollToTop() {
    const homeItem = $('.nav__menu-item--home');

    homeItem.click(() => {
      $('html, body').animate({ scrollTop: 0 }, 1000);
    });
  }

  function scrollToServices() {
    const servicesItem = $('.nav__menu-item--services, .header__services-btn');
    const position = $('.services').offset().top;

    servicesItem.click(() => {
      $('html, body').animate({ scrollTop: position + 50}, 1000);
    });
  }

  function scrollToPortfolio() {
    const worksItem = $('.nav__menu-item--works');
    const position = $('.portfolio').offset().top;

    worksItem.click(() => {
      $('html, body').animate({ scrollTop: position + 50}, 1000);
    });
  }

  function scrollToOrder() {
    const contactItem = $('.nav__menu-item--contact');
    const position = $('.order').offset().top;

    contactItem.click(() => {
      $('html, body').animate({ scrollTop: position + 50}, 1000);
    });
  }

  function scrollToPromo() {
    const featuresItem = $('.nav__menu-item--features');
    const position = $('.promo').offset().top;

    featuresItem.click(() => {
      $('html, body').animate({ scrollTop: position + 50}, 1000);
    });
  }

  function scrollToClients() {
    const aboutItem = $('.nav__menu-item--about');
    const position = $('.clients').offset().top;

    aboutItem.click(() => {
      $('html, body').animate({ scrollTop: position + 50}, 1000);
    });
  }
}


