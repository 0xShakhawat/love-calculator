import React from 'react';
import Icon from 'components/AppIcon';

function CalculateButton({ onClick, disabled, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 min-touch-target relative overflow-hidden ${
        disabled
          ? 'bg-border text-text-tertiary cursor-not-allowed' :'bg-gradient-to-r from-primary to-accent text-white hover:scale-102 hover:shadow-primary active:scale-98'
      }`}
    >
      {/* Background Animation */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      )}

      {/* Button Content */}
      <div className="relative flex items-center justify-center space-x-3">
        {isLoading ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Calculating...</span>
          </>
        ) : (
          <>
            <Icon 
              name="Heart" 
              size={24} 
              className={disabled ? 'text-text-tertiary' : 'text-white animate-heart-beat'}
            />
            <span>Calculate Love</span>
            <Icon 
              name="Sparkles" 
              size={20} 
              className={disabled ? 'text-text-tertiary' : 'text-white'}
            />
          </>
        )}
      </div>

      {/* Ripple Effect */}
      {!disabled && (
        <div className="absolute inset-0 rounded-xl bg-white opacity-0 hover:opacity-10 transition-opacity duration-200"></div>
      )}
    </button>
  );
}

export default CalculateButton;