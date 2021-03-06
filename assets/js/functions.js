$(document).ready(function () {
toggleMobileMenu();

function toggleMobileMenu() {
	$('.mobile-nav-toggle').on('click', function() {
	var status = $(this).hasClass('is-open');
	if(status){ $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open'); }
	else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open'); }
	});
}

smoothScroll(1000);




// Slider function

				$('#slider ul').css('display', 'block');
				var children = $('#slider ul').children().clone();
				children.prependTo('#slider ul');

				var slideCount = $('#slider ul li').length;
				var slideWidth = $('#slider ul li').width();
				var slideHeight = $('#slider ul li').height();
				var sliderUlWidth = slideCount * slideWidth;

		function drawSlider() {
				$('#slider ul').css('display', 'none');
				var slideCount = $('#slider ul li').length;
				var slideWidth = $('#slider ul li').width();
				var slideHeight = $('#slider ul li').height();
				var sliderUlWidth = slideCount * slideWidth;

				$('#slider').css({ width: slideWidth, height: slideHeight });

				$('#slider ul').css({ width: sliderUlWidth, marginLeft: - (1 * slideWidth) });
				$('#slider ul').css('display', 'block');
				console.log('Drew slider');
		}

		function moveLeft() {

        $('#slider ul').animate({
            left: + slideWidth
        }, 300, function () {
						$('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
						$('#slider ul li').css('opacity', '0.4');
            $('#slider ul li:nth-child(2)').css('opacity', '1');
        });
    }

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 300, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
            $('#slider ul li').css('opacity', '0.4');
            $('#slider ul li:nth-child(2)').css('opacity', '1');
        });
    }

		drawSlider();
		$(window).resize(drawSlider);

    $('span.control_prev').click(function () {
        moveLeft();
    });

    $('span.control_next').click(function () {
        moveRight();
    });
// End slider function

// Parallax function
	$(window).scroll(function(){
		parallaxShapes();
		triggerHealthyCounter();
	});

	function parallaxShapes() {
		var wScroll = $(window).scrollTop();
		var winHeight = $(window).height();
		var offTop = $('.shapes').offset().top;
		var shapesOffset = winHeight - offTop;
		var nextSectionTop = $('.shapes').next().offset().top + winHeight;

		if ((winHeight + wScroll) > Math.abs(offTop) && (winHeight + wScroll) < nextSectionTop - 250 ) {
			$('.potato-blur-1').css({
				'transform' : 'translateY('+ wScroll/ 25 +'%)'
			});
			$('.potato-blur-2').css({
				'transform' : 'translateY('+ wScroll / 70 +'%)'
			});
			$('.potato-blur-3').css({
				'transform' : 'translateY(-'+ wScroll / 35 +'%)'
			});
			$('.potato-blur-4').css({
				'transform' : 'translateY(-'+ wScroll / 15 +'%)'
			});
		}

	}
// End Parallax function


// trigger and clear
	var triggerClear = function() {
		triggerClear = function(){};
		$('.timer').one().countTo();
	};
// end trigger and clear

// Trigger Healthy counter

	function triggerHealthyCounter() {

		var wScroll = $(window).scrollTop();
		var winHeight = $(window).height();
		var offTop = $('.healthy').offset().top;

		if (wScroll + winHeight > offTop + 500) {
			triggerClear();
		}

	}

// End Trigger Healthy counter



// document.ready brackets
});


function smoothScroll (duration) {
	$('a[href^=#]').on('click', function(event) {
		var target = $($(this).attr('href'));
		$('.mobile-nav-toggle, .mobile-nav').removeClass('is-open');

		if( target.length) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, duration);
		}
	});
}

// Gallery function
	var inkbox = document.getElementById("hoverdiv");
	var colorbox = document.getElementById("nonrendered");
	var fillerImage = document.getElementById("rendered");
	var handle = document.getElementById("handle");
	inkbox.addEventListener("mousemove",trackLocation,false);
	inkbox.addEventListener("touchstart",trackLocation,false);
	inkbox.addEventListener("touchmove",trackLocation,false);
	inkbox.addEventListener("mouseleave",hoverOut,false);

	function trackLocation(e)
	{
		var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
		var rect = fillerImage.getBoundingClientRect();
		var position = ((startX - rect.left) / fillerImage.offsetWidth)*100;

		// Set limits
    var minLeft = 15;
    var maxLeft = 90;

		if (position <= 100) {
			if (position < minLeft) {position = minLeft;}
			if (position > maxLeft) {position = maxLeft;}
			colorbox.style.width = position+"%"; handle.style.left = position+"%";
		}
	}

	function hoverOut() {
		var position = 50;
		var myWidth = position+"%";
		$('#nonrendered').animate({
			width: myWidth}, 280);
		$('#handle').animate({
			left: myWidth}, 280);
	}

// End Gallery function
