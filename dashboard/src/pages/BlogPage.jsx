import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, queryClient } from '../api'; // Update with your API file path
import Button from '../components/Buttons/Button';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import the default styles

const BlogPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '', // Will be edited using ReactQuill
    author: '',
    tags: '' // Tags as a comma-separated string
  });

  // Fetch blog posts
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts,
    onError: () => toast.error("Failed to load blog posts.")
  });

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  // Mutations for add, update, and delete
  const addMutation = useMutation({
    mutationFn: addBlogPost,
    onSuccess: () => {
      toast.success("Blog post added successfully!");
      setPosts([...posts, newPost]);
      setNewPost({ title: '', content: '', author: '', tags: '' });
    },
    onError: () => toast.error("Failed to add blog post.")
  });

  const updateMutation = useMutation({
    mutationFn: updateBlogPost,
    onSuccess: () => {
      toast.success("Blog post updated successfully!");
      setPosts(posts.map(post => post._id === currentPost._id ? currentPost : post));
      setShowEditModal(false);
    },
    onError: () => toast.error("Failed to update blog post.")
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      toast.success("Blog post deleted successfully!");
      setPosts(posts.filter(post => post.id !== currentPost._id));
      setShowDeleteModal(false);
      queryClient.invalidateQueries('blogPosts');
    },
    onError: () => toast.error("Failed to delete blog post.")
  });

  const handleEdit = (post) => {
    setCurrentPost(post);
    setShowEditModal(true);
  };

  const handleDelete = (post) => {
    setCurrentPost(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (currentPost && currentPost._id) {
      deleteMutation.mutate(currentPost._id);
    } else {
      toast.error("Failed to delete post. Invalid post ID.");
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate({ ...newPost, tags: newPost.tags.split(',').map(tag => tag.trim()) }); // Convert tags to array
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ ...currentPost, tags: currentPost.tags.split(',').map(tag => tag.trim()) }); // Convert tags to array
  };

  if (isLoading) return <SkeletonLoader mode="comments" />;
  if (isError) return <p>Error loading blog posts.</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Blog Posts</h2>

      {/* Blog Posts Table */}
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden mx-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id}>
              <td className="border px-4 py-2">{post.title}</td>
              <td className="border px-4 py-2">{post.author || 'Unknown'}</td>
              <td className="border px-4 py-2">{new Date(post.createdAt).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(post)} className="text-blue-600 hover:underline">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(post)} className="text-red-600 hover:underline ml-2">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Blog Post Form */}
      <form onSubmit={handleAddSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={newPost.author}
            onChange={handleAddChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={newPost.tags}
            onChange={handleAddChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Content</label>
          <ReactQuill
            value={newPost.content}
            onChange={(content) => setNewPost({ ...newPost, content })}
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean'] // remove formatting button
              ]
            }}
            className="border border-gray-300 dark:border-gray-700 rounded-md"
          />
        </div>
        <Button type="submit">Add Blog Post</Button>
      </form>

      {/* Edit Blog Post Modal */}
      {showEditModal && (
        <Modal title="Edit Blog Post" onClose={() => setShowEditModal(false)}>
          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={currentPost.title}
                onChange={handleEditChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Author</label>
              <input
                type="text"
                name="author"
                value={currentPost.author}
                onChange={handleEditChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={currentPost.tags}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Content</label>
              <ReactQuill
                value={currentPost.content}
                onChange={(content) => setCurrentPost({ ...currentPost, content })}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean'] // remove formatting button
                  ]
                }}
                className="border border-gray-300 dark:border-gray-700 rounded-md"
              />
            </div>
            <Button type="submit">Update Blog Post</Button>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal title="Delete Blog Post" onClose={() => setShowDeleteModal(false)}>
          <p>Are you sure you want to delete this blog post?</p>
          <div className="flex justify-end">
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button onClick={confirmDelete} className="ml-2" type="button">Delete</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogPostPage;
