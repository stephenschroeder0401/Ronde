import axios, { AxiosError, AxiosResponse } from 'axios';
import { request } from 'http';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Profile } from '../models/profile';
import { Trip, TripFormValues } from '../models/trip';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:44356';

axios.interceptors.request.use(config =>{
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
})


axios.interceptors.response.use(async response =>{
        await sleep(1000);
        return response;
}, (error: AxiosError) =>{
    const {data, status} = error.response!;
    switch(status){
        case 400:
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }else{
                toast.error(data);
            }
            toast.error('bad request');
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('server-error');
            break;
    }
    return Promise.reject(error);
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Trips = {
    list: () => requests.get<Trip[]>('/trips'),
    details: (id: number) => requests.get<Trip>(`/trips/${id}`),
    create: (trip: TripFormValues) => requests.post<number>('/trips', trip),
    update: (trip: TripFormValues) => requests.put<number>(`/trips/${trip.id}`, trip),
    delete: (id: number) => requests.del<void>(`/trips/${id}`),
    attend: (id: number) => requests.post<void>(`/trips/${id}/attend`, {})
}

const Account ={
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', {Email: user.email, Password: user.password}),
    register: (user: UserFormValues) => requests.post<User>('/account/register', {Email: user.email, Password: user.password, Username: user.username, DisplayName: user.displayName}),
    
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) =>{
        let formData = new FormData();
        formData.append('file', file);
        return axios.post('photos', formData, {
        headers: {'Content-type': 'multipart/form-data'}
        })
    },
    setMainPhoto: (id: string) => requests.put(`/photos/`, {publicId: id}),
    deletePhoto: (id: string) => requests.del(`/photos/${id}`),
    toggleFollowing: (userId: string) => requests.post(`/userFollowing/${userId}`,{})
};


const agent ={
    Trips,
    Account,
    Profiles
}

export default agent;

