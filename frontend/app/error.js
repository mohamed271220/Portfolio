"use client";
import Link from 'next/link';
import React from 'react';
import { FaHome } from 'react-icons/fa';

const RetroErrorPage = ({error}) => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-300 retro-text">
            <h1 className="text-6xl font-bold mb-4">500</h1>
            <h2 className="text-3xl font-bold mb-2">Something went wrong</h2>
            <p className="mb-6">{error.message}</p>
            <Link
                href={'/'}
                className="bg-green-600 text-black font-bold py-2 px-4 rounded-lg flex items-center retro-button"
            >
                <FaHome className="mr-2" /> Go Home
            </Link>
        </div>
    );
};

export default RetroErrorPage;
