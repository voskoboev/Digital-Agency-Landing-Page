'use strict';

// scrollToPoint();
// manageSolutionsModals();

// scrollToTopBtnClick();

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
      $('html, body').animate({ scrollTop: position + 50 }, 1000);
    });
  }

  function scrollToPortfolio() {
    const worksItem = $('.nav__menu-item--works');
    const position = $('.portfolio').offset().top;

    worksItem.click(() => {
      $('html, body').animate({ scrollTop: position + 50 }, 1000);
    });
  }

  function scrollToOrder() {
    const contactItem = $('.nav__menu-item--contact, .header__start-btn');
    const position = $('.order').offset().top;

    contactItem.click(() => {
      $('html, body').animate({ scrollTop: position + 50 }, 1000);
    });
  }

  function scrollToPromo() {
    const featuresItem = $('.nav__menu-item--features');
    const position = $('.promo').offset().top;

    featuresItem.click(() => {
      $('html, body').animate({ scrollTop: position + 50 }, 1000);
    });
  }

  function scrollToClients() {
    const aboutItem = $('.nav__menu-item--about');
    const position = $('.clients').offset().top;

    aboutItem.click(() => {
      $('html, body').animate({ scrollTop: position + 50 }, 1000);
    });
  }
}

function manageSolutionsModals() {
  const body = $('body');

  const cardFirst = $('.solutions__card--first');
  const cardSecond = $('.solutions__card--second');
  const cardThird = $('.solutions__card--third');

  const modalFirst = $('.card-modal--first');
  const modalSecond = $('.card-modal--second');
  const modalThird = $('.card-modal--third');

  const disableScroll = () => {
    body.addClass('body--active');
  }

  const enableScroll = () => {
    body.removeClass('body--active');
  }

  const fadeInModal = (card, modal) => {
    card.click(() => {
      modal.fadeIn();

      disableScroll();
    });
  }

  const fadeOutModalAndStopVideo = modal => {
    const modalAttr = modal.find('iframe').attr('src');

    modal.click(function (ev) {
      if (ev.target === this) {
        $(this).find('iframe').attr('src', modalAttr);
        $(this).fadeOut();
        enableScroll();
      }
    });
  }

  const closeBtnFadeOutModalAndStopVideo = modal => {
    const btn = $('.card-modal__close-btn');
    const modalAttr = modal.find('iframe').attr('src');

    btn.click(() => {
      modal.find('iframe').attr('src', modalAttr);
      modal.fadeOut();
      enableScroll();
    });
  }

  fadeInModal(cardFirst, modalFirst);
  fadeInModal(cardSecond, modalSecond);
  fadeInModal(cardThird, modalThird);

  fadeOutModalAndStopVideo(modalFirst);
  fadeOutModalAndStopVideo(modalSecond);
  fadeOutModalAndStopVideo(modalThird);

  closeBtnFadeOutModalAndStopVideo(modalFirst);
  closeBtnFadeOutModalAndStopVideo(modalSecond);
  closeBtnFadeOutModalAndStopVideo(modalThird);
}

function scrollToTopBtnClick() {
  const btn = $('.scroll-top-btn');

  $(window).scroll(() => {
    const solutionsPosition = $('.solutions').offset().top;
    const windowPosition = $(window).scrollTop();

    if (windowPosition > solutionsPosition) {
      btn.addClass('scroll-top-btn--active');
    } else {
      btn.removeClass('scroll-top-btn--active');
    }
  });

  btn.click(() => {
    $('html, body').animate({ scrollTop: 0 }, 1000);
  });
}

