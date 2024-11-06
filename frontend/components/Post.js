"use client";
import { motion } from "framer-motion";

const Post = ({ post }) => {
    return (
        <motion.div
            className="post-content border-green-600 border-dotted border-4 p-6 shadow-lg   transition duration-300 bg-gray-800 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold text-green-50 mb-4">{post.title}</h2>
            <p className="text-sm text-green-300 mb-4">{new Date(post.createdAt).toLocaleDateString()}</p>
            {/* tags  */}
            <div className="flex flex-wrap mb-4">
                {post.tags.map((tag) => (
                    <span key={tag} className="bg-green-800 text-green-200 font-bold py-1 px-2 rounded-lg text-sm mr-2 mb-2">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="text-green-200" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </motion.div>
    );
};

export default Post;
