import { variables } from '../variables';
import { createNewCar, deleteCarButton } from './garageApi';
import { renderCars } from './render_cars';

export const listenGarage = () => {
    document.querySelector('.main_container-garage_create_button-create')?.addEventListener('click', createNewCar);
    document.querySelector('.main_container-garage_track')?.addEventListener('click', (event) => {
        if (event.target instanceof HTMLButtonElement && event.target.id === 'remove' && event.target.dataset.idcar) {
            deleteCarButton(+event.target.dataset.idcar);
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
};
