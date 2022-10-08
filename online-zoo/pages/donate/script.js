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
