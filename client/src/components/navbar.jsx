
import { Link } from "react-router-dom";

function NavBar(){
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
export default NavBar;