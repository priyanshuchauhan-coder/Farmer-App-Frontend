// src/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/FarmerDashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from "./components/Home";
import About from "./components/About";
// import Alert from "./components/Alert";
// import NoMatch from "./components/NoMatch";
import Verify from "./components/Verify";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
// import ResendEmail from "./components/ResendEmail";
// import Footer from "./components/Footer"

// import Login from "./components/Login";
import Signup from "./components/Signup";
import PredictionDashboard from './components/Prediction/PredictionDashboard';
import AllPredictionInputsPage from './components/Prediction/AllPredictionInput';

import PredictionInputDetail from './components/Prediction/PredictionInputDetail';
import PredictionOutput from './components/Prediction/PredictionOutput';
import PredictionRoute from './components/PredictionRoute';
import EcommerceDashboard from './components/Ecommerce/EcommerceDashboard';
import Contact from './components/Contact';
import AllCrops from './components/Ecommerce/AllCrops';
import EditPredictionInputPage from './components/Prediction/EditPredictionInput';
import CropFormPage from './components/Ecommerce/CropFormPage';
import FarmerCropsPage from './components/Ecommerce/FarmerCropsPage';
import CropDetailPage from './components/Ecommerce/CropDetailPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
      
        <Login />
      } />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <PredictionRoute>
            <Dashboard />
            </PredictionRoute>
          </PrivateRoute>
        }
        
      />
      <Route
        path="/prediction-dashboard"
        element={
          <PrivateRoute>
            <PredictionRoute>
            <PredictionDashboard />
            </PredictionRoute>
           
          </PrivateRoute>
        }
        />
        <Route
        path="/prediction-inputs"
        element={
          <PrivateRoute>
            <PredictionRoute>
            <AllPredictionInputsPage />
            </PredictionRoute>
           
          </PrivateRoute>
        }
        />
        <Route
        path="/prediction-input/:id"
        element={
          <PrivateRoute>
           
            <PredictionInputDetail/>
            
           
          </PrivateRoute>
        }
        />
        <Route
        path="/prediction-input/:id/edit"
        element={
          <PrivateRoute>
           <PredictionRoute>
            <EditPredictionInputPage/>
            
           </PredictionRoute>
          </PrivateRoute>
        }
        />
        <Route
        path="/prediction-output/:id"
        element={
          <PrivateRoute>
           
            <PredictionOutput/>
           
           
          </PrivateRoute>
        }
        />
       
        <Route
        path="/ecommerce-dashboard"
        element={
          <PrivateRoute>
            <EcommerceDashboard />
           
          </PrivateRoute>
        }
        />
         <Route
        path="/crops/new"
        element={
          <PrivateRoute>
          <CropFormPage mode="add" />
           
          </PrivateRoute>
        }
        />
         <Route
        path="/crops/:id/edit"
        element={
          <PrivateRoute>
          <CropFormPage mode="edit" />
           
          </PrivateRoute>
        }
        />
         <Route
        path="/crops"
        element={
          <PrivateRoute>
          <FarmerCropsPage />
           
          </PrivateRoute>
        }
        />
        <Route
        path="/crops/:id"
        element={
          <PrivateRoute>
          <CropDetailPage />
           
          </PrivateRoute>
        }
        />
        
        <Route
        path="/ecommerce-crops"
        element={
          <PrivateRoute>
            <AllCrops />
           
          </PrivateRoute>
        }
        />
      {/* Add other routes here */}
      <Route path="/" element={<Home />} />
         <Route path="/about" element={<About/>} />
         {/* <Route path="/login" element={<Login/>} /> */}
         <Route path="/signup" element={<Signup/>} />
         <Route path="/contact" element={<Contact/>} />
         <Route path="/verify/:token" element={<Verify/>} />
         <Route path="/forgot-password" element={<ForgotPassword/>} />
         <Route path="/reset_password/:slug" element={<ResetPassword/>} />
         {/* <Route path="/resend_email" element={<ResendEmail/>} /> */}
         {/* <Route path="/user" element={<User/>} /> */}
         {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}