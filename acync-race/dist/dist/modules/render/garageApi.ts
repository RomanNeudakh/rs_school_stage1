import { createCar, deleteCar, deleteWinner, updateCar } from '../api';
import { carsFirstName, carsLastName } from '../const';
import { INewCar } from '../inerfeses';
import { variables } from '../variables';
import { renderCars } from './render_cars';
export const createNewCar = async () => {
    const track = document.querySelector('.main_container-garage_track') as HTMLElement;
    const allCars = document.querySelectorAll('.main_container-garage_track_car-container');
    const inputCreate = document.querySelector('.main_container-garage_create_input-text') as HTMLInputElement;
    const inputColorCreate = document.querySelector('.main_container-garage_create_input-color') as HTMLInputElement;
    const carsCount = document.querySelector('.main_container-garage_winners-count') as HTMLInputElement;
    if (inputCreate.value === '') {
        inputCreate.classList.add('error');
        setTimeout(() => {
            inputCreate.classList.remove('error');
        }, 1000);
    } else {
        const data: INewCar = {
            color: inputColorCreate.value,
            name: inputCreate.value,
        };
        const newCarData = await createCar(data);
        if (allCars && allCars.length < variables.limitCars) {
            track.innerHTML += htmlSingleCar(newCarData.id, newCarData.name, newCarData.color);
        }
        variables.allCarsCount = variables.allCarsCount + 1;
        carsCount.textContent = `Garage(${variables.allCarsCount})`;
        variables.inputCreate = '';
        inputCreate.value = '';
    }
};
export const buttonUpdateCar = async () => {
    const inputUpdate = document.querySelector('.main_container-garage_update_input-text') as HTMLInputElement;
    const inputColorUpdate = document.querySelector('.main_container-garage_update_input-color') as HTMLInputElement;
    if (inputUpdate.value === '') {
        inputUpdate.classList.add('error');
        setTimeout(() => {
            inputUpdate.classList.remove('error');
        }, 1000);
    } else {
        const data: INewCar = {
            color: inputColorUpdate.value,
            name: inputUpdate.value,
        };
        const updateCarData = await updateCar(variables.selectedCarId, data);
        updateActive(false);
        variables.inputUpdate = '';
        inputUpdate.value = '';
        if (updateCarData) {
            await renderCars();
        }
    }
};
export const deleteCarButton = async (id: number) => {
    await deleteCar(id);
    await deleteWinner(id);
    const allCars = document.querySelectorAll('.main_container-garage_track_car-container');
    if (allCars.length === 1) {
        variables.carsPage = variables.carsPage === 1 ? 1 : variables.carsPage - 1;
    }
    renderCars();
};
export const htmlSingleCar = (id: number, name: string, color: string) => {
    return `
    <div id="${id}" class="main_container-garage_track_car-container"> 
      <div class="main_container-garage_track_car-container_buttons-container">
        <button data-idcar="${id}" id="select" class="main_container-garage_track_car-container_buttons-container_select">SELECT</button>
        <button data-idcar="${id}" id="remove" class="main_container-garage_track_car-container_buttons-container_remove">REMOVE</button>
        <button data-idcar="${id}" id="start" class="main_container-garage_track_car-container_buttons-container_engine-start">START</button>
        <button data-idcar="${id}" id="stop" class="main_container-garage_track_car-container_buttons-container_engine-stop">STOP</button>
        <div class="main_container-garage_track_car-container_buttons-container_car-name">${name}</div>
      </div>
      <div data-idcar="${id}" id="road-${id}" class="main_container-garage_track_car-container_road">
          <svg  data-idcar="${id}" id="svg-${id}" width="40px" height="30px" viewBox="0 0 1280.000000 596.000000">
            <g transform="translate(0.000000,596.000000) scale(0.100000,-0.100000)"
            fill="${color}" stroke="none">
            <path d="M5022 5925 c-387 -79 -745 -104 -1052 -75 -132 12 -134 12 -260 5
            -90 -6 -123 -13 -230 -52 -250 -91 -554 -244 -604 -304 -12 -14 -27 -24 -34
            -21 -17 5 -112 -57 -112 -74 0 -8 -6 -11 -15 -8 -33 13 -353 -220 -565 -411
            -199 -178 -476 -491 -467 -526 3 -11 2 -17 -2 -15 -18 12 -61 -54 -61 -94 0
            -12 -7 -20 -17 -20 -12 0 -185 -236 -523 -711 -278 -391 -511 -723 -519 -736
            -9 -19 -10 -32 -3 -48 9 -20 8 -24 -15 -30 -14 -3 -58 -1 -97 6 -81 14 -107
            10 -156 -23 -48 -33 -70 -68 -86 -134 -14 -61 -19 -180 -8 -208 4 -11 19 -16
            44 -16 36 0 38 -2 45 -37 3 -20 20 -49 36 -65 16 -16 29 -30 29 -31 0 -1 -33
            -2 -73 -2 -85 -1 -157 -29 -226 -91 -38 -35 -44 -46 -48 -89 -5 -59 21 -109
            65 -126 32 -13 179 3 257 28 l51 15 54 -34 c182 -117 485 -227 800 -292 128
            -26 124 -22 89 -103 -25 -60 -56 -179 -69 -268 -51 -360 84 -737 356 -995 537
            -511 1404 -392 1791 246 108 178 153 335 160 559 5 155 -5 245 -43 383 l-6 23
            180 -2 c99 0 185 2 191 6 9 5 5028 -382 5058 -390 8 -3 2 -32 -18 -94 -37
            -115 -44 -163 -30 -190 9 -17 8 -34 -5 -81 -24 -87 -16 -169 22 -216 67 -82
            219 -143 326 -130 64 8 128 42 144 76 7 14 26 97 43 185 16 88 37 184 46 213
            l16 52 117 -1 c64 -1 150 -4 191 -8 l73 -6 18 -70 c158 -618 763 -1001 1371
            -866 457 102 811 480 894 958 8 47 15 110 15 139 l0 54 104 0 104 0 22 -45
            c39 -82 151 -121 230 -80 39 20 120 117 120 144 0 12 10 35 21 51 20 26 23 47
            30 227 12 287 10 502 -4 543 -22 63 -86 50 -124 -25 l-16 -30 -17 85 c-33 159
            -86 281 -174 402 l-55 75 34 69 c72 140 71 308 -1 416 -33 51 -171 118 -241
            118 -95 -1 -205 -28 -286 -69 l-78 -41 -87 71 c-454 368 -1206 530 -2757 594
            -82 4 -155 8 -162 10 -8 3 -7 16 5 47 28 79 -2 152 -88 214 -43 31 -50 41 -50
            70 0 30 -7 38 -60 74 -99 67 -177 136 -363 319 -118 118 -198 206 -239 265
            l-61 89 101 96 c100 96 124 128 136 188 17 77 -41 175 -127 218 -52 25 -68 27
            -312 40 l-257 14 -117 113 c-213 208 -256 227 -591 263 -440 46 -1007 134
            -1420 221 -90 19 -171 34 -180 33 -8 -1 -88 -16 -178 -34z m2730 -752 c39 -42
            68 -95 68 -124 0 -29 -26 -58 -38 -43 -5 5 -43 47 -87 94 l-79 85 88 -87 c49
            -48 92 -85 97 -82 26 16 -3 96 -54 152 -19 20 -30 23 -84 21 -35 -1 -66 1 -70
            4 -3 4 25 7 63 7 64 0 73 -3 96 -27z m206 -10 c36 -26 72 -81 72 -107 -1 -12
            -31 -53 -71 -95 -76 -80 -78 -81 -121 -17 -16 24 -13 22 14 -8 l34 -38 67 68
            c39 40 67 78 67 90 0 32 -41 87 -80 106 -31 16 -110 25 -110 13 0 -2 11 -21
            25 -41 14 -20 25 -42 25 -48 0 -6 -11 7 -25 29 -13 22 -29 48 -35 59 -11 18
            -9 18 49 14 40 -3 71 -11 89 -25z m-68 -117 c0 -14 -12 -38 -26 -53 l-26 -28
            21 29 c12 16 21 39 21 52 0 13 2 24 5 24 3 0 5 -11 5 -24z m-875 -521 c413
            -14 758 -25 767 -25 9 0 45 -46 84 -107 l69 -108 -25 -50 c-23 -47 -25 -60
            -25 -205 0 -128 3 -161 17 -186 22 -41 89 -73 156 -76 29 -2 52 -6 52 -9 0
            -15 -72 -68 -102 -77 -23 -6 -315 11 -931 53 -864 60 -899 63 -944 86 -90 47
            -88 35 -91 410 l-3 329 113 -5 c62 -3 451 -17 863 -30z m1508 -484 c47 -34 47
            -35 47 -93 0 -32 -3 -58 -7 -58 -8 0 -164 231 -172 254 -2 6 16 -7 40 -29 24
            -22 65 -56 92 -74z"/>
            </g>
            </svg>
          <img src="${require('../../img/finish.png')}" alt="finish" class="main_container-garage_track_car-container_road_finish-img">
      </div>
    </div>
  `;
};
export const createRandomCars = async () => {
    const carsCount = document.querySelector('.main_container-garage_winners-count') as HTMLInputElement;
    for (let index = 0; index < 10; index++) {
        const data: INewCar = {
            color: getRandomColor(),
            name: getRandomCarName(),
        };
        const newCarData = await createCar(data);
        if (newCarData) {
            variables.allCarsCount = variables.allCarsCount + 1;
        }
    }
    carsCount.textContent = `Garage(${variables.allCarsCount})`;
    renderCars();
};

export function getRandomElement(array: string[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
export function getRandomColor() {
    const symbols = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += symbols[Math.floor(Math.random() * 16)];
    }
    return color;
}
export function getRandomCarName() {
    return `${getRandomElement(carsFirstName)} ${getRandomElement(carsLastName)} `;
}

export function updateActive(flag: boolean) {
    const buttons = document.querySelectorAll('button');
    const inputCreate = document.querySelector('.main_container-garage_create_input-text') as HTMLInputElement;
    const inputUpdate = document.querySelector('.main_container-garage_update_input-text') as HTMLInputElement;
    inputCreate.disabled = flag ? true : false;
    inputUpdate.disabled = flag ? false : true;
    inputCreate.value = variables.inputCreate;
    inputUpdate.value = variables.inputUpdate;
    variables.selectButtonIsActive = flag;
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].id === 'update') {
            buttons[i].disabled = flag ? false : true;
        } else if (buttons[i].id !== 'stop') {
            buttons[i].disabled = flag ? true : false;
        }
    }
}
export function driveActive(flag: boolean, buttonStop?: HTMLButtonElement, buttonStart?: HTMLButtonElement) {
    if (buttonStop) {
        buttonStop.disabled = flag ? false : true;
    }
    if (buttonStart) {
        buttonStart.disabled = flag ? true : false;
    }
}
