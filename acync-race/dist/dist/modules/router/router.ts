import { routes } from './routes';
import { renderWinners } from '../render/render_winners';
import { renderCars } from '../render/render_cars';
import { listenWinners } from '../render/winners_listen';
import { listenGarage } from '../render/garage_listen';
import { variables } from '../variables';
export class Router {
    async render(url: string) {
        const body = document.querySelector('.body');
        const route: Record<string, string> | undefined = routes.find((route) => {
            const regexp = new RegExp(route.path);
            return url.match(regexp);
        });
        if (body && route) {
            body.innerHTML = route.data;
            this.initAnchors();
            if (url.match(new RegExp(routes[0].path))) {
                console.log('main page');
            } else if (url.match(new RegExp(routes[1].path))) {
                await renderCars();
                listenGarage();
            } else if (url.match(new RegExp(routes[2].path))) {
                listenWinners();
                renderWinners();
            }
        } else {
            if (body) {
                body.innerHTML = 'Page not found';
            }
        }
    }
    goTo(url: string) {
        window.history.pushState({ url }, url, url);
        this.render(url);
    }
    initAnchors() {
        document.querySelectorAll('[href^="/"]').forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                if (event.target instanceof HTMLAnchorElement) {
                    this.goTo(event.target.pathname);
                }
            });
        });
    }
    initRouter() {
        const localStorageData = localStorage.getItem('variables_data') || '';
        let json = null;
        if (localStorageData) {
            json = JSON.parse(localStorageData) || null;
            for (const [key, value] of Object.entries(json)) {
                variables[key] = value;
            }
        }
        window.addEventListener('beforeunload', function () {
            const dataToSave = variables;
            localStorage.setItem('variables_data', JSON.stringify(dataToSave));
        });
        this.render(window.location.pathname);
        window.addEventListener('popstate', () => {
            this.render(window.location.pathname);
        });
    }
}
