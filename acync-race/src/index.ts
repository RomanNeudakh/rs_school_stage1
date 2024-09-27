import './index.scss';
// import { root_winners } from './modules/const';
// import { root_garage } from './modules/const';
import { Router } from './modules/router/router';
// import { getCar, getWinners } from './modules/api';

const router = new Router();
router.initRouter();

// async function displayWinners() {
//     const winners = await getWinners(1, 2, 'id');
//     console.log(winners);
//     console.log(await getCar(10));
// }
// displayWinners();
