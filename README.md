# Portfolyze - Portfolio Tracker

A modern Indian financial portfolio tracker built with React, TypeScript, and Firebase.

## Features

- **Mobile OTP Authentication** - Secure phone number-based authentication
- **Folyze Buckets System** - Organize investments into 3 smart buckets
- **Portfolio Tracking** - Track trades, holdings, and progress
- **Compound Interest Calculator** - Visualize wealth growth
- **Responsive Design** - Works on all devices

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd portfolyze
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication and select "Phone" as sign-in method
4. Get your Firebase configuration from Project Settings

### 3. Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Authentication Setup

1. In Firebase Console, go to Authentication > Sign-in method
2. Enable "Phone" authentication
3. Add your domain to authorized domains (for production)

### 5. Run the application

```bash
npm run dev
```

## Authentication Flow

- **Sign Up**: Name + Mobile Number → OTP Verification → Account Created
- **Sign In**: Mobile Number → OTP Verification → Signed In
- **Security**: Firebase handles OTP generation and verification

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Authentication**: Firebase Auth (Phone/OTP)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for Netlify/Vercel

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks (useAuth)
├── config/             # Firebase configuration
└── App.tsx             # Main application
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The app is ready to deploy on platforms like Netlify or Vercel. Make sure to:

1. Set environment variables in your deployment platform
2. Add your production domain to Firebase authorized domains
3. Configure reCAPTCHA for production (if needed)

## License

MIT License