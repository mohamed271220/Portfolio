"use client";
import { useEffect, useRef } from 'react';

const ShootingStars = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStars();
    };

    const createStar = () => {
      const star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1,
        speed: Math.random() * 0.5 + 0.2,
      };
      starsRef.current.push(star);
    };

    const animateStars = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((star, index) => {
        star.x -= star.speed;
        star.y += star.speed;
        if (star.x < 0 || star.y > canvas.height) {
          starsRef.current.splice(index, 1);
          createStar();
        }
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        context.fill();
      });
    };

    const animate = () => {
      animateStars();
      requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 30; i++) {
      createStar();
    }
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  const drawStars = () => {
    const context = canvasRef.current.getContext('2d');
    starsRef.current.forEach(star => {
      context.fillStyle = 'white';
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
      context.fill();
    });
  };

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>;
};

export default ShootingStars;
