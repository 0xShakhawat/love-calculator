import React from 'react';
import Icon from 'components/AppIcon';

function ResultsCard({ 
  name1, 
  name2, 
  percentage, 
  gender1, 
  gender2, 
  message, 
  compatibilityLevel, 
  animationPhase 
}) {
  const getGenderIcon = (gender) => {
    if (gender === 'male') return 'User';
    if (gender === 'female') return 'UserCheck';
    return 'Users';
  };

  const getPercentageColor = (score) => {
    if (score >= 80) return 'text-gradient';
    if (score >= 60) return 'text-primary';
    return 'text-accent';
  };

  const getHeartIcon = (score) => {
    if (score >= 90) return 'HeartHandshake';
    if (score >= 80) return 'Heart';
    if (score >= 60) return 'Heart';
    return 'Heart';
  };

  return (
    <div className="card-glass p-6 md:p-8 text-center relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4">
          <Icon name="Heart" size={24} className="text-primary" />
        </div>
        <div className="absolute top-4 right-4">
          <Icon name="Heart" size={20} className="text-accent" />
        </div>
        <div className="absolute bottom-4 left-6">
          <Icon name="Heart" size={16} className="text-secondary" />
        </div>
        <div className="absolute bottom-4 right-6">
          <Icon name="Heart" size={18} className="text-primary" />
        </div>
      </div>

      {/* Names Section */}
      <div className={`mb-8 transition-all duration-600 ${
        animationPhase === 'entrance' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        <div className="flex items-center justify-center space-x-4 mb-4">
          {/* First Person */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center shadow-lg">
              <Icon name={getGenderIcon(gender1)} size={28} color="white" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-text-primary">{name1}</h3>
          </div>

          {/* Connection Animation */}
          <div className="flex flex-col items-center space-y-2">
            <div className={`transition-all duration-800 delay-200 ${
              animationPhase === 'reveal' ? 'animate-heart-beat' : ''
            }`}>
              <Icon name={getHeartIcon(percentage)} size={32} className="text-accent" />
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary"></div>
          </div>

          {/* Second Person */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center shadow-lg">
              <Icon name={getGenderIcon(gender2)} size={28} color="white" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-text-primary">{name2}</h3>
          </div>
        </div>
      </div>

      {/* Compatibility Level Badge */}
      <div className={`mb-6 transition-all duration-600 delay-300 ${
        animationPhase === 'entrance' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full text-sm font-medium shadow-md">
          {compatibilityLevel}
        </span>
      </div>

      {/* Percentage Display */}
      <div className={`mb-8 transition-all duration-800 delay-400 ${
        animationPhase === 'entrance' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
      } ${animationPhase === 'celebrate' ? 'animate-bounce-gentle' : ''}`}>
        <div className={`text-6xl md:text-7xl font-bold mb-2 ${getPercentageColor(percentage)}`}>
          {percentage}%
        </div>
        <div className="text-xl md:text-2xl font-heading font-semibold text-text-primary mb-4">
          Love Compatibility
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto bg-border-light rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 delay-600 ${
              animationPhase === 'entrance' ? 'w-0' : ''
            }`}
            style={{ width: animationPhase !== 'entrance' ? `${percentage}%` : '0%' }}
          ></div>
        </div>
      </div>

      {/* Personalized Message */}
      <div className={`transition-all duration-600 delay-800 ${
        animationPhase === 'entrance' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
          <Icon name="MessageCircle" size={24} className="text-primary mx-auto mb-3" />
          <p className="text-text-primary leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`mt-6 flex justify-center space-x-2 transition-all duration-600 delay-1000 ${
        animationPhase === 'entrance' ? 'opacity-0' : 'opacity-100'
      }`}>
        {[...Array(5)].map((_, i) => (
          <Icon 
            key={i}
            name="Star" 
            size={16} 
            className={`${
              i < Math.floor(percentage / 20) ? 'text-accent' : 'text-border'
            } transition-colors duration-300`}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default ResultsCard;