import { root_engine } from '../const';
import { driveActive } from './garageApi';
export class DriveCar {
    private animationId = 0;
    private xPos = 0;
    private time = 0;
    private id: number;
    private startButton: HTMLButtonElement | null;
    private stopButton: HTMLButtonElement | null;
    private car: SVGElement | null;
    private track: HTMLElement | null;
    constructor(id: number) {
        this.id = id;
        this.xPos = 0;
        this.time = 0;
        this.startButton = null;
        this.stopButton = null;
        this.car = null;
        this.track = null;
    }
    init() {
        this.startButton = document.querySelector(`#start[data-idcar="${this.id}"]`) as HTMLButtonElement;
        this.stopButton = document.querySelector(`#stop[data-idcar="${this.id}"]`) as HTMLButtonElement;
        this.car = document.querySelector(`#svg-${this.id}[data-idcar="${this.id}"]`) as SVGElement;
        this.track = document.querySelector(`#road-${this.id}[data-idcar="${this.id}"]`) as HTMLElement;
        this.startButton.addEventListener('click', async () => {
            this.clickStartButton();
        });
        this.stopButton.addEventListener('click', async () => {
            this.clickStopButton();
        });
        this.disableStopButton();
    }
    async clickStopButton() {
        if (this.stopButton instanceof HTMLButtonElement && this.startButton instanceof HTMLButtonElement) {
            driveActive(false, this.stopButton, this.startButton);
        }
        this.stopDrive();
        await this.startStopCar('stopped', this.id);
        this.backToStart();
    }
    async clickStartButton() {
        if (this.stopButton instanceof HTMLButtonElement && this.startButton instanceof HTMLButtonElement) {
            driveActive(true, this.stopButton, this.startButton);
        }
        return this.startStopCar('started', this.id)
            .then(async (content) => {
                const time = Math.round((content.distance / content.velocity / 1000) * 10000) / 10000;
                this.time = time;
                this.updatePosition();
                const errorDrive = await this.startDrive();
                if (errorDrive !== 500) {
                    return [this.id, time];
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // const content = await this.startStopCar('started', this.id);
        // const time = Math.round((content.distance / content.velocity / 1000) * 10000) / 10000;
        // this.time = time;
        // this.updatePosition();
        // return this.startDrive();
    }
    startStopCar = async (status: string, id: number) => {
        return await fetch(`${root_engine}?id=${id}&status=${status}`, { method: 'PATCH' })
            .then(async (response) => {
                if (!response.ok && response.headers.get('Content-Type') === 'application/json') {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    return await response.json();
                }
            })
            .catch(() => {
                console.log(`car not found`);
            });
    };
    async startDrive() {
        return fetch(`${root_engine}?id=${this.id}&status=drive`, { method: 'PATCH' })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    await this.startStopCar('stopped', this.id);
                }
            })
            .catch(async () => {
                console.log(`car not found`);
                cancelAnimationFrame(this.animationId);
                this.startStopCar('stopped', this.id);
                return 500;
            });
    }
    stopDrive() {
        cancelAnimationFrame(this.animationId);
    }
    disableStopButton() {
        if (this.stopButton instanceof HTMLButtonElement) {
            console.log(this.stopButton.disabled);
            this.stopButton.disabled = true;
        }
    }
    private updatePosition() {
        if (this.track && this.car) {
            this.xPos += (this.track.offsetWidth - this.car.clientWidth) / this.time / 59;
        }
        if (this.car) {
            this.car.style.transform = `translateX(${this.xPos}px)`;
        }
        if (this.track && this.car) {
            if (this.xPos >= this.track.offsetWidth - this.car.clientWidth) {
                cancelAnimationFrame(this.animationId);
                return;
            }
        }
        this.animationId = requestAnimationFrame(this.updatePosition.bind(this));
    }
    backToStart() {
        this.xPos = 0;
        if (this.car) {
            this.car.style.transform = `translateX(${this.xPos}px)`;
        }
    }
}
