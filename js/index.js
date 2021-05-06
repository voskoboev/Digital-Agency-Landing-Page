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
  // const headerWrapper = $('.header__color-wrapper');
  // const solutions = $('.solutions');
  const services = 'services';
  const promo = 'promo';
  const features = 'features';
  const portfolio = 'portfolio';
  const clients = 'clients';
  const brands = 'brands';
  const benefits = 'benefits';
  const contact = 'contact';
  const footer = 'footer';

  // $(window).scroll(function () {
  //   if ($(this).scrollTop() !== 0) {
  //     solutions.addClass('solutions--active');
  //     headerWrapper.addClass('header__color-wrapper--active');
  //   }
  // });

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
  const video = $('.clients__video');
  const playBtn = $('.clients__video-btn');
  const videoAndPlayBtn = $('.clients__video, .clients__video-btn');

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
  const firstPic = $('.brands__pic:first');
  const secondPic = $('.brands__pic:nth-child(2)');
  const thirdPic = $('.brands__pic:nth-child(3)');
  const fourthPic = $('.brands__pic:last');
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
            activatePicsConsecutively();
          }, activationTime);
        }, activationTime);
      }, activationTime);
    }, activationTime);
  }

  activatePicsConsecutively();
}

// manageContactForm() {

// }

// function validateContactForm() {
//   const formInputs = $('.contact__form-input');
//   const formTooltips = $('.tooltip__contact-form-item');
//   const tooltipText = $('.tooltip__text');
//   const submitBtn = $('.contact__form-input--submit');
//   const tooltipActivationClass = 'tooltip--active';

//   // submitBtn.click(ev => {

//   const inputName = $('.contact__form-input--name');
//   const inputCompany = $('.contact__form-input--company');
//   const inputEmail = $('.contact__form-input--email');
//   const inputService = $('.contact__form-input--service');
//   const inputTextarea = $('.contact__form-input--textarea');

//   const inputNameTooltip = $('.contact__form-input--name-tooltip');
//   const inputCompanyTooltip = $('.contact__form-input--company-tooltip');
//   const inputEmailTooltip = $('.contact__form-input--email-tooltip');
//   const inputServiceTooltip = $('.contact__form-input--service-tooltip');
//   const inputTextareaTooltip = $('.contact__form-input--textarea-tooltip');

// ev.preventDefault();

// function checkEmptyValue(input, tooltip) {
//   const inputValue = input.val();

//   if (inputValue === null || inputValue.toString().trim() === '') {
//     tooltip.addClass(tooltipActivationClass);
//     return; // ?
//   }
// }

// function checkEmailCharTypes(emailInput, emailTooltip) {
//   const inputValue = emailInput.val().toString().trim();
//   const emailTooltipText = emailTooltip.find('p')

//   if (inputValue === '') {
//     return;
//   }

//   if (inputValue.includes('@') === false
//     || inputValue.includes('.') === false) {
//     emailTooltipText.text('Enter correct email');
//     emailTooltip.addClass(tooltipActivationClass);
//     return; // ?
//   }
// }

// function checkLength(input, tooltip, length) {
//   const inputValue = input.val().toString().trim();
//   const tooltipText = tooltip.find('p');

//   if (inputValue.length > length) {
//     tooltipText.text(`Max number of letters is ${length}`);
//     tooltip.addClass(tooltipActivationClass);
//     return; // ?
//   }
// }


// checkEmptyValue(inputName, inputNameTooltip);
// checkEmptyValue(inputCompany, inputCompanyTooltip);
// checkEmptyValue(inputEmail, inputEmailTooltip);
// checkEmptyValue(inputService, inputServiceTooltip);
// checkEmptyValue(inputTextarea, inputTextareaTooltip);

// checkEmailCharTypes(inputEmail, inputEmailTooltip);

// checkLength(inputName, inputNameTooltip, 100);
// checkLength(inputCompany, inputCompanyTooltip, 100);
// checkLength(inputEmail, inputEmailTooltip, 100);
// checkLength(inputTextarea, inputTextareaTooltip, 2500);

// });

// formInputs.focus(function () {
//   formTooltips.removeClass(tooltipActivationClass)
//   tooltipText.text('Enter value!');
// });
// }

// validateContactForm();

function submitContactForm() {
  const form = $('.contact__form');
  const formInputs = $('.contact__form-input');
  const formTooltips = $('.tooltip__contact-form-item');
  const tooltipText = $('.tooltip__text');
  const submitBtn = $('.contact__form-input--submit');
  const tooltipActivationClass = 'tooltip--active';

  // form.keypress(ev => {
  //   if (ev.which === 13) {
  //     alert('You pressed enter!');
  //   }
  // });

  submitBtn.click(function (ev) {
    const inputName = $('.contact__form-input--name');
    const inputCompany = $('.contact__form-input--company');
    const inputEmail = $('.contact__form-input--email');
    const inputService = $('.contact__form-input--service');
    const inputTextarea = $('.contact__form-input--textarea');

    const inputNameTooltip = $('.contact__form-input--name-tooltip');
    const inputCompanyTooltip = $('.contact__form-input--company-tooltip');
    const inputEmailTooltip = $('.contact__form-input--email-tooltip');
    const inputServiceTooltip = $('.contact__form-input--service-tooltip');
    const inputTextareaTooltip = $('.contact__form-input--textarea-tooltip');

    ev.preventDefault();

    function checkEmptyValue(input, tooltip) {
      const inputValue = input.val();

      if (inputValue === null || inputValue.toString().trim() === '') {
        tooltip.addClass(tooltipActivationClass);
        return false;
      }

      return true;
    }

    function checkEmailCharTypes(emailInput, emailTooltip) {
      const inputValue = emailInput.val().toString().trim();
      const emailTooltipText = emailTooltip.find('p')

      if (inputValue === '') {
        return false;
      }

      if (inputValue.includes('@') === false
        || inputValue.includes('.') === false) {
        emailTooltipText.text('Enter correct email');
        emailTooltip.addClass(tooltipActivationClass);
        return false;
      }

      return true;
    }

    function checkLength(input, tooltip, length) {
      const inputValue = input.val().toString().trim();
      const tooltipText = tooltip.find('p');

      if (inputValue.length > length) {
        tooltipText.text(`Max number of letters is ${length}`);
        tooltip.addClass(tooltipActivationClass);
        return false;
      }

      return true;
    }

    const checkAggregatedCallsForAjax = () => {
      const result =
        checkEmptyValue(inputName, inputNameTooltip) &&
          checkLength(inputName, inputNameTooltip, 100) &&
          checkEmptyValue(inputCompany, inputCompanyTooltip) &&
          checkLength(inputCompany, inputCompanyTooltip, 100) &&
          checkEmptyValue(inputEmail, inputEmailTooltip) &&
          checkLength(inputEmail, inputEmailTooltip, 100) &&
          checkEmailCharTypes(inputEmail, inputEmailTooltip) &&
          checkEmptyValue(inputService, inputServiceTooltip) &&
          checkEmptyValue(inputTextarea, inputTextareaTooltip) &&
          checkLength(inputTextarea, inputTextareaTooltip, 2500)
          ? true : false;

      return result;
    }

    // form.submit(function (ev) {

    function startAjaxSending() {
      $.ajax({
        url: '/php/mail.php', // ? /
        type: 'POST',
        data: form.serialize(),
        beforeSend: () => {
          return checkAggregatedCallsForAjax();
        },
        success: function () {

          console.log('success'); // убрать

          form.trigger('reset');

        },
        error: function () {
          console.log('failed'); // убрать
        }
      });
    }

    startAjaxSending();

  });

  function clearInputsAndRecoverText() {
    formInputs.focus(() => {
      formTooltips.removeClass(tooltipActivationClass)
      tooltipText.text('Enter value!');
    });
  }

  clearInputsAndRecoverText()


  function showModal() {
    const body = $('body');

    body.prepend()
  }
}

submitContactForm();
