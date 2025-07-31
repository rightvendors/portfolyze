// EmailJS Configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_portfolyze', // Replace with your actual service ID
  TEMPLATE_ID: 'template_portfolyze_contact', // Replace with your actual template ID
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Replace with your actual public key
  TO_EMAIL: 'ravisankarpeela@gmail.com',
  IS_CONFIGURED: false // Set to true when you have proper EmailJS credentials
};

// Email template parameters interface
export interface EmailTemplateParams {
  to_email: string;
  from_name: string;
  from_email: string;
  message: string;
  subject: string;
} 