"use strict"
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const errorBlock = document.querySelector('.weather-error');
let currentCity = document.querySelector('.city');

export default async function getWeather(city) {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=62e8257bd53a0de7423f9fcf5278de47`;
    const res = await fetch(url);  
    const data = await res.json(); 

    if (res.status == 200) {
        addWeather();
        errorBlock.textContent = ``;
    } else if (res.status == 404) {
        errorBlock.textContent = `Error! City not found for "${city}"`;
        clearWeather();
    } else if(res.status == 400) {
        errorBlock.textContent = `Error! Nothing to geocode for`;
        clearWeather();
    } else errorBlock.textContent = ``;

    function clearWeather() {
        weatherIcon.className = '';
        temperature.textContent = ``;
        weatherDescription.textContent = '';
        wind.textContent = ``;
        humidity.textContent = ``;
    }

    function addWeather() {
        currentCity.textContent = city;
        weatherIcon.style.display = 'block';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`, 'weather-icon', 'owf');
        temperature.textContent = `${Math.round(data.main.temp - 273)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    }
}