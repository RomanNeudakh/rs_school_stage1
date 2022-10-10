'use strict'
/*----------------------------бургер меню----------------------------*/
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
let leftStart;
/*-------------------------------перемешивание карт--------------------------*/
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
shuffle(animalCards);
/*---------------------------------перемешиваем карты в блоке---------------------------------------------*/
function shufflePageCards (favorite_card_clone) {
    shuffle(animalCards); //перемешиваем массив карт
    let changeCards = favorite_card_clone.querySelectorAll('.img_container');
    let cardName = favorite_card_clone.querySelectorAll('.card_name');
    for (let index = 0; index < changeCards.length; index++) {
        changeCards[index].children[0].src = animalCards[index].srcCard;//меняем картинку животного
    }
    for (let index = 0; index < cardName.length; index++) {
        cardName[index].children[1].src = animalCards[index].srcFood;//иконка еда
        cardName[index].getElementsByTagName('div')["0"].childNodes[1].textContent = animalCards[index].name; //имя животного
        cardName[index].getElementsByTagName('div')["0"].childNodes[4].textContent = animalCards[index].location;// локация животного
    }
}
shufflePageCards(favorite_card_clone[0]);//перемешиваем крайние блоки при загрузке страницы
shufflePageCards(favorite_card_clone[2]);//перемешиваем крайние блоки при загрузке страницы
/*--------------------------------------------------------------------------------------*/

let clickRightArrow = function () {
    offset = offset - leftStart;
    slider_line.style.left = offset + 'px';
    if (!parseInt((favorite_card_clone[slideArr[0]].style.left).match(/\d+/))) {
        favorite_card_clone[slideArr[0]].style.left = leftStart*3 + 'px';
    } else {
        favorite_card_clone[slideArr[0]].style.left = (parseInt(favorite_card_clone[slideArr[0]].style.left.slice(0, -2)) + leftStart*3) + 'px';
    }
    shufflePageCards(favorite_card_clone[slideArr[0]]);//перемешиваем крайние блоки после перемещения слайдера
    shufflePageCards(favorite_card_clone[slideArr[2]]);//перемешиваем крайние блоки после перемещения слайдера
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
    shufflePageCards(favorite_card_clone[slideArr[2]]);//перемешиваем крайние блоки после перемещения слайдера
    shufflePageCards(favorite_card_clone[slideArr[0]]);//перемешиваем крайние блоки после перемещения слайдера
    slideArr = [].concat(slideArr.slice(2), slideArr.slice(0, 2));
    right_arrow[0].removeEventListener('click', clickLeftArrow);
    setTimeout(() => right_arrow[0].addEventListener('click', clickLeftArrow), 1200);
}

right_arrow[0].addEventListener('click', clickLeftArrow);
right_arrow[1].addEventListener('click', clickRightArrow);

/*-------------------------------------carusel <testimonials------------------------*/

let testimonialsArray = [
    {
        photoUrl: '../../assets/icons/rick.png',
        testimonialName: 'Rick Sanchez',
        testimonialLocation: 'Unknown',
        testimonialTime: 'Tomorrow',
        testimonialText: 'I’m a scientist; because I invent, transform, create, and destroy for a living, and when I don’t like something about the world, I change it.'
    },
    {
        photoUrl: '../../assets/icons/oscar.png',
        testimonialName: 'Oskar Samborsky',
        testimonialLocation: 'Local Austria',
        testimonialTime: 'Yesterday',
        testimonialText: 'Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for'
    },
    {
        photoUrl: '../../assets/icons/frederica.png',
        testimonialName: 'Fredericka Michelin',
        testimonialLocation: 'Local Austria',
        testimonialTime: 'Yesterday',
        testimonialText: 'Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for'
    },
    {
        photoUrl: '../../assets/icons/homer.png',
        testimonialName: 'Homer Simpson',
        testimonialLocation: 'Springfild USA',
        testimonialTime: 'Yesterday',
        testimonialText: 'I want to share something with you: The three little sentences that will get you through life. Number 1: Cover for me. Number 2: Oh, good idea, Boss! Number 3: It was like that when I got here. Simpson! Homer Simpson! He’s the greatest guy in his-tor-y.From the, town of Springfield! He’s about to hit a chestnut tree! Waaaah!'
    },
    {
        photoUrl: '../../assets/icons/greta.png',
        testimonialName: 'Greta Thunberg',
        testimonialLocation: 'Local Sweden',
        testimonialTime: 'Yesterday',
        testimonialText: 'How dare you?! You stole something from me...We will not let you get away with this. Right here, right now is where we draw the line. The world is waking up. And change is coming, whether you like it or not.'
    },
    {
        photoUrl: '../../assets/icons/ventura.png',
        testimonialName: 'Ace Ventura',
        testimonialLocation: 'Local USA',
        testimonialTime: 'Rigth now',
        testimonialText: 'Well, everything here seems good! Big load off my mind, aw God. You can speculate all you want, but unless you check it out for yourself, you never know.'
    },
    {
        photoUrl: '../../assets/icons/boris.png',
        testimonialName: 'Boris Johnson',
        testimonialLocation: 'United Kingdom',
        testimonialTime: 'Today',
        testimonialText: 'Ping-pong was invented on the dining tables of England in the 19th century, and it was called Wiff-waff! And there, I think, you have the difference between us and the rest of the world. Other nations, the French, looked at a dining table and saw an opportunity to have dinner; we looked at it an saw an opportunity to play Wiff-waff.'
    },
    {
        photoUrl: '../../assets/icons/mila.png',
        testimonialName: 'Oska Samborska',
        testimonialLocation: 'Local Austria',
        testimonialTime: 'Today',
        testimonialText: 'My son delighted very much ljves to watch.... gouillas.The best online zoo I’ve met.  Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.'
    },
    {
        photoUrl: '../../assets/icons/leonardo.png',
        testimonialName: 'Leonardo DiCaprio',
        testimonialLocation: 'Local USA',
        testimonialTime: 'Today',
        testimonialText: `Winning that ticket, Rose, was the best thing that ever happened to me. It brought me to you and I am thankful for that, Rose. I am thankful. You must do me this honour, Rose. Promise me you will survive, that you won't give up, no matter what happens, no matter how hopeless. promise me now, Rose, and never let go of that promise.`
    },
    {
        photoUrl: '../../assets/icons/biden.png',
        testimonialName: 'Joe Biden',
        testimonialLocation: 'Local USA',
        testimonialTime: 'Today',
        testimonialText: 'If you need more than 10 rounds to hunt, and some argue they hunt with that many rounds, you shouldnt be hunting. If you cant get the deer in 3 shots, you shouldnt be hunting. You are an embarrassment. If you need more than 10 rounds to hunt, and some argue they hunt with that many rounds, you shouldnt be hunting. If you cant get the deer in 3 shots, you shouldnt be hunting. You are an embarrassment.'
    },
    {
        photoUrl: '../../assets/icons/poul.png',
        testimonialName: 'Paul Mitchell',
        testimonialLocation: 'Local USA',
        testimonialTime: 'Today',
        testimonialText: 'Animals are such agreeable friends—they ask no questions. they pass no criticisms'
    }];

    let offset_testimonials = 0;
    let sliderLineTestimonials = document.querySelector('.slider_line_testimonials');
    let rangeTestimonials =  document.querySelector('.input_range');
    let ofsetStepTestimonials; 
    
    rangeTestimonials.addEventListener("input", function() {
        console.log(width);
        offset_testimonials = - this.value * ofsetStepTestimonials;
        sliderLineTestimonials.style.left = offset_testimonials + 'px';
    });

    function shuffleTestimonials () {
        shuffle(testimonialsArray); //перемешиваем массив отзывов
        let avatar = document.querySelectorAll('.avatar');
        let userName = document.querySelectorAll('.testimonials_name');
        let testimonialsText = document.querySelectorAll('.testimonials_card_text');
        for (let index = 0; index < avatar.length; index++) {
            avatar[index].src = testimonialsArray[index].photoUrl;//меняем аватарку
            userName[index].childNodes[0].textContent = testimonialsArray[index].testimonialName;
            userName[index].childNodes[3].textContent = `${testimonialsArray[index].testimonialLocation} • ${testimonialsArray[index].testimonialTime}`;
            testimonialsText[index].textContent = testimonialsArray[index].testimonialText;
        }
    }
    shuffleTestimonials ();
 /*------------------------------------Определение ширины Container --------------------------------------*/
function init() {
    width = document.querySelector('.slider').offsetWidth;
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
    ofsetStepTestimonials = document.querySelector('.testimonials_card').offsetWidth + 29;
}
loadResize();//обнуление слайдера при загрузке страницы
window.addEventListener('resize', () => {
    loadResize(); //обнуление слайдера при изменении ширины страницы
    if (width < 921) {
        sliderLineTestimonials.style.left = 0;
    }
});

/*--------------------------------------popup testimonials-------------------------------------*/
let testimonialCardsClick = document.querySelectorAll('.testimonials_card'),
    testimonialContainer = document.querySelector('.testimonial_container_popup'),
    avatarPopup = document.querySelector('.avatar_popup'),
    testimonialsNamePopup = document.querySelector('.testimonials_name_popup'),
    testimonialsCardTextPopup = document.querySelector('.testimonials_card_text_popup'),
    xIconPopup = document.querySelector('.x_icon_popup');

function clickTestimonials() {
    testimonialContainer.classList.toggle('testimonial_container_active');
}
testimonialCardsClick.forEach(item => {
    item.addEventListener('click', (e) => {
        avatarPopup.src = e.target.querySelector('.avatar').src;
        testimonialsNamePopup.childNodes[0].textContent = e.target.querySelector('.testimonials_name').childNodes[0].textContent;
        testimonialsNamePopup.childNodes[3].textContent = e.target.querySelector('.testimonials_name').childNodes[3].textContent;
        testimonialsCardTextPopup.textContent = e.target.querySelector('.testimonials_card_text').textContent;
        if (width < 921) {
            clickTestimonials();
        }
    });
});
xIconPopup.addEventListener('click', clickTestimonials);
testimonialContainer.addEventListener('click', (e) => {
    if (e.target == testimonialContainer) {
        clickTestimonials();
    }
});


