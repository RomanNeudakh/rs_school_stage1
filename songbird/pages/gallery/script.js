'use strict'

import {mainLang} from '../../assets/localization/main-page-lang.js';
import {birdsData} from '../../assets/localization/birdsData.js';


let burgerIcon = document.querySelector('.burger-icon'),
    burgerMenuPopup = document.querySelector('.burger-menu-popup'),
    closeIcon = document.querySelector('.x-icon'),
    selectLang = document.querySelectorAll('.select-lang-text');

/*----------------------BURGER_MENU --------------------------------*/
function burgerMenu() {
  burgerIcon.addEventListener('click', toggleBurgerMenu);
  closeIcon.addEventListener('click', toggleBurgerMenu);
  burgerMenuPopup.addEventListener('click', (e) => {
    if (e.target == burgerMenuPopup) {
      toggleBurgerMenu();
    }
  });

  function toggleBurgerMenu() {
    burgerMenuPopup.classList.toggle('burger-menu-active');
  }
}

burgerMenu();

/*---------------------SELECT LANG----------------------------------*/
let currentLang = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang')) : 'RU';

function changeLang() {
  if (currentLang) {
    selectLang.forEach(item => item.classList.remove('select-lang-choise'));
    selectLang.forEach(item => {
      if (currentLang == item.textContent) {
        item.classList.add('select-lang-choise');
      }
    });
    createContent(currentLang);
  } else {
    createContent('RU');
  }
}

changeLang();

function createContent(lang) {
  for (let key in mainLang) {
    document.querySelectorAll(key).forEach((item, index) => {
      if (index > 2) {
        item.textContent = `${mainLang[key][lang][index - 3]}`
      } else {
        item.textContent = `${mainLang[key][lang][index]}`
      }
    });
  }
}

/*----------------------------SLIDER-------------------------*/
let birdName = document.querySelector('.bird-name'),
    anotation = document.querySelector('.anotation-text'),
    birdImage = document.querySelector('.bird-img'),
    birdNumber = document.querySelector('.bird-number'),
    birdSong = document.querySelector('.audio'),
    startButton = document.querySelector('.player-button'),
    songVolume = document.querySelector('.player-volume'),
    soundImg = document.querySelector('.sound-img'),
    progress = document.querySelector('.progress-filled'),
    audioDuration = document.querySelector('.audio-duration'),
    birdData = birdsData.flat(),
    numberCard = 1,
    birdSongDuration,
    birdSongCurentTime,
    loadedData;
    
/*-----------------------CREATE CARD--------------------------------*/
function createCard(lang) {
  loadedData = false;
  birdName.textContent = `${birdData[numberCard - 1].name[lang]} (${birdData[numberCard - 1].species})`;
  anotation.textContent = `${birdData[numberCard - 1].description[lang]}`;
  birdImage.src = `${birdData[numberCard - 1].image}`;
  birdNumber.textContent = `${numberCard}`;
  birdSong.src = `${birdData[numberCard - 1].audio}`;
  startButton.textContent = '►';
  songVolume.value = 1;
  soundImg.src = '../../assets/icon/sound.png';
  audioDuration.textContent = '';
  birdSong.onloadedmetadata = function() {
    timeStatus();
    loadedData = true;
  };
  progress.style.flexBasis = 0;
}

createCard(currentLang);

/*--------------------NEXT_PREW CARD--------------------------*/
let arrowLeft = document.querySelector('.arrow-left');
let arrowRight = document.querySelector('.arrow-right');

arrowLeft.addEventListener('click', () => {
  if (numberCard > 1) {
    numberCard--;
    createCard(currentLang);
  }
});
arrowRight.addEventListener('click', () => {
  if (numberCard < 36) {
    numberCard++;
    createCard(currentLang);
  }
});

/*--------------------------------PLAYER--------------------------*/

/*-----------------------------STOP-PLAY-------------------------------------*/
startButton.addEventListener('click', stopSong);

function stopSong () {
  if (birdSong.paused) {
    startButton.textContent = '❚❚';
    birdSong.play();
  } else {
    startButton.textContent = '►';
    birdSong.pause();
  }
}

/*----------------------------SONG_VOLUME----------------------------*/
songVolume.addEventListener('change', changeVolume);
songVolume.addEventListener('mousemove', changeVolume);

function changeVolume() {
  songVolume.value == 0 ? soundImg.src = '../../assets/icon/sound-off.png' : soundImg.src = '../../assets/icon/sound.png';
  birdSong.volume = songVolume.value;
}

soundImg.addEventListener('click', () => {
  if (songVolume.value == 0) {
    birdSong.volume = 0.5;
    songVolume.value = 0.5;
    soundImg.src = '../../assets/icon/sound.png';
  } else {
    birdSong.volume = 0;
    songVolume.value = 0;
    soundImg.src = '../../assets/icon/sound-off.png';
  }
});

/*-----------------------PROGRESS FIELD---------------------------------*/
let progressContainer = document.querySelector('.progress'),
    mousedown = false;
birdSong.addEventListener('timeupdate', handleProgress);

function handleProgress() {
  const percent = (birdSong.currentTime / birdSong.duration) * 100;
  progress.style.flexBasis = `${percent}%`;
  if (loadedData) {
    timeStatus();
  } else {
    audioDuration.textContent = `Loading....`;
  }
}

function scrub(e) {
  const scrubTime = (e.offsetX / progressContainer.offsetWidth) * birdSong.duration;
  birdSong.currentTime = scrubTime;
  timeStatus();
}

progressContainer.addEventListener('click', scrub);
progressContainer.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressContainer.addEventListener('mousedown', () => mousedown = true);
progressContainer.addEventListener('mouseup', () => mousedown = false);

/*----------------------------------TIME_STATUS--------------------------------------------*/
function timeStatus() {
  birdSongDuration = `${Math.floor(birdSong.duration/60) > 9 ? Math.floor(birdSong.duration/60) : '0' + Math.floor(birdSong.duration/60)}:${Math.round(birdSong.duration)%60 > 9 ? Math.round(birdSong.duration)%60 : '0' + Math.round(birdSong.duration)%60}`;
  birdSongCurentTime = `${Math.floor(birdSong.currentTime/60) > 9 ? Math.floor(birdSong.currentTime/60) : '0' + Math.floor(birdSong.currentTime/60)}:${Math.round(birdSong.currentTime)%60 > 9 ? Math.round(birdSong.currentTime)%60 : '0' + Math.round(birdSong.currentTime)%60}`;
  audioDuration.textContent = `${birdSongCurentTime}/${birdSongDuration}`;
};

