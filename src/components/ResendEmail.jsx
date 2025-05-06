import {React,useContext} from 'react'
import {useNavigate}  from 'react-router-dom'
import authContext from "../context/auth/authContext";

const ResendEmail = () => {
  let navigate=useNavigate();
  const aucontext = useContext(authContext);
  const {error, resendEmail } = aucontext;
  const handleSubmit=async (e)=>{
    e.preventDefault();
    
   await resendEmail();
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
  return (
    <div className="px-4 py-5 my-5 text-center">
    {/* <img className="d-block mx-auto mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
    <h1 className="display-5 fw-bold text-body-emphasis">Authentication</h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">Please Verify Your Email First</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={handleSubmit}>Resend Email</button>
        
      </div>
    </div>
  </div>
  )
}

export default ResendEmail
