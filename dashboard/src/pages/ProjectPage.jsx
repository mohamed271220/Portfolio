import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProjects, addProject, updateProject, deleteProject, getCategories } from '../api';
import MediaUpload from '../components/Form/MediaUpload';
import Button from '../components/Buttons/Button';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import { FaEye, FaEdit, FaTrash, FaGithub } from 'react-icons/fa';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    link: '',
    github: '',
    images: [],
    category: ''
  });
  const [newProjectImages, setNewProjectImages] = useState(''); // Separate state for newProject images
  const [currentProjectImages, setCurrentProjectImages] = useState(''); // Separate state for currentProject images

  // Fetch projects
  const { data: projectsData, isLoading: loadingProjects, isError: errorLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    onError: () => toast.error("Failed to load projects data.")
  });

  // Fetch categories
  const { data: categoriesData, isLoading: loadingCategories, isError: errorLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    onError: () => toast.error("Failed to load categories data.")
  });

  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData.map(project => ({ ...project, images: project.images || [] })));
    }
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [projectsData, categoriesData]);

  // Mutations for add, update, and delete
  const addMutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      toast.success("Project added successfully!");
      setProjects([...projects, { ...newProject, images: newProjectImages }]);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        link: '',
        github: '',
        images: [],
        category: ''
      });
      setNewProjectImages(''); // Reset the images state
    },
    onError: () => toast.error("Failed to add project.")
  });

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success("Project updated successfully!");
      setProjects(projects.map(proj =>
        proj._id === currentProject._id ? { ...currentProject, images: currentProjectImages } : proj
      ));
      setShowEditModal(false);
    },
    onError: () => toast.error("Failed to update project.")
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("Project deleted successfully!");
      setProjects(projects.filter(proj => proj._id !== currentProject._id));
      setShowDeleteModal(false);
    },
    onError: () => toast.error("Failed to delete project.")
  });

  const handleEdit = (project) => {
    setCurrentProject({
      ...project,
      category: project.category._id // Assuming category is an object with an _id
    });
    setCurrentProjectImages(project.images); // Set images state for the current project
    setShowEditModal(true);
  };

  const handleDelete = (project) => {
    setCurrentProject(project);
    setShowDeleteModal(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate({ ...newProject, images: newProjectImages });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ ...currentProject, images: currentProjectImages });
  };

  const confirmDelete = () => {
    if (currentProject && currentProject._id) {
      deleteMutation.mutate(currentProject._id);
    } else {
      toast.error("Failed to delete project. Invalid project ID.");
    }
  };

  if (loadingProjects || loadingCategories) return <SkeletonLoader mode="comments" />;
  if (errorLoadingProjects || errorLoadingCategories) return <p>Error loading data.</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Projects</h2>

      {/* Projects Table */}
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden mx-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Images</th>
            <th className="px-4 py-2">Technologies</th>
            <th className="px-4 py-2">Link</th>
            <th className="px-4 py-2">github</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr key={proj._id}>
              <td className="border px-4 py-2 whitespace-normal">{proj.title}</td>
              <td className="border px-4 py-2">
                {proj.images.map((img, index) => (
                  <img key={index} src={img} alt="Project" className="w-10 h-10 mr-2" />
                ))}
              </td>
              <td className="border px-4 py-2">{proj.technologies.join(', ')}</td>
              <td className="border px-4 py-2">
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  <FaGithub />
                </a>
              </td>
              <td className="border px-4 py-2">
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  <FaEye />
                </a>
              </td>
              <td className="border px-4 py-2 whitespace-normal">{proj.description}</td>
              <td className="border px-4 py-2">{proj.category.name}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(proj)} className="text-blue-600 hover:underline">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(proj)} className="text-red-600 hover:underline ml-2">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Project Form */}
      <form onSubmit={handleAddSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Images</label>
          <MediaUpload mediaLinks={newProjectImages} setMediaLinks={setNewProjectImages} uploadMode="multiple" />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Technologies (comma separated)</label>
          <input
            type="text"
            name="technologies"
            value={newProject.technologies.join(', ')}
            onChange={(e) => setNewProject(prev => ({ ...prev, technologies: e.target.value.split(',').map(item => item.trim()) }))}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Link</label>
          <input
            type="url"
            name="link"
            value={newProject.link}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Github</label>
          <input
            type="url"
            name="github"
            value={newProject.github}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select
            name="category"
            value={newProject.category}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <Button type="submit" className="w-full">Add Project</Button>
      </form>

      {/* Edit Project Modal */}
      {showEditModal && <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <h2 className="text-xl mb-4">Edit Project</h2>
        <form onSubmit={handleEditSubmit}>
          {/* Similar form fields as in Add Project Form, using currentProject state */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={currentProject?.title || ''}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Images</label>
            <MediaUpload mediaLinks={currentProjectImages} setMediaLinks={setCurrentProjectImages} uploadMode="multiple" />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Technologies (comma separated)</label>
            <input
              type="text"
              name="technologies"
              value={currentProject?.technologies.join(', ') || ''}
              onChange={(e) => setCurrentProject(prev => ({ ...prev, technologies: e.target.value.split(',').map(item => item.trim()) }))}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Link</label>
            <input
              type="url"
              name="link"
              value={currentProject?.link || ''}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Github</label>
            <input
              type="url"
              name="github"
              value={currentProject?.github || ''}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={currentProject?.description || ''}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              name="category"
              value={currentProject?.category || ''}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full">Update Project</Button>
        </form>
      </Modal>
      }

      {/* Delete Project Confirmation */}
      {showDeleteModal && <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2 className="text-xl mb-4">Delete Project</h2>
        <p>Are you sure you want to delete the project &apos;{currentProject?.title}&apos;?</p>
        <Button onClick={confirmDelete} className="mt-4">Yes, Delete</Button>
        <Button onClick={() => setShowDeleteModal(false)} className="mt-4">Cancel</Button>
      </Modal>}
    </div>
  );
};

export default ProjectsPage;
