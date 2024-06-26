import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"
import {useNavigate } from "react-router-dom"
import Catalogue from '../components/catalogue';

function Home() {

    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !user.id) {
            navigate("/sign-in")
        } else if (isLoaded && user.id) {
            fetch(`http://localhost:8219/checkadduser`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user.id, name: user.fullName })
            });
        }
    }, [isLoaded, navigate, user]);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8219/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold pt-3">Library Catalogue</h1>
            <Catalogue books={books} personalMode={false} adminMode={false} />
        </div>
    );
}

export default Home;