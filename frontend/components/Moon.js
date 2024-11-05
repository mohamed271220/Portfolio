"use client";
import React from 'react';
import Image from 'next/image';

const Moon = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="moon-container">
        <Image
          src="/moon.png" // Ensure you have a pixelated moon image at this path
          alt="Pixelated Moon"
          className="pixelated-moon"
          width={150} // Adjust width as needed
          height={150} // Adjust height as needed
        />
      </div>
    </div>
  );
};

export default Moon;
