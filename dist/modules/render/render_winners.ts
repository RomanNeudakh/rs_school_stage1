import { getCar, getWinners } from '../api';
import { variables } from '../variables';
import { IGetCar, IResponse } from '../inerfeses';

export const renderWinners = async () => {
    const winners: IResponse = await getWinners(
        variables.winnersPage,
        variables.limitWinners,
        variables.sortWinners,
        variables.orderWinners
    );
    const parentNode = document.querySelector('.tbody');
    const winnersCount = document.querySelector('.main_container-garage_winners-count');
    const pageNumber = document.querySelector('.main_container-garage_winners-page-number');
    const sortWins = document.querySelector('[data-wins="true"]');
    const sortTime = document.querySelector('[data-time="true"]');
    variables.sortWinners === 'wins'
        ? variables.orderWinners === 'ASC'
            ? sortWins?.classList.add('sorted-ASC')
            : sortWins?.classList.add('sorted-DESC')
        : variables.orderWinners === 'ASC'
        ? sortTime?.classList.add('sorted-ASC')
        : sortTime?.classList.add('sorted-DESC');
    const headers = winners.headers;
    const totalCount = headers ? headers.get('X-Total-Count') : null;
    variables.allWinnersCount = totalCount === null ? 0 : +totalCount;
    if (winnersCount && pageNumber) {
        winnersCount.innerHTML = `Winners(${totalCount})`;
        pageNumber.innerHTML = `Page#${variables.winnersPage}`;
    }
    let result = '';
    let position = (variables.winnersPage - 1) * variables.limitWinners;
    for (const element of winners.data) {
        const currentCar: IGetCar = await getCar(element.id);
        position++;
        result += `
          <tr class="main_container-garage_table_tr">
            <th class="main_container-garage_table_tr_td">${position}</td>
            <th class="main_container-garage_table_tr_td">${currentCar.color}</td>
            <th class="main_container-garage_table_tr_td">${currentCar.name}</td>
            <th class="main_container-garage_table_tr_td">${element.wins}</td>
            <th class="main_container-garage_table_tr_td">${element.time}</td>
          </tr>
        `;
    }
    if (parentNode) {
        parentNode.innerHTML = result;
    }
};
