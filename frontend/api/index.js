import axios from 'axios';

const api = axios.create({
    // backend link from .env.local
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});
export const getBlogPosts = async () => {
    try {
        const response = await api.get('/api/v1/blogs');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
    }
}
export const getBlogPost = async (id) => {
    const response = await api.get(`/api/v1/blogs/${id}`);
    return response.data;
}
export const getMe = async () => {
    const response = await api.get('/api/v1/me');
    return response.data;
}
export const getProjects = async () => {
    const response = await api.get('/api/v1/projects');
    return response.data;

}
export const getSkills = async () => {
    const response = await api.get('/api/v1/skills');
    return response.data;
}
export const getEducations = async () => {
    const response = await api.get('/api/v1/educations');
    return response.data;
}
export const getExperiences = async () => {
    const response = await api.get('/api/v1/experiences');
    return response.data;
}
export const getCertifications = async () => {
    const response = await api.get('/api/v1/certifications');
    return response.data;
}
export const getTestimonials = async () => {
    const response = await api.get('/api/v1/testimonials');
    return response.data;
}
export const getCategories = async () => {
    const response = await api.get('/api/v1/categories');
    return response.data;
}


/*
blogs
certifications
me
educations
experiences
projects
skills
testimonials
categories
*/