import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../api';
import Button from '../components/Buttons/Button';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: ''
    });

    // Fetch categories
    const { data, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        onError: () => toast.error("Failed to load category data.")
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    // Mutations for add, update, and delete
    const addMutation = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            toast.success("Category added successfully!");
            setCategories([...categories, newCategory]);
            setNewCategory({
                name: '',
                description: ''
            });
        },
        onError: () => toast.error("Failed to add category.")
    });

    const updateMutation = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            toast.success("Category updated successfully!");
            setCategories(categories.map(cat =>
                cat.id === currentCategory._id ? currentCategory : cat
            ));
            setShowEditModal(false);
        },
        onError: () => toast.error("Failed to update category.")
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            toast.success("Category deleted successfully!");
            setCategories(categories.filter(cat => cat.id !== currentCategory.id));
            setShowDeleteModal(false);
        },
        onError: () => toast.error("Failed to delete category.")
    });

    const handleEdit = (category) => {
        setCurrentCategory(category);
        setShowEditModal(true);
    };

    const handleDelete = (category) => {
        setCurrentCategory(category);
        setShowDeleteModal(true);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addMutation.mutate(newCategory);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate(currentCategory);
    };

    const confirmDelete = () => {
        if (currentCategory && currentCategory._id) {
            deleteMutation.mutate(currentCategory._id);
        } else {
            toast.error("Failed to delete category. Invalid category ID.");
        }
    };

    if (isLoading) return <SkeletonLoader mode="comments" />;
    if (isError) return <p>Error loading category data.</p>;

    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md ">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Categories</h2>

            {/* Categories Table */}
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden mx-auto">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td className="border px-4 py-2 whitespace-normal">{cat.name}</td>
                            <td className="border px-4 py-2 whitespace-normal">{cat.description}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:underline">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(cat)} className="text-red-600 hover:underline ml-2">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add New Category Form */}
            <form onSubmit={handleAddSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newCategory.name}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={newCategory.description}
                        onChange={handleAddChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <Button type="submit">Add Category</Button>
            </form>

            {/* Edit Category Modal */}
            {showEditModal && (
                <Modal title="Edit Category" onClose={() => setShowEditModal(false)}>
                    <form onSubmit={handleEditSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={currentCategory.name}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={currentCategory.description}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <Button type="submit">Update Category</Button>
                    </form>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <Modal title="Delete Category" onClose={() => setShowDeleteModal(false)}>
                    <p>Are you sure you want to delete this category?</p>
                    <div className="flex justify-end space-x-4 mt-4">
                        <Button type="button" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button type="button" onClick={confirmDelete}>Delete</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CategoriesPage;
