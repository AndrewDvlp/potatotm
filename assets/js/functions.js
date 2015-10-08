$(document).ready(function () {

var inkbox = document.getElementById("potato-rendered");
var colorbox = document.getElementById("nonrendered");
var fillerImage = document.getElementById("rendered");
var handle = document.getElementById("handle");
inkbox.addEventListener("mousemove",trackLocation,false);
inkbox.addEventListener("touchstart",trackLocation,false);
inkbox.addEventListener("touchmove",trackLocation,false);

function trackLocation(e)
{
	var rect = fillerImage.getBoundingClientRect();
	var position = ((e.pageX - rect.left) / fillerImage.offsetWidth)*100;
	var position2 = ((e.pageX - rect.left -10) / fillerImage.offsetWidth)*100;
	if (position <= 100) { colorbox.style.width = position+"%"; handle.style.left = position2+"%"; }
}


// Slider function
	$('#slider ul').css('display', 'block');
  var children = $('#slider ul').children().clone();
  children.prependTo('#slider ul');

	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;

	$('#slider').css({ width: slideWidth, height: slideHeight });

	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - (1 * slideWidth) });

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

    $('span.control_prev').click(function () {
        moveLeft();
    });

    $('span.control_next').click(function () {
        moveRight();
    });

});
