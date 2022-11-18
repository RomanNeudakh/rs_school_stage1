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

/*--------------------------RESULTS--------------------------*/
let popupMassage = document.querySelector('.popup-massage');

function showMassege() {
  if (!localStorage.getItem('results')) {
    popupMassage.classList.remove('hide');
  } else {

  }
}

showMassege();