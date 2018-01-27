$(document).ready(function(){
	 $('.middle-slider_list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        dots: true
    })

	 $('#toggle').click(function() {
  $( this ).toggleClass( "on" );
  $('#menu').toggleClass('menu-on');
});
});