import React from 'react';
import { useState, lazy, Suspense } from 'react';
import { ArrowRight, Target, TrendingUp, Wallet, BarChart3, PiggyBank, Zap, Shield, Eye, Brain, Lightbulb, Settings, Palette, MessageCircle, Calculator } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import SignInModal from './components/SignInModal';
import StartFreeModal from './components/StartFreeModal';
import LazyImage from './components/LazyImage';
import LazySection from './components/LazySection';
import StaggeredReveal from './components/StaggeredReveal';
import ScrollReveal from './components/ScrollReveal';

// Lazy load heavy components
const ContactForm = lazy(() => import('./components/ContactForm'));
const CompoundInterestCalculator = lazy(() => import('./components/CompoundInterestCalculator'));
const BucketVisualization = lazy(() => import('./components/BucketVisualization'));

function App() {
  const { user, loading, signOut } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showStartFree, setShowStartFree] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowStartFree(true);
  };

  const handleSwitchToSignIn = () => {
    setShowStartFree(false);
    setShowSignIn(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50" style={{backgroundColor: '#4a196d'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <LazyImage src="/original-on-transparent.png" alt="Portfolyze Logo" className="h-8" />
            </div>
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm">
                    Welcome, {user.displayName || 'User'}
                  </span>
                  <button 
                    onClick={handleSignOut}
                    className="bg-white hover:bg-gray-100 text-purple-900 px-6 py-2 rounded-lg font-medium transition-colors">
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowSignIn(true)}
                    className="text-white hover:text-gray-200 px-4 py-2 font-medium transition-colors">
                    Sign in
                  </button>
                  <button 
                    onClick={() => setShowStartFree(true)}
                    className="bg-white hover:bg-gray-100 text-purple-900 px-6 py-2 rounded-lg font-medium transition-colors">
                    Start free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <ScrollReveal direction="left" delay={200}>
              <div className="text-left bg-white p-8 rounded-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Welcome to <span style={{color: '#4a196d'}}>Portfolyze</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
                  Your personal Indian financial portfolio tracker
                </p>
                <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                  Portfolyze helps you take control of your money by organizing your investments into three smart buckets — the <strong>Folyze Buckets</strong>. 
                  With a simple, clear dashboard, you can track your trades, current holdings, and progress toward your financial goals.
                </p>
                {user ? (
                  <a 
                    href="https://app.portfolyze.com"
                    className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:shadow-lg hover:scale-105 inline-flex items-center space-x-2" style={{backgroundColor: '#4a196d'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#3d1458'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4a196d'}>
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                ) : (
                  <button 
                    onClick={() => setShowStartFree(true)}
                    className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:shadow-lg hover:scale-105 inline-flex items-center space-x-2" style={{backgroundColor: '#4a196d'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#3d1458'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4a196d'}>
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </ScrollReveal>
            
            {/* Right Image */}
            <ScrollReveal direction="right" delay={400}>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-xl p-6 space-y-6">
                  {/* Mock Dashboard Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <LazyImage src="/Primary on transparent.png" alt="Logo" className="w-6 h-6" />
                      <span className="text-gray-800 font-bold text-lg">Portfolyze Dashboard</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Last updated: Today
                    </div>
                  </div>
                  
                  {/* Portfolio Overview Cards */}
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-1">Folyze Investment Buckets Progress</h3>
                      <p className="text-xs text-gray-500">Track your investment goals by Folyze bucket allocation</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                      {/* Bucket 1 - Purple Diamond */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-2">Goal: ₹25.0L</div>
                        <div className="relative w-20 h-20 mx-auto mb-3">
                          {/* Diamond outline */}
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <defs>
                              <clipPath id="diamond1">
                                <polygon points="50,10 85,50 50,90 15,50" />
                              </clipPath>
                            </defs>
                            {/* Diamond border */}
                            <polygon 
                              points="50,10 85,50 50,90 15,50" 
                              fill="none" 
                              stroke="#d1d5db" 
                              strokeWidth="2"
                            />
                            {/* Liquid fill */}
                            <polygon 
                              points="50,10 85,50 50,90 15,50" 
                              fill="#7c3aed" 
                              clipPath="url(#diamond1)"
                              style={{clipPath: 'polygon(0% 63.1%, 100% 63.1%, 100% 100%, 0% 100%)'}}
                            />
                            {/* Percentage text */}
                            <text 
                              x="50" 
                              y="55" 
                              textAnchor="middle" 
                              className="text-xs font-bold fill-white"
                              fontSize="12"
                            >
                              63.1%
                            </text>
                          </svg>
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Folyze Bucket 1 - Short Term Goals</div>
                      </div>

                      {/* Bucket 2 - Orange Diamond */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-2">Goal: ₹40.0L</div>
                        <div className="relative w-20 h-20 mx-auto mb-3">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <defs>
                              <clipPath id="diamond2">
                                <polygon points="50,10 85,50 50,90 15,50" />
                              </clipPath>
                            </defs>
                            {/* Diamond border */}
                            <polygon 
                              points="50,10 85,50 50,90 15,50" 
                              fill="none" 
                              stroke="#d1d5db" 
                              strokeWidth="2"
                            />
                            {/* Liquid fill */}
                            <polygon 
                              points="50,10 85,50 50,90 15,50" 
                              fill="#f97316" 
                              clipPath="url(#diamond2)"
                              style={{clipPath: 'polygon(0% 62.9%, 100% 62.9%, 100% 100%, 0% 100%)'}}
                            />
                            {/* Percentage text */}
                            <text 
                              x="50" 
                              y="55" 
                              textAnchor="middle" 
                              className="text-xs font-bold fill-white"
                              fontSize="12"
                            >
                              62.9%
                            </text>
                          </svg>
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Folyze Bucket 2 - Financial Freedom</div>
                      </div>

                      {/* Bucket 3 - Teal Diamond */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-2">Goal: ₹35.0L</div>
                        <div className="relative w-20 h-20 mx-auto mb-3">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <defs>
                              <clipPath id="diamond3">
                                <polygon points="50,10 85,50 50,90 15,50" />
                              </clipPath>
                            </defs>
                            {/* Diamond border */}
                            <polygon 
                              points="50,10 85,50 50,90 15,50" 
                              fill="none" 
                              stroke="#d1d5db" 
                              strokeWidth="2"
                            />
                            {/* Liquid fill */}
                            <polygon 
                              points="50,10 85,50 50,90 15,50" 
                              fill="#0d9488" 
                              clipPath="url(#diamond3)"
                              style={{clipPath: 'polygon(0% 63.0%, 100% 63.0%, 100% 100%, 0% 100%)'}}
                            />
                            {/* Percentage text */}
                            <text 
                              x="50" 
                              y="55" 
                              textAnchor="middle" 
                              className="text-xs font-bold fill-white"
                              fontSize="12"
                            >
                              63.0%
                            </text>
                          </svg>
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Folyze Bucket 3 - Wealth Compounder</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Total Portfolio Value */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm font-medium">Total Portfolio Value</span>
                      <span className="text-green-600 text-sm font-medium">+15.2% ↗</span>
                    </div>
                    <div className="text-gray-900 text-2xl font-bold mb-2">₹17,02,000</div>
                  </div>
                  
                  {/* Progress Indicators */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-gray-700 text-sm font-medium mb-3">Financial Freedom Progress</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Monthly Income Goal</span>
                        <span className="text-gray-900 font-medium">₹50,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <div className="text-xs text-gray-500">25% complete - ₹37,500 to go!</div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Folyze Buckets Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="w-10 h-10 text-yellow-500 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">
                What are Folyze Buckets?
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We divide your investments into three easy-to-understand buckets to match your life goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Bucket 1 */}
            <div className="bg-white p-10 rounded-2xl border border-purple-200 hover:shadow-xl transition-all shadow-lg hover:border-purple-300">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-purple-600 font-semibold text-sm">BUCKET 1</span>
                  <h3 className="text-2xl font-bold text-gray-900">Short-Term Goals</h3>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                For things you need in the near future: home repairs, car, jewelry, vacations, kids' fees, etc.
              </p>
              <p className="text-purple-700 font-medium text-lg">
                ✅ Stay focused on immediate needs without touching your long-term investments.
              </p>
            </div>

            {/* Bucket 2 */}
            <div className="bg-white p-10 rounded-2xl border border-orange-200 hover:shadow-xl transition-all shadow-lg hover:border-orange-300">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mr-4">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-orange-600 font-semibold text-sm">BUCKET 2</span>
                  <h3 className="text-2xl font-bold text-gray-900">Monthly Income / Financial Freedom</h3>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                Designed to generate steady monthly income.
              </p>
              <p className="text-orange-700 font-medium text-lg">
                ✅ Once your income from this bucket is higher than your lifestyle expenses, you achieve financial freedom — the point where you no longer depend on a job to sustain your lifestyle.
              </p>
            </div>

            {/* Bucket 3 */}
            <div className="bg-white p-10 rounded-2xl border border-teal-200 hover:shadow-xl transition-all shadow-lg hover:border-teal-300">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-teal-600 font-semibold text-sm">BUCKET 3</span>
                  <h3 className="text-2xl font-bold text-gray-900">Long-Term Wealth (Compounding)</h3>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                For building serious wealth over the long run.
              </p>
              <p className="text-teal-700 font-medium text-lg">
                ✅ This bucket uses the power of compounding to grow your money over decades — securing your future and potentially creating generational wealth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compound Interest Calculator */}
      <LazySection>
        <Suspense fallback={
          <div className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse bg-white rounded-2xl h-96 shadow-xl"></div>
            </div>
          </div>
        }>
          <CompoundInterestCalculator onStartFree={() => setShowStartFree(true)} user={user} />
        </Suspense>
      </LazySection>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-4">
              <Settings className="w-10 h-10 text-gray-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">
                How does Portfolyze work?
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              After signing in, you can access:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8" style={{color: '#4a196d'}} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trades</h3>
              <p className="text-gray-600 leading-relaxed">
                Record all your investments, both buy and sell.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <PiggyBank className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Holdings</h3>
              <p className="text-gray-600 leading-relaxed">
                See your up-to-date portfolio across all assets.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Buckets</h3>
              <p className="text-gray-600 leading-relaxed">
                Track progress toward your goals with the Folyze Buckets system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Portfolyze Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-10 h-10 text-purple-500 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">
                Why use Portfolyze?
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-8 h-8" style={{color: '#4a196d'}} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Organize your money with purpose</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track financial freedom and wealth milestones</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Eye className="w-8 h-8" style={{color: '#4a196d'}} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visualize your progress in one place</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Make smarter investment decisions</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Bucket Visualization Section */}
      <LazySection>
        <Suspense fallback={
          <div className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse bg-white rounded-2xl h-96 shadow-xl"></div>
            </div>
          </div>
        }>
          <BucketVisualization />
        </Suspense>
      </LazySection>

      {/* Call to Action Section */}
      <section className="py-24" style={{backgroundColor: '#4a196d'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Buckets?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Start tracking your investments across all three Folyze Buckets and watch your wealth grow systematically
          </p>
          {user ? (
            <a 
              href="https://app.portfolyze.com"
              className="bg-white hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2"
              style={{color: '#4a196d'}}
            >
              <Target className="w-5 h-5" />
              <span>Go to Dashboard</span>
            </a>
          ) : (
            <button 
              onClick={() => setShowStartFree(true)}
              className="bg-white hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2"
              style={{color: '#4a196d'}}
            >
              <Target className="w-5 h-5" />
              <span>Start Portfolio Tracking</span>
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <LazyImage src="/Original on transparent.png" alt="Portfolyze Logo" className="h-8" />
            </div>
          </div>
          
          {/* Footer Links */}
          <div className="flex justify-center items-center space-x-6 pt-4 border-t border-gray-800">
            <span className="text-xs text-gray-500">© 2025 Portfolyze</span>
            <button
              onClick={() => setShowContact(true)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Contact us
            </button>
            <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy
            </button>
            <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms of use
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SignInModal 
        isOpen={showSignIn} 
        onClose={() => setShowSignIn(false)} 
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <StartFreeModal 
        isOpen={showStartFree} 
        onClose={() => setShowStartFree(false)} 
        onSwitchToSignIn={handleSwitchToSignIn}
      />
      <Suspense fallback={null}>
        <ContactForm isOpen={showContact} onClose={() => setShowContact(false)} />
      </Suspense>
    </div>
  );
}

export default App;