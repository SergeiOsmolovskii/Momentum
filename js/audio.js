"use strict"

import playList from './playList.js';

const progress = document.querySelectorAll('.control-input');
const playListBlock = document.querySelector('.play-list');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playBtn = document.querySelector('.play');
const soundButton = document.querySelector('.sound-button');
const soundControl = document.querySelector('.sound-bar-progress');
const audioLengthControl = document.querySelector('.audio-length-control');

const audio = new Audio();
let isPlay = false;
let currentAudio = 0;

audio.src = playList[currentAudio].src;

playList.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = item.title;
    playListBlock.append(li); 
})

progress.forEach(item => item.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${value}%, #C4C4C4 ${value}%, #C4C4C4)`;
}))

let playListLi = document.querySelectorAll('.play-item');

export function playAudio() {
    if(!isPlay) {
        audio.play();
        isPlay = true;
    } else {
        audio.pause();
        isPlay = false;
    }
    changePlayListItem(currentAudio);
    audio.onended = function () {
        playNext();
    };
}

function toggleBtn() {
    playBtn.classList.toggle('pause');
}

function playCurrentAudio() {
    audio.src = playList[currentAudio].src;
    if(!isPlay) toggleBtn();
    isPlay = false;
    playAudio();
}

function changePlayListItem(currentAudio) {
    playListLi.forEach((item, index) => {
        if(index == currentAudio) item.classList.add('item-active');
        else item.classList.remove('item-active');
    }) 
}

function playPrev() {
    currentAudio--;
    if(currentAudio < 0) currentAudio = playList.length - 1; 
    playCurrentAudio();
}

function playNext() {
    currentAudio++;
    if(currentAudio > playList.length - 1) currentAudio = 0;
    playCurrentAudio();
}

function changeVolume() {
    audio.volume = soundControl.value / 100;
    if (audio.volume === 0) soundButton.classList.toggle('sound-mute');
    else soundButton.classList.remove('sound-mute');
}

function mute() {
    soundButton.classList.toggle('sound-mute');
    if (soundButton.classList.contains('sound-mute')) {
        audio.volume = 0;
        soundControl.value = 0;
        soundControl.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 0%, #C4C4C4 0%, #C4C4C4)`;
    } else {
        audio.volume = 0.5;
        soundControl.value = 50;
        soundControl.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 50%, #C4C4C4 50%, #C4C4C4)`;
    }
}

function audioPprogress() {
    const percent = Math.floor((audio.currentTime / audio.duration) * 100);
    audioLengthControl.value = percent;
    audioLengthControl.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${percent}%, #C4C4C4 ${percent}%, #C4C4C4)`;
    if (audio.ended) {
        audio.currentTime = 0;
        togglePlayClases();
    }
}

function changeProgressBar(e) {
    const time = (e.offsetX / audioLengthControl.offsetWidth) * audio.duration;
    audio.currentTime = time;
    if (audio.ended) {
        audio.currentTime = 0;
        togglePlayClases();
    }
}

playBtn.addEventListener('click', playAudio);
playBtn.addEventListener('click', toggleBtn);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

soundButton.addEventListener('click', mute);
soundControl.addEventListener('change', changeVolume);
audioLengthControl.addEventListener('click', changeProgressBar);

let mousedown = false;
audio.addEventListener('timeupdate', audioPprogress);
audioLengthControl.addEventListener('mousemove', (e) => mousedown && changeProgressBar(e));
audioLengthControl.addEventListener('mousedown', () => mousedown = true);
audioLengthControl.addEventListener('mouseup', () => mousedown = false);