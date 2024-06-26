
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import * as React from 'react'
import { useAuth, useUser } from "@clerk/clerk-react"
import {useNavigate } from "react-router-dom"

function Navbar(){

    const { userId, isLoaded } = useAuth();
    const { user } = useUser();

    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in");
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
                    {
                    user?.publicMetadata?.role === 'admin' &&
                    <button className="hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-2xl"><li><Link to="/Admin">Admin Books</Link></li></button>
                    }
                    {
                    user?.publicMetadata?.role === 'admin' &&
                    <button className="hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-2xl"><li><Link to="/AdminUsers">Admin Users</Link></li></button>
                    }
                    </ul>
                </nav>
                <div className="scale-150 m-4">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>
    )
}
export default Navbar;
