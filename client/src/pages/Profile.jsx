import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import * as React from 'react'
import { useAuth } from "@clerk/clerk-react"
import {useNavigate } from "react-router-dom"

function Profile(){

    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()

    console.log('test', userId)

    React.useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in")
        }
    }, [isLoaded, navigate, userId]);

    return (
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile; 