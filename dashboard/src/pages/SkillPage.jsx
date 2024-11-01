import  { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../api';
import MediaUpload from '../components/Form/MediaUpload';
import Button from '../components/Buttons/Button';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const navigate = useNavigate()
  const [newSkill, setNewSkill] = useState({
    name: '',
    link: '',
    bgColor: '#000000',
    level: 'Beginner',
    category: ''
  });
  const [newSkillLogo, setNewSkillLogo] = useState(''); // Separate state for newSkill logo
  const [currentSkillLogo, setCurrentSkillLogo] = useState(''); // Separate state for currentSkill logo

  // Fetch skills
  const { data, isLoading, isError } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
    onError: () => toast.error("Failed to load skills data.")
  });

  useEffect(() => {
    if (data) {
      setSkills(
        data.map(skill => ({ ...skill, logo: skill.logo || 'https://via.placeholder.com/150' }))
      );
    }
  }, [data]);

  // Mutations for add, update, and delete
  const addMutation = useMutation({
    mutationFn: addSkill,
    onSuccess: () => {
      toast.success("Skill added successfully!");
      setSkills([...skills, { ...newSkill, logo: newSkillLogo }]);
      setNewSkill({
        name: '',
        link: '',
        bgColor: '#000000',
        level: 'Beginner',
        category: ''
      });
      setNewSkillLogo(''); // Reset the logo state
    },
    onError: () => toast.error("Failed to add skill.")
  });

  const updateMutation = useMutation({
    mutationFn: updateSkill,
    onSuccess: () => {
      toast.success("Skill updated successfully!");
      setSkills(skills.map(skill =>
        skill.id === currentSkill._id ? { ...currentSkill, logo: currentSkillLogo } : skill
      ));
      setShowEditModal(false);
      navigate('')
    },
    onError: () => toast.error("Failed to update skill.")
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      toast.success("Skill deleted successfully!");
      setSkills(skills.filter(skill => skill.id !== currentSkill.id));
      setShowDeleteModal(false);
    },
    onError: () => toast.error("Failed to delete skill.")
  });

  const handleEdit = (skill) => {
    setCurrentSkill(skill);
    setCurrentSkillLogo([skill.logo]);
    setShowEditModal(true);
  };

  const handleDelete = (skill) => {
    setCurrentSkill(skill);
    setShowDeleteModal(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewSkill(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkill(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate({ ...newSkill, logo: newSkillLogo });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ ...currentSkill, logo: currentSkillLogo });
  };

  const confirmDelete = () => {
    if (currentSkill && currentSkill._id) {
      deleteMutation.mutate(currentSkill._id);
    } else {
      toast.error("Failed to delete skill. Invalid skill ID.");
    }
  };

  if (isLoading) return <SkeletonLoader mode="comments" />;
  if (isError) return <p>Error loading skills data.</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Skills</h2>

      {/* Skills Table */}
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden mx-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Logo</th>
            <th className="px-4 py-2">Link</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
              <td className="border px-4 py-2 whitespace-normal">{skill.name}</td>
              <td className="border px-4 py-2">
                <img src={skill.logo} alt="Logo" className="w-10 h-10" />
              </td>
              <td className="border px-4 py-2">
                <a href={skill.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  <FaEye />
                </a>
              </td>
              <td className="border px-4 py-2">{skill.level}</td>
              <td className="border px-4 py-2">{skill.category}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(skill)} className="text-blue-600 hover:underline">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(skill)} className="text-red-600 hover:underline ml-2">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Skill Form */}
      <form onSubmit={handleAddSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={newSkill.name}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Logo</label>
          <MediaUpload mediaLinks={newSkillLogo} setMediaLinks={setNewSkillLogo} uploadMode="single" />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Link</label>
          <input
            type="url"
            name="link"
            value={newSkill.link}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Background Color</label>
          <input
            type="text"
            name="bgColor"
            value={newSkill.bgColor}
            onChange={handleAddChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Level</label>
          <select
            name="level"
            value={newSkill.level}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={newSkill.category}
            onChange={handleAddChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <Button type="submit" className="w-full">Add Skill</Button>
      </form>

      {/* Edit Skill Modal */}
      {showEditModal && (
        <Modal title="Edit Skill" onClose={() => setShowEditModal(false)}>
          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={currentSkill.name}
                onChange={handleEditChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Logo</label>
              <MediaUpload mediaLinks={currentSkillLogo} setMediaLinks={setCurrentSkillLogo} uploadMode="single" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Link</label>
              <input
                type="url"
                name="link"
                value={currentSkill.link}
                onChange={handleEditChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Background Color</label>
              <input
                type="text"
                name="bgColor"
                value={currentSkill.bgColor}

                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Level</label>
              <select
                name="level"
                value={currentSkill.level}
                onChange={handleEditChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={currentSkill.category}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <Button type="submit" className="w-full">Update Skill</Button>
          </form>
        </Modal>
      )}

      {/* Delete Skill Confirmation Modal */}
      {showDeleteModal && (
        <Modal title="Delete Skill" onClose={() => setShowDeleteModal(false)}>
          <p>Are you sure you want to delete this skill?</p>
          <div className="flex justify-end mt-4 space-x-4">
            <Button onClick={confirmDelete} className="bg-red-600 text-white">Delete</Button>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SkillsPage;
