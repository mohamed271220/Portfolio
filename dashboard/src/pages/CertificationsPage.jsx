import { useEffect, useState } from 'react'; 
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCertifications, addCertification, updateCertification, deleteCertification } from '../api';
import MediaUpload from '../components/Form/MediaUpload';
import Button from '../components/Buttons/Button';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const CertificationPage = () => {
    const [certifications, setCertifications] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentCertification, setCurrentCertification] = useState(null);
    const [newCertification, setNewCertification] = useState({
        title: '',
        issuedBy: '',
        dateIssued: '',
        link: '',
    });
    const [newCertificationPhoto, setNewCertificationPhoto] = useState(''); 
    const [currentCertificationPhoto, setCurrentCertificationPhoto] = useState(''); 

    // Fetch certifications
    const { data, isLoading, isError } = useQuery({
        queryKey: ['certifications'],
        queryFn: getCertifications,
        onError: () => toast.error("Failed to load certification data.")
    });

    useEffect(() => {
        if (data) {
            setCertifications(
                data.map(cert => ({ ...cert, photo: cert.photo || 'https://via.placeholder.com/150' }))
            )
        }
    }, [data]);

    // Mutations for add, update, and delete
    const addMutation = useMutation({
        mutationFn: addCertification,
        onSuccess: () => {
            toast.success("Certification added successfully!");
            setCertifications([...certifications, { ...newCertification, photo: newCertificationPhoto }]);
            setNewCertification({
                title: '',
                issuedBy: '',
                dateIssued: '',
                link: '',
            });
            setNewCertificationPhoto('');
        },
        onError: () => toast.error("Failed to add certification.")
    });

    const updateMutation = useMutation({
        mutationFn: updateCertification,
        onSuccess: () => {
            toast.success("Certification updated successfully!");
            setCertifications(certifications.map(cert =>
                cert.id === currentCertification._id ? { ...currentCertification, photo: currentCertificationPhoto } : cert
            ));
            setShowEditModal(false);
        },
        onError: () => toast.error("Failed to update certification.")
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCertification,
        onSuccess: () => {
            toast.success("Certification deleted successfully!");
            setCertifications(certifications.filter(cert => cert.id !== currentCertification.id));
            setShowDeleteModal(false);
        },
        onError: () => toast.error("Failed to delete certification.")
    });

    const handleEdit = (certification) => {
        setCurrentCertification({
            ...certification,
            dateIssued: certification.dateIssued.split('T')[0], 
        });
        setCurrentCertificationPhoto([certification.photo]); 
        setShowEditModal(true);
    };

    const handleDelete = (certification) => {
        setCurrentCertification(certification);
        setShowDeleteModal(true);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewCertification(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentCertification(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addMutation.mutate({ ...newCertification, photo: newCertificationPhoto });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ ...currentCertification, photo: currentCertificationPhoto });
    };

    const confirmDelete = () => {
        if (currentCertification && currentCertification._id) {
            deleteMutation.mutate(currentCertification._id);
        } else {
            toast.error("Failed to delete certification. Invalid certification ID.");
        }
    };

    if (isLoading) return <SkeletonLoader mode="comments" />;
    if (isError) return <p>Error loading certification data.</p>;

    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md ">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Certifications</h2>

            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden mx-auto">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Photo</th>
                        <th className="px-4 py-2">Issued By</th>
                        <th className="px-4 py-2">Date Issued</th>
                        <th className="px-4 py-2">Link</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {certifications.map((cert) => (
                        <tr key={cert.id}>
                            <td className="border px-4 py-2 whitespace-normal">{cert.title}</td>
                            <td className="border px-4 py-2">
                                <img src={cert.photo} alt="Photo" className="w-10 h-10" />
                            </td>
                            <td className="border px-4 py-2">{cert.issuedBy}</td>
                            <td className="border px-4 py-2">{cert.dateIssued}</td>
                            <td className="border px-4 py-2">
                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    <FaEye />
                                </a>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleEdit(cert)} className="text-blue-600 hover:underline">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(cert)} className="text-red-600 hover:underline ml-2">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleAddSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={newCertification.title}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Photo</label>
                    <MediaUpload mediaLinks={newCertificationPhoto} setMediaLinks={setNewCertificationPhoto} uploadMode="single" />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Issued By</label>
                    <input
                        type="text"
                        name="issuedBy"
                        value={newCertification.issuedBy}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Date Issued</label>
                    <input
                        type="date"
                        name="dateIssued"
                        value={newCertification.dateIssued}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Link</label>
                    <input
                        type="url"
                        name="link"
                        value={newCertification.link}
                        onChange={handleAddChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <Button type="submit">Add Certification</Button>
            </form>

            {showEditModal && (
                <Modal title="Edit Certification" onClose={() => setShowEditModal(false)}>
                    <form onSubmit={handleEditSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={currentCertification.title}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Photo</label>
                            <MediaUpload mediaLinks={currentCertificationPhoto} setMediaLinks={setCurrentCertificationPhoto} uploadMode="single" />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Issued By</label>
                            <input
                                type="text"
                                name="issuedBy"
                                value={currentCertification.issuedBy}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Date Issued</label>
                            <input
                                type="date"
                                name="dateIssued"
                                value={currentCertification.dateIssued}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Link</label>
                            <input
                                type="url"
                                name="link"
                                value={currentCertification.link}
                                onChange={handleEditChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <Button type="submit">Update Certification</Button>
                    </form>
                </Modal>
            )}

            {showDeleteModal && (
                <Modal title="Delete Certification" onClose={() => setShowDeleteModal(false)}>
                    <p>Are you sure you want to delete this certification?</p>
                    <div className="flex justify-end space-x-4 mt-4">
                        <Button onClick={confirmDelete}>Yes</Button>
                        <Button onClick={() => setShowDeleteModal(false)}>No</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CertificationPage;
