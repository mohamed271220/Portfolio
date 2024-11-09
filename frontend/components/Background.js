"use client";
import { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStars(); // Redraw stars after resizing
    };

    const createStars = (count) => {
      starsRef.current = [];
      for (let i = 0; i < count; i++) {
        const star = {
          x: Math.random() * canvas.width, // Fixed width
          y: Math.random() * canvas.height,  // Fixed height
          radius: 0.1,
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

    window.addEventListener('resize', resize);
    resize();
    createStars(50);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="stars" ref={canvasRef} className="absolute z-[-1] inset-0" />;
};

export default Background;
