import { variables } from '../variables';
import { renderWinners } from '../render/render_winners';
export const listenWinners = () => {
    window.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement && e.target.dataset.wins === 'true') {
            variables.orderWinners = variables.orderWinners === 'ASC' ? 'DESC' : 'ASC';
            variables.sortWinners = 'wins';
            document.querySelector('[data-time="true"]')?.classList.remove('sorted-ASC', 'sorted-DESC');
            e.target.classList.remove('sorted-ASC', 'sorted-DESC');
            e.target.classList.add(`sorted-${variables.orderWinners}`);
            renderWinners();
        }
        if (e.target instanceof HTMLElement && e.target.dataset.time === 'true') {
            variables.orderWinners = variables.orderWinners === 'ASC' ? 'DESC' : 'ASC';
            variables.sortWinners = 'time';
            document.querySelector('[data-wins="true"]')?.classList.remove('sorted-ASC', 'sorted-DESC');
            e.target.classList.remove('sorted-ASC', 'sorted-DESC');
            e.target.classList.add(`sorted-${variables.orderWinners}`);
            renderWinners();
        }
    });
    document.querySelector('.main_container-garage_nav-pagination_next')?.addEventListener('click', () => {
        if (
            variables.allWinnersCount &&
            variables.winnersPage < Math.ceil(+variables.allWinnersCount / variables.limitWinners)
        ) {
            variables.winnersPage = variables.winnersPage + 1;
            renderWinners();
        }
    });
    document.querySelector('.main_container-garage_nav-pagination_prev')?.addEventListener('click', () => {
        if (variables.winnersPage > 1) {
            variables.winnersPage = variables.winnersPage - 1;
            renderWinners();
        }
    });

    const input = document.querySelector('.main_container-garage_input_winners-per-page');
    if (input instanceof HTMLInputElement) {
        if (+input.value > 10) {
            input.value = '10';
        }
        input.addEventListener('input', () => {
            if (variables.limitWinners !== +input.value) {
                variables.limitWinners = +input.value;
                variables.winnersPage = 1;
                renderWinners();
            }
        });
    }
};
