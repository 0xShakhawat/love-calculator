import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

function NameInputField({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  icon = "User",
  onKeyPress 
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasShakeError, setHasShakeError] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Allow only letters, spaces, and common international characters
    const sanitizedValue = inputValue.replace(/[^a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s]/g, '');
    onChange(sanitizedValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Trigger shake animation when error appears
  React.useEffect(() => {
    if (error) {
      setHasShakeError(true);
      const timer = setTimeout(() => setHasShakeError(false), 500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative">
      {/* Floating Label */}
      <label 
        className={`absolute left-12 transition-all duration-200 pointer-events-none z-10 ${
          isFocused || value 
            ? 'top-2 text-xs text-primary font-medium' :'top-4 text-text-secondary'
        }`}
      >
        {label}
      </label>

      {/* Input Container */}
      <div className={`relative transition-all duration-200 ${hasShakeError ? 'animate-bounce-gentle' : ''}`}>
        {/* Icon */}
        <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
          isFocused ? 'text-primary scale-110' : 'text-text-tertiary'
        }`}>
          <Icon 
            name={icon} 
            size={20} 
            className={isFocused && icon === "Heart" ? 'animate-heart-beat' : ''}
          />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={onKeyPress}
          placeholder={isFocused ? '' : placeholder}
          className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-surface text-text-primary placeholder-text-tertiary transition-all duration-200 focus:outline-none min-touch-target ${
            error 
              ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20' 
              : isFocused 
                ? 'border-primary focus:ring-2 focus:ring-primary/20' :'border-border hover:border-border-dark'
          }`}
          maxLength={50}
        />

        {/* Focus Ring Effect */}
        {isFocused && !error && (
          <div className="absolute inset-0 rounded-xl border-2 border-primary/30 animate-ping pointer-events-none"></div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 flex items-center space-x-2 text-error animate-fade-in">
          <Icon name="AlertCircle" size={14} />
          <span className="text-xs font-medium">{error}</span>
        </div>
      )}

      {/* Character Count */}
      {value && (
        <div className="mt-1 text-right">
          <span className={`text-xs ${value.length > 40 ? 'text-warning' : 'text-text-tertiary'}`}>
            {value.length}/50
          </span>
        </div>
      )}
    </div>
  );
}

export default NameInputField;