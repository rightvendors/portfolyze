import React from 'react';
import LazyImage from './LazyImage';

interface HeaderProps {
  onSignIn?: () => void;
  onStartFree?: () => void;
  showAuthButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onSignIn, 
  onStartFree, 
  showAuthButtons = true 
}) => {
  const handleSignIn = () => {
    window.location.href = 'https://app.portfolize.com';
  };

  const handleStartFree = () => {
    window.location.href = 'https://app.portfolize.com';
  };

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50" style={{backgroundColor: '#4a196d'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <a href="https://www.portfolyze.com" className="flex items-center space-x-2">
              <LazyImage src="/Original on transparent.png" alt="Portfolyze Logo" className="h-8" />
            </a>
          </div>
          
          {showAuthButtons && (
            <div className="flex items-center space-x-3">
              <button 
                onClick={onSignIn || handleSignIn}
                className="text-white hover:text-gray-200 px-4 py-2 font-medium transition-colors">
                Sign in
              </button>
              <button 
                onClick={onStartFree || handleStartFree}
                className="bg-white hover:bg-gray-100 text-purple-900 px-6 py-2 rounded-lg font-medium transition-colors">
                Start free
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;