import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
            <Icon name="HeartCrack" size={48} color="white" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Page Not Found</h2>
          <p className="text-text-secondary">
            Oops! It looks like this page doesn't exist. Let's get you back to finding love!
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleGoHome}
          className="btn-primary inline-flex items-center space-x-2 min-touch-target"
        >
          <Icon name="Heart" size={20} />
          <span>Back to Love Calculator</span>
        </button>

        {/* Decorative Hearts */}
        <div className="mt-12 flex justify-center space-x-4 opacity-30">
          <Icon name="Heart" size={16} className="text-primary animate-pulse" />
          <Icon name="Heart" size={20} className="text-accent animate-pulse delay-100" />
          <Icon name="Heart" size={16} className="text-secondary animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;