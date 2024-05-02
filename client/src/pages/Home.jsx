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
            <Catalogue books={books} />
        </div>
    );
}

export default Home;