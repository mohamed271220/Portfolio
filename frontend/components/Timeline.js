"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdVideogameAsset } from "react-icons/md";
import Image from 'next/image';

const Timeline = ({ data, mode }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto p-4">
            <div className={`relative ${mode === 'experiences' ? 'border-l-4' : ''} border-green-600 bg-black bg-opacity-70`}>
                {data.map((item, index) => (
                    <div key={item._id} className={`mb-10 ${mode === 'experiences' ? 'ml-6' : ''}`}>
                        {mode === 'experiences' && (
                            <div className="absolute -left-4 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                <MdVideogameAsset />
                            </div>
                        )}
                        <div className="border-green-600 border-dotted border-4 p-4 shadow-md cursor-pointer hover:bg-green-900 transition duration-300" onClick={() => handleToggle(index)}>
                            <div className="flex items-center mb-2">
                                {/* Logo image */}
                                {item.logo && (
                                    <Image
                                        width={800}
                                        height={600}
                                        src={item.logo}
                                        alt={`${mode === 'experiences' ? item.companyName : item.institutionName} logo`}
                                        className="w-10 h-10 rounded-full mr-2"
                                    />
                                )}
                                <div>
                                    <span className="text-sm text-green-300">
                                        {new Date(item.from).toLocaleDateString()} - {item.current ? "Present" : new Date(item.to).toLocaleDateString()}
                                    </span>
                                    <h2 className="text-2xl font-bold text-green-50">{mode === 'experiences' ? item.companyName : item.institutionName}</h2>
                                </div>
                            </div>
                            <motion.div
                                initial={false}
                                animate={{ height: expandedIndex === index ? "auto" : 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden bg-gray-900"
                            >
                                <p className="text-green-200 p-4">{item.description}</p>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
