$(".slider").slick({

    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    infinite: false,
    dots: true,
    responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]

})
