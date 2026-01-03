"use client";
import React from 'react';
import { FaGithub, FaLinkedin, FaMailBulk, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

const Footer = ({ data }) => {
    return (
        <div className="relative  text-white py-10">
            {/* Links Section */}
            <div className="flex justify-center space-x-4">
                <div className="relative group">
                    <Link
                        href={data.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border-2 hover:border-green-950 border-gray-400 flex items-center justify-center text-xl text-gray-400 hover:text-black hover:bg-green-500 transition"
                    >
                        <FaGithub />
                    </Link>
                </div>
                <div className="relative group">
                    <Link
                        href={data.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border-2 hover:border-green-950 border-gray-400 flex items-center justify-center text-xl text-gray-400 hover:text-black hover:bg-green-500 transition"
                    >
                        <FaLinkedin />
                        
                    </Link>
                </div>
                <div className="relative group">
                    <Link
                        href={data.twitterLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border-2 hover:border-green-950 border-gray-400 flex items-center justify-center text-xl text-gray-400 hover:text-black hover:bg-green-500 transition"
                    >
                        <FaTwitter />
                    </Link>
                </div>
                <div className="relative group">
                    <Link
                        href={`mailto:${data.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border-2 hover:border-green-950 border-gray-400 flex items-center justify-center text-xl text-gray-400 hover:text-black hover:bg-green-500 transition"
                    >
                        <FaMailBulk />
                    </Link>
                </div>
            </div>

            {/* Watermark Section */}
            <div className="text-center mt-10 text-xl opacity-50">
                <p>&copy; {new Date().getFullYear()} Mohamed Magdy</p>
            </div>
        </div>
    );
};

export default Footer;
