//Select elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//play and pause
function togglePlay() {
	// body...
	video[video.paused ? 'play' : 'pause']();
}

//update play pause button based on video
function updateButton() {
	const icon = this.paused  ? '►' : '❚ ❚'
	toggle.textContent = icon;
}

//Rewind or forward video
function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}

//slider
function handleRangeUpdate(){
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth ) * video.duration;
	video.currentTime = scrubTime; 
}
//eventlisteners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);