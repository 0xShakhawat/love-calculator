import React from 'react';
import Icon from 'components/AppIcon';

function GenderSelection({ label, value, onChange }) {
  const genderOptions = [
    { id: 'male', label: 'Male', icon: 'User' },
    { id: 'female', label: 'Female', icon: 'UserCheck' },
    { id: 'other', label: 'Other', icon: 'Users' }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text-secondary">
        {label}
      </label>
      
      <div className="flex flex-wrap gap-2">
        {genderOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(value === option.id ? '' : option.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 min-touch-target ${
              value === option.id
                ? 'border-primary bg-primary text-white shadow-md scale-105'
                : 'border-border bg-surface text-text-secondary hover:border-primary hover:text-primary hover:scale-102'
            }`}
          >
            <Icon 
              name={option.icon} 
              size={16} 
              className={value === option.id ? 'text-white' : 'text-current'}
            />
            <span className="text-sm font-medium">{option.label}</span>
            
            {/* Selection Indicator */}
            {value === option.id && (
              <Icon name="Check" size={14} className="text-white" />
            )}
          </button>
        ))}
      </div>

      {/* Clear Selection */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-200 flex items-center space-x-1"
        >
          <Icon name="X" size={12} />
          <span>Clear selection</span>
        </button>
      )}
    </div>
  );
}

export default GenderSelection;