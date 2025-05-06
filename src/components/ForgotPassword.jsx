import { React,useState,useContext } from 'react';
import authContext from "../context/auth/authContext";

const ForgotPassword = () => {
    const aucontext = useContext(authContext);
    const {forgotPassword}=aucontext;
    
    const [email,setEmail]=useState("");

    const handleSubmit=async (e)=>{
        e.preventDefault();
       forgotPassword(email);
       
        
    }

    const onChange = (e) => {
        
        setEmail(e.target.value);
    }
  return (
    <div>
    <h1 className="text-center">Forgot Password </h1>
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <div className="form-group">
        <label htmlFor="email" className='fs-3'>Email Address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          
          placeholder="Enter Email Address"
          name="email"
          onChange={onChange}
          value={email}
          required
        />
        
      </div>
      <button type="submit" className="btn btn-primary my-3 align-center" >
       Send Reset Password Link
      </button>
    </form>
  </div>
  )
}

export default ForgotPassword
