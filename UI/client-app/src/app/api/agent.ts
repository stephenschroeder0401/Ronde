import axios, { AxiosResponse } from 'axios';
import { request } from 'http';
import { Trip } from '../models/trip';

const sleep = (delay: number) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:44323';

axios.interceptors.response.use(async response =>{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Trips = {
    list: () => requests.get<Trip[]>('/trips'),
    details: (id: number) => requests.get<Trip>(`/trip/${id}`),
    create: (trip: Trip) => axios.post<void>('/trips', trip),
    update: (trip: Trip) => axios.put<void>(`/trips/${trip.id}`, trip),
    delete: (id: number) => axios.delete<void>(`/trips/${id}`)
}


const agent ={
    Trips
}

export default agent;

