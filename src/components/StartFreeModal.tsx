import React, { useState, useEffect } from 'react';
import { X, Shield, Smartphone, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ConfirmationResult } from 'firebase/auth';

interface StartFreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn?: () => void;
}

const StartFreeModal: React.FC<StartFreeModalProps> = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const { sendOTP, verifyOTP, cleanupRecaptcha } = useAuth();

  useEffect(() => {
    // Cleanup recaptcha when component unmounts or modal closes
    return () => {
      if (!isOpen) {
        cleanupRecaptcha();
      }
    };
  }, [isOpen, cleanupRecaptcha]);

  if (!isOpen) return null;

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || mobile.length !== 10) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await sendOTP(mobile, 'recaptcha-container-signup');
      setConfirmationResult(result);
      setStep('otp');
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || otp.length !== 6 || !confirmationResult) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await verifyOTP(confirmationResult, otp, name);
      // Success - user account created and signed in
      resetForm();
      onClose();
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error: any) => {
    switch (error.code) {
      case 'auth/invalid-phone-number':
        return 'Invalid phone number format';
      case 'auth/too-many-requests':
        return 'Too many requests. Please try again later';
      case 'auth/invalid-verification-code':
        return 'Invalid OTP. Please check and try again';
      case 'auth/code-expired':
        return 'OTP has expired. Please request a new one';
      default:
        return 'An error occurred. Please try again';
    }
  };

  const resetForm = () => {
    setName('');
    setMobile('');
    setOtp('');
    setStep('details');
    setError('');
    setConfirmationResult(null);
    cleanupRecaptcha();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSwitchToSignIn = () => {
    resetForm();
    onClose();
    if (onSwitchToSignIn) {
      onSwitchToSignIn();
    }
  };

  const handleResendOTP = async () => {
    if (!mobile) return;
    
    setIsLoading(true);
    setError('');
    setOtp('');
    
    try {
      const result = await sendOTP(mobile, 'recaptcha-container-signup');
      setConfirmationResult(result);
    } catch (error: any) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="relative p-8 pb-6">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {step === 'details' ? (
                <User className="w-8 h-8 text-white" />
              ) : (
                <Smartphone className="w-8 h-8 text-white" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 'details' ? 'Create Account' : 'Verify Mobile'}
            </h2>
            <p className="text-gray-500">
              {step === 'details' 
                ? 'Enter your details to get started'
                : 'Enter the OTP sent to your mobile'
              }
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {step === 'details' ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-lg"
                    maxLength={10}
                    required
                  />
                </div>
                {mobile.length > 0 && mobile.length < 10 && (
                  <p className="text-red-500 text-xs mt-2">Please enter a valid 10-digit mobile number</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !name.trim() || mobile.length !== 10}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-500 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSwitchToSignIn}
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="text-center mb-6">
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-600">Creating account for:</p>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-600">+91 {mobile}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-center text-2xl tracking-widest font-mono"
                  maxLength={6}
                  required
                />
                <p className="text-gray-500 text-xs mt-2 text-center">
                  OTP sent to +91 {mobile}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>

              <div className="flex justify-between items-center text-sm pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  ← Edit details
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {/* Terms */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <button className="text-purple-600 hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-purple-600 hover:underline">Privacy Policy</button>
            </p>
          </div>
        </div>
        
        {/* Hidden reCAPTCHA container */}
        <div id="recaptcha-container-signup"></div>
      </div>
    </div>
  );
};

export default StartFreeModal;