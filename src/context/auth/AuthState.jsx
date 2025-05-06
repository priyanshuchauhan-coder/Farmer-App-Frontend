import axios from "axios";
import { useState, useContext } from "react";

import alertContext from "../alert/alertContext";
import AuthContext from "./authContext";
const baseURL = "http://localhost:5000/api/auth/";

const AuthState = (props) => {
  const alcontext = useContext(alertContext);
  const { showAlert } = alcontext;

  const [user, setUser] = useState(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });
  const [error,setError]=useState({status:false,msg:""});

  const login = async (payload) => {
    await axios
      .post(`${baseURL}login`, payload, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(async (response) => {
        console.log(response);

        const json = await response.data;
        console.log(json);
        setError({status:json.success,msg:json.error})
        if (json.success) {
          showAlert("Successfully Logged In", "success");
          fetchUser();
        } else {
          showAlert("Invalid Credentials", "danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate("/");
  };
  const signup = async (payload) => {
    await axios
      .post(`${baseURL}createuser`, payload, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(async (response) => {
        const json = await response.data;
        console.log(json);
        setError({status:json.success,msg:json.error})
        if (json.success) {
          showAlert("Successfully Logged In", "success");
        
        } else {
          showAlert("Invalid Credentials", "danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate("/");
  };

  const fetchUser=async ()=>{
    await axios
    .get(`${baseURL}getuser`, {
      withCredentials: true,
    })
    .then(async (resp) => {
      let json=resp.data;
      setError({status:json.success,msg:json.error})
      localStorage.setItem("userProfile", JSON.stringify(resp.data));
      setUser(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const verifyEmail=async (payload)=>{
    await axios
      .post(`${baseURL}verify`,{}, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "email_auth_token":payload,
        },
        withCredentials: true,
      })
      .then(async (response) => {
        const json = await response.data;
        console.log(json);
        setError({status:json.success,msg:json.error});
        if (json.success) {
          showAlert("Email Successfully Verified", "success");
          fetchUser();
        } else {
          showAlert("Invalid Verification Code", "danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate("/");

  }

  const forgotPassword=async (payload)=>{
    await axios
      .post(`${baseURL}forgot-password`, {},{
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          email:payload,
        },
        withCredentials: true,
      })
      .then(async (response) => {
        const json = await response.data;
        console.log(json);
        setError({status:json.success,msg:json.error});
        if (json.success) {
          showAlert("Forgot Email Successfully Sent", "success");
          
        } else {
          showAlert("Invalid Email Id", "danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate("/");

  }
  const resetPassword=async (payload)=>{
    await axios
      .post(`${baseURL}reset-password`,{password:payload.password}, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "forgot_password_token":payload.ftoken,
        },
        withCredentials: true,
      })
      .then(async (response) => {
        const json = await response.data;
        console.log(json);
        setError({status:json.success,msg:json.error});
        if (json.success) {
          showAlert("Reset Password Successfully Done", "success");
         
        } else {
          showAlert("Invalid Token", "danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate("/");

  }
  const resendEmail=async ()=>{
    await axios
      .post(`${baseURL}resend_email`,{}, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          
        },
        withCredentials: true,
      })
      .then(async (response) => {
        const json = await response.data;
        console.log(json);
        setError({status:json.success,msg:json.error});
        if (json.success) {
          showAlert("Verification Email Sent Successfully", "success");
         
        } else {
          showAlert("Invalid Token", "danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate("/");

  }

  return (
    <AuthContext.Provider value={{ user,error,fetchUser, login, signup ,verifyEmail,resetPassword,forgotPassword,resendEmail}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
