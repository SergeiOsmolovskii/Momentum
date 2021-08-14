"use strict"

import playList from './playList.js';

const playListBlock = document.querySelector('.play-list');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playBtn = document.querySelector('.play');
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

playBtn.addEventListener('click', playAudio);
playBtn.addEventListener('click', toggleBtn);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);