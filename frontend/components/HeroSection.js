"use client";
import React, { useEffect, useState } from 'react';
import spaceman from "@/assets/spaceman.png"
import Image from 'next/image';

export const HeroSection = ({ name, currentPosition, profilePicture, resume, bio = "" }) => {

    const [index, setIndex] = useState(1);
    // Animation
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(300 - Math.random() * 100);

    const toRotate = [currentPosition, "MERN Developer", "Backend Developer"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker);
        };
    }, [text]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta((prevDelta) => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex((prevIndex) => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-[90vh] text-center  text-white space-x-4">
            <Image src={spaceman.src} alt={`${name}'s Profile`} className=" w-32 h-32" width={800} height={800} priority={true} />
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mt-4">{`Hello, I'm ${name}`}</h1>
                <p className="text-lg text-green-600">{text}</p>
                <a href={resume} target="_blank" rel="noopener noreferrer" className="mt-6 px-4 py-2 transition duration-200 bg-transparent rounded-full hover:bg-green-500 hover:text-gray-900 text-gray-500 border border-gray-500  z-50">
                    View Resume
                </a>
                <p>
                    {bio}
                </p>
            </div>
        </div>
    );
};
