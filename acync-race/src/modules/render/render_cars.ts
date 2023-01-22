import { getCars } from '../api';
import { IResponseCars } from '../inerfeses';
import { variables } from '../variables';
import { htmlSingleCar } from './garageApi';
// import {require} from ;

export const renderCars = async () => {
    const carsCount = document.querySelector('.main_container-garage_winners-count');
    const pageNumber = document.querySelector('.main_container-garage_winners-page-number');
    const cars: IResponseCars = await getCars(variables.carsPage, variables.limitCars);
    console.log(cars.data);
    const headers = cars.headers;
    const totalCount = headers ? headers.get('X-Total-Count') : null;
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
};
