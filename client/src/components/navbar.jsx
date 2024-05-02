
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import * as React from 'react'
import { useAuth } from "@clerk/clerk-react"
import {useNavigate } from "react-router-dom"

function Navbar(){

    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()

    console.log('test', userId)

    React.useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in")
        }
    }, [isLoaded, navigate, userId]);

    return(
        <div className="object-top w-screen flex items-center justify-center bg-stone-800 h-16">
            <div className="flex items-center justify-center">
                <div className="text-2xl font-bold text-white">Nats Public Library</div>
            <nav>
                <ul>
                <button className="hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-2xl"><li><Link to="/Home">Catalogue</Link></li></button>
                <button className="hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-2xl"><li><Link to="/Personal">Personal Library</Link></li></button>
                </ul>
            </nav>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </div>
        </div>
    )
}
export default Navbar;
