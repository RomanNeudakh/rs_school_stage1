import { winners } from '../pages/winners';
import { garage } from '../pages/garage';
import { main } from '../pages/main';

export const routes = [
    {
        path: '^/$',
        data: main,
    },
    {
        path: '^/garage$',
        data: garage,
    },
    {
        path: '^/winners$',
        data: winners,
    },
];
