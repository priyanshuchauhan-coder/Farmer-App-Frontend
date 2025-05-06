import {useParams,useNavigate} from 'react-router-dom';
import { React,useState,useContext } from 'react';
import authContext from "../context/auth/authContext";

const ResetPassword = () => {
  let navigate=useNavigate();
    const aucontext = useContext(authContext);
    const {error,resetPassword}=aucontext;
    const {slug}=useParams();
    const [credentials,setCredentials]=useState({password:"",cpassword:"",ftoken:slug});

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(credentials.password!==credentials.cpassword)
        {
            // showAler
        }
        const data={password:credentials.password,cpassword:credentials.cpassword,ftoken:credentials.ftoken}
       resetPassword(data);
       if(error.status==false)
       {
        navigate("/user");
       }
       else
       {
        // showAlert(error.msg);
        console.log(error.msg);
       }
       
        
    }

    const onChange = (e) => {
        
        setCredentials({...credentials,[e.target.name]:e.target.value
        })
    }
  return (
    <div>
      <h1 className="text-center">Reset Password </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            required
          />
         
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Password"
            name="cpassword"
            onChange={onChange}
            value={credentials.cpassword}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="code" className='fs-3'>Verification Code</label>
        <input
          type="text"
          className="form-control"
          id="code"
          
          placeholder="Enter Code"
          name="ftoken"
          onChange={onChange}
          value={credentials.ftoken}
          required
        />
        </div>

        <button type="submit" className="btn btn-primary my-3" >
        Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPassword