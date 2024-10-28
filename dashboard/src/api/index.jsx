import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();


const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
});


export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};


export const getUserDetails = async () => {
    const response = await api.get('/me');
    return response.data;
}

export const updateUserDetails = async (
    userDetails
) => {
    const response = await api.patch('/me', userDetails, {
        withCredentials: true,
    });
    return response.data;
}


export const getEducations = async () => {
    const response = await api.get('/education');
    return response.data;
}

export const addEducation = async (
    education
) => {
    const response = await api.post('/education', education, {
        withCredentials: true,
    });
    return response.data;
}


export const updateEducation = async (
    education
) => {
    const response = await api.put(`/education/${education._id}`, education, {
        withCredentials: true,
    });
    return response.data;
}
export const deleteEducation = async (
    id
) => {
    const response = await api.delete(`/education/${id}`, {
        withCredentials: true,
    });

    return response.data;
}