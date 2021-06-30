'use strict'

/*
Slick slider init fn call must be over fns with
scroll handler's events because of compatibility issues.
*/
initPromoSlickSlider()

// These fns are used on the whole web page.
scrollTo()
popUpSectionsOnScroll()

// These fns are used on certain sections.
manageHeaderMobileMenu()
manageSolutionsModals()
togglePortfolioTabs()
playClientsVideo()
// activateBrandsPics()
manageContactForm()
manageFooterForm()
manageFooterMapModal()

function initPromoSlickSlider() {
  const $container = $('.promo__carousel-container')

  $container.slick({
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
          autoplay: false
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
  })
}

function scrollTo() {
  /* 
  This fn provides correct scroll to sections after tabs were toggled.
  */
  function showAllPortfolioTabs() {
    const $portfolioTabs = $('.portfolio__projects-list-item')

    $portfolioTabs.fadeIn()
  }

  function scrollToSections() {
    const $body = $('body')
    const $servicesItems = $(`
    .nav__menu-item--services, 
    .header__btn--services
    `)
    const $portfolioItem = $('.nav__menu-item--works')
    const $promoItem = $('.nav__menu-item--features')
    const $clientsItem = $('.nav__menu-item--about')
    const $contactItems = $(
      `.nav__menu-item--contact, 
      .header__btn--start, 
      .promo__btn, 
      .clients__btn`
    )

    const $servicesSection = $('.services')
    const $portfolioSection = $('.portfolio')
    const $promoSection = $('.promo')
    const $clientsSection = $('.clients')
    const $contactSection = $('.contact')

    function scrollToCertainSection(interactItems, positionItem) {
      const position = positionItem.offset().top

      let verticalOffset = 200 // An offset is determined and changed by visual user experience.

      if ($body.width() < 1024) {
        verticalOffset = -50
      }

      if ($body.width() < 325) {
        verticalOffset = -100
      }

      interactItems.on('click', () => {
        showAllPortfolioTabs()
        $('html, body').animate({ scrollTop: position - verticalOffset }, 1000)
      })
    }

    scrollToCertainSection($servicesItems, $servicesSection)
    scrollToCertainSection($portfolioItem, $portfolioSection)
    scrollToCertainSection($promoItem, $promoSection)
    scrollToCertainSection($clientsItem, $clientsSection)
    scrollToCertainSection($contactItems, $contactSection)
  }

  function scrollToTop() {
    const $homeItems = $('.nav__menu-item--home, .footer__logo-img')

    $homeItems.on('click', () => {
      $('html, body').animate({ scrollTop: 0 }, 1000)
      showAllPortfolioTabs()
    })
  }

  function scrollToTopOnPopUpBtnClick() {
    /* 
    Button in this fn is placed in the right bottom corner of the window. 
    */
    const $btn = $('.scroll-top-btn')

    $(window).on('scroll', () => {
      const solutionsPosition = $('.solutions').offset().top
      const windowPosition = $(window).scrollTop()

      if (windowPosition > solutionsPosition) {
        $btn.addClass('scroll-top-btn--active')
      } else {
        $btn.removeClass('scroll-top-btn--active')
      }
    })

    $btn.on('click', () => {
      showAllPortfolioTabs()
      $('html, body').animate({ scrollTop: 0 }, 1000)
    })
  }

  scrollToSections()
  scrollToTop()
  scrollToTopOnPopUpBtnClick()
}

function popUpSectionsOnScroll() {
  function popUpOnScroll(sectionName) {
    $(window).on('scroll', function () {
      if (
        $(this).scrollTop() + $(window).innerHeight() >
        $(`.${sectionName}`).position().top
      ) {
        $(`.${sectionName}`).addClass(`${sectionName}--active`)
      }
    })
  }

  popUpOnScroll('services')
  popUpOnScroll('promo')
  popUpOnScroll('features')
  popUpOnScroll('portfolio')
  popUpOnScroll('clients')
  popUpOnScroll('brands')
  popUpOnScroll('benefits')
  popUpOnScroll('contact')
  popUpOnScroll('footer')
}

function manageHeaderMobileMenu() {
  const $body = $('body')
  const $mobileBtn = $('.header__nav-mobile-btn')
  const $navMenu = $('.nav__menu')
  const $menuItems = $('.nav__menu-item')

  function activateScrollAndCloseMenu() {
    $body.removeClass('body--inactive')
    $navMenu.removeClass('nav__menu--active')
  }

  $mobileBtn.on('click', () => {
    $navMenu.toggleClass('nav__menu--active')
    $body.toggleClass('body--inactive')
  })

  $menuItems.on('click', () => {
    activateScrollAndCloseMenu()
  })

  $navMenu.on('click', function (ev) {
    if (ev.target === this) {
      activateScrollAndCloseMenu()
    }
  })
}

function manageSolutionsModals() {
  const $body = $('body')
  const $cardFirst = $('.solutions__card--first')
  const $cardSecond = $('.solutions__card--second')
  const $cardThird = $('.solutions__card--third')

  const $modalFirst = $('.modal-window__solutions-item--first')
  const $modalSecond = $('.modal-window__solutions-item--second')
  const $modalThird = $('.modal-window__solutions-item--third')

  const $mobileBtn = $('.header__nav-mobile-btn')

  function disableScroll() {
    $body.addClass('body--inactive')
  }

  function enableScroll() {
    $body.removeClass('body--inactive')
  }

  function fadeInModal(card, modal) {
    card.on('click', () => {
      modal.fadeIn()
      $mobileBtn.hide()
      disableScroll()
    })
  }

  function fadeOutModalAndStopVideo(modal) {
    const modalAttr = modal.find('iframe').attr('src')

    if ($body.width() > 600) {
      modal.on('click', function (ev) {
        if (ev.target === this) {
          $(this).find('iframe').attr('src', modalAttr) // Stops a video after a modal has been closed.
          $(this).fadeOut()
          $mobileBtn.show()
          enableScroll()
        }
      })
    }
  }

  function fadeOutModalAndStopVideoOnCloseBtnClick(modal) {
    const $btn = $('.modal-window__close-btn')
    const modalAttr = modal.find('iframe').attr('src')

    $btn.on('click', () => {
      modal.find('iframe').attr('src', modalAttr) // Stops a video after a modal has been closed.
      modal.fadeOut()
      $mobileBtn.show()
      enableScroll()
    })
  }

  fadeInModal($cardFirst, $modalFirst)
  fadeInModal($cardSecond, $modalSecond)
  fadeInModal($cardThird, $modalThird)

  fadeOutModalAndStopVideo($modalFirst)
  fadeOutModalAndStopVideo($modalSecond)
  fadeOutModalAndStopVideo($modalThird)

  fadeOutModalAndStopVideoOnCloseBtnClick($modalFirst)
  fadeOutModalAndStopVideoOnCloseBtnClick($modalSecond)
  fadeOutModalAndStopVideoOnCloseBtnClick($modalThird)
}

function playClientsVideo() {
  const $video = $('.clients__video')
  const $playBtn = $('.clients__video-btn')
  const $videoAndPlayBtn = $('.clients__video, .clients__video-btn')

  $video.on('click', function () {
    $playBtn.addClass('clients__video-btn-play--hidden')

    if ($(this).attr('controls') === undefined) {
      $(this).attr('controls', 'controls')
    }
  })

  $playBtn.on('click', function () {
    $(this).addClass('clients__video-btn-play--hidden')
    $video.trigger('play')

    if ($video.attr('controls') === undefined) {
      $video.attr('controls', 'controls')
    }
  })

  $videoAndPlayBtn.on('hover', () => {
    $playBtn.toggleClass('clients__video-btn-play--active')
  })
}

function activateBrandsPics() {
  const $firstPic = $('.brands__pic--first')
  const $secondPic = $('.brands__pic--second')
  const $thirdPic = $('.brands__pic--third')
  const $fourthPic = $('.brands__pic--fourth')
  const activationClass = 'brands__pic--active'
  const activationTime = 2000

  const activatePicsConsecutively = function activate() {
    setTimeout(() => {
      $firstPic.addClass(activationClass)
      $fourthPic.removeClass(activationClass)
      setTimeout(() => {
        $secondPic.addClass(activationClass)
        $firstPic.removeClass(activationClass)
        setTimeout(() => {
          $thirdPic.addClass(activationClass)
          $secondPic.removeClass(activationClass)
          setTimeout(() => {
            $fourthPic.addClass(activationClass)
            $thirdPic.removeClass(activationClass)
            activate()
          }, activationTime)
        }, activationTime)
      }, activationTime)
    }, activationTime)
  }

  activatePicsConsecutively()
}

function togglePortfolioTabs() {
  const $allMenuItem = $('.portfolio__menu-item--all')
  const $webMenuItem = $('.portfolio__menu-item--web')
  const $adMenuItem = $('.portfolio__menu-item--ad')
  const $brandingMenuItem = $('.portfolio__menu-item--branding')
  const $designMenuItem = $('.portfolio__menu-item--design')

  const $allListItems = $('.portfolio__projects-list-item')
  const $webListItems = $('.portfolio__projects-list-item--web')
  const $adListItems = $('.portfolio__projects-list-item--ad')
  const $brandingListItems = $('.portfolio__projects-list-item--branding')
  const $designListItems = $('.portfolio__projects-list-item--design')

  function toggleTabs(menuItem, listItem, allListItems) {
    menuItem.on('click', () => {
      allListItems.hide()
      allListItems.addClass('portfolio__projects-list-item--active')
      listItem.fadeIn()

      if (menuItem === allMenuItem) {
        allListItems.removeClass('portfolio__projects-list-item--active')
      }
    })
  }

  toggleTabs($allMenuItem, $allListItems, $allListItems)
  toggleTabs($webMenuItem, $webListItems, $allListItems)
  toggleTabs($adMenuItem, $adListItems, $allListItems)
  toggleTabs($brandingMenuItem, $brandingListItems, $allListItems)
  toggleTabs($designMenuItem, $designListItems, $allListItems)
}

/*
 This auxiliary fn provides toggling of modals
in Contacts section form and Footer section form.
It called inside manageContactForm() and manageFooterForm() fns.
*/
function toggleFormModal() {
  const $body = $('body')
  const $modal = $('.modal-window__form-item')
  const $modalCloseBtn = $('.modal-window__form-close-btn')

  const $scrollToTopBtn = $('.scroll-top-btn')
  const scrollToTopBtnActive = 'scroll-top-btn--active'

  function disableScroll() {
    $body.addClass('body--inactive')
  }

  function enableScroll() {
    $body.removeClass('body--inactive')
  }

  $modal.fadeIn()
  $scrollToTopBtn.removeClass(scrollToTopBtnActive)
  disableScroll()

  $modal.on('click', function (ev) {
    if (ev.target === this) {
      $(this).fadeOut()
      $scrollToTopBtn.addClass(scrollToTopBtnActive)
      enableScroll()
    }
  })

  $modalCloseBtn.on('click', function () {
    $(this).parent().fadeOut()
    $scrollToTopBtn.addClass(scrollToTopBtnActive)
    enableScroll()
  })
}

/*
This auxiliary fn provides changing of text inside modals
in Contacts section form and Footer section form in case of failed submission of a form.
It called inside manageContactForm() and manageFooterForm() fns.
*/
function changeFormModalText() {
  const $modal = $('.modal-window__form-item')

  $modal.find('p').text('Your message has not been sent. Try again later')
}

function manageContactForm() {
  const $form = $('.contact__form')
  const $formInputs = $('.contact__form-input')
  const $formTooltips = $('.tooltip__contact-form-item')
  const $tooltipText = $('.tooltip__text')
  const $submitBtn = $('.contact__form-input--submit')
  const tooltipActivationClass = 'tooltip--active'

  function checkFormAndSubmitFormValues() {
    const $inputName = $('.contact__form-input--name')
    const $inputCompany = $('.contact__form-input--company')
    const $inputEmail = $('.contact__form-input--email')
    const $inputService = $('.contact__form-input--service')
    const $inputTextarea = $('.contact__form-input--textarea')

    const $inputNameTooltip = $('.contact__form-input-tooltip--name')
    const $inputCompanyTooltip = $('.contact__form-input-tooltip--company')
    const $inputEmailTooltip = $('.contact__form-input-tooltip--email')
    const $inputServiceTooltip = $('.contact__form-input-tooltip--service')
    const $inputTextareaTooltip = $('.contact__form-input-tooltip--textarea')

    /*
    checkEmptyValue(), checkLength() fns check forms for
    lack of values and maximum chars quantity.

    checkEmailCharTypes() fn checks email input for
    presence of "@" and "." chars: these chars mean inserted email address.

    Then all of these fns transfer final value to checkAggregatedCallsForAjax()
    for to return one final value used in an ajax fn.
    */
    function checkEmptyValue(input, tooltip) {
      const inputValue = input.val()

      if (inputValue === null || inputValue.toString().trim() === '') {
        tooltip.addClass(tooltipActivationClass)
        return false
      }

      return true
    }

    function checkEmailCharTypes(emailInput, emailTooltip) {
      const inputValue = emailInput.val().toString().trim()
      const $emailTooltipText = emailTooltip.find('p')

      if (inputValue === '') {
        return false
      }

      if (
        inputValue.includes('@') === false ||
        inputValue.includes('.') === false
      ) {
        $emailTooltipText.text('Enter correct email')
        emailTooltip.addClass(tooltipActivationClass)
        return false
      }

      return true
    }

    function checkLength(input, tooltip, length) {
      const inputValue = input.val().toString().trim()
      const $tooltipText = tooltip.find('p')

      if (inputValue.length > length) {
        $tooltipText.text(`Max number of letters is ${length}`)
        tooltip.addClass(tooltipActivationClass)
        return false
      }

      return true
    }

    function checkAggregatedCallsForAjax() {
      return (
        checkEmptyValue($inputName, $inputNameTooltip) &&
        checkLength($inputName, $inputNameTooltip, 100) &&
        checkEmptyValue($inputCompany, $inputCompanyTooltip) &&
        checkLength($inputCompany, $inputCompanyTooltip, 100) &&
        checkEmptyValue($inputEmail, $inputEmailTooltip) &&
        checkLength($inputEmail, $inputEmailTooltip, 100) &&
        checkEmailCharTypes($inputEmail, $inputEmailTooltip) &&
        checkEmptyValue($inputService, $inputServiceTooltip) &&
        checkEmptyValue($inputTextarea, $inputTextareaTooltip) &&
        checkLength($inputTextarea, $inputTextareaTooltip, 2500)
      )
    }

    $.ajax({
      url: '/php/mail.php',
      type: 'POST',
      data: $form.serialize(),
      beforeSend: () => {
        return checkAggregatedCallsForAjax()
      },
      success: () => {
        toggleFormModal()
        $form.trigger('reset')
      },
      error: () => {
        changeFormModalText()
        toggleFormModal()
        $form.trigger('reset')
      }
    })

    $('.modal-window__contact-form-item')
      .find('p')
      .text('Your message has been sent') // Restores default text value.
  }

  $submitBtn.on('click', ev => {
    ev.preventDefault()
    checkFormAndSubmitFormValues()
  })

  $form.on('keypress', ev => {
    if (ev.which === 13) {
      ev.preventDefault()
      checkFormAndSubmitFormValues()
    }
  })

  // Hides tooltips on inputs focus.
  $formInputs.on('focus', () => {
    $formTooltips.removeClass(tooltipActivationClass)
    $tooltipText.text('Enter a value')
  })
}

function manageFooterForm() {
  const $submitBtn = $('.form__input--submit')
  const $form = $('.footer__form')

  function checkFormAndSubmitValues() {
    const $input = $('.footer__form-input--email')
    const inputProtectedValue = $('.footer__form-input--email')
      .val()
      .toString()
      .trim()

    const $tooltip = $('.tooltip__footer-form-item')
    const $tooltipText = $tooltip.find('p')
    const tooltipActivationClass = 'tooltip--active'
    const length = 50

    function checkInputsForAjax() {
      function activateTooltip() {
        $tooltip.addClass(tooltipActivationClass)
      }

      if (inputProtectedValue === null || inputProtectedValue === '') {
        activateTooltip()
        return false
      }

      if (
        inputProtectedValue.includes('@') === false ||
        inputProtectedValue.includes('.') === false
      ) {
        $tooltipText.text('Enter correct email')
        activateTooltip()
        return false
      }

      if (inputProtectedValue.length > length) {
        $tooltipText.text(`Max number of letters is ${length}`)
        activateTooltip()
        return false
      }

      $tooltip.removeClass(tooltipActivationClass)
      return true
    }

    $tooltipText.text('Enter a value') // Restores default text value.

    $.ajax({
      url: '/php/mail.php',
      type: 'POST',
      data: $form.serialize(),
      beforeSend: () => {
        return checkInputsForAjax()
      },
      success: () => {
        toggleFormModal()
        $form.trigger('reset')
      },
      error: () => {
        changeFormModalText()
        toggleFormModal()
        $form.trigger('reset')
      }
    })

    $input.on('focus', () => {
      $tooltip.removeClass(tooltipActivationClass)
      $tooltipText.text('Enter a value')
    })
  }

  $submitBtn.on('click', ev => {
    ev.preventDefault()
    checkFormAndSubmitValues()
  })

  $form.on('keypress', ev => {
    if (ev.which === 13) {
      ev.preventDefault()
      checkFormAndSubmitValues()
    }
  })
}

function manageFooterMapModal() {
  function toggleTooltipForAddress() {
    const $address = $('.footer__location')
    const $tooltip = $('.footer__adress-tooltip')
    const $footerLeft = $('.footer__left')

    $address.on('mouseenter', () => {
      $tooltip.addClass('footer__adress-tooltip--active')
    })

    $footerLeft.on('mouseleave', () => {
      $tooltip.removeClass('footer__adress-tooltip--active')
    })
  }

  function toggleFooterMapModal() {
    const $body = $('body')
    const $mapModal = $('.modal-window__footer-map')
    const $addressItems = $('.footer__location, .footer__adress-tooltip')
    const $closeBtn = $('.modal-window__footer-map-close-btn')

    const $scrollToTopBtn = $('.scroll-top-btn')
    const scrollToTopBtnActive = 'scroll-top-btn--active'

    function disableScroll() {
      $body.addClass('body--inactive')
    }

    function enableScroll() {
      $body.removeClass('body--inactive')
    }

    if ($body.width() >= 1024) {
      $addressItems.on('click', () => {
        $mapModal.fadeIn()
        $scrollToTopBtn.removeClass(scrollToTopBtnActive)
        disableScroll()
      })

      $mapModal.on('click', function (ev) {
        if (ev.target === this) {
          $(this).fadeOut()
          $scrollToTopBtn.addClass(scrollToTopBtnActive)
          enableScroll()
        }
      })

      $closeBtn.on('click', () => {
        $mapModal.fadeOut()
        enableScroll()
      })
    }

    if ($body.width() < 1024) {
      $addressItems.off('click')
    }
  }

  toggleTooltipForAddress()
  toggleFooterMapModal()
}
