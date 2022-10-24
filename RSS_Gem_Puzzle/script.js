'use strict'
//Создаем ограничевающий контейнер
let body = document.querySelector('body');
let container = document.createElement('div');
let leadBordFromLocalStorage;
let saveInformation;
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
localStorage.getItem('saveInform') ? buttonSave.textContent = 'Load' : buttonSave.textContent = 'Save';
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
                if (gameStatus == true) {
                    tiles.addEventListener('click', moveTiles);
                }
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
                tiles.draggable = true;
                tiles.addEventListener('click', moveTiles);
                tiles.textContent = `${matrixArray[i][j]}`;
                tiles.style.left = j*containerFieldWidth/selectedSizeCurrent + 'px';
                tiles.style.top = i*containerFieldWidth/selectedSizeCurrent + 'px';
            }
        }
    }
    // drag();
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
function frameFillingLoad (array) {
    matrixArray = array;
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
                    if (winCheked()) {
                        winAction();
                     }
                    return true;
                } else if (matrixArray[index - 1] && matrixArray[index - 1][i] == '') { //Вверх
                    audioPlay();
                    params.srcElement.style.top = +params.srcElement.style.top.slice(0, -2) - containerFieldWidth/selectedSizeCurrent + 'px';
                    matrixArray[index][i] = '';
                    matrixArray[index - 1][i] = +clickTeleName;
                    document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles));
                    movesCount();
                    setTimeout(() => document.querySelectorAll('.tile').forEach(item => item.addEventListener('click', moveTiles)), 700);
                    if (winCheked()) {
                        winAction();
                     }
                    return matrixArray;
                } else if (matrixArray[index][i - 1] == '') { //Влево
                    audioPlay();
                    params.srcElement.style.left = +params.srcElement.style.left.slice(0, -2) - containerFieldWidth/selectedSizeCurrent + 'px';
                    matrixArray[index][i] = '';
                    matrixArray[index][i - 1] = +clickTeleName;
                    document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles));
                    movesCount();
                    setTimeout(() => document.querySelectorAll('.tile').forEach(item => item.addEventListener('click', moveTiles)), 700);
                    if (winCheked()) {
                        winAction();
                     }
                    return matrixArray;
                } else if (matrixArray[index][i + 1] == '') { //Вправо
                    audioPlay();
                    params.srcElement.style.left = +params.srcElement.style.left.slice(0, -2) + +containerFieldWidth/selectedSizeCurrent + 'px';
                    matrixArray[index][i] = '';
                    matrixArray[index][i + 1] = +clickTeleName;
                    document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles));
                    movesCount();
                    setTimeout(() => document.querySelectorAll('.tile').forEach(item => item.addEventListener('click', moveTiles)), 700);
                    if (winCheked()) {
                        winAction();
                     }
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
            gameStatus = false;
            stopTime();
            document.querySelectorAll('.tile').forEach(item => item.removeEventListener('click', moveTiles));
        }
    } else if (gameStatus === false) {
            if (buttonStop.textContent === 'Continue') {
                buttonStop.textContent = 'Stop';
                gameStatus = true;
                stopTime();
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
        return (inversion%2 == 1 && emptyFloor%2 == 0) || (inversion%2 == 0 && emptyFloor%2 == 1) ? true : false;
    }
}

//Таблица лидеров
let popUpBoard = document.createElement('div');
body.insertBefore(popUpBoard, container).classList.add('pop_up_board');
let numberTable = document.createElement('div');
popUpBoard.insertBefore(numberTable, null).classList.add('numberTable');
let table = document.createElement('table');
popUpBoard.insertBefore(table, null).classList.add('table');
let closeButton = document.createElement('button');
closeButton.textContent = 'Close';
popUpBoard.insertBefore(closeButton, null).classList.add('closeButton');
let tr = document.createElement('tr');
table.insertBefore(tr, null).classList.add('tr');
let th = document.createElement('th');
th.textContent = '№';
tr.insertBefore(th, null).classList.add('th');
th = document.createElement('th');
th.textContent = 'Name';
tr.insertBefore(th, null).classList.add('th');
th = document.createElement('th');
th.onclick = sortMoves;
th.textContent = 'Moves';
tr.insertBefore(th, null).classList.add('th');
th = document.createElement('th');
th.onclick = sortTime;
th.textContent = 'Time';
tr.insertBefore(th, null).classList.add('th');
let leadBord = [
    {
        name: 'Pipiconda',
        moves: '999',
        time: '99:59'
    },
    {
        name: 'FunnyPiglet',
        moves: '998',
        time: '99:58'
    },
    {
        name: 'MasterPanda',
        moves: '997',
        time: '99:57'
    },
    {
        name: 'Pickle',
        moves: '996',
        time: '99:56'
    },
    {
        name: 'DarkDencer',
        moves: '995',
        time: '99:55'
    },
    {
        name: 'SlowTurtle',
        moves: '994',
        time: '99:54'
    },
    {
        name: 'MisterTwister',
        moves: '993',
        time: '99:53'
    },
    {
        name: 'EasyPeasy',
        moves: '992',
        time: '99:52'
    },
    {
        name: 'KingOfPazzles',
        moves: '991',
        time: '99:51'
    },
    {
        name: 'ForeverAlone',
        moves: '990',
        time: '99:50'
    }
];

// localStorage.setItem('leadBord', JSON.stringify(leadBord));

function bord () {
    if (localStorage.getItem(`leadBord(${selectedSizeCurrent})`)) {
        leadBordFromLocalStorage = JSON.parse(localStorage.getItem(`leadBord(${selectedSizeCurrent})`));
        leadBordFromLocalStorage.forEach((item, index) => {
            let tr = document.createElement('tr');
            table.insertBefore(tr, null).classList.add('tr2');
            let td = document.createElement('td');
            td.textContent = `${index + 1}`;
            tr.insertBefore(td, null).classList.add('td');
            td = document.createElement('td');
            td.textContent = `${item.name}`;
            tr.insertBefore(td, null).classList.add('td');
            td = document.createElement('td');
            td.textContent = `${item.moves}`;
            tr.insertBefore(td, null).classList.add('td');
            td = document.createElement('td');
            td.textContent = `${item.time}`;
            tr.insertBefore(td, null).classList.add('td');
        });
    } else {
        leadBord.forEach((item, index) => {
            let tr = document.createElement('tr');
            table.insertBefore(tr, null).classList.add('tr2');
            let td = document.createElement('td');
            td.textContent = `${index + 1}`;
            tr.insertBefore(td, null).classList.add('td');
            td = document.createElement('td');
            td.textContent = `${item.name}`;
            tr.insertBefore(td, null).classList.add('td');
            td = document.createElement('td');
            td.textContent = `${item.moves}`;
            tr.insertBefore(td, null).classList.add('td');
            td = document.createElement('td');
            td.textContent = `${item.time}`;
            tr.insertBefore(td, null).classList.add('td');
        });
    }
    
}

function sortTime() {
    if (leadBordFromLocalStorage) {
        leadBordFromLocalStorage.sort(function(a, b) { return ((+a.time.slice(0, 2)*60 + a.time.slice(-2)) - (+b.time.slice(0, 2)*60 + b.time.slice(-2))); }); 
    }
    document.querySelectorAll('.tr2').forEach(item => item.remove());
    bord();
}

function sortMoves() {
    if (leadBordFromLocalStorage) {
        leadBordFromLocalStorage.sort(function(a, b) { return a.moves - b.moves; });
    }
    document.querySelectorAll('.tr2').forEach(item => item.remove());
    bord();
}

buttonResult.addEventListener('click', () => {
    popUpBoard.classList.add('pop_up_board_active');
    numberTable.textContent = `${selectedSizeCurrent}x${selectedSizeCurrent}`;
    if (localStorage.getItem(`leadBord(${selectedSizeCurrent})`)) {
        leadBordFromLocalStorage = JSON.parse(localStorage.getItem(`leadBord(${selectedSizeCurrent})`));
        leadBordFromLocalStorage.sort(function(a, b) { return ((+a.time.slice(0, 2)*60 + a.time.slice(-2)) - (+b.time.slice(0, 2)*60 + b.time.slice(-2))); });
        bord();
    } else {
        leadBord.sort(function(a, b) { return ((+a.time.slice(0, 2)*60 + a.time.slice(-2)) - (+b.time.slice(0, 2)*60 + b.time.slice(-2))); });
    bord();
    }
});
closeButton.addEventListener('click', () => {
    popUpBoard.classList.remove('pop_up_board_active');
    document.querySelectorAll('.tr2').forEach(item => item.remove());
});
popUpBoard.addEventListener('click', (e) => {
    if (e.target == popUpBoard) {
        popUpBoard.classList.remove('pop_up_board_active');
        document.querySelectorAll('.tr2').forEach(item => item.remove());
    }
});

//Сообщение о выйгрыше
let popUpWin = document.createElement('div');
body.insertBefore(popUpWin, container).classList.add('pop_up_win');
let messege = document.createElement('div');
messege.textContent = `Hooray! You solved the puzzle in ${time} and ${moves} moves!`
popUpWin.insertBefore(messege, null).classList.add('messege');
let inputName = document.createElement('input');
inputName.placeholder = 'Your name';
popUpWin.insertBefore(inputName, null).classList.add('input');
let closeButtonMessege = document.createElement('button');
closeButtonMessege.textContent = 'Close';
popUpWin.insertBefore(closeButtonMessege, null).classList.add('closeButtonWin');

function winCheked() {
    let winArr = [];
    for (let index = 1; index < selectedSizeCurrent*selectedSizeCurrent; index++) {
       winArr.push(index);
    }
    winArr.push('');
    return matrixArray.flat().toString() === winArr.toString() ? true : false;
}
function winAction() {
    popUpWin.classList.add('pop_up_win_active');
    messege.textContent = `Hooray! You solved the puzzle in ${time.textContent.slice(-5)} and ${moves.textContent.slice(7)} moves! Please enter your name!`;
    stopTime();
}
function test() {
    if (localStorage.getItem(`leadBord(${selectedSizeCurrent})`)) {
        leadBordFromLocalStorage = JSON.parse(localStorage.getItem(`leadBord(${selectedSizeCurrent})`));
        let moveString = moves.textContent.slice(7);
        let timeString = time.textContent.slice(-5);
        leadBordFromLocalStorage.push({
            name: `${inputName.value}`,
            moves: moveString,
            time: timeString
        })
        leadBordFromLocalStorage.sort(function(a, b) { return ((+a.time.slice(0, 2)*60 + a.time.slice(-2)) - (+b.time.slice(0, 2)*60 + b.time.slice(-2)));});
        leadBordFromLocalStorage =  leadBordFromLocalStorage.slice(0, -1);
        localStorage.setItem(`leadBord(${selectedSizeCurrent})`, JSON.stringify(leadBordFromLocalStorage));
    } else {
        let moveString = moves.textContent.slice(7);
        let timeString = time.textContent.slice(-5);
        leadBord.push({
            name: `${inputName.value}`,
            moves: moveString,
            time: timeString
        })
        leadBord.sort(function(a, b) { return ((+a.time.slice(0, 2)*60 + a.time.slice(-2)) - (+b.time.slice(0, 2)*60 + b.time.slice(-2)));});
        leadBord = leadBord.slice(0, -1);
        localStorage.setItem(`leadBord(${selectedSizeCurrent})`, JSON.stringify(leadBord));
    } 
}
closeButtonMessege.addEventListener('click', () => {
    if (inputName.value == '') {
        alert('Enter your name')
    } else {
        popUpWin.classList.remove('pop_up_win_active');
        test();
    }
    gameStatus = false;
    clearField();
    refMoves();
    refTime();
    frameFillingInit(selectedSizeCurrent);
});
popUpWin.addEventListener('click', (e) => {
    if (e.target == popUpWin) {
        if (inputName.value == '') {
            alert('Enter your name')
        } else {
            popUpWin.classList.remove('pop_up_win_active');
            test();
        }
        gameStatus = false;
        clearField();
        refMoves();
        refTime();
        frameFillingInit(selectedSizeCurrent);
    }
});

//Сохранение
buttonSave.addEventListener('click', () => {
    if (buttonSave.textContent === 'Save') {
        saveInformation = {
            size: selectedSizeCurrent,
            time: timeCounter,
            moves: movesCounter,
            matrix: matrixArray
        }
        buttonSave.textContent = 'Load';
        localStorage.setItem('saveInform', JSON.stringify(saveInformation));
    } else {
        saveInformation = JSON.parse(localStorage.getItem('saveInform'));
        localStorage.removeItem('saveInform')
        buttonStop.textContent = 'Stop';
        buttonSave.textContent = 'Save';
        gameStatus = true;
        selectedSizeCurrent = saveInformation.size;
        selectSize.options.selectedIndex = selectedSizeArr.indexOf(selectedSizeCurrent);
        clearField();
        movesCounter = saveInformation.moves - 1;
        movesCount();
        timeCounter = saveInformation.time;
        stopTime();
        timeStart();
        frameFillingLoad(saveInformation.matrix);
    }
})

//Плитки можно перетаскивать с помощью мыши



// function drag() {
//     let dragElements = document.querySelectorAll('.tile');
//     dragElements.forEach(dragElement => {
//         dragElement.addEventListener('dragstart', (e) => {
//             console.log(e.path[0])
//             // e.target.classList.add('dragging');
//         })
//     })
// }




// function drag() {
//     //влево
//     let dragElements = document.querySelectorAll('.tile');
//     dragElements.forEach(dragElement => {
//         dragElement.onmousedown = function(e) {
//             let x = dragElement.offsetLeft;
//             // console.log(dragElement.offsetLeft)

//             function moveAt(pageX) {
//                 if (pageX - field.offsetLeft < 0) {
//                     x > 0 ? dragElement.style.left = x - 150 + 'px';
//                 } else if (pageX - field.offsetLeft > x + dragElement.offsetWidth) {
                    
//                 }{
//                     dragElement.style.left =  pageX - field.offsetLeft - dragElement.offsetWidth + 'px';
//                 }
                
//             }
//             document.onmousemove = function(e) {
//                 moveAt(e.pageX);
//             }
//             window.onmouseup = function() {
//                 if (dragElement.style.left - x > 100) {
//                     dragElement.style.left = x + 150 + 'px'
//                 }
//                 document.onmousemove = null;
//                 dragElement.onmouseup = null;
//               }
//               dragElement.ondragstart = function() {
//                 return false;
//               };
//         }
//     })
// }