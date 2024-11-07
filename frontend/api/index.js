import axios from 'axios';

const api = axios.create({
    // backend link from .env.local
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
});
export const getBlogPosts = async () => {
    const response = await api.get('/blogs');
    return response.data;
}
export const getBlogPost = async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
}
export const getMe = async () => {
    const response = await api.get('/me');
    return response.data;
}
export const getProjects = async () => {
    const response = await api.get('/projects');
    return response.data;

}
export const getSkills = async () => {
    const response = await api.get('/skills');
    return response.data;
}
export const getEducations = async () => {
    const response = await api.get('/educations');
    return response.data;
}
export const getExperiences = async () => {
    const response = await api.get('/experiences');
    return response.data;
}
export const getCertifications = async () => {
    const response = await api.get('/certifications');
    return response.data;
}
export const getTestimonials = async () => {
    const response = await api.get('/testimonials');
    return response.data;
}
export const getCategories = async () => {
    const response = await api.get('/categories');
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