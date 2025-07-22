import React, { useState, useEffect } from 'react';
import { TrendingUp, IndianRupee, Calendar, Target } from 'lucide-react';

interface CompoundInterestCalculatorProps {
  onStartFree?: () => void;
  user?: any;
}

const CompoundInterestCalculator: React.FC<CompoundInterestCalculatorProps> = ({ onStartFree, user }) => {
  const [years, setYears] = useState(20);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const principal = 10000000; // ₹1 crore
  const rate = 0.15; // 15% per year
  
  const calculateCompoundInterest = (years: number) => {
    return principal * Math.pow(1 + rate, years);
  };

  const finalValue = calculateCompoundInterest(years);

  // Animate the counter
  useEffect(() => {
    setIsAnimating(true);
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = finalValue / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAnimatedValue(increment * currentStep);
      
      if (currentStep >= steps) {
        setAnimatedValue(finalValue);
        setIsAnimating(false);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [finalValue]);

  // Generate data points for the graph
  const generateGraphData = () => {
    const points = [];
    const maxYears = Math.max(years, 10);
    const step = Math.max(1, Math.floor(maxYears / 20));
    
    for (let i = 0; i <= maxYears; i += step) {
      const value = calculateCompoundInterest(i);
      points.push({
        year: i,
        value: value,
        x: (i / maxYears) * 100,
        y: 100 - ((value - principal) / (calculateCompoundInterest(maxYears) - principal)) * 80
      });
    }
    return points;
  };

  const graphData = generateGraphData();

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} L`;
    } else {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
  };

  const pathData = graphData.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-10 h-10 text-purple-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              The Power of Compounding
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how ₹1 crore grows at 15% annual returns over time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Controls and Stats */}
          <div className="space-y-8">
            {/* Year Slider */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
              <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                <span className="text-lg font-semibold text-gray-700">Investment Period</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">{years} Years</span>
                  <span className="text-sm text-gray-500">1 - 50 years</span>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={years}
                    onChange={(e) => setYears(parseInt(e.target.value))}
                    className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${(years / 50) * 100}%, #e5e7eb ${(years / 50) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Key Stats - Growth Multiple and Final Value */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Growth Multiple</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {(finalValue / principal).toFixed(1)}x
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-2">
                  <IndianRupee className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Final Value</span>
                </div>
                <div className={`text-2xl font-bold text-green-600 transition-all duration-300 ${isAnimating ? 'scale-105' : ''}`}>
                  {formatCurrency(animatedValue)}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Animated Graph */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Growth Visualization</h3>
              <p className="text-gray-600 text-sm">Watch your wealth compound over time</p>
            </div>
            
            <div className="relative h-80">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f3f4f6" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                
                {/* Gradient area under curve */}
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.05"/>
                  </linearGradient>
                </defs>
                
                <path
                  d={`${pathData} L 100 100 L 0 100 Z`}
                  fill="url(#areaGradient)"
                  className="transition-all duration-1000 ease-out"
                />
                
                {/* Main curve */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="2"
                  className="transition-all duration-1000 ease-out"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(124, 58, 237, 0.3))'
                  }}
                />
                
                {/* Data points */}
                {graphData.map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="1.5"
                    fill="#7c3aed"
                    className="transition-all duration-1000 ease-out"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      filter: 'drop-shadow(0 1px 2px rgba(124, 58, 237, 0.5))'
                    }}
                  />
                ))}
                
                {/* Current year indicator */}
                {graphData.length > 0 && (
                  <g>
                    <line
                      x1={(years / Math.max(years, 10)) * 100}
                      y1="0"
                      x2={(years / Math.max(years, 10)) * 100}
                      y2="100"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      className="transition-all duration-500"
                    />
                    <circle
                      cx={(years / Math.max(years, 10)) * 100}
                      cy={100 - ((finalValue - principal) / (calculateCompoundInterest(Math.max(years, 10)) - principal)) * 80}
                      r="3"
                      fill="#ef4444"
                    />
                  </g>
                )}
              </svg>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-16">
                <span>{formatCurrency(calculateCompoundInterest(Math.max(years, 10)))}</span>
                <span>{formatCurrency((calculateCompoundInterest(Math.max(years, 10)) + principal) / 2)}</span>
                <span>₹1 Cr</span>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 -mb-6">
                <span>0</span>
                <span>{Math.floor(Math.max(years, 10) / 2)}</span>
                <span>{Math.max(years, 10)} years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Start Your Compounding Journey Today
            </h3>
            <p className="text-gray-600 mb-6">
              Track your investments across the Folyze Buckets and watch your wealth grow systematically
            </p>
            {user ? (
              <a 
                href="https://app.portfolyze.com"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Go to Dashboard</span>
              </a>
            ) : (
              <button 
                onClick={onStartFree}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Begin Portfolio Tracking</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </section>
  );
};

export default CompoundInterestCalculator;