import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

function HeartBurstAnimation() {
  const [hearts, setHearts] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const createHeart = () => {
      const id = Math.random();
      const newHeart = {
        id,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        size: 16 + Math.random() * 24,
        color: ['text-primary', 'text-accent', 'text-secondary'][Math.floor(Math.random() * 3)],
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 0.5
      };

      setHearts(prev => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== id));
      }, (newHeart.duration + newHeart.delay) * 1000);
    };

    // Create initial burst
    for (let i = 0; i < 15; i++) {
      setTimeout(createHeart, i * 100);
    }

    // Stop after 3 seconds
    const stopTimer = setTimeout(() => {
      setIsActive(false);
    }, 3000);

    return () => clearTimeout(stopTimer);
  }, [isActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${heart.color} opacity-80`}
          style={{
            left: heart.x,
            bottom: -50,
            animation: `heartFloat ${heart.duration}s ease-out ${heart.delay}s forwards`
          }}
        >
          <Icon name="Heart" size={heart.size} />
        </div>
      ))}
      
      <style jsx>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default HeartBurstAnimation;