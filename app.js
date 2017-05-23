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

//  /(0+\:)\1*0*/g



$video.on('timeupdate', (e) => {
	const time = e.currentTarget.currentTime;
	console.log(time);

});

let $s = $('.text');
let $s2 = $('.text-hid');
// console.log($s);
console.log($s2[1]);
$s.each(x => {
	if ($s[x].textContent.includes('blah')){
		console.log($s[x+1]);
	}
	
}


);




