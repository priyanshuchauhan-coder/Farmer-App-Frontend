// // src/components/PrivateRoute.jsx
// import { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import  AuthContext  from '../context/AuthContext';

// export default function PrivateRoute({ children }) {
//   const { user } = useContext(AuthContext);
//   return user ? children : <Navigate to="/login" />;
// }

import { useContext } from 'react';
import { Navigate, } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { PredProvider} from '../context/PredContext';
import {EcommProvider} from '../context/EcomContext';


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Make sure 'user' is being set in login()
 
console.log("Private Routes", user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  

  return(
  <PredProvider>
    <EcommProvider>
  {children}
  </EcommProvider>
</PredProvider>
  )
};

export default PrivateRoute;
