'use strict'

import {mainLang} from '../../assets/localization/main-page-lang.js';

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

/*--------------------------RESULTS_POPUP--------------------------*/
let popupMassage = document.querySelector('.popup-massage');

function showMassege() {
  if (!localStorage.getItem('results')) {
    popupMassage.classList.remove('hide');
  } else {
    createBoard();
  }
}

showMassege();

/*--------------------------CREATE_PAGE--------------------------*/
function createBoard() {
  let scoreContainer = document.querySelector('.score-container');
  let resultsArr = (JSON.parse(localStorage.getItem('results')).sort((x, y) => y[1] - x[1])).slice(0, 10);
  resultsArr.forEach((item, index) => {
    let scoreRow = document.createElement('div');
    scoreContainer.insertBefore(scoreRow, null).classList.add('score-row');
    let scoreName = document.createElement('div');
    scoreRow.insertBefore(scoreName, null).classList.add('score-name');
    scoreName.textContent = `${index + 1 + '.' + '  ' + item[0]}`;
    let scoreCount = document.createElement('div');
    scoreRow.insertBefore(scoreCount, null).classList.add('score-count');
    scoreCount.textContent = `${item[1]}`;
  });
}