"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from next

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle dropdown menu on mobile
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex items-center z-999 justify-between p-4 bg-gray-800 bg-opacity-50 text-white relative">
            <Link href={'/'} className="text-2xl font-bold text-green-600">SPECTER</Link>
            <div className="hidden md:flex space-x-4">
                <Link href="/#experiences">
                    <p className='hover:text-green-500 hover:underline'
                    >Experiences</p>
                </Link>
                <Link href="/#projects">
                    <p className='hover:text-green-500 hover:underline'
                    >Projects</p>
                </Link>
                <Link href="/#skills">
                    <p className='hover:text-green-500 hover:underline' >Skills</p>
                </Link>
                <Link href="/#education">
                    <p className='hover:text-green-500 hover:underline' >Education</p>
                </Link>
                <Link href="/#certifications">
                    <p className='hover:text-green-500 hover:underline' >Certifications</p>
                </Link>
                {/* <Link  href="/#testimonials">
                    <p  className='hover:text-green-500 >Testimonials</p>
                </Link> */}
                <Link href="/blog">
                    <p className='hover:text-green-500 hover:underline'>Blog</p>
                </Link>
            </div>
            <div className="md:hidden">
                <button onClick={toggleDropdown} className="focus:outline-none">
                    {/* Hamburger icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 bg-opacity-100 text-white rounded-md shadow-lg z-20">
                        <Link href="/#projects">
                            <p className="block px-4 py-2 hover:underline hover:text-green-500">Projects</p>
                        </Link>
                        <Link href="/#skills">
                            <p className="block px-4 py-2 hover:underline hover:text-green-500">Skills</p>
                        </Link>
                        <Link href="/#educations">
                            <p className="block px-4 py-2 hover:underline hover:text-green-500">Educations</p>
                        </Link>
                        <Link href="/#experiences">
                            <p className="block px-4 py-2 hover:underline hover:text-green-500">Experiences</p>
                        </Link>
                        <Link href="/#certifications">
                            <p className="block px-4 py-2 hover:underline hover:text-green-500">Certifications</p>
                        </Link>
                        {/* <Link href="/#testimonials">
                            <p className="block px-4 py-2 hover:underline hover:text-green-500">Testimonials</p>
                        </Link> */}
                        <Link href="/blog">
                            <p className="block px-4 py-2 hover:underline hover:text-green-500">Blog</p>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
