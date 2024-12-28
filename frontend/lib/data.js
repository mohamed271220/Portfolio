import {
    getBlogPosts,
    getMe,
    getProjects,
    getSkills,
    getEducations,
    getExperiences,
    getCertifications,
    getTestimonials,
    getCategories
} from '../api'; // Import your API functions

export const fetchData = async () => {
    try {
        const [me, projects, skills, educations, experiences, certifications, testimonials, categories] = await Promise.all([
            getMe({ cache: 'no-store' }),
            getProjects({ cache: 'no-store' }),
            getSkills(),
            getEducations(),
            getExperiences({ cache: 'no-store' }),
            getCertifications(),
            getTestimonials(),
            getCategories(),

        ]);
        return {
            me,
            projects,
            skills,
            educations,
            experiences,
            certifications,
            testimonials,
            categories
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchBlogData = async () => {
    try {
        const blogPosts = await getBlogPosts();
        return blogPosts;
    } catch (error) {
        console.error('Error fetching blog data:', error);
        throw error;
    }
}