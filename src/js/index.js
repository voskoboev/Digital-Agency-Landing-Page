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
activateBrandsPics()
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
  showAllPortfolioTabs() provides correct scroll to sections after tabs were toggled.
  */
  function showAllPortfolioTabs() {
    const $portfolioTabs = $('.portfolio__projects-list-item')

    $portfolioTabs.fadeIn()
  }

  ;(() => {
    const $body = $('body'),
      $itemsServices = $(`
        .nav__menu-item--services, 
        .header__btn--services
      `),
      $menuItemPortfolio = $('.nav__menu-item--works'),
      $menuItemPromo = $('.nav__menu-item--features'),
      $menuItemClients = $('.nav__menu-item--about'),
      $itemsContact = $(`
        .nav__menu-item--contact, 
        .header__btn--start, 
        .promo__btn, 
        .clients__btn
      `),
      $sectionServices = $('.services'),
      $sectionPortfolio = $('.portfolio'),
      $sectionPromo = $('.promo'),
      $sectionClients = $('.clients'),
      $sectionContact = $('.contact')

    function scrollToSection(interactiveItems, positionItem) {
      const position = positionItem.offset().top

      let verticalOffset = 200 // An offset is determined and changed by visual UX.

      if ($body.width() < 1024) {
        verticalOffset = -50
      }

      if ($body.width() < 325) {
        verticalOffset = -100
      }

      interactiveItems.on('click', () => {
        showAllPortfolioTabs()
        $('html, body').animate({ scrollTop: position - verticalOffset }, 700)
      })
    }

    scrollToSection($itemsServices, $sectionServices)
    scrollToSection($menuItemPortfolio, $sectionPortfolio)
    scrollToSection($menuItemPromo, $sectionPromo)
    scrollToSection($menuItemClients, $sectionClients)
    scrollToSection($itemsContact, $sectionContact)
  })()

  function scrollToTop() {
    const $itemsHome = $('.nav__menu-item--home, .footer__logo-img')

    $itemsHome.on('click', () => {
      showAllPortfolioTabs()
      $('html, body').animate({ scrollTop: 0 }, 700)
    })
  }

  scrollToTop()

  function scrollToTopOnPopUpBtnClick() {
    /* 
    The button of this fn is fixed and placed in the right bottom corner of the viewport. 
    */
    const $btn = $('.scroll-top-btn')

    $(window).on('scroll', () => {
      const positionSolutions = $('.solutions').offset().top,
        positionWindow = $(window).scrollTop()

      if (positionWindow > positionSolutions) {
        $btn.addClass('scroll-top-btn--active')
      } else {
        $btn.removeClass('scroll-top-btn--active')
      }
    })

    $btn.on('click', () => {
      showAllPortfolioTabs()
      $('html, body').animate({ scrollTop: 0 }, 700)
    })
  }

  scrollToTopOnPopUpBtnClick()
}

function popUpSectionsOnScroll() {
  function popUpOnScroll(elementName) {
    $(window).on('scroll', function () {
      if (
        $(this).scrollTop() + $(window).innerHeight() >
        $(`.${elementName}`).position().top
      ) {
        $(`.${elementName}`).addClass(`${elementName}--active`)
      }
    })
  }

  popUpOnScroll('services')
  popUpOnScroll('promo__container')
  popUpOnScroll('features__container')
  popUpOnScroll('portfolio')
  popUpOnScroll('clients')
  popUpOnScroll('brands__container')
  popUpOnScroll('benefits')
  popUpOnScroll('contact')
}

function manageHeaderMobileMenu() {
  const $body = $('body'),
    $mobileBtn = $('.header__nav-mobile-btn'),
    $navMenu = $('.nav__menu'),
    $menuItems = $('.nav__menu-item')

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
  const $body = $('body'),
    $cardFirst = $('.solutions__card--first'),
    $cardSecond = $('.solutions__card--second'),
    $cardThird = $('.solutions__card--third'),
    $modalFirst = $('.modal-window__solutions-item--first'),
    $modalSecond = $('.modal-window__solutions-item--second'),
    $modalThird = $('.modal-window__solutions-item--third'),
    $mobileBtn = $('.header__nav-mobile-btn')

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

  fadeInModal($cardFirst, $modalFirst)
  fadeInModal($cardSecond, $modalSecond)
  fadeInModal($cardThird, $modalThird)

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

  fadeOutModalAndStopVideo($modalFirst)
  fadeOutModalAndStopVideo($modalSecond)
  fadeOutModalAndStopVideo($modalThird)

  function fadeOutModalAndStopVideoOnCloseBtnClick(modal) {
    const $btn = $('.modal-window__close-btn'),
      modalAttr = modal.find('iframe').attr('src')

    $btn.on('click', () => {
      modal.find('iframe').attr('src', modalAttr) // Stops a video after a modal has been closed.
      modal.fadeOut()
      $mobileBtn.show()
      enableScroll()
    })
  }

  fadeOutModalAndStopVideoOnCloseBtnClick($modalFirst)
  fadeOutModalAndStopVideoOnCloseBtnClick($modalSecond)
  fadeOutModalAndStopVideoOnCloseBtnClick($modalThird)
}

function playClientsVideo() {
  const $video = $('.clients__video'),
    $playBtn = $('.clients__video-btn'),
    $videoAndPlayBtn = $('.clients__video, .clients__video-btn'),
    hiddenClass = 'clients__video-btn-play--hidden',
    activeClass = 'clients__video-btn-play--active'

  function addControls() {
    if ($video.attr('controls') === undefined) {
      $video.attr('controls', 'controls')
    }
  }

  function removeHandlers() {
    $videoAndPlayBtn.off('mouseleave').off('mouseenter')
  }

  $video.on('click', function () {
    $playBtn.addClass(hiddenClass)
    addControls()
    removeHandlers()
  })

  $playBtn.on('click', function () {
    $(this).addClass(hiddenClass)
    $video.trigger('play')
    addControls()
    removeHandlers()
  })

  $videoAndPlayBtn.on('mouseenter', () => {
    $playBtn.addClass(activeClass)
  })

  $video.on('mouseleave', () => {
    $playBtn.removeClass(activeClass)
  })
}

function activateBrandsPics() {
  const $firstPic = $('.brands__pic--first'),
    $secondPic = $('.brands__pic--second'),
    $thirdPic = $('.brands__pic--third'),
    $fourthPic = $('.brands__pic--fourth'),
    activeClass = 'brands__pic--active',
    activationTime = 1000

  const arrayOfPics = [$firstPic, $secondPic, $thirdPic, $fourthPic]
  let index = 0

  function activateBrandsPicsConsecutively(arr) {
    const timer = setInterval(() => {
      arr[index].addClass(activeClass)

      index > 0
        ? arr[index - 1].removeClass(activeClass)
        : arr[arr.length - 1].removeClass(activeClass)

      if (index === arr.length - 1) {
        index = -1

        clearInterval(timer)
        activateBrandsPicsConsecutively(arrayOfPics)
      }

      index++
    }, activationTime)
  }

  activateBrandsPicsConsecutively(arrayOfPics)
}

function togglePortfolioTabs() {
  const $menuItemAll = $('.portfolio__menu-item--all'),
    $menuItemWeb = $('.portfolio__menu-item--web'),
    $menuItemAd = $('.portfolio__menu-item--ad'),
    $menuItemBranding = $('.portfolio__menu-item--branding'),
    $menuItemDesign = $('.portfolio__menu-item--design'),
    $listItemsAll = $('.portfolio__projects-list-item'),
    $listItemsWeb = $('.portfolio__projects-list-item--web'),
    $listItemsAd = $('.portfolio__projects-list-item--ad'),
    $listItemsBranding = $('.portfolio__projects-list-item--branding'),
    $listItemsDesign = $('.portfolio__projects-list-item--design')

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

  toggleTabs($menuItemAll, $listItemsAll, $listItemsAll)
  toggleTabs($menuItemWeb, $listItemsWeb, $listItemsAll)
  toggleTabs($menuItemAd, $listItemsAd, $listItemsAll)
  toggleTabs($menuItemBranding, $listItemsBranding, $listItemsAll)
  toggleTabs($menuItemDesign, $listItemsDesign, $listItemsAll)
}

/*
 toggleFormModal() provides toggling of modals
in Contacts section form and Footer section form.
It called inside manageContactForm() and manageFooterForm() fns.
*/
function toggleFormModal() {
  const $body = $('body'),
    $modal = $('.modal-window__form-item'),
    $modalCloseBtn = $('.modal-window__form-close-btn')

  const $scrollToTopBtn = $('.scroll-top-btn')
  const scrollToTopBtnActive = 'scroll-top-btn--active'

  function disableScroll() {
    $body.addClass('body--inactive')
  }

  function enableScroll() {
    $body.removeClass('body--inactive')
  }

  function activateScrollToTopBtn() {
    $scrollToTopBtn.addClass(scrollToTopBtnActive)
  }

  $modal.fadeIn()
  $scrollToTopBtn.removeClass(scrollToTopBtnActive)
  disableScroll()

  $modal.on('click', function (ev) {
    if (ev.target === this) {
      $(this).fadeOut()
      activateScrollToTopBtn()
      enableScroll()
    }
  })

  $modalCloseBtn.on('click', function () {
    $(this).parent().fadeOut()
    activateScrollToTopBtn()
    enableScroll()
  })
}

/*
changeFormModalText() provides changing of text inside modals
in Contacts section form and Footer section form in case of failed submission of a form.
It called inside manageContactForm() and manageFooterForm() fns.
*/
function changeFormModalText() {
  const $modal = $('.modal-window__form-item')

  $modal.find('p').text('Your message has not been sent. Try again later')
}

function manageContactForm() {
  const $form = $('.contact__form'),
    $formInputs = $('.contact__form-input'),
    $formTooltips = $('.tooltip__contact-form-item'),
    $tooltipText = $('.tooltip__text'),
    $submitBtn = $('.contact__form-input--submit'),
    tooltipActivationClass = 'tooltip--active'

  function checkFormAndSubmitFormValues() {
    const $inputName = $('.contact__form-input--name'),
      $inputCompany = $('.contact__form-input--company'),
      $inputEmail = $('.contact__form-input--email'),
      $inputService = $('.contact__form-input--service'),
      $inputTextarea = $('.contact__form-input--textarea'),
      $inputTooltipName = $('.contact__form-input-tooltip--name'),
      $inputTooltipCompany = $('.contact__form-input-tooltip--company'),
      $inputTooltipEmail = $('.contact__form-input-tooltip--email'),
      $inputTooltipService = $('.contact__form-input-tooltip--service'),
      $inputTooltipTextarea = $('.contact__form-input-tooltip--textarea')

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

      if (!inputValue) {
        tooltip.addClass(tooltipActivationClass)
        return false
      }

      return true
    }

    function checkEmailCharTypes(emailInput, emailTooltip) {
      const inputValue = emailInput.val().toString().trim(),
        $emailTooltipText = emailTooltip.find('p')

      if (!inputValue) {
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
      const inputValue = input.val().toString().trim(),
        $tooltipText = tooltip.find('p')

      if (inputValue.length > length) {
        $tooltipText.text(`Max number of letters is ${length}`)
        tooltip.addClass(tooltipActivationClass)
        return false
      }

      return true
    }

    function checkAggregatedCallsForAjax() {
      return (
        checkEmptyValue($inputName, $inputTooltipName) &&
        checkLength($inputName, $inputTooltipName, 100) &&
        checkEmptyValue($inputCompany, $inputTooltipCompany) &&
        checkLength($inputCompany, $inputTooltipCompany, 100) &&
        checkEmptyValue($inputEmail, $inputTooltipEmail) &&
        checkLength($inputEmail, $inputTooltipEmail, 100) &&
        checkEmailCharTypes($inputEmail, $inputTooltipEmail) &&
        checkEmptyValue($inputService, $inputTooltipService) &&
        checkEmptyValue($inputTextarea, $inputTooltipTextarea) &&
        checkLength($inputTextarea, $inputTooltipTextarea, 2500)
      )
    }

    function resetForm() {
      $form.trigger('reset')
    }

    $.ajax({
      url: '../php/mail-contact-form.php',
      type: 'POST',
      data: $form.serialize(),
      beforeSend: () => {
        return checkAggregatedCallsForAjax()
      },
      success: () => {
        toggleFormModal()
        resetForm()
      },
      error: () => {
        changeFormModalText()
        toggleFormModal()
        resetForm()
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

  // Hides tooltips on inputs' focus.
  $formInputs.on('focus', () => {
    $formTooltips.removeClass(tooltipActivationClass)
    $tooltipText.text('Enter a value')
  })
}

function manageFooterForm() {
  const $form = $('.footer__form'),
    $submitBtn = $('.form__input--submit')

  function checkFormAndSubmitValues() {
    const $input = $('.footer__form-input--email'),
      inputProtectedValue = $('.footer__form-input--email')
        .val()
        .toString()
        .trim(),
      $tooltip = $('.tooltip__footer-form-item'),
      $tooltipText = $tooltip.find('p'),
      tooltipActivationClass = 'tooltip--active',
      length = 50

    function checkInputsForAjax() {
      function activateTooltip() {
        $tooltip.addClass(tooltipActivationClass)
      }

      if (!inputProtectedValue) {
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

    function resetForm() {
      $form.trigger('reset')
    }

    $.ajax({
      url: '../php/mail-footer-form.php',
      type: 'POST',
      data: $form.serialize(),
      beforeSend: () => {
        return checkInputsForAjax()
      },
      success: () => {
        toggleFormModal()
        resetForm()
      },
      error: () => {
        changeFormModalText()
        toggleFormModal()
        resetForm()
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
  function toggleAddressTooltip() {
    const $address = $('.footer__location'),
      $tooltip = $('.footer__adress-tooltip'),
      $footerLeft = $('.footer__left')

    $address.on('mouseenter', () => {
      $tooltip.addClass('footer__adress-tooltip--active')
    })

    $footerLeft.on('mouseleave', () => {
      $tooltip.removeClass('footer__adress-tooltip--active')
    })
  }

  toggleAddressTooltip()

  function toggleFooterMapModal() {
    const $body = $('body'),
      $mapModal = $('.modal-window__footer-map'),
      $addressItems = $('.footer__location, .footer__adress-tooltip'),
      $closeBtn = $('.modal-window__footer-map-close-btn'),
      $scrollToTopBtn = $('.scroll-top-btn'),
      scrollToTopBtnActive = 'scroll-top-btn--active'

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

  toggleFooterMapModal()
}
