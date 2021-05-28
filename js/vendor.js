'use strict';

initPromoSlickSlider();

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