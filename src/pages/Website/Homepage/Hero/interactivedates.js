import React, { useEffect, useState } from "react";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const getRandomItem = () => {
  const r = Math.random();
  if (r < 0.4) return Math.floor(Math.random() * 31) + 1;
  if (r < 0.7) return months[Math.floor(Math.random() * months.length)];
  return 2025 + Math.floor(Math.random() * 10);
};

const createParticles = (count = 35) =>
  Array.from({ length: count }).map(() => ({
    id: Math.random(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 12 + Math.random() * 24,
    speed: 0.3 + Math.random() * 0.6,
    value: getRandomItem(),
  }));

export default function InteractiveDates() {
  const [particles, setParticles] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setParticles(createParticles());
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    let frame;

    const update = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x;
          let newY = p.y + p.speed;

          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const repelRadius = 120;

          if (dist < repelRadius) {
            const force = (repelRadius - dist) / repelRadius;

            // push away from cursor
            newX += (dx / dist) * force * 8;
            newY += (dy / dist) * force * 8;
          }

          // reset when off screen
          if (newY > window.innerHeight + 50) {
            newY = -50;
            newX = Math.random() * window.innerWidth;
          }

          return { ...p, x: newX, y: newY };
        })
      );

      frame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(frame);
  }, [mouse]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            transform: `translate(${p.x}px, ${p.y}px)`,
            fontSize: p.size,
          }}
          className="absolute text-white blur-[0.5px] select-none pointer-events-none transition-transform duration-75"
        >
          {p.value}
        </div>
      ))}
    </div>
  );
}
