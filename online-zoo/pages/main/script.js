'use strict'
let burger_menu_button = document.querySelector('.burger-menu');
let burger_menu_container = document.querySelector('.burger_menu_container');
let burger_menu = document.querySelector('.burger_menu');
let x_icon_burger_menu = document.querySelector('.x_icon_orange_img');

burger_menu_button.addEventListener('click', () => {
    burger_menu_container.classList.toggle('burger_menu_container_active');
    burger_menu.classList.toggle('burger_menu_active');
});
x_icon_burger_menu.addEventListener('click', () => {
    burger_menu.classList.toggle('burger_menu_active');
    burger_menu_container.classList.toggle('burger_menu_container_active');
    
});
burger_menu_container.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target == burger_menu_container) {
        burger_menu.classList.toggle('burger_menu_active');
        burger_menu_container.classList.toggle('burger_menu_container_active');
    }
});


/*---------------------------------Carusel-----------------------------*/
let animalCards = [
    {
        name: 'giant pandas',
        location: 'Native to Southwest China',
        srcCard: '../../assets/images/panda.jpg',
        srcFood: '../../assets/icons/banana-bamboo_icon.png'
    }, 
    {
        name: 'Eagles',
        location: 'Native to South America',
        srcCard: '../../assets/images/eagle.jpg',
        srcFood: '../../assets/icons/meet-fish_icon.png' 
    }, 
    {
        name: 'Gorillas',
        location: 'Native to South America',
        srcCard: '../../assets/images/Gorillas.jpg',
        srcFood: '../../assets/icons/banana-bamboo_icon.png' 
    }, 
    {
        name: 'Two-toed Sloth',
        location: 'Mesoamerica, South America',
        srcCard: '../../assets/images/Two-toedSloth.jpg',
        srcFood: '../../assets/icons/banana-bamboo_icon.png' 
    }, 
    {
        name: 'cheetahs',
        location: 'Native to Africa',
        srcCard: '../../assets/images/cheetahs.jpg',
        srcFood: '../../assets/icons/meet-fish_icon.png' 
    }, 
    {
        name: 'Penguins',
        location: 'Native to Antarctica',
        srcCard: '../../assets/images/Penguins.jpg',
        srcFood: '../../assets/icons/meet-fish_icon.png' 
    }, 
    {
        name: 'alligators',
        location: 'Native to Southeastern US',
        srcCard: '../../assets/images/aligator.jpg',
        srcFood: '../../assets/icons/meet-fish_icon.png' 
    }, 
    {
        name: 'Gorillas',
        location: 'Native to Congo',
        srcCard: '../../assets/images/gorillas2.jpg',
        srcFood: '../../assets/icons/banana-bamboo_icon.png' 
    }
];
let slider_line = document.querySelector('.slider_line');
let favorite_card_clone = document.querySelectorAll('.fav_cards_clone')
let right_arrow = document.querySelectorAll('.arrow');
let count = 0;
let width;
let offset = -1190;
let slideArr = [0, 1, 2];
/*-------------------------------перемешивание карт--------------------------*/
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
shuffle(animalCards);
/*------------------------------------------------------------------------------*/
function shufflePageCards (favorite_card_clone) {
    shuffle(animalCards);
    let changeCards = favorite_card_clone.querySelectorAll('.img_container');
    let cardName = favorite_card_clone.querySelectorAll('.card_name');
    for (let index = 0; index < changeCards.length; index++) {
        changeCards[index].children[0].src = animalCards[index].srcCard;
    }
    for (let index = 0; index < cardName.length; index++) {
        cardName[index].children[1].src = animalCards[index].srcFood;
        cardName[index].getElementsByTagName('div')["0"].childNodes[1].textContent = animalCards[index].name;
        cardName[index].getElementsByTagName('div')["0"].childNodes[4].textContent = animalCards[index].location;
    }
}
shufflePageCards(favorite_card_clone[0]);
shufflePageCards(favorite_card_clone[2]);
/*--------------------------------------------------------------------------------------*/
let leftStart;
let clickRightArrow = function () {
    console.log('hi')
    offset = offset - leftStart;
    slider_line.style.left = offset + 'px';
    if (!parseInt((favorite_card_clone[slideArr[0]].style.left).match(/\d+/))) {
        favorite_card_clone[slideArr[0]].style.left = leftStart*3 + 'px';
    } else {
        favorite_card_clone[slideArr[0]].style.left = (parseInt(favorite_card_clone[slideArr[0]].style.left.slice(0, -2)) + leftStart*3) + 'px';
    }
    shufflePageCards(favorite_card_clone[slideArr[0]]);
    shufflePageCards(favorite_card_clone[slideArr[2]]);
    slideArr = [].concat(slideArr.slice(1), slideArr.slice(0, 1));
    right_arrow[1].removeEventListener('click', clickRightArrow);
    setTimeout(() => right_arrow[1].addEventListener('click', clickRightArrow), 1200);
}
let clickLeftArrow = function () {
    offset = offset + leftStart;
    slider_line.style.left = offset + 'px';
    if (!parseInt((favorite_card_clone[slideArr[2]].style.left).match(/\d+/))) {
        favorite_card_clone[slideArr[2]].style.left = -leftStart*3 + 'px';
    } else {
        favorite_card_clone[slideArr[2]].style.left = (parseInt(favorite_card_clone[slideArr[2]].style.left.slice(0, -2)) - leftStart*3) + 'px';
    }
    shufflePageCards(favorite_card_clone[slideArr[2]]);
    shufflePageCards(favorite_card_clone[slideArr[0]]);
    slideArr = [].concat(slideArr.slice(2), slideArr.slice(0, 2));
    right_arrow[0].removeEventListener('click', clickLeftArrow);
    setTimeout(() => right_arrow[0].addEventListener('click', clickLeftArrow), 1200);
}

right_arrow[0].addEventListener('click', clickLeftArrow);
right_arrow[1].addEventListener('click', clickRightArrow);
/*------------------------------------Определение ширины Container --------------------------------------*/
function init() {
    width = document.querySelector('.slider').offsetWidth;
    console.log(width)
}

/*-------------------------------------------------------------------------------------------*/
function loadResize() {
    init();
    document.querySelector('.slider_line').style.width = (width+20)*3 + 'px';
    document.querySelector('.slider_line').style.left = -(width+30) + 'px';  
    document.querySelectorAll('.fav_cards_clone').forEach(item => {
        item.style.left = 0;
    });
    offset = -(width+30);
    leftStart = width+30;
    slideArr = [0, 1, 2];
}
loadResize();
window.addEventListener('resize', () => {
    loadResize();
});