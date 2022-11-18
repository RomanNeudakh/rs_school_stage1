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
      if (index > mainLang[key][lang].length - 1) {
        item.textContent = `${mainLang[key][lang][index - 3]}`
      } else {
        item.textContent = `${mainLang[key][lang][index]}`
      }
    });
  }
}

/*--------------------------RESULTS--------------------------*/
let popupMassage = document.querySelector('.popup-massage');

function showMassege() {
  if (!localStorage.getItem('results')) {
    // popupMassage.classList.remove('hide');
  } else {

  }
}

showMassege();


/*-------------------------INIT---------------------*/
let questionNumber = 0;
let questionHeader = document.querySelectorAll('.question-name');
let currentBird = document.querySelector('.current-bird-img');
let birdSong = document.querySelector('.audio');
let answers = document.querySelectorAll('.answer');
let popup = document.querySelector('.anotation-popup');
let anotationContainerHeader = document.querySelector('.anotation-container-header');
let anotationText = document.querySelector('.anotation-text');
let rightBird;
/*-----------FOR_PLAYER--------------*/
let startButton = document.querySelector('.player-button'),
    songVolume = document.querySelector('.player-volume'),
    soundImg = document.querySelector('.sound-img'),
    progress = document.querySelector('.progress-filled'),
    loadedData,
    audioDuration = document.querySelector('.audio-duration'),
    birdSongDuration,
    birdSongCurentTime;


function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function initFunction(lang) {
  loadedData = false;
  rightBird = getRandom(0, 5);
  if (questionNumber > 0) {
    questionHeader[questionNumber - 1].style.color = '#ffc600';
  }
  questionHeader[questionNumber].style.color = 'rgba(0,0,0,0.5)';
  currentBird.src = '../../assets/images/black-bird.png';
  birdSong.src = `${birdsData[questionNumber][rightBird].audio}`;
  answers.forEach((item, index) => {
    item.textContent = `${birdsData[questionNumber][index].name[lang]}`
  });
  popup.classList.toggle('hide');
  anotationContainerHeader.classList.toggle('hide');
  anotationText.classList.toggle('hide');

  
  startButton.textContent = '►';
  songVolume.value = 1;
  soundImg.src = '../../assets/icon/sound.png';
  audioDuration.textContent = '';
  
  birdSong.onloadedmetadata = function() {
    loadedData = true;
    timeStatus();
  };
  progress.style.flexBasis = 0;

}
initFunction(currentLang);


/*--------------------ANSWER------------------------*/
let choiseBird = document.querySelectorAll('.answer-container');
let choiseBirdA = document.querySelector('.answers');
choiseBird.forEach((item,index) => {
  item.addEventListener('click', () => {
    pressAnswer(index);
  } );
});
// choiseBirdA.addEventListener('click', (e, index) => {
//   pressAnswer(index);
// })
function pressAnswer (index) {
  console.log(index)
}




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