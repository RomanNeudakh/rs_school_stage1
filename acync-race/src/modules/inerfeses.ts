export interface IWinnersArray {
    id: number;
    wins: number;
    time: number;
}
export interface ICarsArray {
    name: string;
    color: string;
    id: number;
}
export interface IGetCar {
    name: string;
    color: string;
    id: number;
}
export interface IAllVariables {
    winnersPage: number;
    carsPage: number;
    limitWinners: number;
    limitCars: number;
    allWinnersCount: number;
    sortWinners: 'id' | 'wins' | 'time';
    orderWinners: 'ASC' | 'DESC';
}
export interface IResponse {
  headers: Headers;
  data: IWinnersArray[];
}
export interface IResponseCars {
  headers: Headers;
  data: ICarsArray[];
}