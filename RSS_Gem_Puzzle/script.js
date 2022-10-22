'use strict'
//Создаем ограничевающий контейнер
let body = document.querySelector('body');
let container = document.createElement('div');
body.insertBefore(container, body.firstChild);
container.classList.add('container');
//Добавляем Header
let headerContainer = document.createElement('div');
container.insertBefore(headerContainer, container.firstChild);
headerContainer.classList.add('header_container');
let buttonShuffle = document.createElement('button');
buttonShuffle.textContent = 'Shuffle and start';
headerContainer.insertBefore(buttonShuffle, null).classList.add('button');
let buttonStop = document.createElement('button');
buttonStop.textContent = 'Stop';
headerContainer.insertBefore(buttonStop, null).classList.add('button');
let buttonSave = document.createElement('button');
buttonSave.textContent = 'Save';
headerContainer.insertBefore(buttonSave, null).classList.add('button');
let buttonResult = document.createElement('button');
buttonResult.textContent = 'Results';
headerContainer.insertBefore(buttonResult, null).classList.add('button');
let buttonSound = document.createElement('button');
buttonSound.textContent = 'Sound: off';
headerContainer.insertBefore(buttonSound, null).classList.add('button');
// Дополнительная информация
let additionalInformation = document.createElement('div');
container.insertBefore(additionalInformation, null).classList.add('additional');
let moves = document.createElement('span');
moves.textContent = 'Moves: 0';
additionalInformation.insertBefore(moves, null).classList.add('addText');
let time = document.createElement('span');
time.textContent = 'Time: 00:00';
additionalInformation.insertBefore(time, null).classList.add('addText');
let selectSize = document.createElement('select');
additionalInformation.insertBefore(selectSize, null).classList.add('select');
let newOption = new Option('4x4');
selectSize.append(newOption);
newOption = new Option('3x3');
selectSize.append(newOption);
newOption = new Option('5x5');
selectSize.append(newOption);
newOption = new Option('6x6');
selectSize.append(newOption);
newOption = new Option('7x7');
selectSize.append(newOption);
newOption = new Option('8x8');
selectSize.append(newOption);

//Выбор размера поля
let selectedSizeArr = [4, 3, 5, 6, 7, 8];
let selectedSizeCurrent = 4;
let matrixArray;
let gameStatus;
selectSize.addEventListener('change', () => {
    selectedSizeCurrent = selectedSizeArr[selectSize.selectedIndex];
    buttonStop.textContent = 'Stop';
    gameStatus = false;
    clearField();
    refMoves();
    refTime();
    frameFillingInit(selectedSizeCurrent);
});

// Перемешивание массива
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
//Матрица чисел
function makeFrameArray(arraySize) {
    let frameArray = [],
        frameMatrix = [];
    for (let index = 1; index < arraySize*arraySize + 1; index++) {
        frameArray.push(index);
    }
    for (let index = 0; index < arraySize; index++) {
        frameMatrix.push([]);
    }
    frameArray[frameArray.length - 1] = '';
    shuffle(frameArray);
    while (!solveCheked(frameArray)) {
        console.log('перемешка')
        shuffle(frameArray);
    }
    let count = 0;
    for (let i = 0; i < arraySize; i++) {
        for (let j = 0; j < arraySize; j++) {
            frameMatrix[i][j] = frameArray[count];
            count++
        }
    }
    return frameMatrix;
}

// Игровое поле
let field = document.createElement('div');
container.insertBefore(field, null).classList.add('field');

//resize
let containerFieldWidth = document.querySelector('.field').offsetWidth;
window.addEventListener('resize', () => {
    containerFieldWidth = document.querySelector('.field').offsetWidth;
    document.querySelector('.field').style.height = containerFieldWidth + 'px';
    resizeField(matrixArray)
})
function resizeField(matrixArray) {
    clearField();
    for (let i = 0; i < selectedSizeCurrent; i++) {
        for (let j = 0; j < selectedSizeCurrent; j++) {
            if (matrixArray[i][j] != '') {
                let tiles = document.createElement('div');
                field.insertBefore(tiles, null).classList.add('tile');
                tiles.style.width = containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.style.height = containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.addEventListener('click', moveTiles);
                tiles.textContent = `${matrixArray[i][j]}`;
                tiles.style.left = j*containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.style.top = i*containerFieldWidth/selectedSizeCurrent + 'px';
            }
        }
    }
}
//Заполнение поля
function frameFilling () {
    matrixArray = makeFrameArray(selectedSizeCurrent);
    for (let i = 0; i < selectedSizeCurrent; i++) {
        for (let j = 0; j < selectedSizeCurrent; j++) {
            if (matrixArray[i][j] != '') {
                let tiles = document.createElement('div');
                field.insertBefore(tiles, null).classList.add('tile');
                tiles.style.width = containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.style.height = containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.addEventListener('click', moveTiles);
                tiles.textContent = `${matrixArray[i][j]}`;
                tiles.style.left = j*containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.style.top = i*containerFieldWidth/selectedSizeCurrent + 'px';
            }
        }
    }
    
}
// Начальное заполнение поля с неактивеными квадратами
function frameFillingInit () {
    matrixArray = makeFrameArray(selectedSizeCurrent);
    for (let i = 0; i < selectedSizeCurrent; i++) {
        for (let j = 0; j < selectedSizeCurrent; j++) {
            if (matrixArray[i][j] != '') {
                let tiles = document.createElement('div');
                field.insertBefore(tiles, null).classList.add('tile');
                tiles.style.width = containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.style.height = containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.textContent = `${matrixArray[i][j]}`;
                tiles.style.left = j*containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.style.top = i*containerFieldWidth/selectedSizeCurrent + 'px';
                document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles));
            }
        }
    }
}
//очистка поля 
function clearField() {
    document.querySelectorAll('.tile').forEach(item => item.remove());
}
//Перемещение 
function moveTiles(params) {
    let clickTeleName = params.srcElement.innerText;
    for (let index = 0; index < selectedSizeCurrent; index++) {
        for (let i = 0; i < selectedSizeCurrent; i++) {
            if (matrixArray[index][i] == clickTeleName) {
                if (matrixArray[index + 1] && matrixArray[index + 1][i] === '') { //Вниз
                    audioPlay();
                    matrixArray[index][i] = '';
                    matrixArray[index + 1][i] = +clickTeleName;
                    params.srcElement.style.top = +params.srcElement.style.top.slice(0, -2) + +containerFieldWidth/selectedSizeCurrent + 'px';
                    document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles)) // avoid to multiclick
                    movesCount();
                    setTimeout(() => document.querySelectorAll('.tile').forEach(item => item.addEventListener('click', moveTiles)), 700);
                    return true;
                } else if (matrixArray[index - 1] && matrixArray[index - 1][i] == '') { //Вверх
                    audioPlay();
                    params.srcElement.style.top = +params.srcElement.style.top.slice(0, -2) - containerFieldWidth/selectedSizeCurrent + 'px';
                    matrixArray[index][i] = '';
                    matrixArray[index - 1][i] = +clickTeleName;
                    document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles));
                    movesCount();
                    setTimeout(() => document.querySelectorAll('.tile').forEach(item => item.addEventListener('click', moveTiles)), 700);
                    return matrixArray;
                } else if (matrixArray[index][i - 1] == '') { //Влево
                    audioPlay();
                    params.srcElement.style.left = +params.srcElement.style.left.slice(0, -2) - containerFieldWidth/selectedSizeCurrent + 'px';
                    matrixArray[index][i] = '';
                    matrixArray[index][i - 1] = +clickTeleName;
                    document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles));
                    movesCount();
                    setTimeout(() => document.querySelectorAll('.tile').forEach(item => item.addEventListener('click', moveTiles)), 700);
                    return matrixArray;
                } else if (matrixArray[index][i + 1] == '') { //Вправо
                    audioPlay();
                    params.srcElement.style.left = +params.srcElement.style.left.slice(0, -2) + +containerFieldWidth/selectedSizeCurrent + 'px';
                    matrixArray[index][i] = '';
                    matrixArray[index][i + 1] = +clickTeleName;
                    document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles));
                    movesCount();
                    setTimeout(() => document.querySelectorAll('.tile').forEach(item => item.addEventListener('click', moveTiles)), 700);
                    return matrixArray;
                }
            }
        }
    }
}
//Поле moves
let movesCounter = 0;
function movesCount() {
    movesCounter++;
    moves.textContent = `Moves: ${movesCounter}`;
}
function refMoves() {
    movesCounter = 0;
    moves.textContent = `Moves: ${movesCounter}`;
}
//поле time
let timeCounter = 0;
let timeInterval;
function timeStart() {
    timeInterval = setInterval(() => {
        timeCounter++;
        time.textContent = `Time: ${Math.floor(timeCounter/60) < 10 ? '0' + Math.floor(timeCounter/60) : Math.floor(timeCounter/60)}:${timeCounter%60 < 10 ? '0' + timeCounter%60 : timeCounter%60}`
    }, 1000);
}
function refTime() {
    timeCounter = 0;
    clearInterval(timeInterval);
    time.textContent = 'Time: 00:00';
}
function stopTime() {
    clearInterval(timeInterval);
}
// Audio
var audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 1;
    audio.src = './audio/841130228481841.mp3';
function audioPlay() {
    audio.play(); 
}
function audioOn() {
    audio.volume = 1;
}
function audioOff() {
    audio.volume = 0;
}
buttonSound.addEventListener('click', () => {
    if (buttonSound.textContent === 'Sound: off') {
        buttonSound.textContent = 'Sound: on';
        audioOff();
    } else if (buttonSound.textContent === 'Sound: on') {
        audioOn();
        buttonSound.textContent = 'Sound: off';
    }
});
//STOP button
buttonStop.addEventListener('click', () => {
    if (gameStatus == true) {
        if (buttonStop.textContent === 'Stop') {
            buttonStop.textContent = 'Continue';
            stopTime();
            document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles));
        } else if (buttonStop.textContent === 'Continue') {
            buttonStop.textContent = 'Stop';
            timeStart();
            document.querySelectorAll('.tile').forEach(item => item.addEventListener('click', moveTiles))
        } 
    }
});

//Кнопка SHAFFLE AND START

function startGame() {
    gameStatus = true;
    buttonStop.textContent = 'Stop';
    clearField();
    frameFilling();
    refMoves();
    refTime();
    timeStart();
}
buttonShuffle.addEventListener('click', startGame);
//Инициализация
function init() {
    gameStatus = false;
    containerFieldWidth = document.querySelector('.field').offsetWidth;
    document.querySelector('.field').style.height = containerFieldWidth + 'px';
    frameFillingInit(selectedSizeCurrent);
}
init();

//Проверка на решаемость 
// Если N (selectedSizeCurrent) нечетно, то экземпляр головоломки разрешим, если количество инверсий четно.
// Если N четно, экземпляр головоломки разрешим, если 
// пустая ячейка находится в четном ряду, считая снизу (второй снизу, четвертый снизу и т. д.), а количество инверсий нечетное.
// пустая ячейка находится в нечетной строке, считая снизу (последняя, ​​третья снизу, ​​пятая снизу и т. д.), а количество инверсий четное.

function solveCheked(array) {
    let inversion = 0;
    if (selectedSizeCurrent%2 == 1) {
        array.forEach((element, index) => {
            inversion += array.slice(index).filter(item => Number.isInteger(item) && item < element).length;
        });
        return inversion%2 == 0 ? true : false;
    } else if (selectedSizeCurrent%2 == 0) {
        array.forEach((element, index) => {
            inversion += array.slice(index).filter(item => Number.isInteger(item) && item < element).length;
        });
        let emptyFloor = Math.floor(array.indexOf('')/selectedSizeCurrent);
        return (inversion%2 == 1 && emptyFloor%2 == 1) || (inversion%2 == 0 && emptyFloor%2 == 0) ? true : false;
    }
}

//Сохоранение
//Таблица лидеров
//Сообщение о выйгрыше
//плитки можно перетаскивать с помощью мыши