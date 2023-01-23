import { getCars } from '../api';
import { IResponseCars } from '../inerfeses';
import { driveCars, variables } from '../variables';
import { DriveCar } from './drive_car';
import { htmlSingleCar } from './garageApi';

export const renderCars = async () => {
    const carsCount = document.querySelector('.main_container-garage_winners-count');
    const pageNumber = document.querySelector('.main_container-garage_winners-page-number');
    const raceButton = document.querySelector('.main_container-garage_race-button') as HTMLButtonElement;
    const cars: IResponseCars = await getCars(variables.carsPage, variables.limitCars);
    const headers = cars.headers;
    const totalCount = headers ? headers.get('X-Total-Count') : null;
    raceButton.disabled = false;
    variables.allCarsCount = totalCount === null ? 0 : +totalCount;
    if (carsCount && pageNumber) {
        carsCount.innerHTML = `Garage(${totalCount})`;
        pageNumber.innerHTML = `Page#${variables.carsPage}`;
    }
    let result = '';
    for (const element of cars.data) {
        result += htmlSingleCar(element.id, element.name, element.color);
    }
    const parentNode = document.querySelector('.main_container-garage_track');
    if (parentNode) {
        parentNode.innerHTML = result;
    }
    for (const element of cars.data) {
        createDriveCar(element.id);
        driveCars[element.id].init();
    }
};
const createDriveCar = (id: number) => {
    if (!driveCars[id]) {
        driveCars[id] = new DriveCar(id);
    }
};
