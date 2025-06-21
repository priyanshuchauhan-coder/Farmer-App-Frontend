// import {React} from 'react'
// import {Link,useLocation,useNavigate} from "react-router-dom"

// import { Container, Row, Col } from 'react-bootstrap';
// const Navbar = () => {
//   const navigate=useNavigate();
//  const handleLogout=()=>{
//   localStorage.removeItem('user');
//   navigate("/login");
//  }

//   let location = useLocation();

//   // useEffect(() => {
   
//   // }, [location]);
//   return (
    
// //     <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
// //   <div className="container-fluid">
// //     <Link className="navbar-brand" href="/">FarmEzy</Link>
// //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
// //       <span className="navbar-toggler-icon"></span>
// //     </button>
// //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
// //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
// //         <li className="nav-item">
// //           <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
// //         </li>
// //         <li className="nav-item">
// //           <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
// //         </li>
        
// //       </ul>
// //       {!localStorage.getItem('token')? <form className="d-flex" role="search">
       
// //       <Link className="btn btn-primary mx-2" to={"/login"} role="button">Log In</Link>
// //       <Link className="btn btn-primary mx-2" to={"/signup"} role="button">Sign Up</Link>
// //       </form>: <button onClick={handleLogout} className="btn btn-primary">Log Out</button> }
// //     </div>
// //   </div>
// // </nav>

//       <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
//         <Container>
//           <a className="navbar-brand" href="#">
//             <img src="logo.png" alt="FarmEzy" height="40" />
//           </a>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 {/* <a className="nav-link active" href="#">Home</a> */}
//                 <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 {/* <a className="nav-link" href="#crop-prediction">Crop Prediction</a> */}
//                 <Link className={`nav-link ${location.pathname==="/cropPrediction"? "active": ""}`} aria-current="page" to="/">Crop Prediction</Link>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#market-access">Market Access</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#about">About Us</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#contact">Contact</a>
//               </li>
//             </ul>
//             {!localStorage.getItem('token')? <form className="d-flex" role="search">
       
//              <Link className="btn btn-success mx-2" to={"/login"} role="button">Log In</Link>
//               <Link className="btn btn-success mx-2" to={"/signup"} role="button">Sign Up</Link>
//               </form>: <button onClick={handleLogout} className="btn btn-primary">Log Out</button> }
//           </div>
//         </Container>
//       </nav>
    
//   )
// }

// export default Navbar


import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  useContext } from 'react';
import { Container } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import logo from '../assets/logo.png';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {  user,setUser } = useContext(AuthContext);
  const isLoggedIn = (!!localStorage.getItem('userProfile') && user); // or 'token' if using token-based auth
 

  const handleLogout = () => {
    document.cookie = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    localStorage.removeItem('userProfile'); // or 'token'
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
      <Container>
        {/* <Link className="navbar-brand" to="/">
          <img src={logo} alt="FarmEzy" height="40" />
          <h4>FarmEzy</h4>
        </Link> */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
  <img src={logo} alt="FarmEzy" height="40" />
  <h4 className="mb-0  text-white">FarmEzy</h4>
</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <>
               <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} to="/dashboard">Main Prediction</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/prediction-dashboard" ? "active" : ""}`} to="/prediction-dashboard">Crop Prediction</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/ecommerce-dashboard" ? "active" : ""}`} to="/ecommerce-dashboard">Market Access</Link>
            </li></> ):(<></>)}
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About Us</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact</Link>
            </li>
          </ul>

          {!isLoggedIn ? (
            <div className="d-flex">
              <Link className="btn btn-success mx-2" style={{backgroundColor:"green"}} to="/login">Log In</Link>
              <Link className="btn btn-success mx-2" style={{backgroundColor:"green"}} to="/signup">Sign Up</Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
