import { getCars } from '../api';
import { IResponseCars } from '../inerfeses';
import { variables } from '../variables';
// import {require} from ;

export const renderCars = async () => {
    const cars: IResponseCars = await getCars(variables.carsPage, variables.limitCars);
    console.log(cars.data);
    const headers = cars.headers;
    const totalCount = headers ? headers.get('X-Total-Count') : null;
    console.log(totalCount);
    let result = '';
    for (const element of cars.data) {
        console.log(element);
        const imgPath = require('../../img/finish.png');
        result += `
        <div class="main_container-garage_track_car-container"> 
          <div class="main_container-garage_track_car-container_buttons-container">
            <button class="main_container-garage_track_car-container_buttons-container_select"></button>
            <button class="main_container-garage_track_car-container_buttons-container_remove"></button>
            <button class="main_container-garage_track_car-container_buttons-container_engine-start"></button>
            <button class="main_container-garage_track_car-container_buttons-container_engine-stop"></button>
            <div class="main_container-garage_track_car-container_buttons-container_car-name"></div>
          </div>
          <div class="main_container-garage_track_car-container_road">
              <div class="main_container-garage_track_car-container_road_car-img"></div>
              <img src="${imgPath}" alt="finish" class="main_container-garage_track_car-container_road_finish-img">
          </div>
        </div>
      `;
    }
    const parentNode = document.querySelector('.main_container-garage_track');
    if (parentNode) {
        parentNode.innerHTML = result;
    }
};
