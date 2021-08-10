"use strict"

const time = document.querySelector('.time');
const currentVisibleDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');

let timesOfDay = {
    morning: 'Good morning',
    day: 'Good day',
    evening: 'Good evening',
    night: 'Good night'
};
export let currentTimeOfDay = '';

export function showTime() {
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

function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday:'long', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('en-Br', options);
    currentVisibleDate.textContent = currentDate;
}

function userGreeting() {
    greeting.textContent = timesOfDay[`${currentTimeOfDay}`];
}