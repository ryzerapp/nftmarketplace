
  $(function () {
      $('.categorytab').click(function () {
          $('#more_tab').slideToggle();
      });
  });

 $(function () {
      $('.categoryTimeTab').click(function () {
          $('#timeTab').slideToggle();
      });
  });
 


// blog slider

$('.blog-slider').slick({
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  fade: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        dots: false
      }
    },
    {
      breakpoint: 767,
      settings: {
        dots: true
      }
    }
  ]
});

// Sliders

$('.popular').slick({
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows:false,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        dots: true
      }
    }
   
  ]
});

$('.lastAdded').slick({
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows:false,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        dots: true
      }
    }
   
  ]
});

$('.similar-aeticle').slick({
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings:"unslick"
    }      
  ]
});


jQuery('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
  jQuery('.popular').slick('setPosition');
})

document.addEventListener('click',function(e){
  if(e.target.classList.contains('hamburger-toggle')){
    e.target.children[0].classList.toggle('active');
  }
})  