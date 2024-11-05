"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Project = ({ project, isSelected, onClick }) => {
    return (
        <div
            className={`relative border-2 border-dotted border-green-600 bg-black p-4 rounded-lg shadow-md transition duration-300 retro-card ${isSelected ? 'w-full col-span-3' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-center mb-2">
                <h3 className="text-2xl font-bold text-green-50 retro-text">{project.title}</h3>
            </div>
            {isSelected ? (
                <div onClick={
                    (e) => {
                        e.stopPropagation();
                    }
                }>
                    <Carousel>
                        {project.images.map((img, index) => (
                            <div key={index}>
                                <Image src={img} alt={project.title} className="w-full h-auto" width={1280} height={720} />
                            </div>
                        ))}
                    </Carousel>
                    <p className="text-green-300 mb-2 retro-text">{project.description}</p>
                    <p className="text-green-300 mb-2 retro-text">Technologies: {project.technologies.join(', ')}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-green-400 underline retro-link flex items-center">
                        Live Site <FaExternalLinkAlt className="ml-2" />
                    </a>
                    <br />
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-green-400 underline retro-link flex items-center">
                        GitHub <FaGithub className="ml-2" />
                    </a>
                </div>
            ) : (
                <Image src={project.images[0]} alt={project.title} className="w-full h-auto" width={800} height={600} />
            )}
        </div>
    );
};

const Projects = ({ projects, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(project => project.category.name === selectedCategory);

    return (
        <section id="projects" className="py-10 bg-opacity-10 z-50 bg-black">
            <h2 className="text-3xl font-bold text-center bg-green-600 mb-6 retro-text">Projects</h2>
            <div className="container mx-auto p-4">
                <div className="flex justify-center mb-6 z-50 relative">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-black text-green-300 border-2 border-dotted border-green-600 p-2 rounded-lg retro-select"
                    >
                        <option value="All">All</option>
                        {categories.map(category => (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects ? filteredProjects.map(project => (
                        <Project
                            key={project._id}
                            project={project}
                            isSelected={selectedProject === project._id}
                            onClick={() => setSelectedProject(selectedProject === project._id ? null : project._id)}
                        />
                    )) : (
                        <div className="text-center text-green-300">No projects found</div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Projects;
