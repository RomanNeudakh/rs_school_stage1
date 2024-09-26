'use strict'

import {mainLang} from '../../assets/localization/main-page-lang.js';

let video = document.querySelectorAll('.video'),
    videoItem = document.querySelectorAll('.video-item'),
    burgerIcon = document.querySelector('.burger-icon'),
    burgerMenuPopup = document.querySelector('.burger-menu-popup'),
    closeIcon = document.querySelector('.x-icon'),
    selectLang = document.querySelectorAll('.select-lang-text');


/*----------------Preview videos----------------------------*/
video.forEach(item => {
  item.addEventListener("click", () => {
    unmute(item);
  });
});

function unmute (target) {
  video.forEach((item, index) => {
    if (item == target) {
      target.classList.toggle("video");
      videoItem[index].muted == true ? videoItem[index].muted = false : videoItem[index].muted = true;
    } else {
      videoItem[index].muted = true;
      item.classList.add('video');
    }
  });
}

/*----------------------burger-menu --------------------------------*/
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

/*---------------------Select lang----------------------------------*/
selectLang.forEach(item => {
  item.addEventListener('click', () => {
    localStorage.setItem('lang', JSON.stringify(item.textContent));
    location.reload();
  });
});

function changeLang() {
  let currentLang = JSON.parse(localStorage.getItem('lang'));
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