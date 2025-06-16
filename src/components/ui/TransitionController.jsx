import React, { useState, useEffect } from 'react';

function TransitionController({ 
  currentScreen = 'input', 
  children, 
  onScreenChange,
  transitionDuration = 300 
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayScreen, setDisplayScreen] = useState(currentScreen);
  const [transitionDirection, setTransitionDirection] = useState('forward');

  useEffect(() => {
    if (currentScreen !== displayScreen) {
      setIsTransitioning(true);
      
      // Determine transition direction
      const screenOrder = ['input', 'loading', 'results'];
      const currentIndex = screenOrder.indexOf(displayScreen);
      const nextIndex = screenOrder.indexOf(currentScreen);
      setTransitionDirection(nextIndex > currentIndex ? 'forward' : 'backward');

      // Start exit animation
      setTimeout(() => {
        setDisplayScreen(currentScreen);
        
        // Complete transition
        setTimeout(() => {
          setIsTransitioning(false);
          if (onScreenChange) {
            onScreenChange(currentScreen);
          }
        }, transitionDuration / 2);
      }, transitionDuration / 2);
    }
  }, [currentScreen, displayScreen, transitionDuration, onScreenChange]);

  const getTransitionClasses = () => {
    if (!isTransitioning) {
      return 'animate-fade-in';
    }

    if (transitionDirection === 'forward') {
      return displayScreen === currentScreen 
        ? 'animate-slide-in-right' :'animate-slide-in-left opacity-0';
    } else {
      return displayScreen === currentScreen 
        ? 'animate-slide-in-left' :'animate-slide-in-right opacity-0';
    }
  };

  const getScreenConfig = (screen) => {
    const configs = {
      input: {
        background: 'bg-gradient-to-br from-primary-50 to-accent-50',
        padding: 'pt-20 md:pt-24 pb-8 px-4',
        container: 'max-w-md mx-auto'
      },
      loading: {
        background: 'bg-gradient-to-br from-secondary-50 to-primary-50',
        padding: 'pt-20 md:pt-24 pb-8 px-4',
        container: 'max-w-lg mx-auto'
      },
      results: {
        background: 'bg-gradient-to-br from-accent-50 to-secondary-50',
        padding: 'pt-20 md:pt-24 pb-8 px-4',
        container: 'max-w-2xl mx-auto'
      }
    };
    return configs[screen] || configs.input;
  };

  const screenConfig = getScreenConfig(displayScreen);

  return (
    <main className={`min-h-screen transition-all duration-300 ${screenConfig.background}`}>
      <div className={`${screenConfig.padding}`}>
        <div className={`${screenConfig.container}`}>
          <div className={`transition-all duration-${transitionDuration} ${getTransitionClasses()}`}>
            {children}
          </div>
        </div>
      </div>

      {/* Loading Overlay for Transitions */}
      {isTransitioning && (
        <div className="fixed inset-0 z-200 bg-surface/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-secondary font-medium">Transitioning...</span>
          </div>
        </div>
      )}

      {/* Screen Indicator Dots */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-100">
        <div className="flex items-center space-x-2 bg-surface/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-border-light">
          {['input', 'loading', 'results'].map((screen, index) => (
            <div
              key={screen}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                displayScreen === screen 
                  ? 'bg-primary w-6' :'bg-border hover:bg-text-tertiary cursor-pointer'
              }`}
              onClick={() => {
                if (!isTransitioning && onScreenChange) {
                  onScreenChange(screen);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button for Quick Reset */}
      {displayScreen === 'results' && (
        <button
          onClick={() => onScreenChange && onScreenChange('input')}
          className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-primary hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center z-100"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M6.47358 1.96511C8.27963 1.93827 10.2651 2.62414 12 4.04838C13.7349 2.62414 15.7204 1.93827 17.5264 1.96511C19.5142 1.99465 21.3334 2.90112 22.2141 4.68531C23.0878 6.45529 22.9326 8.87625 21.4643 11.7362C19.9939 14.6003 17.1643 18.0021 12.4867 21.8566C12.4382 21.898 12.3855 21.9324 12.3298 21.9596C12.1243 22.0601 11.8798 22.0624 11.6702 21.9596C11.6145 21.9324 11.5618 21.898 11.5133 21.8566C6.83565 18.0021 4.00609 14.6003 2.53569 11.7362C1.06742 8.87625 0.912211 6.45529 1.78589 4.68531C2.66659 2.90112 4.4858 1.99465 6.47358 1.96511Z" fill="#DE58FFFF" fill-rule="evenodd"/></svg>
          
        </button>
      )}
    </main>
  );
}

export default TransitionController;