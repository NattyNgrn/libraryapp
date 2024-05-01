import * as React from 'react'
import { useAuth } from "@clerk/clerk-react"
import {useNavigate } from "react-router-dom"
import Catalogue from '../components/catalogue';

function Home() {

    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    console.log('test', userId)

    React.useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in")
        }
    }, [isLoaded, navigate, userId]);

    return (
        <div>
            <Catalogue />
        </div>
    )
}

export default Home;