import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react"
import alertContext from "../context/alert/alertContext";
import authContext from "../context/auth/authContext";

const User = () => {
    const alcontext = useContext(alertContext);
    const aucontext = useContext(authContext);
    const { showAlert } = alcontext;
    const { error,user,fetchUser } = aucontext;

    // useEffect(async ()=>{
    //     await fetchUser();
        // const interval=setInterval(async ()=>{
        //     await fetchUser();
        // },10000)
        // return()=>{
        //     clearInterval(interval)
        // }
        
    // },[])
  return (

    <>
      
    <div>
      <div className="p-5 text-center bg-body-tertiary rounded-3">
    <h1 className="text-body-emphasis">Welcome to Application</h1>
    <p className="lead">
    {(error.status==true && user==null) ? "Please Verify Your Email , Verification Link Sent and Refresh This Page ":`Welcome ${user.userInfo.name} `} 
    </p>
  </div>
    
    
  {/* <div className="px-4 py-5 my-5 text-center">
    <img className="d-block mx-auto mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
    <h1 className="display-5 fw-bold text-body-emphasis">Centered hero</h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
        <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button>
      </div>
    </div>
  </div> */}
    </div>
    </>
  )
}

export default User
