$('video').mediaelementplayer({
	stretching: 'responsive'
});

const $container = $('#mep_0');
const $video = $('video');
const $spans = $('.text');
const $para = $('p');
var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";
const $timeCurrent = $('.mejs__me .mejs__controls .mejs__time-current, .mejs__time-handle-content');
const $controls = $('.mejs__me .mejs__controls');

//convert times in captions.txt to data attributes
$spans.each(x => {
	$spans[x].dataset.time = $spans[x].dataset.time.replace(/,/g, '.').replace(/(0+\:)\1*0*/g, '').replace(/1:0/g,'6');
	let timeArray = $spans[x].dataset.time.split(' --> ');
	let [btime,etime] = [timeArray[0], timeArray[1]];
	$($spans[x]).attr({'data-beg-time': btime, 'data-end-time': etime});
	$($spans[x]).removeAttr('data-time');
});

//add classes to preserve media query styling after going fullscreen
$video.addClass('fscreen');
$container.addClass('fscreen fscreen-vid');

//toggle same upon fullscreen on/off
$(document).on(screen_change_events, () => {
	$video.toggleClass('fscreen');
	$container.toggleClass('fscreen fscreen-vid');
});

//(1) highlight corresponding transcript portion in orange as video plays (2) change colors of control panel and progress bar in custom skin as video plays
$video.on('timeupdate', (e) => {
	const time = e.currentTarget.currentTime;
	let gg = (Math.round((time/$video[0].duration || 0)*100)/100)*360;
	$spans.each(x => {
		let btime = parseFloat($spans[x].dataset.begTime);
		let etime = parseFloat($spans[x].dataset.endTime);
		if(btime <= time && time < etime){
			$spans[x].style.color = 'orange';
		} else {
			$spans[x].style.color = 'black';
		}
	});
	$timeCurrent.css('background', `hsla(${gg*20},90%,80%,1)`);
	$controls.css('background', `hsla(${gg*2},90%,40%,1)`);
});

//enable seeking in the video by clicking the transcript
$para.on('click', (e) => {
	if(e.target.tagName === 'SPAN'){
		$video[0].currentTime = e.target.dataset.begTime;
	}
});

