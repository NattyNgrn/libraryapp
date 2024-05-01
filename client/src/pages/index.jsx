import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

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
        <div>
            <h1>This is the index page</h1>
            <div>
                <ul>
                <li><Link to="/sign-up">Sign Up</Link></li>
                <li><Link to="/sign-in">Sign In</Link></li>
                </ul>
            </div>
        </div>
    )
}
