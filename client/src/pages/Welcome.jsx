import { Link } from "react-router-dom";

function Welcome() {
    return (
    <div>
        <h1>Welcome</h1>
        <p>COOL ANIMATION HERE</p>
        <Link to="/Login"> <button> Login here</button> </Link> 
    </div>
    );
}

export default Welcome;