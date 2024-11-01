import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserDetails, updateUserDetails } from '../api';
import MediaUpload from '../components/Form/MediaUpload';
import Button from '../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import { toast } from 'react-toastify';

const UserDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPosition: '',
        resume: '',
        githubLink: '',
        linkedinLink: '',
        twitterLink: '',
        languages: [],
    });
    const [mediaLink, setMediaLink] = useState(['']);
    const [errors, setErrors] = useState({});

    const { data, isLoading, isError } = useQuery({
        queryKey: ['userDetails'],
        queryFn: getUserDetails,
        onError: (error) => {
            console.error('Error fetching user details:', error);
            toast.error('Failed to load user details. Please try again.');
        },
    });

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name || '',
                email: data.email || '',
                currentPosition: data.currentPosition || '',
                resume: data.resume || '',
                githubLink: data.githubLink || '',
                linkedinLink: data.linkedinLink || '',
                twitterLink: data.twitterLink || '',
                languages: data.languages || [],
            });
            setMediaLink([data.profilePicture || '']);
        }
    }, [data]);

    const updateMutation = useMutation({
        mutationFn: updateUserDetails,
        onSuccess: () => {
            toast.success('User details updated successfully!');
            setErrors({});
            navigate('/');
        },
        onError: (error) => {
            console.error('Error updating user details:', error);
            toast.error('Failed to save user details. Please check your input and try again.');
            if (error.response && error.response.status === 400) {
                const validationErrors = {};
                error.response.data.errors.forEach(err => {
                    validationErrors[err.path] = err.msg;
                });
                setErrors(validationErrors);
            }
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'languages') {
            setFormData((prevState) => ({ ...prevState, languages: value.split(',').map(lang => lang.trim()) }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ ...formData, profilePicture: mediaLink });
    };

    if (isLoading) return <SkeletonLoader mode="comments" />;
    if (isError) return <p>Error loading user details.</p>;

    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">User Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Current Position</label>
                    <input
                        type="text"
                        name="currentPosition"
                        value={formData.currentPosition}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                    {errors.currentPosition && <p className="text-red-500 text-sm mt-1">{errors.currentPosition}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Resume (URL)</label>
                    <input
                        type="url"
                        name="resume"
                        value={formData.resume}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                    {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">GitHub Link (URL)</label>
                    <input
                        type="url"
                        name="githubLink"
                        value={formData.githubLink}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                    {errors.githubLink && <p className="text-red-500 text-sm mt-1">{errors.githubLink}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">LinkedIn Link (URL)</label>
                    <input
                        type="url"
                        name="linkedinLink"
                        value={formData.linkedinLink}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                    {errors.linkedinLink && <p className="text-red-500 text-sm mt-1">{errors.linkedinLink}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Twitter Link (URL)</label>
                    <input
                        type="url"
                        name="twitterLink"
                        value={formData.twitterLink}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                    {errors.twitterLink && <p className="text-red-500 text-sm mt-1">{errors.twitterLink}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Languages</label>
                    <input
                        type="text"
                        name="languages"
                        value={formData.languages.join(', ')} // Display languages as a comma-separated string
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                    <small className="text-gray-500 dark:text-gray-400">Enter languages separated by commas.</small>
                    {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
                </div>

                <MediaUpload mediaLinks={mediaLink} setMediaLinks={setMediaLink} uploadMode="single" />
                <Button
                    disabled={updateMutation.isLoading || !formData.name || !formData.email || !formData.currentPosition || !formData.resume || !mediaLink[0]}
                    type="submit"
                    className="w-full"
                >
                    {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </form>
        </div>
    );
};

export default UserDetails;