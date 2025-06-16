// src/pages/love-calculator-input-screen/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import AppHeader from 'components/ui/AppHeader';
import NameInputField from './components/NameInputField';
import GenderSelection from './components/GenderSelection';
import CalculateButton from './components/CalculateButton';
import FloatingHearts from './components/FloatingHearts';

function LoveCalculatorInputScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    yourName: '',
    partnerName: '',
    yourGender: '',
    partnerGender: ''
  });
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.yourName.trim()) {
      newErrors.yourName = 'Please enter your name';
    }
    
    if (!formData.partnerName.trim()) {
      newErrors.partnerName = 'Please enter your partner\'s name';
    }

    if (formData.yourName.trim() && formData.partnerName.trim() && 
        formData.yourName.trim().toLowerCase() === formData.partnerName.trim().toLowerCase()) {
      newErrors.partnerName = 'Names cannot be the same';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle calculate button click
  const handleCalculate = () => {
    if (validateForm()) {
      setIsCalculating(true);
      
      // Store form data in sessionStorage for other screens
      sessionStorage.setItem('loveCalculatorData', JSON.stringify(formData));
      
      // Navigate to loading screen after brief delay
      setTimeout(() => {
        navigate('/calculation-loading-screen', { 
          state: { 
            name1: formData.yourName, 
            name2: formData.partnerName 
          } 
        });
      }, 500);
    }
  };

  // Handle reset functionality
  const handleReset = () => {
    setFormData({
      yourName: '',
      partnerName: '',
      yourGender: '',
      partnerGender: ''
    });
    setErrors({});
    setIsCalculating(false);
    sessionStorage.removeItem('loveCalculatorData');
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 relative overflow-hidden">
      {/* Header */}
      <AppHeader onReset={handleReset} />

      {/* Floating Hearts Background Animation */}
      <FloatingHearts />

      {/* Main Content */}
      <main className="pt-20 md:pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg mb-4">
                <Icon name="Heart" size={40} color="white" className="animate-heart-beat" />
              </div>
            </div>
            
            <h1 className="text-fluid-3xl font-bold text-gradient mb-3">
              Love Calculator
            </h1>
            <p className="text-text-secondary text-fluid-base leading-relaxed">
              Discover your love compatibility percentage with someone special! ✨
            </p>
          </div>

          {/* Input Form */}
          <div className="card p-6 md:p-8 mb-6 animate-scale-in">
            <div className="space-y-6">
              {/* Your Name Input */}
              <NameInputField
                label="Your Name"
                placeholder=" " /* Enter your name */
                value={formData.yourName}
                onChange={(value) => handleInputChange('yourName', value)}
                error={errors.yourName}
                icon="User"
                onKeyPress={handleKeyPress}
              />

              {/* Partner Name Input */}
              <NameInputField
                label="Partner's Name"
                placeholder="" /* Enter your partner's name */
                value={formData.partnerName}
                onChange={(value) => handleInputChange('partnerName', value)}
                error={errors.partnerName}
                icon="Heart"
                onKeyPress={handleKeyPress}
              />

              {/* Gender Selection (Optional) */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-text-secondary text-center">
                  Gender Selection (Optional)
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <GenderSelection
                    label="Your Gender"
                    value={formData.yourGender}
                    onChange={(value) => handleInputChange('yourGender', value)}
                  />
                  
                  <GenderSelection
                    label="Partner's Gender"
                    value={formData.partnerGender}
                    onChange={(value) => handleInputChange('partnerGender', value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <CalculateButton
            onClick={handleCalculate}
            disabled={isCalculating}
            isLoading={isCalculating}
          />

          {/* Fun Facts Section */}
          <div className="mt-8 text-center animate-fade-in">
            <div className="bg-surface/60 backdrop-blur-sm rounded-xl p-4 border border-border-light">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Sparkles" size={16} className="text-accent" />
                <span className="text-sm font-medium text-text-secondary">Fun Fact</span>
                <Icon name="Sparkles" size={16} className="text-accent" />
              </div>
              <p className="text-xs text-text-tertiary">
                Love calculators have been entertaining people since the early days of the internet! 💕
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Decorative Elements */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
        <div className="h-32 bg-gradient-to-t from-primary-100/20 to-transparent"></div>
      </div>
    </div>
  );
}

export default LoveCalculatorInputScreen;