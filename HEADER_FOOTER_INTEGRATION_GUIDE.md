# Header & Footer Integration Guide for App.Portfolyze

## 📦 **Components Provided**

### 1. **Header Component** (`src/components/Header.tsx`)
- Responsive header with Portfolyze branding
- Authentication state management
- Configurable auth buttons
- Links back to main website

### 2. **Footer Component** (`src/components/Footer.tsx`)
- Consistent footer with logo and links
- Contact form integration
- Copyright and legal links

## 🔧 **Required Dependencies**

Make sure your app.portfolyze project has these dependencies:

```bash
npm install firebase lucide-react react react-dom
```

## 📁 **Required Files to Copy**

Copy these files from the homepage project to your app project:

```
src/
├── components/
│   ├── Header.tsx          # ✅ Provided above
│   ├── Footer.tsx          # ✅ Provided above
│   ├── LazyImage.tsx       # 📋 Copy from homepage
│   └── ContactForm.tsx     # 📋 Copy from homepage
├── hooks/
│   └── useAuth.ts          # 📋 Copy from homepage
└── config/
    └── firebase.ts         # 📋 Copy from homepage
```

## 🖼️ **Required Assets**

Copy these assets to your `public/` folder:

```
public/
└── Original on transparent.png  # Portfolyze logo
```

## 🎨 **Required Styles**

Make sure your project has Tailwind CSS configured with these colors:

```css
/* Add to your Tailwind config or CSS */
.bg-purple-900 { background-color: #4a196d; }
.text-purple-900 { color: #4a196d; }
```

## 🚀 **Integration Example**

### **Basic App Layout:**

```tsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - No auth buttons needed in dashboard */}
      <Header showAuthButtons={false} />
      
      {/* Your dashboard content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to your Portfolio Dashboard, {user?.displayName}!
          </h1>
          {/* Your dashboard components */}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
```

### **With Authentication Buttons (if needed):**

```tsx
import React, { useState } from 'react';
import Header from './components/Header';
import SignInModal from './components/SignInModal';
import StartFreeModal from './components/StartFreeModal';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showStartFree, setShowStartFree] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        onSignIn={() => setShowSignIn(true)}
        onStartFree={() => setShowStartFree(true)}
        showAuthButtons={true}
      />
      
      {/* Your content */}
      <main>...</main>
      
      <Footer />
      
      {/* Modals */}
      <SignInModal 
        isOpen={showSignIn} 
        onClose={() => setShowSignIn(false)} 
      />
      <StartFreeModal 
        isOpen={showStartFree} 
        onClose={() => setShowStartFree(false)} 
      />
    </div>
  );
}
```

## ⚙️ **Header Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSignIn` | `() => void` | `undefined` | Callback for sign in button |
| `onStartFree` | `() => void` | `undefined` | Callback for start free button |
| `showAuthButtons` | `boolean` | `true` | Show/hide auth buttons |

## 🔗 **Navigation Structure**

### **Header Links:**
- **Logo** → Links to `https://www.portfolyze.com` (homepage)
- **Sign In** → Opens sign in modal
- **Start Free** → Opens sign up modal
- **Sign Out** → Signs out user and redirects to homepage

### **Footer Links:**
- **Contact Us** → Opens contact form modal
- **Privacy** → Privacy policy (implement as needed)
- **Terms of Use** → Terms of service (implement as needed)

## 🎯 **Key Features**

### **Header:**
- ✅ Sticky positioning
- ✅ Responsive design
- ✅ Authentication state awareness
- ✅ Consistent branding
- ✅ Purple theme (`#4a196d`)

### **Footer:**
- ✅ Contact form integration
- ✅ Legal links
- ✅ Consistent styling
- ✅ Logo display

## 🔒 **Authentication Integration**

The header automatically:
- Shows user's display name when signed in
- Provides sign out functionality
- Hides auth buttons when `showAuthButtons={false}`
- Redirects to homepage after sign out

## 📱 **Responsive Design**

Both components are fully responsive:
- Mobile-first approach
- Proper spacing on all screen sizes
- Touch-friendly buttons
- Optimized for tablets and desktop

## 🚨 **Important Notes**

1. **Firebase Config**: Make sure your `.env` file has the same Firebase configuration
2. **Domain Setup**: Update any hardcoded URLs to match your domain structure
3. **Asset Paths**: Ensure logo assets are in the correct public folder location
4. **Styling**: Maintain consistent Tailwind CSS classes across projects

This setup ensures your app.portfolyze dashboard has the same professional header and footer as the main website while being optimized for the dashboard experience.