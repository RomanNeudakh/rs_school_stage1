import { root_engine, root_winners } from './const';
import { root_garage } from './const';
import { IResponse, IResponseCars, INewCar } from './inerfeses';
// import { IWinnersArray } from './inerfeses';

export const getWinners = async (
    page?: number,
    limit?: number,
    sort?: 'id' | 'wins' | 'time',
    order?: 'ASC' | 'DESC'
): Promise<IResponse> => {
    const response = await fetch(`${root_winners}/?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const headers = response.headers;
        const data = await response.json();
        return { headers, data };
    }
};
export const getCars = async (page?: number, limit?: number): Promise<IResponseCars> => {
    const response = await fetch(`${root_garage}/?_page=${page}&_limit=${limit}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const headers = response.headers;
        const data = await response.json();
        return { headers, data };
    }
};
export const getCar = async (id: number) => {
    return await fetch(`${root_garage}/${id}`, { method: 'GET' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
export const getWinner = async (id: number) => {
    return await fetch(`${root_winners}/${id}`, { method: 'GET' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
export const deleteCar = async (id: number) => {
    return await fetch(`${root_garage}/${id}`, { method: 'DELETE' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
export const deleteWinner = async (id: number) => {
    return await fetch(`${root_winners}/${id}`, { method: 'DELETE' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .catch(() => {
            console.log(`car is not in winner list`);
        });
};

export const createCar = async (data: INewCar) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    return await fetch(`${root_garage}`, options)
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
export const updateCar = async (id: number, data: INewCar) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    return await fetch(`${root_garage}/${id}`, options)
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
export const startStopCar = async (status: string, id: number) => {
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
export const driveCar = async (id: number) => {
    return await fetch(`${root_engine}?id=${id}&status=drive`, { method: 'PATCH' })
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
