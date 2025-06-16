// src/pages/calculation-loading-screen/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import AppHeader from 'components/ui/AppHeader';

function CalculationLoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [heartBeat, setHeartBeat] = useState(false);
  const [lovePercentage, setLovePercentage] = useState(0);
  const [calculationComplete, setCalculationComplete] = useState(false);

  // Get data from session storage or navigation state
  const storedData = JSON.parse(sessionStorage.getItem('loveCalculatorData')) || {};
  const { name1 = storedData.yourName || "Your Name", name2 = storedData.partnerName || "Their Name" } = location.state || {};

  // Enhanced love calculation algorithm based on specific requirements
  useEffect(() => {
    const calculateLovePercentage = (firstName, secondName) => {
      // Normalize names to lowercase for comparison
      const name1Lower = firstName.toLowerCase().trim();
      const name2Lower = secondName.toLowerCase().trim();
      
      // Special names for Bushra (including variations)
      const bushraNames = ['bushra', 'pangkti'];
      
      // Names that should get lower percentages with Shakhawat
      const lowerCompatibilityNames = ['alice', 'sophia'];
      
      // Check for 100% matches
      if (name1Lower === 'shakhawat' && bushraNames.includes(name2Lower)) {
        return 100;
      }
      if (name2Lower === 'shakhawat' && bushraNames.includes(name1Lower)) {
        return 100;
      }
      
      // Check for ≤50% matches (Shakhawat with specific girl names)
      if (name1Lower === 'shakhawat' && lowerCompatibilityNames.includes(name2Lower)) {
        return Math.floor(Math.random() * 21) + 30; // 30-50%
      }
      if (name2Lower === 'shakhawat' && lowerCompatibilityNames.includes(name1Lower)) {
        return Math.floor(Math.random() * 21) + 30; // 30-50%
      }
      
      // For all other combinations, return 65-97%
      // Use a combination of name-based seed and randomization for consistency
      const combinedNames = name1Lower + name2Lower;
      let nameSum = 0;
      for (let i = 0; i < combinedNames.length; i++) {
        nameSum += combinedNames.charCodeAt(i);
      }
      
      // Use name sum as seed for consistent results
      const seed = nameSum % 1000;
      const basePercentage = 65;
      const range = 32; // 97 - 65 = 32
      const percentage = basePercentage + (seed % range) + Math.floor(Math.random() * 5);
      
      return Math.min(97, Math.max(65, percentage));
    };
    
    const percentage = calculateLovePercentage(name1, name2);
    setLovePercentage(percentage);
  }, [name1, name2]);

  const getMotivationalMessages = (percentage) => {
    if (percentage === 100) {
      return [
        "Discovering a perfect cosmic connection...",
        "Analyzing your destined bond...",
        "Calculating your soul mate compatibility...",
        "Measuring your eternal love...",
        "Computing your perfect match percentage..."
      ];
    } else if (percentage <= 50) {
      return [
        "Exploring your unique connection...",
        "Analyzing your special bond...",
        "Discovering your potential together...",
        "Measuring your friendship chemistry...",
        "Computing your compatibility..."
      ];
    } else {
      return [
        "Calculating your love compatibility...",
        "Analyzing your romantic connection...",
        "Discovering your chemistry together...",
        "Measuring your heart's alignment...",
        "Computing your love percentage..."
      ];
    }
  };

  const motivationalMessages = getMotivationalMessages(lovePercentage);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= lovePercentage) {
          clearInterval(progressInterval);
          setCalculationComplete(true);
          return lovePercentage;
        }
        return prev + 2;
      });
    }, 60);

    // Message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % motivationalMessages.length);
    }, 1500);

    // Heart beat animation
    const heartInterval = setInterval(() => {
      setHeartBeat(prev => !prev);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(heartInterval);
    };
  }, [navigate, name1, name2, lovePercentage, motivationalMessages.length]);

  // Navigate to results screen when calculation is complete
  useEffect(() => {
    if (calculationComplete) {
      const timer = setTimeout(() => {
        navigate('/love-compatibility-results-screen', {
          state: { 
            name1, 
            name2, 
            percentage: lovePercentage,
            gender1: storedData.yourGender || '',
            gender2: storedData.partnerGender || ''
          }
        });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [calculationComplete, navigate, name1, name2, lovePercentage, storedData]);

  const handleReset = () => {
    navigate('/love-calculator-input-screen');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden">
      <AppHeader onReset={handleReset} />
      
      {/* Floating Heart Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Icon 
              name="Heart" 
              size={12 + Math.random() * 8} 
              className="text-primary/20" 
            />
          </div>
        ))}
      </div>

      {/* Background Wave Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 animate-pulse"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-l from-accent/5 via-primary/5 to-secondary/5"
          style={{
            animation: 'slideInRight 8s ease-in-out infinite alternate'
          }}
        ></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 pt-24 md:pt-32 pb-8 px-4">
        <div className="max-w-lg mx-auto text-center">
          
          {/* Progress Circle */}
          <div className="relative mb-12">
            <div className="w-48 h-48 md:w-56 md:h-56 mx-auto relative">
              {/* Background Circle */}
              <div className="absolute inset-0 rounded-full border-8 border-border-light"></div>
              
              {/* Progress Circle */}
              <svg 
                className="absolute inset-0 w-full h-full transform -rotate-90" 
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                  className="transition-all duration-300 ease-out"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="50%" stopColor="var(--color-accent)" />
                    <stop offset="100%" stopColor="var(--color-secondary)" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-data">
                    {progress}%
                  </div>
                  <div className="text-sm text-text-secondary font-medium">
                    Calculating...
                  </div>
                </div>
              </div>

              {/* Rotating Glow Effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-50"
                style={{
                  background: `conic-gradient(from ${progress * 3.6}deg, var(--color-primary), var(--color-accent), var(--color-secondary), var(--color-primary))`,
                  filter: 'blur(20px)',
                  transform: `rotate(${progress * 3.6}deg)`,
                  transition: 'transform 0.3s ease-out'
                }}
              ></div>
            </div>
          </div>

          {/* Names Display */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="bg-surface/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-md border border-border-light animate-pulse">
                <span className="text-lg font-semibold text-primary">{name1}</span>
              </div>
              
              <div className={`transition-transform duration-300 ${heartBeat ? 'scale-125' : 'scale-100'}`}>
                <Icon 
                  name="Heart" 
                  size={32} 
                  className="text-accent animate-heart-beat" 
                />
              </div>
              
              <div className="bg-surface/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-md border border-border-light animate-pulse">
                <span className="text-lg font-semibold text-primary">{name2}</span>
              </div>
            </div>

            {/* Connection Line Animation */}
            <div className="relative h-2 bg-border-light rounded-full overflow-hidden mx-8">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-text-primary font-medium animate-fade-in">
              {motivationalMessages[currentMessage]}
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-primary rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>

          {/* Fun Facts or Tips */}
          <div className="mt-12 bg-surface/60 backdrop-blur-sm rounded-xl p-6 border border-border-light">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Icon name="Lightbulb" size={20} className="text-accent" />
              <span className="text-sm font-semibold text-primary">Did you know?</span>
            </div>
            <p className="text-sm text-text-secondary">
              Love compatibility is influenced by shared interests, communication styles, and emotional connection. Our algorithm considers name harmony and cosmic vibrations! ✨
            </p>
          </div>

          {/* Cancel Button */}
          <div className="mt-8">
            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-2 px-6 py-3 text-text-secondary hover:text-primary transition-colors duration-200 rounded-lg hover:bg-surface/50 min-touch-target"
            >
              <Icon name="X" size={18} />
              <span className="text-sm font-medium">Cancel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
      
      {/* Floating Action Hearts */}
      <div className="fixed bottom-6 left-6 z-20">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            >
              <Icon name="Heart" size={16} color="white" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalculationLoadingScreen;