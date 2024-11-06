"use client";
import { useEffect, useRef } from 'react';

const Background = () => {
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = document.getElementById('stars');
    const context = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 1800;
      drawStars(); // Redraw stars after resizing
    };

    const createStars = (count) => {
      starsRef.current = [];
      for (let i = 0; i < count; i++) {
        const star = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0.3
        };
        starsRef.current.push(star);
      }
      drawStars();
    };

    const drawStars = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      starsRef.current.forEach(star => {
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        context.fill();
      });
    };

    resize();
    createStars(100); // Number of stars

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas id="stars" className="absolute z-[-1] top-0 left-0 w-full h-full"></canvas>;
};

export default Background;
