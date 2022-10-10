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
let money = document.querySelectorAll('.donate_value');
let circleButton = document.querySelectorAll('.circle_button');
for (let index = 0; index < circleButton.length; index++) {
    circleButton[index].addEventListener('click', () => {
        circleButton.forEach(item => {
            item.classList.remove('circle_button_click');
        });
        money.forEach(item => {
            item.classList.remove('orange_color');
        });
        circleButton[index].classList.add('circle_button_click');
        money[index].classList.add('orange_color');
        input.value = money[index].textContent.slice(1);
    });
}
/*--------------------------Ограничение 4 символа input amount--------------------------------*/
let input = document.querySelector('.input_amount');
let min = +input.min;
let max = +input.max;

input.addEventListener('input', (e) => {
    const value = +input.value;
    if (value > max) { input.value = max }
    else if (value < min) { input.value = min }

    circleButton.forEach(item => {
        item.classList.remove('circle_button_click');
    });
    money.forEach(item => {
        item.classList.remove('orange_color');
    });
    for (let index = 0; index < money.length; index++) {
        if (input.value == money[index].textContent.slice(1)) {
            circleButton.forEach(item => {
                item.classList.remove('circle_button_click');
            });
            money.forEach(item => {
                item.classList.remove('orange_color');
            });
            circleButton[index].classList.add('circle_button_click');
            money[index].classList.add('orange_color');
        }     
    }
});
function startPoints () {
        circleButton[5].classList.add('circle_button_click');
        money[5].classList.add('orange_color');
        input.value = money[5].textContent.slice(1);
}
startPoints();
