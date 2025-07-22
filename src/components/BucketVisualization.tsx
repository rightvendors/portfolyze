import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Target, Calendar, IndianRupee, Zap, Calculator } from 'lucide-react';

const BucketVisualization: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bucket2' | 'bucket3'>('bucket2');
  
  // Bucket 2 - Monthly Income Calculator
  const [desiredIncome, setDesiredIncome] = useState(50000);
  const [bucket2AnimatedValue, setBucket2AnimatedValue] = useState(0);
  const requiredCorpus = (desiredIncome * 12) / 0.04;
  
  // Bucket 3 - Compounding Effect
  const [bucket3Years, setBucket3Years] = useState(15);
  const [bucket3AnimatedValue, setBucket3AnimatedValue] = useState(0);
  const bucket3Principal = 100000; // ₹1 lakh
  const bucket3Rate = 0.12; // 12% per year
  
  const calculateBucket3Value = (years: number) => {
    return bucket3Principal * Math.pow(1 + bucket3Rate, years);
  };
  
  const bucket3FinalValue = calculateBucket3Value(bucket3Years);
  
  // Animate Bucket 3 value
  useEffect(() => {
    if (activeTab === 'bucket3') {
      const duration = 1500;
      const steps = 60;
      const increment = bucket3FinalValue / steps;
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        setBucket3AnimatedValue(increment * currentStep);
        
        if (currentStep >= steps) {
          setBucket3AnimatedValue(bucket3FinalValue);
          clearInterval(timer);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [bucket3FinalValue, activeTab]);
  
  // Animate Bucket 2 value
  useEffect(() => {
    if (activeTab === 'bucket2') {
      const duration = 1500;
      const steps = 60;
      const increment = requiredCorpus / steps;
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        setBucket2AnimatedValue(increment * currentStep);
        
        if (currentStep >= steps) {
          setBucket2AnimatedValue(requiredCorpus);
          clearInterval(timer);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [requiredCorpus, activeTab]);
  
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} L`;
    } else {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-10 h-10 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Bucket Calculators
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understand the power of your Folyze Buckets with interactive visualizations
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveTab('bucket2')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                activeTab === 'bucket2'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <Target className="w-5 h-5" />
              <span>Bucket 2: Monthly Income Goal</span>
            </button>
            <button
              onClick={() => setActiveTab('bucket3')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                activeTab === 'bucket3'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Bucket 3: Compounding Effect</span>
            </button>
          </div>
        </div>

        {/* Bucket 2 Content - Monthly Income Calculator */}
        {activeTab === 'bucket2' && (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Controls and Stats */}
            <div className="space-y-8">
              {/* Monthly Income Input */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
                <div className="flex items-center mb-6">
                  <DollarSign className="w-6 h-6 text-orange-600 mr-3" />
                  <span className="text-lg font-semibold text-gray-700">Desired Monthly Income</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">₹{(desiredIncome / 1000).toFixed(0)}K</span>
                    <span className="text-sm text-gray-500">₹10K - ₹200K</span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min="10000"
                      max="200000"
                      step="5000"
                      value={desiredIncome}
                      onChange={(e) => setDesiredIncome(parseInt(e.target.value))}
                      className="w-full h-3 bg-orange-100 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #f97316 0%, #f97316 ${((desiredIncome - 10000) / 190000) * 100}%, #e5e7eb ${((desiredIncome - 10000) / 190000) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-700">
                      <strong>Annual Income:</strong> ₹{(desiredIncome * 12 / 100000).toFixed(1)} Lakh
                    </p>
                  </div>
                </div>
              </div>

              {/* Withdrawal Rate Info */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 text-orange-600 mr-3" />
                  <span className="text-lg font-semibold text-gray-700">Safe Withdrawal Rate</span>
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">4%</div>
                <p className="text-gray-600 text-sm">
                  Based on the 4% rule - you can safely withdraw 4% of your corpus annually without depleting it
                </p>
              </div>

              {/* Required Corpus Display */}
              <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl p-8 shadow-xl text-white">
                <div className="flex items-center mb-4">
                  <IndianRupee className="w-6 h-6 mr-3" />
                  <span className="text-lg font-semibold">Required Corpus</span>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {formatCurrency(bucket2AnimatedValue)}
                </div>
                <div className="text-orange-100">
                  To generate ₹{(desiredIncome / 1000).toFixed(0)}K monthly income
                </div>
              </div>
            </div>

            {/* Right side - Visual Breakdown */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Income Generation Breakdown</h3>
                <p className="text-gray-600 text-sm">How your corpus generates monthly income</p>
              </div>
              
              {/* Visual representation */}
              <div className="space-y-6">
                {/* Corpus Circle */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="#f97316"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 80}`}
                        strokeDashoffset={`${2 * Math.PI * 80 * (1 - 0.04)}`}
                        className="transition-all duration-2000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">4%</div>
                        <div className="text-sm text-gray-600">Annual</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Breakdown Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {formatCurrency(requiredCorpus)}
                    </div>
                    <div className="text-sm text-gray-600">Total Corpus</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">
                      ₹{(desiredIncome / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">Monthly Income</div>
                  </div>
                </div>
                
                {/* Formula Explanation */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Formula:</h4>
                  <p className="text-sm text-gray-600">
                    Required Corpus = (Monthly Income × 12) ÷ 4%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    = (₹{(desiredIncome / 1000).toFixed(0)}K × 12) ÷ 0.04 = {formatCurrency(requiredCorpus)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bucket 3 Content - Compounding Effect */}
        {activeTab === 'bucket3' && (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Controls and Stats */}
            <div className="space-y-8">
              {/* Simple Investment Setup */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-teal-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Investment Setup</h3>
                
                <div className="space-y-6">
                  {/* Amount */}
                  <div className="flex justify-between items-center p-4 bg-teal-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Initial Amount</span>
                    <span className="text-2xl font-bold text-teal-600">₹1,00,000</span>
                  </div>
                  
                  {/* Rate */}
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Annual Return</span>
                    <span className="text-2xl font-bold text-green-600">12%</span>
                  </div>
                  
                  {/* Years Selector */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Time Period</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[10, 15, 20].map((year) => (
                        <button
                          key={year}
                          onClick={() => setBucket3Years(year)}
                          className={`p-3 rounded-lg font-semibold transition-all ${
                            bucket3Years === year
                              ? 'bg-teal-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {year} Years
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Magic of Compounding */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 shadow-xl text-white">
                <h3 className="text-xl font-bold mb-4">The Magic Happens</h3>
                <div className="text-4xl font-bold mb-2">
                  ₹{Math.round(bucket3AnimatedValue / 100000).toLocaleString()} Lakh
                </div>
                <div className="text-teal-100 text-lg">
                  Your money grows to <strong>{(bucket3FinalValue / bucket3Principal).toFixed(1)}x</strong> in {bucket3Years} years!
                </div>
              </div>
            </div>

            {/* Right side - Visual Money Growth */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-teal-100">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Watch Your Money Multiply</h3>
                <p className="text-gray-600 text-sm">See the power of compound interest in action</p>
              </div>
              
              {/* Money Visualization */}
              <div className="space-y-8">
                {/* Year 0 */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      0
                    </div>
                    <span className="font-medium text-gray-700">Year 0 (Start)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-5 h-5 text-teal-600" />
                    <span className="text-xl font-bold text-teal-600">1.0L</span>
                  </div>
                </div>
                
                {/* Intermediate Years */}
                {bucket3Years >= 15 && (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {Math.floor(bucket3Years / 2)}
                      </div>
                      <span className="font-medium text-gray-700">Year {Math.floor(bucket3Years / 2)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="w-5 h-5 text-blue-600" />
                      <span className="text-xl font-bold text-blue-600">
                        {(calculateBucket3Value(Math.floor(bucket3Years / 2)) / 100000).toFixed(1)}L
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Final Year */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {bucket3Years}
                    </div>
                    <span className="font-bold text-gray-800">Year {bucket3Years} (Final)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-6 h-6 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      {(bucket3AnimatedValue / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
                
                {/* Growth Arrow and Stats */}
                <div className="text-center py-6">
                  <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-teal-100 to-green-100 px-6 py-4 rounded-full">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Growth</div>
                      <div className="text-lg font-bold text-teal-600">
                        +{((bucket3FinalValue / bucket3Principal - 1) * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Multiplier</div>
                      <div className="text-lg font-bold text-green-600">
                        {(bucket3FinalValue / bucket3Principal).toFixed(1)}x
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Simple Explanation */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-800 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">How it works:</h4>
                      <p className="text-sm text-yellow-700">
                        Each year, you earn 12% not just on your original ₹1 lakh, but on the entire growing amount. 
                        This is the magic of compound interest!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
};

export default BucketVisualization;