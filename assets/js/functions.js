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

var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;

	$('#slider').css({ width: slideWidth, height: slideHeight });

	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - (slideWidth) });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    }

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    }

    $('span.control_prev').click(function () {
        moveLeft();
    });

    $('span.control_next').click(function () {
        moveRight();
    });

});
