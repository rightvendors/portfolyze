# Portfolyze - Portfolio Tracker

A modern Indian financial portfolio tracker built with React, TypeScript, and Tailwind CSS.

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

### 2. Run the application

```bash
npm run dev
```

## Authentication Flow

- **Sign In / Sign Up**: Redirects to app.portfolyze.com for authentication
- **Security**: All user authentication is handled by the app subdomain

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Authentication**: Handled by app.portfolyze.com
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

The app is ready to deploy on platforms like Netlify or Vercel. No additional configuration is required since authentication is handled by app.portfolyze.com.

## License

MIT License