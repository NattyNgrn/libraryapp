import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css';
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";import { ClerkProvider } from '@clerk/clerk-react';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const ClerkWithRoutes = () => {
  const navigate = useNavigate()
  return(
    <ClerkProvider>
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-in/" element={<SignIn redirectUrl={'/protected'} routing="path" path="/sign-in" />}/>
      </Routes>
    </ClerkProvider>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes/>
        
    </BrowserRouter>
  </React.StrictMode>,
);
