"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const RotatingMoon = () => {
  const moonRef = useRef();
  const texture = useLoader(TextureLoader, '/moon_texture.jpg'); // Ensure you have a moon texture image at this path

  useFrame(({ clock }) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = clock.getElapsedTime() / 1;
    }
  });

  return (
    <Sphere ref={moonRef} args={[1, 32, 32]}>
      <meshStandardMaterial attach="material" map={texture} />
    </Sphere>
  );
};

const Moon = () => {
  return (
    <Canvas className="absolute  inset-0">
      <ambientLight intensity={4} />
      <directionalLight position={[10, 10, 5]} intensity={4} />
      <RotatingMoon />
    </Canvas>
  );
};

export default Moon;