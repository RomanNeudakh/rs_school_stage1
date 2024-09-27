import { IAllVariables } from './inerfeses';
import { DriveCar } from '../modules/render/drive_car';

export const variables: IAllVariables = {
    winnersPage: 1,
    carsPage: 1,
    limitWinners: 2,
    limitCars: 4,
    allWinnersCount: 0,
    allCarsCount: 0,
    sortWinners: 'wins',
    orderWinners: 'DESC',
    selectButtonIsActive: false,
    selectedCarId: 5,
    inputCreate: '',
    inputUpdate: '',
};
export const driveCars: { [id: number]: DriveCar } = {};
