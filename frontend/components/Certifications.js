"use client";
import React from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

const Certification = ({ certification }) => {
    return (
        <div className="relative border-2 border-dotted border-green-600 bg-black p-4 rounded-lg shadow-md transition duration-300 retro-card col-span-1">
            <div className="flex cursor-pointer items-center mb-2">
                <h3 className="text-2xl font-bold text-green-50 retro-text">
                    {certification.title}
                </h3>
            </div>

            <div>
                <Image
                    src={certification.photo}
                    alt={certification.title}
                    className="w-full h-auto cursor-pointer"
                    width={800}
                    height={600}
                />
                <p className="text-green-300 mb-2 retro-text">
                    Issued by: {certification.issuedBy}
                </p>
                <p className="text-green-300 mb-2 retro-text">
                    Date Issued: {new Date(certification.dateIssued).toLocaleDateString()}
                </p>
                <a
                    href={certification.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 underline retro-link flex items-center"
                >
                    View Certificate <FaExternalLinkAlt className="ml-2" />
                </a>
            </div>
        </div>
    );
};

const Certifications = ({ certifications }) => {
    return (
        <section id="certifications" className="py-10 bg-black">
            <h2 className="text-3xl font-bold text-center bg-green-600 mb-6 retro-text">
                Certifications
            </h2>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications && certifications.length > 0 ? (
                        certifications.map((cert) => (
                            <Certification key={cert._id} certification={cert} />
                        ))
                    ) : (
                        <div className="text-center text-green-300">No certifications found</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
