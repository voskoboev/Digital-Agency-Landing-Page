'use strict';

initSlickSlider();
// scrollTo();
popUpSectionsOnScroll();
// manageSolutionsModals();
// toggleTooltipForAddress();
// manageFooterMapModal();
// playClientsVideo();
// activateBrandsPics();

function initSlickSlider() {
  const container = $('.promo__carousel-container');

  container.slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    // arrows: true,
    dots: true,
    variableWidth: true,
    draggable: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // pauseOnHover: true,

    // responsive: [
    //   {
    //     breakpoint: 1350,
    //     settings: {
    //       infinite: true,
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       arrows: true,
    //       dots: true,
    //       // variableWidth: true,
    //       draggable: true,
    //       autoplay: true,
    //       autoplaySpeed: 2000,
    //       pauseOnHover: true,
    //     }
    //   },
    //   {

    //   }
    // ]

  });
}

function scrollTo() {
  const scrollToSections = () => {
    const servicesItems = $('.nav__menu-item--services, .header__services-btn');
    const portfolioItem = $('.nav__menu-item--works');
    const promoItem = $('.nav__menu-item--features');
    const clientsItem = $('.nav__menu-item--about');
    const contactItems = $('.nav__menu-item--contact, .header__start-btn');

    const servicesSection = $('.services');
    const portfolioSection = $('.portfolio');
    const promoSection = $('.promo');
    const clientsSection = $('.clients');
    const contactSection = $('.contact');

    const scrollToCertainSection = (interactItems, positionItem) => {
      const position = positionItem.offset().top;

      interactItems.click(() => {
        $('html, body').animate({ scrollTop: position - 200 }, 1000);
      }); // позиция изменена из-за всплывающих секций, изначальное значение + 50
    }

    scrollToCertainSection(servicesItems, servicesSection);
    scrollToCertainSection(portfolioItem, portfolioSection);
    scrollToCertainSection(promoItem, promoSection);
    scrollToCertainSection(clientsItem, clientsSection);
    scrollToCertainSection(contactItems, contactSection);
  }

  const scrollToTop = () => {
    const homeItem = $('.nav__menu-item--home');

    homeItem.click(() => {
      $('html, body').animate({ scrollTop: 0 }, 1000);
    });
  }

  const scrollToTopOnBtnClick = () => {
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

  scrollToSections();
  scrollToTop();
  scrollToTopOnBtnClick();
}

function popUpSectionsOnScroll() {
  const headerWrapper = $('.header__color-wrapper');
  const solutions = $('.solutions');
  const services = 'services';
  const promo = 'promo';
  const features = 'features';
  const portfolio = 'portfolio';
  const clients = 'clients';
  const brands = 'brands';
  const benefits = 'benefits';
  const contact = 'contact';
  const footer = 'footer';

  $(window).scroll(function () {
    if ($(this).scrollTop() !== 0) {
      solutions.addClass('solutions--active');
      headerWrapper.addClass('header__color-wrapper--active');
    }
  });

  function popUpOnScroll(section) {
    $(window).scroll(function () {
      if ($(this).scrollTop() + $(window).innerHeight() > $(`.${section}`).position().top) {
        $(`.${section}`).addClass(`${section}--active`);
      }
    });
  }

  popUpOnScroll(services);
  popUpOnScroll(promo);
  popUpOnScroll(features);
  popUpOnScroll(portfolio);
  popUpOnScroll(clients);
  popUpOnScroll(brands);
  popUpOnScroll(benefits);
  popUpOnScroll(contact);
  popUpOnScroll(footer);
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

function toggleTooltipForAddress() {
  const address = $('.footer__location');
  const tooltip = $('.footer__adress-tooltip');
  const footerLeft = $('.footer__left');

  address.hover(() => {
    tooltip.addClass('footer__adress-tooltip--active');
  });

  footerLeft.mouseleave(() => {
    tooltip.removeClass('footer__adress-tooltip--active');
  });
}

function manageFooterMapModal() {
  const addressItems = $('.footer__location, .footer__adress-tooltip');
  const mapModal = $('.map-modal');
  const closeBtn = $('.map-modal__close-btn');
  const body = $('body');

  const disableScroll = () => {
    body.addClass('body--active');
  }

  const enableScroll = () => {
    body.removeClass('body--active');
  }

  addressItems.click(() => {
    mapModal.fadeIn();
    disableScroll();
  });

  mapModal.click(function (ev) {
    if (ev.target === this) {
      $(this).fadeOut();
      enableScroll();
    }
  });

  closeBtn.click(() => {
    mapModal.fadeOut();
    enableScroll();
  });
}




function playClientsVideo() {
  const videoAndPlayBtn = $('.clients__video, .clients__video-btn');
  const video = $('.clients__video');
  const playBtn = $('.clients__video-btn');

  video.click(function () {
    playBtn.addClass('clients__video-btn-play--hidden');

    if ($(this).attr('controls') === undefined) {
      $(this).attr('controls', 'controls');
    }
  });

  playBtn.click(function () {
    $(this).addClass('clients__video-btn-play--hidden');
    video.trigger('play');

    if (video.attr('controls') === undefined) {
      video.attr('controls', 'controls');
    }
  });

  videoAndPlayBtn.hover(() => {
    playBtn.toggleClass('clients__video-btn-play--active');
  });
}

// function displayFeature() {

//     var $magic = $(".magic"),
//       magicWHalf = $magic.width() / 2;
//     $(document).on("mousemove", function(e) {
//       $magic.css({
//         "left": e.pageX - magicWHalf,
//         "top": e.pageY - magicWHalf
//       });
//     });
// }

// function displayFeature();

function activateBrandsPics() {
  const firstPic = $('.brands__pic--first');
  const secondPic = $('.brands__pic--second');
  const thirdPic = $('.brands__pic--third');
  const fourthPic = $('.brands__pic--fourth');
  const activationClass = 'brands__pic--active';
  const activationTime = 2000;

  function activatePicsConsecutively() {
    setTimeout(() => {
      firstPic.addClass(activationClass);
      fourthPic.removeClass(activationClass);
      setTimeout(() => {
        secondPic.addClass(activationClass);
        firstPic.removeClass(activationClass);
        setTimeout(() => {
          thirdPic.addClass(activationClass);
          secondPic.removeClass(activationClass);
          setTimeout(() => {
            fourthPic.addClass(activationClass);
            thirdPic.removeClass(activationClass);
            setTimeout(() => {
              activatePicsConsecutively();
            }, 0)
          }, activationTime);
        }, activationTime);
      }, activationTime);
    }, activationTime);
  }

  activatePicsConsecutively();
}


