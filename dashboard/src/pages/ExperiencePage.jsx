import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '../api';
import MediaUpload from '../components/Form/MediaUpload';
import Button from '../components/Buttons/Button';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [newExperience, setNewExperience] = useState({
    companyName: '',
    from: '',
    to: '',
    link: '',
    description: '',
  });
  const [newExperienceLogo, setNewExperienceLogo] = useState('');
  const [currentExperienceLogo, setCurrentExperienceLogo] = useState('');

  // Fetch experiences
  const { data: experienceData, isLoading: isExperienceLoading, isError: isExperienceError } = useQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
    onError: () => toast.error("Failed to load experience data.")
  });


  useEffect(() => {
    if (experienceData) {
      setExperiences(
        experienceData.map(exp => ({ ...exp, logo: exp.logo || 'https://via.placeholder.com/150' }))
      );
    }
  }, [experienceData]);



  // Mutations for add, update, and delete
  const addMutation = useMutation({
    mutationFn: addExperience,
    onSuccess: () => {
      toast.success("Experience added successfully!");
      setExperiences([...experiences, { ...newExperience, logo: newExperienceLogo }]);
      setNewExperience({
        companyName: '',
        from: '',
        to: '',
        link: '',
        description: '',
      });
      setNewExperienceLogo('');
    },
    onError: () => toast.error("Failed to add experience.")
  });

  const updateMutation = useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      toast.success("Experience updated successfully!");
      setExperiences(experiences.map(exp =>
        exp.id === currentExperience._id ? { ...currentExperience, logo: currentExperienceLogo } : exp
      ));
      setShowEditModal(false);
    },
    onError: () => toast.error("Failed to update experience.")
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      toast.success("Experience deleted successfully!");
      setExperiences(experiences.filter(exp => exp.id !== currentExperience.id));
      setShowDeleteModal(false);
    },
    onError: () => toast.error("Failed to delete experience.")
  });

  const handleEdit = (experience) => {
    setCurrentExperience({
      ...experience,
      from: experience.from.split('T')[0],
      to: experience.to.split('T')[0],
    });
    setCurrentExperienceLogo([experience.logo]);
    setShowEditModal(true);
  };

  const handleDelete = (experience) => {
    setCurrentExperience(experience);
    setShowDeleteModal(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate({ ...newExperience, logo: newExperienceLogo });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ ...currentExperience, logo: currentExperienceLogo });
  };

  const confirmDelete = () => {
    if (currentExperience && currentExperience._id) {
      deleteMutation.mutate(currentExperience._id);
    } else {
      toast.error("Failed to delete experience. Invalid experience ID.");
    }
  };

  console.log(currentExperienceLogo);
  if (isExperienceLoading) return <SkeletonLoader mode="comments" />;
  if (isExperienceError) return <p>Error loading education data.</p>;


  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Experiences</h2>

      {/* Experience Table */}
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden mx-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Logo</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Link</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.id}>
              <td className="border px-4 py-2 whitespace-normal">{exp.companyName}</td>
              <td className="border px-4 py-2">
                <img src={exp.logo} alt="Logo" className="w-10 h-10" />
              </td>
              <td className="border px-4 py-2">{exp.from}</td>
              <td className="border px-4 py-2">{exp.to}</td>
              <td className="border px-4 py-2">
                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  <FaEye />
                </a>
              </td>
              <td className="border px-4 py-2 whitespace-normal">{exp.description}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:underline">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(exp)} className="text-red-600 hover:underline ml-2">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Experience Form */}
      <form onSubmit={handleAddSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={newExperience.companyName}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">From</label>
          <input
            type="date"
            name="from"
            value={newExperience.from}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">To</label>
          <input
            type="date"
            name="to"
            value={newExperience.to}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Link</label>
          <input
            type="text"
            name="link"
            value={newExperience.link}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={newExperience.description}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Logo</label>
          <MediaUpload mediaLinks={newExperienceLogo} setMediaLinks={setNewExperienceLogo} uploadMode={"single"} />
        </div>
        <Button type="submit">Add Experience</Button>
      </form>

      {/* Edit Experience Modal */}
      {showEditModal && <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={currentExperience.companyName}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">From</label>
            <input
              type="date"
              name="from"
              value={currentExperience.from}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">To</label>
            <input
              type="date"
              name="to"
              value={currentExperience.to}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Link</label>
            <input
              type="text"
              name="link"
              value={currentExperience.link}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={currentExperience.description}
              onChange={handleEditChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Logo</label>
            <MediaUpload mediaLinks={currentExperienceLogo} setMediaLinks={setCurrentExperienceLogo} uploadMode="single" />
          </div>
          <Button type="submit">Update Experience</Button>
        </form>
      </Modal>}

      {/* Delete Experience Modal */}
      {showDeleteModal && <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">Are you sure you want to delete this experience?</p>
          <div className="flex justify-end">
            <Button onClick={confirmDelete} className="mr-2">Yes</Button>
            <Button onClick={() => setShowDeleteModal(false)}>No</Button>
          </div>
        </div>
      </Modal>}
    </div>
  );
};

export default ExperiencePage;
