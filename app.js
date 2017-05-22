$('video').mediaelementplayer({
	stretching: 'responsive'
});

const $container = $('#mep_0');
const $video = $('video');
$video.addClass('fscreen');
$container.addClass('fscreen fscreen-vid');

var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";

$(document).on(screen_change_events, () => {
	
	$video.toggleClass('fscreen');
	$container.toggleClass('fscreen fscreen-vid');
	
});









