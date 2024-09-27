// import { driveCar, startStopCar } from '../api';
import { getCars } from '../api';
import { IResponseCars } from '../inerfeses';
import { variables, driveCars } from '../variables';
import { buttonUpdateCar, createNewCar, createRandomCars, deleteCarButton, updateActive } from './garageApi';
import { renderCars } from './render_cars';

export const listenGarage = () => {
    const inputCreate = document.querySelector('.main_container-garage_create_input-text') as HTMLInputElement;
    const inputUpdate = document.querySelector('.main_container-garage_update_input-text') as HTMLInputElement;
    const inputCarsPerPage = document.getElementById('cars_per_page') as HTMLInputElement;
    const raceButton = document.querySelector('.main_container-garage_race-button') as HTMLButtonElement;
    inputCarsPerPage.placeholder = `${variables.limitCars}`;
    document.querySelector('.main_container-garage_create_button-create')?.addEventListener('click', createNewCar);
    document.querySelector('.main_container-garage_update_button-update')?.addEventListener('click', buttonUpdateCar);
    document.querySelector('.main_container-garage_generate-button')?.addEventListener('click', createRandomCars);
    document.querySelector('.main_container-garage_track')?.addEventListener('click', (event) => {
        if (event.target instanceof HTMLButtonElement && event.target.id === 'remove' && event.target.dataset.idcar) {
            deleteCarButton(+event.target.dataset.idcar);
        }
        if (event.target instanceof HTMLButtonElement && event.target.id === 'select' && event.target.dataset.idcar) {
            variables.selectButtonIsActive = true;
            variables.selectedCarId = +event.target.dataset.idcar;
            updateActive(true);
        }
    });
    document.querySelector('.main_container-garage_nav-pagination_next')?.addEventListener('click', () => {
        if (variables.allCarsCount && variables.carsPage < Math.ceil(+variables.allCarsCount / variables.limitCars)) {
            variables.carsPage = variables.carsPage + 1;
            renderCars();
        }
    });
    document.querySelector('.main_container-garage_nav-pagination_prev')?.addEventListener('click', () => {
        if (variables.carsPage > 1) {
            variables.carsPage = variables.carsPage - 1;
            renderCars();
        }
    });
    const input = document.querySelector('.main_container-garage_input_winners-per-page');
    if (input instanceof HTMLInputElement) {
        input.addEventListener('keypress', function (e) {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
        input.addEventListener('input', () => {
            if (+input.value > 10) {
                input.value = '10';
            }
            if (variables.limitCars !== +input.value) {
                variables.limitCars = +input.value;
                variables.carsPage = 1;
                renderCars();
            }
        });
    }
    updateActive(variables.selectButtonIsActive);
    inputCreate.addEventListener('change', () => {
        variables.inputCreate = inputCreate.value;
    });
    inputCreate.value = variables.inputCreate;
    inputUpdate.addEventListener('change', () => {
        variables.inputUpdate = inputUpdate.value;
    });
    inputUpdate.value = variables.inputUpdate;
    raceButton.addEventListener('click', async () => {
        raceButton.disabled = true;
        document.querySelector('.main_container-garage_race-button');
        const cars: IResponseCars = await getCars(variables.carsPage, variables.limitCars);
        const carsStarts = [];
        for (const element of cars.data) {
            if (driveCars[element.id]) {
                carsStarts.push(driveCars[element.id].clickStartButton());
                // console.log(driveCars[element.id].clickStartButton());
            }
        }
        Promise.all(carsStarts).then((value) => console.log(value));
    });
    document.querySelector('.main_container-garage_reset-button')?.addEventListener('click', async () => {
        raceButton.disabled = false;
        const cars: IResponseCars = await getCars(variables.carsPage, variables.limitCars);
        for (const element of cars.data) {
            if (driveCars[element.id]) {
                driveCars[element.id].clickStopButton();
            }
        }
    });
};
