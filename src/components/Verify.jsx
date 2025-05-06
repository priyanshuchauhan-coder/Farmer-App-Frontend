import {useParams,useNavigate} from 'react-router-dom';
import { React,useState,useContext } from 'react';
import authContext from "../context/auth/authContext";

function Verify() {
  let navigate=useNavigate();
    const aucontext = useContext(authContext);
    const {error,verifyEmail}=aucontext;
    const {slug}=useParams();
    const [token,setToken]=useState(slug);

    const handleSubmit=async (e)=>{
        e.preventDefault();
      await verifyEmail(token);
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
        
        setToken(e.target.value);
    }
  return (
    <div>
    <h1 className="text-center">Verify Email Address </h1>
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <div className="form-group">
        <label htmlFor="code" className='fs-3'>Verification Code</label>
        <input
          type="text"
          className="form-control"
          id="code"
          
          placeholder="Enter Code"
          name="code"
          onChange={onChange}
          value={token}
        />
        
      </div>
      <button type="submit" className="btn btn-primary my-3 align-center" >
       Verify Email
      </button>
    </form>
  </div>
  )
}

export default Verify
