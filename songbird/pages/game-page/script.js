'use strict'

import {mainLang} from '../../assets/localization/main-page-lang.js';
import {birdsData} from '../../assets/localization/birdsData.js';
import {BirdPlayer} from '../../assets/localization/playerClass.js';


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

/*-------------------------INIT---------------------*/
let questionNumber = 0,
    totalPoints = 0,
    countAnswers,
    questionAnswered,
    score = document.querySelector('.score'),
    questionHeader = document.querySelectorAll('.question-name'),
    currentBird = document.querySelectorAll('.current-bird-img'),
    birdSong = document.querySelectorAll('.audio'),
    answers = document.querySelectorAll('.answer'),
    popup = document.querySelector('.anotation-popup'),
    anotationContainerHeader = document.querySelector('.anotation-container-header'),
    anotationText = document.querySelector('.anotation-text'),
    nextButton = document.querySelector('.next-button'),
    currentBirdName = document.querySelectorAll('.current-bird-name'),
    rightBird;

/*-----------FOR_PLAYER--------------*/
let startButton = document.querySelectorAll('.player-button'),
    songVolume = document.querySelectorAll('.player-volume'),
    soundImg = document.querySelectorAll('.sound-img'),
    progress = document.querySelectorAll('.progress-filled'),
    audioDuration = document.querySelectorAll('.audio-duration'),
    progressContainer = document.querySelectorAll('.progress'),
    choiseBird = document.querySelectorAll('.answer-container'),
    answerStatus = document.querySelectorAll('.answer-status');

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
  questionHeader[questionNumber].style = 'background-color: #37a74f;';
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
      console.log(questionNumber)
      if (questionNumber == 5) {
        endGame();
      } else {
        nextButton.style = 'background-color: #37a74f';
        nextButton.addEventListener('click', nextRound);
      };
    } else {
      if (answerStatus[index].classList.contains('hide') ) {
        countAnswers++;
        answerStatus[index].classList.remove('hide');
        answerStatus[index].src = '../../assets/icon/wrong.png';
      } 
      answerWrong.currentTime = 0;
      audioPlay(answerWrong);
    }
  }
}

/*----------------------------END_GAME-------------------*/
let popupMassageContainer = document.querySelector('.popup-massage');
let popupMassage = document.querySelector('.massage-game');
let playAgainButton = document.querySelector('.play-again');
let stay = document.querySelector('.stay');
let inputName = document.querySelector('.input-name');

let results = localStorage.getItem('results') ? JSON.parse(localStorage.getItem(`results`)) : [];
function endGame() {
  stay.addEventListener('click', () => {
    popupMassageContainer.classList.add('hide');
  });
  if (totalPoints == 30) {
    popupMassage.textContent = `${mainLang['win-massege-max-points'][currentLang]}`;
    playAgainButton.classList.add('hide');
  } else {
    popupMassage.textContent = `${mainLang['win-massege'][currentLang]}`.replace('***', `${totalPoints}`);
  }
  beforeUnloaded();
  popupMassageContainer.classList.remove('hide');
}

function beforeUnloaded () {
  window.addEventListener('beforeunload', (event) => {
    results.push([inputName.value == '' ? 'Uknown player' : inputName.value, totalPoints]);
    localStorage.setItem(`results`, JSON.stringify(results));
  });
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
let answerOK = new Audio();
    answerOK.preload = 'auto';
    answerOK.volume = 0.1;
    answerOK.src = '../../assets/audio/ok.mp3';
let answerWrong = new Audio();
    answerWrong.preload = 'auto';
    answerWrong.volume = 0.1;
    answerWrong.src = '../../assets/audio/wrong.mp3';

function audioPlay(audio) {
    audio.play(); 
}

