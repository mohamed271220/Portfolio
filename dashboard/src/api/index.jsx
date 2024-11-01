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
    const response = await api.get('/educations');
    return response.data;
}

export const addEducation = async (
    education
) => {
    const response = await api.post('/educations', education, {
        withCredentials: true,
    });
    return response.data;
}


export const updateEducation = async (
    education
) => {
    const response = await api.put(`/educations/${education._id}`, education, {
        withCredentials: true,
    });
    return response.data;
}

export const deleteEducation = async (
    id
) => {
    const response = await api.delete(`/educations/${id}`, {
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

export const getExperiences = async () => {
    const response = await api.get('/experiences');
    return response.data;
};

export const addExperience = async (newExperience) => {
    const response = await api.post('/experiences', newExperience, { withCredentials: true });
    return response.data;
};

export const updateExperience = async (updatedExperience) => {
    const response = await api.put(`/experiences/${updatedExperience._id}`, updatedExperience, { withCredentials: true });
    return response.data;
};

export const deleteExperience = async (experienceId) => {
    const response = await api.delete(`/experiences/${experienceId}`, { withCredentials: true });
    return response.data;
};


export const getCertifications = async () => {
    const response = await api.get(`/certifications`);
    return response.data;
}

export const addCertification = async (
    certification
) => {
    const response = await api.post('/certifications', certification, {
        withCredentials: true,
    });
    return response.data;
}

export const updateCertification = async (
    certification
) => {
    const response = await api.put(`/certifications/${certification._id}`, certification, {
        withCredentials: true,
    });
    return response.data;
}

export const deleteCertification = async (
    id
) => {
    const response = await api.delete(`/certifications/${id}`, {
        withCredentials: true,
    });

    return response.data;
}

export const getTestimonials = async () => {
    const response = await api.get('/testimonials');
    return response.data;
}

export const addTestimonial = async (testimonial) => {
    const response = await api.post('/testimonials', testimonial, {
        withCredentials: true,
    });
    return response.data;
}

export const updateTestimonial = async (
    testimonial
) => {
    const response = await api.put(`/testimonials/${testimonial._id}`, testimonial, {
        withCredentials: true,
    });
    return response.data;
}

export const deleteTestimonial = async (
    id
) => {
    const response = await api.delete(`/testimonials/${id}`, {
        withCredentials: true,
    });

    return response.data;
}

export const getBlogPosts = async () => {
    const response = await api.get('/blogs');
    return response.data;
}

export const addBlogPost = async (
    post
) => {
    const response = await api.post('/blogs', post, {
        withCredentials: true,
    });
    return response.data;
}

export const updateBlogPost = async (
    post
) => {
    const response = await api.put(`/blogs/${post._id}`, post, {
        withCredentials: true,
    });
    return response.data;
}

export const deleteBlogPost = async (
    id
) => {
    const response = await api.delete(`/blogs/${id}`, {
        withCredentials: true,
    });

    return response.data;
}

export const uploadImageToS3 = async (file) => {

    const formData = new FormData();
    formData.append('photos', file);

    const response = await api.post('/media/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });

    return response.data[0];
}