"use client";
import React from 'react'
import { motion } from 'framer-motion';
import Link from "next/link";
const Posts = ({ blogPosts }) => {
    // sort the data by date from newest to oldest
    blogPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (<>
        {
            blogPosts.map((post) => (
                <Link href={`/blog/${post._id}`} key={post._id}>
                    <motion.div className="border-green-600 bg-gray-900 border-dotted border-4 p-4 shadow-md cursor-pointer hover:bg-green-900 transition duration-300">

                        <h2 className="text-2xl font-bold text-green-50">{post.title}</h2>
                        {/* author */}
                        <p className="text-green-200">Author: {post.author}</p>
                        {/* date */}
                        <p className="text-sm text-green-400">Wrote on:{new Date(post.createdAt).toLocaleDateString()}</p>
                        {/* <div className="text-green-200" dangerouslySetInnerHTML={{ __html: post.content }}></div> */}
                    </motion.div>
                </Link>
            ))
        }
    </>

    )
}

export default Posts