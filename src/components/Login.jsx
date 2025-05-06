import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import alertContext from "../context/alert/alertContext";
import authContext from "../context/auth/authContext";






const Login =  () => {
  const alcontext = useContext(alertContext);
  const aucontext = useContext(authContext);
  const { showAlert } = alcontext;
  const { error,login } = aucontext;
  let navigate=useNavigate();

   const [credentials,setCredentials]=useState({email:"",password:""})
   

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const data={email:credentials.email,password:credentials.password}
       await login(data);
        if(error.status==false)
        {
         navigate("/user");
        }
        else
        {
         showAlert(error.msg);
        }
       
        
    }

    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value
      })
    }
  return (
    <div>
      <h1 className="text-center">Log In </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
            value={credentials.email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <div className="d-flex flex-row-reverse m-top-20">
        <Link className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'   to="/forgot_password">Forgot Password?</Link>
        </div>

        <button type="submit" className="btn btn-primary my-3" >
         Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
