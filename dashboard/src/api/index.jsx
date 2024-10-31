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

export const getSkills = async () => {
    const response = await api.get('/skills');
    return response.data;
}
export const addSkill = async (
    skill
) => {
    const response = await api.post('/skills', skill, {
        withCredentials: true,
    });
    return response.data;
}

export const updateSkill = async (
    skill
) => {
    const response = await api.put(`/skills/${skill._id}`, skill, {
        withCredentials: true,
    });
    return response.data;
}

export const deleteSkill = async (
    id
) => {
    const response = await api.delete(`/skills/${id}`, {
        withCredentials: true,
    });

    return response.data;
}


export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
}
export const addCategory = async (
    category
) => {
    const response = await api.post('/categories', category, {
        withCredentials: true,
    });
    return response.data;
}

export const updateCategory = async (
    category
) => {
    const response = await api.put(`/categories/${category._id}`, category, {
        withCredentials: true,
    });
    return response.data;
}

export const deleteCategory = async (
    id
) => {
    const response = await api.delete(`/categories/${id}`, {
        withCredentials: true,
    });

    return response.data;
}

export const getProjects = async () => {
    const response = await api.get('/projects');
    return response.data;
}
export const addProject = async (
    project
) => {
    const response = await api.post('/projects', project, {
        withCredentials: true,
    });
    return response.data;
}

export const updateProject = async (
    project
) => {
    const response = await api.put(`/projects/${project._id}`, project, {
        withCredentials: true,
    });
    return response.data;
}

export const deleteProject = async (
    id
) => {
    const response = await api.delete(`/projects/${id}`, {
        withCredentials: true,
    });

    return response.data;
}
