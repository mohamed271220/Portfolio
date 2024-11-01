import  { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, queryClient } from '../api';
import MediaUpload from '../components/Form/MediaUpload';
import Button from '../components/Buttons/Button';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import {  FaEdit, FaTrash } from 'react-icons/fa';

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(null);
    const [newTestimonial, setNewTestimonial] = useState({
        name: '',
        position: '',
        content: ''
    });
    const [newProfilePicture, setNewProfilePicture] = useState(''); // Separate state for new profile picture
    const [currentProfilePicture, setCurrentProfilePicture] = useState(''); // Separate state for current profile picture

    // Fetch testimonials
    const { data, isLoading, isError } = useQuery({
        queryKey: ['testimonials'],
        queryFn: getTestimonials,
        onError: () => toast.error("Failed to load testimonials.")
    });

    useEffect(() => {
        if (data) {
          console.log(data);
          
            setTestimonials(
                data.map(testimonial => ({ ...testimonial, profilePicture: testimonial.profilePicture || 'https://via.placeholder.com/150' }))
            );
        }
    }, [data]);

    // Mutations for add, update, and delete
    const addMutation = useMutation({
        mutationFn: addTestimonial,
        onSuccess: () => {
            toast.success("Testimonial added successfully!");
            setTestimonials([...testimonials, { ...newTestimonial, profilePicture: newProfilePicture }]);
            setNewTestimonial({
                name: '',
                position: '',
                content: ''
            });
            setNewProfilePicture(''); // Reset the profile picture state
        },
        onError: () => toast.error("Failed to add testimonial.")
    });

    const updateMutation = useMutation({
        mutationFn: updateTestimonial,
        onSuccess: () => {
            toast.success("Testimonial updated successfully!");
            setTestimonials(testimonials.map(testimonial =>
                testimonial.id === currentTestimonial._id ? { ...currentTestimonial, profilePicture: currentProfilePicture } : testimonial
            ));
            setShowEditModal(false);
            queryClient.invalidateQueries('testimonials'); // Invalidate
        },
        onError: () => toast.error("Failed to update testimonial.")
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTestimonial,
        onSuccess: () => {
            toast.success("Testimonial deleted successfully!");
            setTestimonials(testimonials.filter(testimonial => testimonial.id !== currentTestimonial.id));
            setShowDeleteModal(false);
        },
        onError: () => toast.error("Failed to delete testimonial.")
    });

    const handleEdit = (testimonial) => {
        setCurrentTestimonial(testimonial);
        setCurrentProfilePicture(testimonial.profilePicture);
        setShowEditModal(true);
    };

    const handleDelete = (testimonial) => {
        setCurrentTestimonial(testimonial);
        setShowDeleteModal(true);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewTestimonial(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentTestimonial(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addMutation.mutate({ ...newTestimonial, profilePicture: newProfilePicture });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ ...currentTestimonial, profilePicture: currentProfilePicture });
    };

    const confirmDelete = () => {
        if (currentTestimonial && currentTestimonial._id) {
            deleteMutation.mutate(currentTestimonial._id);
        } else {
            toast.error("Failed to delete testimonial. Invalid testimonial ID.");
        }
    };

    if (isLoading) return <SkeletonLoader mode="comments" />;
    if (isError) return <p>Error loading testimonials.</p>;

    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md ">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Testimonials</h2>

            {/* Testimonials Table */}
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden mx-auto">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Profile Picture</th>
                        <th className="px-4 py-2">Position</th>
                        <th className="px-4 py-2">Content</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((testimonial) => (
                        <tr key={testimonial.id}>
                            <td className="border px-4 py-2">{testimonial.name}</td>
                            <td className="border px-4 py-2">
                                <img src={testimonial.profilePicture} alt="Profile" className="w-10 h-10" />
                            </td>
                            <td className="border px-4 py-2">{testimonial.position}</td>
                            <td className="border px-4 py-2">{testimonial.content}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleEdit(testimonial)} className="text-blue-600 hover:underline">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(testimonial)} className="text-red-600 hover:underline ml-2">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add New Testimonial Form */}
            <form onSubmit={handleAddSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newTestimonial.name}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Profile Picture</label>
                    <MediaUpload mediaLinks={newProfilePicture} setMediaLinks={setNewProfilePicture} uploadMode="single" />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Position</label>
                    <input
                        type="text"
                        name="position"
                        value={newTestimonial.position}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Content</label>
                    <textarea
                        name="content"
                        value={newTestimonial.content}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <Button type="submit">Add Testimonial</Button>
            </form>

            {/* Edit Testimonial Modal */}
            {showEditModal && (
                <Modal title="Edit Testimonial" onClose={() => setShowEditModal(false)}>
                    <form onSubmit={handleEditSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={currentTestimonial.name}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Profile Picture</label>
                            <MediaUpload mediaLinks={[currentProfilePicture]} setMediaLinks={setCurrentProfilePicture} uploadMode="single" />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Position</label>
                            <input
                                type="text"
                                name="position"
                                value={currentTestimonial.position}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Content</label>
                            <textarea
                                name="content"
                                value={currentTestimonial.content}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <Button type="submit">Update Testimonial</Button>
                    </form>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <Modal title="Delete Testimonial" onClose={() => setShowDeleteModal(false)}>
                    <p>Are you sure you want to delete this testimonial?</p>
                    <div className="mt-4 flex justify-end">
                        <Button onClick={confirmDelete} variant="danger">Delete</Button>
                        <Button onClick={() => setShowDeleteModal(false)} variant="secondary">Cancel</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TestimonialsPage;
