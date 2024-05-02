
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="object-top w-screen flex items-center justify-center bg-stone-800 h-16">
            <div className="flex items-center justify-center">
            <nav>
                <ul>
                <button className="hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base"><li><Link to="/Home">Home</Link></li></button>
                <button className="hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base"><li><Link to="/Personal">Personal</Link></li></button>
                <button className="hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base"><li><Link to="/Profile">Profile</Link></li></button>
                </ul>
            </nav>
            </div>
        </div>
    )
}
export default Navbar;
