import {showTime, currentTimeOfDay} from './time.js';
import getWeather from './wether.js';
import getRandomQuote from './quote.js';
import {playAudio} from './audio.js';
import {addBackgroundImage, minSliderIndex, maxSliderIndex} from './slider.js';

let city = document.querySelector('.city');
let userName = document.querySelector('.name');


if (localStorage.getItem('name')) userName.value = localStorage.getItem('name');
if (localStorage.getItem('city')) city.value = localStorage.getItem('city');


/* Time */
showTime();
/* Slider */
addBackgroundImage(minSliderIndex, maxSliderIndex);
/* Wether */

if(localStorage.getItem('city') == null || localStorage.getItem('city') == '') {
    getWeather('Minsk');
    city.value = 'Minsk';
} else getWeather(city.value);

/* Random quote */
getRandomQuote();
/* Audio  */

const playBtn = document.querySelector('.play');

playBtn.addEventListener('click', playAudio);

city.addEventListener ( 'change', e => {
    city.textContent = e.target.value;
    localStorage.setItem('city', city.value);
    getWeather(city.value);
})

userName.addEventListener ( 'change', e => {
    userName.textContent = e.target.value;
    localStorage.setItem('name', userName.value);
})
