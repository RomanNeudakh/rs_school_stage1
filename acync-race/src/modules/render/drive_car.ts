import { root_engine } from '../const';
export class DriveCar {
    private animationId = 0;
    private xPos = 0;
    private time = 0;
    private id: number;
    private startButton: HTMLElement;
    private stopButton: HTMLElement;
    private car: SVGElement;
    private track: HTMLElement;
    constructor(id: number) {
        this.id = id;
        this.xPos = 0;
        this.time = 0;
        this.startButton = document.querySelector(`#start[data-idcar="${this.id}"]`) as HTMLButtonElement;
        this.stopButton = document.querySelector(`#stop[data-idcar="${this.id}"]`) as HTMLButtonElement;
        this.car = document.querySelector(`#svg-${this.id}[data-idcar="${this.id}"]`) as SVGElement;
        this.track = document.querySelector(`#road-${this.id}[data-idcar="${this.id}"]`) as HTMLElement;
        this.startButton.addEventListener('click', async () => {
            const content = await this.startStopCar('started', this.id);
            const time = Math.round(content.distance / content.velocity / 10) / 100;
            this.time = time;
            this.updatePosition();
            this.startDrive();
        });
        this.stopButton.addEventListener('click', () => {
            this.stopDrive();
        });
    }
    startStopCar = async (status: string, id: number) => {
        return await fetch(`${root_engine}?id=${id}&status=${status}`, { method: 'PATCH' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .catch(() => {
                console.log(`car not found`);
            });
    };
    startDrive() {
        fetch(`${root_engine}?id=${this.id}&status=drive`, { method: 'PATCH' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    // this.animationId = requestAnimationFrame(this.updatePosition.bind(this));
                    return response.status;
                }
            })
            .catch(() => {
                console.log(`car not found`);
                cancelAnimationFrame(this.animationId);
            });
    }
    stopDrive() {
        cancelAnimationFrame(this.animationId);
    }
    private updatePosition() {
        this.xPos += (this.track.offsetWidth - this.car.clientWidth) / this.time / 60;
        console.log(this.time);
        console.log(this.xPos);
        console.log(this.track.offsetWidth - this.car.clientWidth);
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
}
