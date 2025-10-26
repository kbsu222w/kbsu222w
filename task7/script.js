$(".slider").slick({
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
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

