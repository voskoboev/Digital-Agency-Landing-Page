'use strict';

initPromoSlickSlider();

scrollTo();
popUpSectionsOnScroll();

manageHeaderMobileMenu();
manageSolutionsModals();
// togglePortfolioTabs();
// playClientsVideo();
// activateBrandsPics();

manageContactForm();
manageFooterForm();

// manageFooterMapModal();


function initPromoSlickSlider() {
  const container = $('.promo__carousel-container');

  container.slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dots: true,
    variableWidth: true,
    draggable: true,

    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          autoplay: false,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          variableWidth: false,
          autoplay: false
        }
      }
    ]
  });
}

function scrollTo() {
  scrollToSections();
  scrollToTop();
  scrollToTopOnPopUpBtnClick();

  function showAllPortfolioTabs() {
    const portfolioTabs = $('.portfolio__projects-list-item');

    portfolioTabs.fadeIn()
  }

  function scrollToSections() {
    const servicesItems = $('.nav__menu-item--services, .header__services-btn');
    const portfolioItem = $('.nav__menu-item--works');
    const promoItem = $('.nav__menu-item--features');
    const clientsItem = $('.nav__menu-item--about');
    const contactItems = $('.nav__menu-item--contact, .header__start-btn, .promo__btn, .clients__btn');

    const servicesSection = $('.services');
    const portfolioSection = $('.portfolio');
    const promoSection = $('.promo');
    const clientsSection = $('.clients');
    const contactSection = $('.contact');

    scrollToCertainSection(servicesItems, servicesSection);
    scrollToCertainSection(portfolioItem, portfolioSection);
    scrollToCertainSection(promoItem, promoSection);
    scrollToCertainSection(clientsItem, clientsSection);
    scrollToCertainSection(contactItems, contactSection);

    function scrollToCertainSection(interactItems, positionItem) {
      const position = positionItem.offset().top;

      interactItems.click(() => {
        showAllPortfolioTabs();
        $('html, body').animate({ scrollTop: position - 200 }, 1000);
      }); // позиция изменена из-за всплывающих секций, изначальное значение + 50
    }
  }

  function scrollToTop() {
    const homeItem = $('.nav__menu-item--home');

    homeItem.click(() => {
      $('html, body').animate({ scrollTop: 0 }, 1000);
      showAllPortfolioTabs();
    });
  }

  function scrollToTopOnPopUpBtnClick() {
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
      showAllPortfolioTabs()
      $('html, body').animate({ scrollTop: 0 }, 1000);
    });
  }
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

  popUpOnScroll(services);
  popUpOnScroll(promo);
  popUpOnScroll(features);
  popUpOnScroll(portfolio);
  popUpOnScroll(clients);
  popUpOnScroll(brands);
  popUpOnScroll(benefits);
  popUpOnScroll(contact);
  popUpOnScroll(footer);

  // $(window).scroll(function () {
  //   if ($(this).scrollTop() !== 0) {
  //     solutions.addClass('solutions--active');
  //     headerWrapper.addClass('header__color-wrapper--active');
  //   }
  // });

  function popUpOnScroll(section) {
    if ($(window).innerWidth() >= 1024) {
      $(window).scroll(function () {
        if ($(this).scrollTop() + $(window).innerHeight() > $(`.${section}`).position().top) {
          $(`.${section}`).addClass(`${section}--active`);
        } else {
          return;
        }
      });
    }
  }
}

function manageSolutionsModals() {
  const body = $('body');
  const cardFirst = $('.solutions__card--first');
  const cardSecond = $('.solutions__card--second');
  const cardThird = $('.solutions__card--third');

  const modalFirst = $('.modal-window__solutions-item--first');
  const modalSecond = $('.modal-window__solutions-item--second');
  const modalThird = $('.modal-window__solutions-item--third');

  const mobileBtn = $('.header__nav-mobile-btn');

  fadeInModal(cardFirst, modalFirst);
  fadeInModal(cardSecond, modalSecond);
  fadeInModal(cardThird, modalThird);

  fadeOutModalAndStopVideo(modalFirst);
  fadeOutModalAndStopVideo(modalSecond);
  fadeOutModalAndStopVideo(modalThird);

  fadeOutModalAndStopVideoOnCloseBtnClick(modalFirst);
  fadeOutModalAndStopVideoOnCloseBtnClick(modalSecond);
  fadeOutModalAndStopVideoOnCloseBtnClick(modalThird);

  function disableScroll() {
    body.addClass('body--active');
  }

  function enableScroll() {
    body.removeClass('body--active');
  }

  function fadeInModal(card, modal) {
    card.click(() => {
      modal.fadeIn();
      mobileBtn.hide();
      disableScroll();
    });
  }

  function fadeOutModalAndStopVideo(modal) {
    const modalAttr = modal.find('iframe').attr('src');

    if ($(window).innerWidth() > 600) {
      modal.click(function (ev) {
        if (ev.target === this) {
          $(this).find('iframe').attr('src', modalAttr);
          $(this).fadeOut();
          mobileBtn.show();
          enableScroll();
        }
      });
    }
  }

  function fadeOutModalAndStopVideoOnCloseBtnClick(modal) {
    // const btn = $('.modal-window__solutions-close-btn');
    const btn = $('.modal-window__close-btn');
    const modalAttr = modal.find('iframe').attr('src');

    btn.click(() => {
      modal.find('iframe').attr('src', modalAttr);
      modal.fadeOut();
      mobileBtn.show();
      enableScroll();
    });
  }
}


function manageFooterMapModal() {
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

  toggleTooltipForAddress();


  const addressItems = $('.footer__location, .footer__adress-tooltip');
  const mapModal = $('.map-modal');
  const closeBtn = $('.map-modal__close-btn');
  const body = $('body');

  const scrollToTopBtn = $('.scroll-top-btn');
  const scrollToTopBtnActive = 'scroll-top-btn--active';

  function disableScroll() {
    body.addClass('body--active');
  }

  function enableScroll() {
    body.removeClass('body--active');
  }

  addressItems.click(() => {
    mapModal.fadeIn();
    scrollToTopBtn.removeClass(scrollToTopBtnActive);
    disableScroll();
  });

  mapModal.click(function (ev) {
    if (ev.target === this) {
      $(this).fadeOut();
      scrollToTopBtn.addClass(scrollToTopBtnActive);
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

function activateBrandsPics() {
  const firstPic = $('.brands__pic:first');
  const secondPic = $('.brands__pic:nth-child(2)');
  const thirdPic = $('.brands__pic:nth-child(3)');
  const fourthPic = $('.brands__pic:last');
  const activationClass = 'brands__pic--active';
  const activationTime = 2000;

  const activatePicsConsecutively = function activate() {
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
            activate();
          }, activationTime);
        }, activationTime);
      }, activationTime);
    }, activationTime);
  }

  activatePicsConsecutively();
}

function manageContactForm() {
  const form = $('.contact__form');
  const formInputs = $('.contact__form-input');
  const formTooltips = $('.tooltip__contact-form-item');
  const tooltipText = $('.tooltip__text');
  const submitBtn = $('.contact__form-input--submit');
  const tooltipActivationClass = 'tooltip--active';

  function checkFormAndSubmitFormValues() {
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

    function checkAggregatedCallsForAjax() {
      return checkEmptyValue(inputName, inputNameTooltip) &&
        checkLength(inputName, inputNameTooltip, 100) &&
        checkEmptyValue(inputCompany, inputCompanyTooltip) &&
        checkLength(inputCompany, inputCompanyTooltip, 100) &&
        checkEmptyValue(inputEmail, inputEmailTooltip) &&
        checkLength(inputEmail, inputEmailTooltip, 100) &&
        checkEmailCharTypes(inputEmail, inputEmailTooltip) &&
        checkEmptyValue(inputService, inputServiceTooltip) &&
        checkEmptyValue(inputTextarea, inputTextareaTooltip) &&
        checkLength(inputTextarea, inputTextareaTooltip, 2500);
    }

    $.ajax({
      url: '/php/mail.php', // ? /
      type: 'POST',
      data: form.serialize(),
      beforeSend: () => {
        return checkAggregatedCallsForAjax();
      },
      success: () => {
        toggleFormModal();

        console.log('success'); // убрать

        form.trigger('reset');
      },
      error: () => {
        console.log('failed'); // убрать
        changeFormModalText();
        toggleFormModal();

        // form.trigger('reset');
      }
    });

    $('.modal-window__contact-form-item').find('p').text('Your message has been sent');
  }

  submitBtn.click(ev => {
    ev.preventDefault();
    checkFormAndSubmitFormValues();
  });

  form.keypress(ev => {
    if (ev.which === 13) {
      ev.preventDefault();
      checkFormAndSubmitFormValues();
    }

    return;
  });

  formInputs.focus(() => {
    formTooltips.removeClass(tooltipActivationClass)
    tooltipText.text('Enter a value');
  });
}

function togglePortfolioTabs() {
  const allMenuItem = $('.portfolio__menu-item--all');
  const webMenuItem = $('.portfolio__menu-item--web');
  const adMenuItem = $('.portfolio__menu-item--ad');
  const brandingMenuItem = $('.portfolio__menu-item--branding');
  const designMenuItem = $('.portfolio__menu-item--design');

  const allListItems = $('.portfolio__projects-list-item');
  const webListItems = $('.portfolio__projects-list-item--web');
  const adListItems = $('.portfolio__projects-list-item--ad');
  const brandingListItems = $('.portfolio__projects-list-item--branding');
  const designListItems = $('.portfolio__projects-list-item--design');

  toggleTabs(allMenuItem, allListItems, allListItems);
  toggleTabs(webMenuItem, webListItems, allListItems);
  toggleTabs(adMenuItem, adListItems, allListItems);
  toggleTabs(brandingMenuItem, brandingListItems, allListItems);
  toggleTabs(designMenuItem, designListItems, allListItems);

  function toggleTabs(menuItem, listItem, allListItems) {
    menuItem.click(() => {
      allListItems.hide();
      allListItems.addClass('portfolio__projects-list-item--active');
      listItem.fadeIn();

      if (menuItem === allMenuItem) {
        allListItems.removeClass('portfolio__projects-list-item--active');
      }
    });
  }
}

function manageHeaderMobileMenu() {
  const body = $('body');
  const mobileBtn = $('.header__nav-mobile-btn');
  const navMenu = $('.nav__menu');
  const menuItems = $('.nav__menu-item');

  function activateScrollAndCloseMenu() {
    body.removeClass('body--active');
    navMenu.removeClass('nav__menu--active');
  }

  mobileBtn.click(() => {
    navMenu.toggleClass('nav__menu--active');
    body.toggleClass('body--active');
  });

  menuItems.click(() => {
    activateScrollAndCloseMenu();
  });

  navMenu.click(function (ev) {
    if (ev.target === this) {
      activateScrollAndCloseMenu();
    }
  });
}

// =========== toggle form modal for contacts and footer ===========

function toggleFormModal() {
  const body = $('body');
  const modal = $('.modal-window__form-item');
  const modalCloseBtn = $('.modal-window__form-close-btn');

  const scrollToTopBtn = $('.scroll-top-btn');
  const scrollToTopBtnActive = 'scroll-top-btn--active';

  function disableScroll() {
    body.addClass('body--active');
  }

  function enableScroll() {
    body.removeClass('body--active');
  }

  modal.fadeIn();
  scrollToTopBtn.removeClass(scrollToTopBtnActive);
  disableScroll();

  modal.click(function (ev) {
    if (ev.target === this) {
      $(this).fadeOut();
      scrollToTopBtn.addClass(scrollToTopBtnActive);
      enableScroll();
    }
  });

  modalCloseBtn.click(function () {
    $(this)
      .parent()
      .fadeOut();
    scrollToTopBtn.addClass(scrollToTopBtnActive);
    enableScroll();
  });
}

function changeFormModalText() {
  const modal = $('.modal-window__form-item');
  modal
    .find('p')
    .text('Your message has not been sent. Try again later');
}

// =========== /toggle form modal or contacts and footer ===========

function manageFooterForm() {
  const submitBtn = $('.form__input--submit');
  const form = $('.footer__form');

  function checkFormAndSubmitValues() {
    const input = $('.footer__form-input--email');
    const inputProtectedValue = $('.footer__form-input--email').val().toString().trim();

    const tooltip = $('.tooltip__footer-form-item');
    const tooltipText = tooltip.find('p');
    const tooltipActivationClass = 'tooltip--active';
    const length = 50;

    function checkInputsForAjax() {
      function activateTooltip() {
        tooltip.addClass(tooltipActivationClass);
      }

      if (inputProtectedValue === null ||
        inputProtectedValue === '') {
        activateTooltip();
        return false;
      }

      if (inputProtectedValue.includes('@') === false ||
        inputProtectedValue.includes('.') === false) {
        tooltipText.text('Enter correct email');
        activateTooltip();
        return false;
      }

      if (inputProtectedValue.length > length) {
        tooltipText.text(`Max number of letters is ${length}`);
        activateTooltip();
        return false;
      }

      tooltip.removeClass(tooltipActivationClass);
      return true;
    }

    tooltipText.text('Enter a value');

    $.ajax({
      url: '/php/mail.php', // ? 
      type: 'POST',
      data: form.serialize(),
      beforeSend: () => {
        return checkInputsForAjax();
      },
      success: () => {
        toggleFormModal();

        // console.log('success'); // убрать
        form.trigger('reset');
      },
      error: () => {
        // console.log('failed'); // убрать

        changeFormModalText();
        toggleFormModal();

        // form.trigger('reset');
      }
    });

    input.focus(() => {
      tooltip.removeClass(tooltipActivationClass);
      tooltipText.text('Enter a value');
    });
  }

  submitBtn.click(ev => {
    ev.preventDefault();
    checkFormAndSubmitValues();
  })

  form.keypress(ev => {
    if (ev.which === 13) {
      ev.preventDefault();
      checkFormAndSubmitValues();
    }
  });
}



function changeIframeOrientation() {

  const modal = document.querySelector('.modal-window__solutions-item--first');

  const iframe = document.querySelector('.modal-window__solutions-video');

  // modal.style.display = 'block';

  if ($(window).innerWidth() < 600) {

    // modal.style.display = 'flex';
    // modal.style.justifyContent = 'center'
    // modal.style.alignItems = 'center';


    // iframe.style.transform = 'rotate(90deg)';
  }


  // iframe.style.height = document.body.clientWidth + 'px';
  // iframe.style.width = document.body.clientHeight + 'px';

  // iframe.style.height = '100%'
  // iframe.style.width = '100%'

}

changeIframeOrientation();


