import { root_winners } from './const';
import { root_garage } from './const';
import { IResponse, IResponseCars } from './inerfeses';
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

// const data: IWinnersArray = {
//     id: 4,
//     wins: 2,
//     time: 3.4,
// };

// const postData = async (url: string, data: IWinnersArray) => {
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     };
//     const response = await fetch(url, options);
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const json = await response.json();
//     return json;
// };

// postData(root_winners, data)
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));
