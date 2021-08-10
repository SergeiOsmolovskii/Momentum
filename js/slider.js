"use strict"
import {currentTimeOfDay} from './time.js';

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const backgroundImage = document.body;
export const minSliderIndex = 1;
export const maxSliderIndex = 20;
let currentSlideIndex = 0;

function setBackgroundImage() {  
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTimeOfDay}/${currentSlideIndex < 10 ? `0${currentSlideIndex}` : currentSlideIndex}.jpg`;
    img.onload = () => {      
        backgroundImage.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTimeOfDay}/${currentSlideIndex < 10 ? `0${currentSlideIndex}` : currentSlideIndex}.jpg)`;
    }; 
  }

export function addBackgroundImage(minSliderIndex, maxSliderIndex, currentTimeOfDay) {
    function getRandomArbitrary(minSliderIndex, maxSliderIndex) {
        let min = Math.ceil(minSliderIndex);
        let max = Math.floor(maxSliderIndex);
        currentSlideIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getRandomArbitrary(minSliderIndex, maxSliderIndex);
    setBackgroundImage()
    backgroundImage.style.backgroundSize = 'cover';
}

slidePrev.addEventListener('click', () => {
    currentSlideIndex = currentSlideIndex - 1; 
    if (currentSlideIndex < minSliderIndex) currentSlideIndex = maxSliderIndex; 
    setBackgroundImage();
    backgroundImage.style.backgroundSize = 'cover';
})

slideNext.addEventListener('click', () => {
    currentSlideIndex = currentSlideIndex + 1; 
    if (currentSlideIndex > maxSliderIndex) currentSlideIndex = minSliderIndex; 
    setBackgroundImage();
    backgroundImage.style.backgroundSize = 'cover';
})