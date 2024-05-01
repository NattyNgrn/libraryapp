
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div>
            <nav>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/Personal">Personal</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar;
