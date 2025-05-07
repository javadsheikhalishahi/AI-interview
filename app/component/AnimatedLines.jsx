'use client';

import { useEffect, useRef } from 'react';

const AnimatedLines = () => {
  const svgRef = useRef(null);
  const numberOfLines = 20;
  const lineDataArr = useRef([]); 
  
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const randomRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const createPathString = () => {
    let completedPath = '';
    const ampl = 50;

    for (let i = 0; i < numberOfLines; i++) {
      const path = lineDataArr.current[i];
      const current = {
        x: ampl * Math.sin(path.counter / path.sin),
        y: ampl * Math.cos(path.counter / path.cos),
      };

      const newPathSection = `M${path.startX},${path.startY} Q${path.pointX},${(current.y * 1.5).toFixed(
        3
      )} ${(current.x / 10 + path.centerX).toFixed(3)},${(current.y / 5 + path.centerY).toFixed(
        3
      )} T${path.endX},${path.endY}`;

      path.counter++;
      completedPath += newPathSection;
    }

    return completedPath;
  };

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const newPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    newPathEl.setAttribute('fill', 'none');
    newPathEl.setAttribute('stroke', randomColor());
    newPathEl.setAttribute('stroke-width', '0.5');
    newPathEl.setAttribute('vector-effect', 'non-scaling-stroke');

    const minSpeed = 85;
    const maxSpeed = 150;

    for (let i = 0; i < numberOfLines; i++) {
      lineDataArr.current.push({
        counter: randomRange(1, 500),
        startX: randomRange(-5, -40),
        startY: randomRange(-5, -30),
        endX: randomRange(200, 220),
        endY: randomRange(120, 140),
        sin: randomRange(minSpeed, maxSpeed),
        cos: randomRange(minSpeed, maxSpeed),
        pointX: randomRange(30, 55),
        centerX: randomRange(90, 120),
        centerY: randomRange(60, 70),
      });
    }

    const animate = () => {
      newPathEl.setAttribute('d', createPathString());
      requestAnimationFrame(animate);
    };

    svgEl.appendChild(newPathEl);
    animate();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-[-1]">
      <svg
        ref={svgRef}
        className="w-screen h-screen"
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
};

export default AnimatedLines;
