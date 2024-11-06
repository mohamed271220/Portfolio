"use client";
import React from 'react';
import Image from 'next/image';
import moon from '@/assets/moon.png'

const Moon = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="moon-container">
        <Image
          src={moon.src}
          alt="Pixelated Moon"
          className="pixelated-moon"
          width={250}
          height={250}
        />
      </div>
    </div>
  );
};

export default Moon;
