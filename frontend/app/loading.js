"use client";
import React from 'react';
import Image from 'next/image';
import { Pixelify_Sans } from 'next/font/google';
import Moon from '@/components/Moon';
import spaceman from "@/assets/spaceman.png"

const pixelify = Pixelify_Sans({ subsets: ['latin'] });


export default function LoadingScreen() {
    return (
        <div className="relative w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center  rounded-md p-4">
                <div className=" w-[40vh] h-[50vh] relative">
                    <Moon />
                </div>
                <div className="flex items-center mt-1">
                    <p className={` ${pixelify.className} text-white text-2xl md:text-3xl  mr-2`} >Loading</p>
                    <Image
                        src={spaceman.src}
                        alt="Spaceman"
                        width={50}
                        height={50}
                        className="w-32 h-32"
                    />
                </div>
            </div>
        </div>
    );
};
