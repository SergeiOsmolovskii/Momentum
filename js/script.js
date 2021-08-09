import playList from './playList.js';

const time = document.querySelector('.time');
const currentVisibleDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

const backgroundImage = document.body;
const minSliderIndex = 1;
const maxSliderIndex = 20;



let timesOfDay = {
    morning: 'Good morning',
    day: 'Good day',
    evening: 'Good evening',
    night: 'Good night'
};
let currentTimeOfDay = '';
let currentSlideIndex = 0;



let userName = document.querySelector('.name');
let city = document.querySelector('.city');

if (localStorage.getItem('name')) userName.value = localStorage.getItem('name');
if (localStorage.getItem('city')) city.value = localStorage.getItem('city');

function showTime() {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    time.textContent = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    if (hours >= 6 && hours < 12 ) currentTimeOfDay = 'morning';
    if (hours >= 12 && hours < 18 ) currentTimeOfDay = 'day';
    if (hours >= 18 && hours < 24 ) currentTimeOfDay = 'evening';
    if (hours >= 0 && hours < 6 ) currentTimeOfDay = 'night';

    userGreeting();
    showDate();
    setTimeout(showTime, 1000);
  }
  showTime();

function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday:'long', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('en-Br', options);
    currentVisibleDate.textContent = currentDate;
}

function userGreeting() {
    greeting.textContent = timesOfDay[`${currentTimeOfDay}`];
}

/* Slider */

function addBackgroundImage(minSliderIndex, maxSliderIndex, currentTimeOfDay) {

    function getRandomArbitrary(minSliderIndex, maxSliderIndex) {
        let min = Math.ceil(minSliderIndex);
        let max = Math.floor(maxSliderIndex);
        currentSlideIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getRandomArbitrary(minSliderIndex, maxSliderIndex);
    backgroundImage.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTimeOfDay}/${currentSlideIndex < 10 ? `0${currentSlideIndex}` : currentSlideIndex}.jpg)`;
    backgroundImage.style.backgroundSize = 'cover';

}

slidePrev.addEventListener('click', e => {
    currentSlideIndex = currentSlideIndex - 1; 
    if (currentSlideIndex < minSliderIndex) currentSlideIndex = maxSliderIndex; 
    backgroundImage.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTimeOfDay}/${currentSlideIndex < 10 ? `0${currentSlideIndex}` : currentSlideIndex}.jpg)`;
    backgroundImage.style.backgroundSize = 'cover';
})

slideNext.addEventListener('click', e => {
    currentSlideIndex = currentSlideIndex + 1; 
    if (currentSlideIndex > maxSliderIndex) currentSlideIndex = minSliderIndex; 
    backgroundImage.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTimeOfDay}/${currentSlideIndex < 10 ? `0${currentSlideIndex}` : currentSlideIndex}.jpg)`;
    backgroundImage.style.backgroundSize = 'cover';
})

addBackgroundImage(minSliderIndex, maxSliderIndex, currentTimeOfDay);

/* Wether */

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const errorBlock = document.querySelector('.weather-error');

async function getWeather(city='Minsk') {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=62e8257bd53a0de7423f9fcf5278de47`;
    const res = await fetch(url);  
    const data = await res.json(); 

    if (res.status == 404) {
        errorBlock.textContent = `Error! city not found for "${city}"`;
        weatherIcon.className = '';
        temperature.textContent = ``;
        weatherDescription.textContent = '';
        wind.textContent = ``;
        humidity.textContent = ``;
      } else errorBlock.textContent = ``;

    weatherIcon.style.display = 'block';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`, 'weather-icon', 'owf');
    temperature.textContent = `${Math.round(data.main.temp - 273)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  }
  getWeather(city.value)



/* Random quote */

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let rotateDeg = 0;
async function getRandomQuote() {

    const url = `https://favqs.com/api/qotd`;
    const res = await fetch(url);  
    const data = await res.json(); 
    quote.textContent = `"${data.quote.body}"`;
    author.textContent = data.quote.author;

}

getRandomQuote();

changeQuote.addEventListener('click', () => {
    rotateDeg += 180;
    changeQuote.style.transform = `rotate(${rotateDeg}deg)`;
    changeQuote.style.transition = '1s';
    getRandomQuote();
})


/* Audio  */

const playListBlock = document.querySelector('.play-list');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playBtn = document.querySelector('.play');
const audio = new Audio();
let isPlay = false;
let currentAudio = 0;

audio.src = playList[currentAudio].src;

function playAudio() {
    if(!isPlay) {
        audio.play();
        isPlay = true;
        changePlayListItem(currentAudio);
    } else {
        audio.pause();
        isPlay = false;
    }
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

playList.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = item.title;
    playListBlock.append(li); 
})

let playListLi = document.querySelectorAll('.play-item');

function changePlayListItem(currentAudio) {
    playListLi.forEach((item, index) => {
        if(index == currentAudio) item.classList.toggle('item-active')
        else item.classList.remove('item-active');
    }) 
}

playBtn.addEventListener('click', playAudio);
playBtn.addEventListener('click', toggleBtn);

playPrevBtn.addEventListener('click', () => {
    currentAudio--;
    if(currentAudio < 0) currentAudio = playList.length - 1; 
    playCurrentAudio()
})

playNextBtn.addEventListener('click', () => {
    currentAudio++;
    if(currentAudio > playList.length - 1) currentAudio = 0;
    playCurrentAudio()
})

city.addEventListener ( 'change', e => {
    city.textContent = e.target.value;
    localStorage.setItem('city', city.value);
    getWeather(city.value);
})

userName.addEventListener ( 'change', e => {
    userName.textContent = e.target.value;
    localStorage.setItem('name', userName.value);
})
