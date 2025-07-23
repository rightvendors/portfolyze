import { useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../config/firebase';

export interface AuthUser {
  uid: string;
  phoneNumber: string | null;
  displayName: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            phoneNumber: firebaseUser.phoneNumber,
            displayName: firebaseUser.displayName
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      // ✅ Return unsubscribe from inside then block
      return unsubscribe;
    })
    .catch((error) => {
      console.error('Error setting auth persistence:', error);
      setLoading(false);
    });
}, []);

  const initializeRecaptcha = (containerId: string = 'recaptcha-container') => {
  if (!recaptchaVerifier) {
    const verifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: (response: string) => {
        console.log('reCAPTCHA solved:', response);
        // reCAPTCHA solved — allow OTP sending to proceed
      },
      'expired-callback': () => {
        console.warn('reCAPTCHA expired. Please try again.');
        // You might want to reset the verifier here
      }
    }, auth);

    // Ensure the reCAPTCHA is rendered (especially for fallback to visible)
    verifier.render().then((widgetId: number) => {
      console.log('reCAPTCHA widget ID:', widgetId);
    });

    setRecaptchaVerifier(verifier);
    return verifier;
  }

  return recaptchaVerifier;
};

  const sendOTP = async (phoneNumber: string, containerId: string): Promise<ConfirmationResult> => {
    try {
      const verifier = initializeRecaptcha(containerId);
      const formattedPhone = `+91${phoneNumber}`;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, verifier);
      return confirmationResult;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  const verifyOTP = async (confirmationResult: ConfirmationResult, otp: string, displayName?: string) => {
    try {
      const result = await confirmationResult.confirm(otp);
      
      // If this is a sign-up (displayName provided), update the user profile
      if (displayName && result.user) {
        await updateProfile(result.user, {
          displayName: displayName
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const cleanupRecaptcha = () => {
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      setRecaptchaVerifier(null);
    }
  };

  return {
    user,
    loading,
    sendOTP,
    verifyOTP,
    signOut,
    cleanupRecaptcha
  };
};