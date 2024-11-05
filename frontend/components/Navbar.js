"use client";
import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 text-white  relative">
            <div className="text-2xl font-bold text-green-600">SPECTER</div>
            <div className="hidden md:flex space-x-4">
                <a href="#projects" className="hover:underline hover:text-green-500">Projects</a>
                <a href="#skills" className="hover:underline hover:text-green-500">Skills</a>
                <a href="#educations" className="hover:underline hover:text-green-500">Educations</a>
                <a href="#experiences" className="hover:underline hover:text-green-500">Experiences</a>
                <a href="#certifications" className="hover:underline hover:text-green-500">Certifications</a>
                <a href="#testimonials" className="hover:underline hover:text-green-500">Testimonials</a>
                <a href="#blog" className="hover:underline hover:text-green-500">Blog</a>
            </div>
            <div className="md:hidden">
                <button onClick={toggleDropdown} className="focus:outline-none">
                    {/* Hamburger icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 bg-opacity-50 text-white rounded-md shadow-lg z-20">
                        <a href="#projects" className="block px-4 py-2 hover:underline hover:text-green-500">Projects</a>
                        <a href="#skills" className="block px-4 py-2 hover:underline hover:text-green-500">Skills</a>
                        <a href="#educations" className="block px-4 py-2 hover:underline hover:text-green-500">Educations</a>
                        <a href="#experiences" className="block px-4 py-2 hover:underline hover:text-green-500">Experiences</a>
                        <a href="#certifications" className="block px-4 py-2 hover:underline hover:text-green-500">Certifications</a>
                        <a href="#testimonials" className="block px-4 py-2 hover:underline hover:text-green-500">Testimonials</a>
                        <a href="#blog" className="block px-4 py-2 hover:underline hover:text-green-500">Blog</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
