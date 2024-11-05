"use client";
import Link from 'next/link';
import React from 'react';
import { FaHome } from 'react-icons/fa';


const RetroErrorPage = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black z-50 text-green-300">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
            <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link
                href={'/'}
                className="bg-green-600 text-black font-bold py-2 px-4 rounded-lg flex items-center"
            >
                <FaHome className="mr-2" /> Go Home
            </Link>
        </div>
    );
};

export default RetroErrorPage;
