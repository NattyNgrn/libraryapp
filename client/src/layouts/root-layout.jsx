import { Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from '../components/navbar';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

export default function RootLayout() {

    const navigate = useNavigate();

    return (
        <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
            <header className="header">
                <div>
                <SignedIn>
                    <Navbar />
                </SignedIn>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </ClerkProvider>
    )
}
