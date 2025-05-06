

import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react"
import alertContext from "../context/alert/alertContext";
import authContext from "../context/auth/authContext";






const Signup = () => {
  const alcontext = useContext(alertContext);
  const aucontext = useContext(authContext);
  const { showAlert } = alcontext;
  const { error,signup } = aucontext;

  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
   let navigate=useNavigate();

    const handleSubmit=async (e)=>{
      console.log("hi");
        e.preventDefault();
        const url=`http://localhost:5000/api/auth/createuser`
        if(credentials.password!==credentials.cpassword)
        {
          showAlert("Confirm Password is not Same");
          return;
        }
        const data={name:credentials.name,email:credentials.email,password:credentials.password}
        console.log(data);
       await signup(data);
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
      <h1 className='text-center'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
     
      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter Your Name"
            name="name"
            onChange={onChange}
            value={credentials.name}
            required
          />
          
        </div>
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
            required
          />
          
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
            required
            minLength={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Confirm Password"
            name="cpassword"
            onChange={onChange}
            value={credentials.cpassword}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary my-3" >
         Sign Up
        </button>
      </form>
  
    </div>
  )
}

export default Signup
