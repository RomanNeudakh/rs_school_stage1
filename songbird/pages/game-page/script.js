'use strict'

import {mainLang} from '../../assets/localization/main-page-lang.js';
import {birdsData} from '../../assets/localization/birdsData.js';
import {BirdPlayer} from '../../pages/game-page/playerClass.js';

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
let totalPoints = 0;
let countAnswers;
let questionAnswered;
let score = document.querySelector('.score');
let questionHeader = document.querySelectorAll('.question-name');
let currentBird = document.querySelectorAll('.current-bird-img');
let birdSong = document.querySelectorAll('.audio');
let answers = document.querySelectorAll('.answer');
let popup = document.querySelector('.anotation-popup');
let anotationContainerHeader = document.querySelector('.anotation-container-header');
let anotationText = document.querySelector('.anotation-text');
let nextButton = document.querySelector('.next-button');
let currentBirdName = document.querySelectorAll('.current-bird-name');
let rightBird;
/*-----------FOR_PLAYER--------------*/
let startButton = document.querySelectorAll('.player-button'),
    songVolume = document.querySelectorAll('.player-volume'),
    soundImg = document.querySelectorAll('.sound-img'),
    progress = document.querySelectorAll('.progress-filled'),
    audioDuration = document.querySelectorAll('.audio-duration');
let progressContainer = document.querySelectorAll('.progress');
let choiseBird = document.querySelectorAll('.answer-container');
let answerStatus = document.querySelectorAll('.answer-status');

let player1 = new BirdPlayer(birdSong[0], startButton[0], songVolume[0], soundImg[0], progress[0], audioDuration[0], progressContainer[0]);
player1.enableListeners();

let player2 = new BirdPlayer(birdSong[1], startButton[1], songVolume[1], soundImg[1], progress[1], audioDuration[1], progressContainer[1]);
player2.enableListeners();

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/*---------------------------------------------INIT_NEW_QUESTION---------------------------------*/
function initFunction(lang) {
  countAnswers = 0;
  questionAnswered = false;
  rightBird = getRandom(0, 5);
  score.textContent = `${mainLang['.score'][lang]}: ${totalPoints}`;
  if (questionNumber > 0) {
    questionHeader[questionNumber - 1].style.color = '#ffc600';
  }
  questionHeader[questionNumber].style.color = 'rgba(0,0,0,0.5)';
  currentBird[0].src = '../../assets/images/black-bird.png';
  answers.forEach((item, index) => {
    item.textContent = `${birdsData[questionNumber][index].name[lang]}`
  });
  currentBirdName[0].textContent = '******';
  answerStatus.forEach(item => {
    item.classList.add('hide');
    item.src = '#';
  })
  popup.classList.toggle('hide');
  anotationContainerHeader.classList.toggle('hide');
  anotationText.classList.toggle('hide');
  player1.setSrc(`${birdsData[questionNumber][rightBird].audio}`);
  player1.refreshProgressBar();
  player1.swithLoadedDataFlag();
  startButton[0].textContent = '►';
  songVolume.value = 1;
  soundImg.src = '../../assets/icon/sound.png';
  audioDuration.textContent = '';
}

initFunction(currentLang);


/*--------------------ANSWER------------------------*/


choiseBird.forEach((item,index) => {
  item.addEventListener('click', () => {
    pressAnswer(index);
  } );
});

function pressAnswer (index) {
  if (!popup.classList.contains('hide') ) {
    anotationContainerHeader.classList.toggle('hide');
    anotationText.classList.toggle('hide');
    popup.classList.toggle('hide');
  } 
  currentBird[1].src = `${birdsData[questionNumber][index].image}`;
  anotationText.textContent = `${birdsData[questionNumber][index].description[currentLang]}`;
  currentBirdName[1].textContent = `${birdsData[questionNumber][index].name[currentLang]} (${birdsData[questionNumber][index].species})`;
  player2.setSrc(`${birdsData[questionNumber][index].audio}`);
  player2.swithLoadedDataFlag();
  player2.refreshProgressBar();
  player2.stopSong(false);
  if (!questionAnswered) {
    if (rightBird == index) {
      answerOK.currentTime = 0;
      audioPlay(answerOK);
      player1.stopSong(false);
      answerStatus[index].src = '../../assets/icon/ok.png';
      answerStatus[index].classList.remove('hide');
      currentBird[0].src = `${birdsData[questionNumber][index].image}`;
      currentBirdName[0].textContent = `${birdsData[questionNumber][index].name[currentLang]} (${birdsData[questionNumber][index].species})`;
      questionAnswered = true;
      totalPoints += 5 - countAnswers;
      score.textContent = `${mainLang['.score'][currentLang]}: ${totalPoints}`;
      nextButton.style = 'background-color: #37a74f';
      nextButton.addEventListener('click', nextRound)


    } else {
      countAnswers++;
      answerWrong.currentTime = 0;
      audioPlay(answerWrong);
      answerStatus[index].src = '../../assets/icon/wrong.png';
      answerStatus[index].classList.remove('hide');
    }
  }
}
/*----------------------NEXT_ROUND_FUNC------------------*/
function nextRound () {
  questionNumber++;
  nextButton.style = 'background-color: grey';
  nextButton.removeEventListener('click', nextRound);
  initFunction(currentLang);
}
/*----------------------------Взаимоисключение воспроизведения---------------------------------*/
startButton[0].addEventListener('click', () => {player2.stopSong(false);});
startButton[1].addEventListener('click', () => {player1.stopSong(false);});

/*-----------------------------ANSWERS_SOUND-----------------------------------------------*/
var answerOK = new Audio();
    answerOK.preload = 'auto';
    answerOK.volume = 1;
    answerOK.src = '../../assets/audio/ok.mp3';
var answerWrong = new Audio();
    answerWrong.preload = 'auto';
    answerWrong.volume = 1;
    answerWrong.src = '../../assets/audio/wrong.mp3';

function audioPlay(audio) {
    audio.play(); 
}


/*--------------------------------PLAYER--------------------------*/

/*-----------------------------STOP-PLAY-------------------------------------*/
// startButton.addEventListener('click', stopSong);
//startButton[0].addEventListener('click', () => {player1.stopSong();});

// function stopSong () {
//   if (birdSong.paused) {
//     startButton.textContent = '❚❚';
//     birdSong.play();
//   } else {
//     startButton.textContent = '►';
//     birdSong.pause();
//   }
// }

/*----------------------------SONG_VOLUME----------------------------*/
// songVolume.addEventListener('change', () => {player1.changeVolume();});
// songVolume.addEventListener('mousemove', () => {player1.changeVolume();});
// soundImg.addEventListener('click', () => {player1.offVolume()});

// function changeVolume() {
//   songVolume.value == 0 ? soundImg.src = '../../assets/icon/sound-off.png' : soundImg.src = '../../assets/icon/sound.png';
//   birdSong.volume = songVolume.value;
// }

// function offVolume() {
//   if (songVolume.value == 0) {
//     birdSong.volume = 0.5;
//     songVolume.value = 0.5;
//     soundImg.src = '../../assets/icon/sound.png';
//   } else {
//     birdSong.volume = 0;
//     songVolume.value = 0;
//     soundImg.src = '../../assets/icon/sound-off.png';
//   }
// }

/*-----------------------PROGRESS FIELD---------------------------------*/

// birdSong[0].addEventListener('timeupdate', () => {player1.handleProgress()});

// function handleProgress() {
//   const percent = (birdSong.currentTime / birdSong.duration) * 100;
//   progress.style.flexBasis = `${percent}%`;
//   if (loadedData) {
//     timeStatus();
//   } else {
//     audioDuration.textContent = `Loading....`;
//   }
// }

// function scrub(e) {
//   const scrubTime = (e.offsetX / progressContainer.offsetWidth) * birdSong.duration;
//   birdSong.currentTime = scrubTime;
//   timeStatus();
// }

// progressContainer.addEventListener('click', (e) => {player1.scrub(e)});
// progressContainer.addEventListener('mousemove', (e) => mousedown && player1.scrub(e));
// progressContainer.addEventListener('mousedown', () => mousedown = true);
// progressContainer.addEventListener('mouseup', () => mousedown = false);

/*----------------------------------TIME_STATUS--------------------------------------------*/
// function timeStatus() {
//   const birdSongDuration = `${Math.floor(birdSong.duration/60) > 9 ? Math.floor(birdSong.duration/60) : '0' + Math.floor(birdSong.duration/60)}:${Math.round(birdSong.duration)%60 > 9 ? Math.round(birdSong.duration)%60 : '0' + Math.round(birdSong.duration)%60}`;
//   const birdSongCurentTime = `${Math.floor(birdSong.currentTime/60) > 9 ? Math.floor(birdSong.currentTime/60) : '0' + Math.floor(birdSong.currentTime/60)}:${Math.round(birdSong.currentTime)%60 > 9 ? Math.round(birdSong.currentTime)%60 : '0' + Math.round(birdSong.currentTime)%60}`;
//   audioDuration.textContent = `${birdSongCurentTime}/${birdSongDuration}`;
// };