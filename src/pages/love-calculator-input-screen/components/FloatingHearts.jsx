import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  // Generate floating hearts
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 8; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 10,
          size: Math.random() * 8 + 12,
          opacity: Math.random() * 0.3 + 0.1,
          duration: Math.random() * 10 + 15
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.animationDelay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity
          }}
        >
          <Icon 
            name="Heart" 
            size={heart.size} 
            className="text-primary"
          />
        </div>
      ))}

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/4 right-0 w-40 h-40 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}

export default FloatingHearts;