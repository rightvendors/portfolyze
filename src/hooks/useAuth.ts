import { useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  RecaptchaVerifier,
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
    const formattedPhone = `+91${phoneNumber}`;

    return new Promise<ConfirmationResult>((resolve, reject) => {
      grecaptcha.enterprise.ready(async () => {
        try {
          const token = await grecaptcha.enterprise.execute(6Lej3YwrAAAAAJcmQEdR5iU2cCbu9hToRMZIgYyW, {
            action: 'send_otp'
          });

          // reCAPTCHA token is retrieved, now proceed
          const verifier = initializeRecaptcha(containerId);
          const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, verifier);
          resolve(confirmationResult);
        } catch (error) {
          console.error('Error sending OTP with reCAPTCHA:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error preparing OTP with reCAPTCHA:', error);
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