// src/pages/love-compatibility-results-screen/components/ShareModal.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

function ShareModal({ isOpen, onClose, resultsData }) {
  const [copySuccess, setCopySuccess] = useState(false);
  
  if (!isOpen) return null;

  const { name1, name2, percentage } = resultsData;
  
  const shareText = `💕 ${name1 || 'Someone'} and ${name2 || 'Someone'} have ${percentage || 0}% love compatibility! Check out your love score too! 💖`;
  const shareUrl = window.location.origin;

  const socialPlatforms = [
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'bg-green-500',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Instagram',
      icon: 'Instagram',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      url: '#',
      isStory: true
    },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'bg-blue-500',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-700',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
  ];

  const handleSocialShare = (platform) => {
    if (platform.isStory) {
      // For Instagram Stories, copy text to clipboard
      handleCopyLink();
      alert('Text copied! Open Instagram and paste in your story 📸');
      return;
    }
    
    window.open(platform.url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Love Compatibility Results',
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-200 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-border-light">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-heading font-semibold text-text-primary">
              Share Your Results
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>
          <p className="text-text-secondary text-sm mt-2">
            Spread the love and let your friends discover their compatibility! 💕
          </p>
        </div>

        {/* Results Preview */}
        <div className="p-6 bg-gradient-to-r from-primary-50 to-accent-50 border-b border-border-light">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="font-semibold text-primary">{name1 || 'Someone'}</span>
              <Icon name="Heart" size={16} className="text-accent" />
              <span className="font-semibold text-primary">{name2 || 'Someone'}</span>
            </div>
            <div className="text-2xl font-bold text-gradient mb-1">{percentage || 0}%</div>
            <div className="text-sm text-text-secondary">Love Compatibility</div>
          </div>
        </div>

        {/* Social Media Platforms */}
        <div className="p-6">
          <h4 className="font-medium text-text-primary mb-4">Share on Social Media</h4>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleSocialShare(platform)}
                className={`flex flex-col items-center space-y-2 p-4 rounded-lg ${platform.color} text-white hover:scale-105 transition-all duration-200 min-touch-target`}
              >
                <Icon name={platform.icon} size={24} />
                <span className="text-xs font-medium">{platform.name}</span>
              </button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">Copy & Share</h4>
            <div className="flex space-x-2">
              <div className="flex-1 p-3 bg-surface-100 rounded-lg border border-border text-sm text-text-secondary">
                {shareText.substring(0, 50)}...
              </div>
              <button
                onClick={handleCopyLink}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 min-touch-target ${
                  copySuccess 
                    ? 'bg-success text-white' :'bg-primary text-white hover:bg-primary-700'
                }`}
              >
                {copySuccess ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name="Copy" size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Native Share (Mobile) */}
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full mt-4 btn-secondary flex items-center justify-center space-x-2"
            >
              <Icon name="Share" size={20} />
              <span>More Sharing Options</span>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-surface-50 rounded-b-2xl">
          <p className="text-center text-text-tertiary text-xs">
            Help your friends find their perfect match! 💫
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;