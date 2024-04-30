
import UploadWidget from './components/uploadwidget';
import './App.css'
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import NavBar from './components/navbar';

function App() {

  return (
      <div>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Login" element={<SignedOut> <Login/> </SignedOut>} />
            <Route path="/Home" element={<SignedIn> <Home/> </SignedIn>} />
            <Route path="/Personal" element={<Personal />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>

      </div>
  )
}

export default App
 

