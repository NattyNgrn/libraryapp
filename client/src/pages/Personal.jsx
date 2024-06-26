import { useState, useEffect } from 'react'
import { useAuth } from "@clerk/clerk-react"
import {useNavigate } from "react-router-dom"
import Catalogue from '../components/catalogue'

function Personal() {
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in")
        }
    }, [isLoaded, navigate, userId]);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (isLoaded) {
            fetch(`http://localhost:8219/getbooksforuser/${userId}`)
                .then(response => response.json())
                .then(data => setBooks(data))
                .catch(error => console.log(error));
        }
    }, [isLoaded, userId]);

    return (
        <div>
            <h1 className="text-4xl font-bold pt-3">Your Personal Library</h1>
            <Catalogue books={books} personalMode={true} adminMode={false} />
        </div>
    );
}

export default Personal;