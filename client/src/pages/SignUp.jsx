import { RedirectToSignUp, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import React from "react";

export default function SignUp() {

    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLoaded && userId) {
            navigate("/Home")
        }
    }, [isLoaded, navigate, userId]);

    return (
        <SignedOut>
            <RedirectToSignUp />
        </SignedOut>
    );
}
