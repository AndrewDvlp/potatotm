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
	var position2 = ((e.pageX - rect.left -9) / fillerImage.offsetWidth)*100;
	if (position <= 100) { colorbox.style.width = position+"%"; handle.style.left = position2+"%"; }
}

});
