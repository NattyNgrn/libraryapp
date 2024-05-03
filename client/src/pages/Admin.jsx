import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Catalogue from '../components/catalogue';

export default function Admin() {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !user.id) {
            navigate("/sign-in")
        } else if (isLoaded && user.id && user.publicMetadata?.role !== 'admin') {
            navigate("/home");
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
            <h1 className="text-4xl font-bold pt-3">Catalogue Administrator Mode</h1>
            <Catalogue books={books} personalMode={false} adminMode={true} />
        </div>
    );
}
