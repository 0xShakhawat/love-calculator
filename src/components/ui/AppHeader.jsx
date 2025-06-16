import React from 'react';
import Icon from '../AppIcon';

function AppHeader({ onReset }) {
  const handleLogoClick = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface/95 backdrop-blur-md border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group transition-all duration-200 hover:scale-102"
            onClick={handleLogoClick}
          >
            {/* Heart Icon Logo */}
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md group-hover:shadow-primary transition-all duration-200">
                <Icon 
                  name="Heart" 
                  size={24} 
                  color="white" 
                  className="group-hover:animate-heart-beat"
                />
              </div>
              {/* Decorative pulse ring */}
              <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col">
              <h1 className="font-heading font-bold text-lg md:text-xl text-primary group-hover:text-gradient transition-all duration-200">
                LoveCalculator
              </h1>
              <p className="text-xs text-text-secondary font-medium hidden sm:block">
                Discover Your Match
              </p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            {/* Reset Button - Hidden on mobile, visible on desktop */}
            <button
              onClick={handleLogoClick}
              className="hidden md:flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary-50 min-touch-target"
            >
              <Icon name="RotateCcw" size={18} />
              <span className="text-sm font-medium">New Calculation</span>
            </button>

            {/* Share Button */}
            {/* <button className="flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 bg-secondary text-primary rounded-lg hover:bg-secondary-400 hover:text-white transition-all duration-200 hover:scale-102 min-touch-target">
              <Icon name="Share2" size={18} />
              <span className="text-sm font-medium hidden sm:inline">Share</span>
            </button> */}

            {/* Menu Button - Mobile only */}
            <button className="md:hidden flex items-center justify-center w-10 h-10 text-text-secondary hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary-50 min-touch-target">
              <Icon name="Menu" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-60"></div>
    </header>
  );
}

export default AppHeader;