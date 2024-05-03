import React from "react";
import { useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, SignedOut, useAuth } from "@clerk/clerk-react";

export default function IndexPage() {

    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    console.log('test', userId);

    React.useEffect(() => {
        if (isLoaded && userId) {
            navigate("/Home");
        }
    }, [isLoaded, navigate, userId]);

    return (
        <div className="m-8">
            <h1 className="text-6xl m-8" >WELCOME TO NATS LIBRARY</h1>
            <SignedOut>
                <SignInButton className="hover:bg-rose-400 p-px px-2 rounded mx-2 bg-white text-6xl text-black m-4" />
                <SignUpButton className="hover:bg-rose-400 p-px px-2 rounded mx-2 bg-white text-6xl text-black m-4" />
            </SignedOut>
            
            
        </div>
    )
}
