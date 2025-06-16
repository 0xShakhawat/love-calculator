// src/pages/love-compatibility-results-screen/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Icon from 'components/AppIcon';
import AppHeader from 'components/ui/AppHeader';
import TransitionController from 'components/ui/TransitionController';
import ResultsCard from './components/ResultsCard';
import ShareModal from './components/ShareModal';
import HeartBurstAnimation from './components/HeartBurstAnimation';

function LoveCompatibilityResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const resultsRef = useRef(null);
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('entrance');

  // Get data from session storage
  const storedData = JSON.parse(sessionStorage.getItem('loveCalculatorData')) || {};
  
  // Get results from navigation state or use mock data
  const resultsData = location.state || {
    name1: storedData.yourName || "Alex",
    name2: storedData.partnerName || "Jordan", 
    percentage: 85,
    gender1: storedData.yourGender || "male",
    gender2: storedData.partnerGender || "female"
  };

  const { name1, name2, percentage, gender1, gender2 } = resultsData;

  // Trigger heart burst for high compatibility
  useEffect(() => {
    if (percentage >= 80) {
      const timer = setTimeout(() => {
        setShowHeartBurst(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [percentage]);

  // Animation sequence
  useEffect(() => {
    const phases = ['entrance', 'reveal', 'celebrate'];
    let currentPhase = 0;
    
    const timer = setInterval(() => {
      currentPhase++;
      if (currentPhase < phases.length) {
        setAnimationPhase(phases[currentPhase]);
      } else {
        clearInterval(timer);
      }
    }, 600);

    return () => clearInterval(timer);
  }, []);

  const getPersonalizedMessage = (score) => {
    // Get names for personalized messages
    const name1Lower = name1.toLowerCase().trim();
    const name2Lower = name2.toLowerCase().trim();
    
    // Special messages for perfect matches
    if (score === 100) {
      if ((name1Lower === 'shakhawat' && (name2Lower === 'bushra' || name2Lower === 'pangkti')) ||
          (name2Lower === 'shakhawat' && (name1Lower === 'bushra' || name1Lower === 'pangkti'))) {
        return `You and ${name1Lower === 'shakhawat' ? name2 : name1} are a perfect match! This is a destined connection written in the stars! 💫✨`;
      }
      return `Perfect match! ${name1} and ${name2} are absolutely meant for each other. This is a once-in-a-lifetime connection that's written in the stars! 💫`;
    } else if (score >= 90) {
      return `Amazing compatibility! ${name1} and ${name2} have incredible chemistry together. Your hearts beat in perfect harmony! 💕`;
    } else if (score >= 80) {
      return `Great match! ${name1} and ${name2} share a wonderful connection. Love is definitely in the air between you two! 🌹`;
    } else if (score >= 70) {
      return `Good compatibility! ${name1} and ${name2} have a sweet connection. With a little effort, this could blossom into something beautiful! 🌸`;
    } else if (score >= 50) {
      return `Moderate match! ${name1} and ${name2} have potential together. Sometimes the best relationships grow slowly and beautifully! 🌱`;
    } else {
      return `It's a fun start, but keep exploring! ${name1} and ${name2} might discover unexpected magic together. Love works in mysterious ways! ✨`;
    }
  };

  const getCompatibilityLevel = (score) => {
    if (score >= 90) return "Soul Mates";
    if (score >= 80) return "Perfect Match";
    if (score >= 70) return "Great Chemistry";
    if (score >= 60) return "Good Connection";
    if (score >= 50) return "Sweet Potential";
    return "Unique Bond";
  };

  const handleDownloadImage = async () => {
    if (!resultsRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#FEFBFF',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `love-compatibility-${name1}-${name2}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareSocial = () => {
    setShowShareModal(true);
  };

  const handleCalculateAgain = () => {
    navigate('/love-calculator-input-screen', { replace: true });
  };

  const handleReset = () => {
    navigate('/love-calculator-input-screen', { replace: true });
  };

  return (
    <TransitionController currentScreen="results">
      <div className="min-h-screen bg-gradient-to-br from-accent-50 to-secondary-50 relative overflow-hidden">
        <AppHeader onReset={handleReset} />
        
        {/* Floating Background Hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-pulse opacity-10 ${
                i % 3 === 0 ? 'text-primary' : i % 3 === 1 ? 'text-accent' : 'text-secondary'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <Icon name="Heart" size={20 + Math.random() * 20} />
            </div>
          ))}
        </div>

        {/* Heart Burst Animation */}
        {showHeartBurst && <HeartBurstAnimation />}

        <div className="pt-20 md:pt-24 pb-8 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Results Card */}
            <div 
              ref={resultsRef}
              className={`transition-all duration-800 ${
                animationPhase === 'entrance' ? 'opacity-0 scale-95 translate-y-8' : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              <ResultsCard
                name1={name1}
                name2={name2}
                percentage={percentage}
                gender1={gender1}
                gender2={gender2}
                message={getPersonalizedMessage(percentage)}
                compatibilityLevel={getCompatibilityLevel(percentage)}
                animationPhase={animationPhase}
              />
            </div>

            {/* Action Buttons */}
            <div className={`mt-8 space-y-4 transition-all duration-800 delay-300 ${
              animationPhase === 'entrance' ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}>
              {/* Primary Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleDownloadImage}
                  disabled={isDownloading}
                  className="btn-primary flex items-center justify-center space-x-3 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Download" size={20} />
                      <span>Download Image</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShareSocial}
                  className="btn-secondary flex items-center justify-center space-x-3 py-4"
                >
                  <Icon name="Share2" size={20} />
                  <span>Share Results</span>
                </button>
              </div>

              {/* Calculate Again Button */}
              <button
                onClick={handleCalculateAgain}
                className="w-full flex items-center justify-center space-x-3 py-4 bg-surface border-2 border-primary text-primary rounded-lg font-medium transition-all duration-200 hover:bg-primary hover:text-white hover:scale-102 min-touch-target"
              >
                <Icon name="RotateCcw" size={20} />
                <span>Calculate Again</span>
              </button>
            </div>

            {/* Fun Stats */}
            <div className={`mt-8 grid grid-cols-2 gap-4 transition-all duration-800 delay-500 ${
              animationPhase === 'entrance' ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}>
              <div className="card p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{percentage}%</div>
                <div className="text-sm text-text-secondary">Compatibility</div>
              </div>
              <div className="card p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">
                  {percentage >= 80 ? '💕' : percentage >= 60 ? '💖' : '💝'}
                </div>
                <div className="text-sm text-text-secondary">Love Level</div>
              </div>
            </div>

            {/* Encouraging Footer Message */}
            <div className={`mt-8 text-center transition-all duration-800 delay-700 ${
              animationPhase === 'entrance' ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}>
              <p className="text-text-secondary text-sm">
                Remember, love is about more than numbers! 💫
              </p>
              <p className="text-text-tertiary text-xs mt-2">
                Share your results and spread the love! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            resultsData={resultsData}
          />
        )}
      </div>
    </TransitionController>
  );
}

export default LoveCompatibilityResultsScreen;