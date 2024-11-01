import  { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getEducations, addEducation, updateEducation, deleteEducation } from '../api';
import MediaUpload from '../components/Form/MediaUpload';
import Button from '../components/Buttons/Button';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';


const EducationPage = () => {
    const [educations, setEducations] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentEducation, setCurrentEducation] = useState(null);
    const [newEducation, setNewEducation] = useState({
        institutionName: '',
        from: '',
        to: '',
        link: '',
        description: ''
    });
    const [newEducationLogo, setNewEducationLogo] = useState(''); // Separate state for newEducation logo
    const [currentEducationLogo, setCurrentEducationLogo] = useState(''); // Separate state for currentEducation logo

    // Fetch educations
    const { data, isLoading, isError } = useQuery({
        queryKey: ['educations'],
        queryFn: getEducations,
        onError: () => toast.error("Failed to load education data.")
    });

    useEffect(() => {
        if (data) {
            setEducations(
                data.map(edu => ({ ...edu, logo: edu.logo || 'https://via.placeholder.com/150' }))
            )
        }
    }, [data]);

    // Mutations for add, update, and delete
    const addMutation = useMutation({
        mutationFn: addEducation,
        onSuccess: () => {
            toast.success("Education added successfully!");
            setEducations([...educations, { ...newEducation, logo: newEducationLogo }]);
            setNewEducation({
                institutionName: '',
                from: '',
                to: '',
                link: '',
                description: ''
            });
            setNewEducationLogo(''); // Reset the logo state
        },
        onError: () => toast.error("Failed to add education.")
    });

    const updateMutation = useMutation({
        mutationFn: updateEducation,
        onSuccess: () => {
            toast.success("Education updated successfully!");
            setEducations(educations.map(edu =>
                edu.id === currentEducation._id ? { ...currentEducation, logo: currentEducationLogo } : edu
            ));
            setShowEditModal(false);
        },
        onError: () => toast.error("Failed to update education.")
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEducation,
        onSuccess: () => {
            toast.success("Education deleted successfully!");
            setEducations(educations.filter(edu => edu.id !== currentEducation.id));
            setShowDeleteModal(false);
        },
        onError: () => toast.error("Failed to delete education.")
    });

    const handleEdit = (education) => {
        setCurrentEducation({
            ...education,
            from: education.from.split('T')[0], // Format the date to YYYY-MM-DD
            to: education.to.split('T')[0], // Format the date to YYYY-MM-DD
        });
        setCurrentEducationLogo([education.logo]); // Set logo state for the current education
        setShowEditModal(true);
    };

    const handleDelete = (education) => {
        setCurrentEducation(education);
        setShowDeleteModal(true);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewEducation(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentEducation(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addMutation.mutate({ ...newEducation, logo: newEducationLogo });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ ...currentEducation, logo: currentEducationLogo });
    };

    const confirmDelete = () => {
        if (currentEducation && currentEducation._id) {
            deleteMutation.mutate(currentEducation._id);
        } else {
            toast.error("Failed to delete education. Invalid education ID.");
        }
    };

    console.log(currentEducationLogo);


    if (isLoading) return <SkeletonLoader mode="comments" />;
    if (isError) return <p>Error loading education data.</p>;

    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md ">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Education</h2>

            {/* Education Table */}
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden mx-auto">
            <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-4 py-2">Institution</th>
                    <th className="px-4 py-2">Logo</th>
                    <th className="px-4 py-2">From</th>
                    <th className="px-4 py-2">To</th>
                    <th className="px-4 py-2">Link</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {educations.map((edu) => (
                    <tr key={edu.id}>
                        <td className="border px-4 py-2 whitespace-normal">{edu.institutionName}</td>
                        <td className="border px-4 py-2">
                            <img src={edu.logo} alt="Logo" className="w-10 h-10" />
                        </td>
                        <td className="border px-4 py-2">{edu.from}</td>
                        <td className="border px-4 py-2">{edu.to}</td>
                        <td className="border px-4 py-2">
                            <a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                <FaEye />
                            </a>
                        </td>
                        <td className="border px-4 py-2 whitespace-normal">{edu.description}</td>
                        <td className="border px-4 py-2">
                            <button onClick={() => handleEdit(edu)} className="text-blue-600 hover:underline">
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(edu)} className="text-red-600 hover:underline ml-2">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

            {/* Add New Education Form */}
            <form onSubmit={handleAddSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Institution Name</label>
                    <input
                        type="text"
                        name="institutionName"
                        value={newEducation.institutionName}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Logo</label>
                    <MediaUpload mediaLinks={newEducationLogo} setMediaLinks={setNewEducationLogo} uploadMode="single" />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">From Date</label>
                    <input
                        type="date"
                        name="from"
                        value={newEducation.from}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">To Date</label>
                    <input
                        type="date"
                        name="to"
                        value={newEducation.to}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Institution Link</label>
                    <input
                        type="url"
                        name="link"
                        value={newEducation.link}
                        onChange={handleAddChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={newEducation.description}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <Button type="submit">Add Education</Button>
            </form>

            {/* Edit Education Modal */}
            {showEditModal && (
                <Modal title="Edit Education" onClose={() => setShowEditModal(false)}>
                    <form onSubmit={handleEditSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Institution Name</label>
                            <input
                                type="text"
                                name="institutionName"
                                value={currentEducation.institutionName}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Logo</label>
                            <MediaUpload mediaLinks={currentEducationLogo} setMediaLinks={setCurrentEducationLogo} uploadMode="single" />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">From Date</label>
                            <input
                                type="date"
                                name="from"
                                value={currentEducation.from}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">To Date</label>
                            <input
                                type="date"
                                name="to"
                                value={currentEducation.to}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Institution Link</label>
                            <input
                                type="url"
                                name="link"
                                value={currentEducation.link}
                                onChange={handleEditChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={currentEducation.description}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <Button type="submit">Update Education</Button>
                    </form>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <Modal title="Delete Education" onClose={() => setShowDeleteModal(false)}>
                    <p className='dark:text-white'>Are you sure you want to delete this education?</p>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button onClick={confirmDelete} className="ml-2" type="button">Delete</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default EducationPage;
