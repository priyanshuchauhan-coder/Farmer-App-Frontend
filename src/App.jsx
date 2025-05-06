
import './App.css'



import "./App.css";
// react-roter-dom setup
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import NoMatch from "./components/NoMatch";
import Verify from "./components/Verify";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import ResendEmail from "./components/ResendEmail";

import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import User from "./components/User";


function App() {

  

  
  return (
    <>
    <AlertState>
    <AuthState>
    
    <Router>
      {
        /* All routes are nested inside it */
        <>
        <Navbar/>
        <Alert message="this is amazing react"/>
        <div className="container">
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verify/:slug" element={<Verify/>} />
        <Route path="/forgot_password" element={<ForgotPassword/>} />
        <Route path="/reset_password/:slug" element={<ResetPassword/>} />
        <Route path="/resend_email" element={<ResendEmail/>} />
        <Route path="/user" element={<User/>} />
        <Route path="*" element={<NoMatch />} />
        </Routes>
        </div>
        </>
      }
    </Router>
   
    </AuthState>
    </AlertState>
    </>
  );
}

export default App;
