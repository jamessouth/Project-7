$('video').mediaelementplayer({
	stretching: 'responsive'
});

const $container = $('#mep_0');
const $video = $('video');
const $spans = $('.text');
const $para = $('p');


$spans.each(x => {
	$spans[x].dataset.time = $spans[x].dataset.time.replace(/,/g, '.').replace(/(0+\:)\1*0*/g, '').replace(/1:0/g,'6');
	
	let timeArray = $spans[x].dataset.time.split(' --> ');
	
	let [btime,etime] = [timeArray[0], timeArray[1]];
	
	$($spans[x]).attr({'data-beg-time': btime, 'data-end-time': etime});
	$($spans[x]).removeAttr('data-time');
	
});


$video.addClass('fscreen');
$container.addClass('fscreen fscreen-vid');

var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";

$(document).on(screen_change_events, () => {
	
	$video.toggleClass('fscreen');
	$container.toggleClass('fscreen fscreen-vid');
	
});

$video.on('timeupdate', (e) => {
	const time = e.currentTarget.currentTime;
	$spans.each(x => {
		let btime = parseFloat($spans[x].dataset.begTime);
		let etime = parseFloat($spans[x].dataset.endTime);
		if(btime <= time && time < etime){
			$spans[x].style.color = 'orange';
		} else {
			$spans[x].style.color = 'black';
		}
	});
});


$para.on('click', (e) => {
	if(e.target.tagName === 'SPAN'){
		$video[0].currentTime = e.target.dataset.begTime;
	}
});

const $rail = $('.mejs__time-rail');
const $timeFloat = $('.mejs__time-float');
const $tFcenter = $timeFloat.width()/2;
$rail.on('mousemove mousein', () => {
	$timeFloat.css('left', '200px');
	console.log($timeFloat.css('left'));
	
});

