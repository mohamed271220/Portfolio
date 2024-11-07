"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Skills = ({ skills }) => {
    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section id="skills" className="py-10 bg-opacity-10 bg-black">
            <h2 className="text-3xl font-bold text-center bg-green-600 mb-6 retro-text">Skills</h2>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map(skill => (
                        <motion.div
                            key={skill._id}
                            className="relative border-2 border-dotted border-green-600 bg-black p-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 retro-card"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={variants}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center mb-2">
                                <Image src={skill.logo} alt={`${skill.name} logo`} className="w-12 h-12 mr-4 bg-green-200 rounded-full p-1 retro-img" width={800} height={800} />
                                <h3 className="text-2xl font-bold text-green-50 retro-text">{skill.name}</h3>
                            </div>
                            <p className="text-green-300 mb-2 retro-text">Level: {skill.level}</p>
                            <Link
                                href={skill.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 underline retro-link"
                            >
                                Learn more
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
