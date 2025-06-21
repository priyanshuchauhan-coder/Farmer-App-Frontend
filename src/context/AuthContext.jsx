// src/contexts/AuthContext.js
import { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import  AlertContext  from './AlertContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showAlert } = useContext(AlertContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const API_BASE_URL = `${apiUrl}/api/auth`;

  // Auth state
  const [user, setUser] = useState(() => {
    const userProfile = localStorage.getItem('userProfile');
    return userProfile ? JSON.parse(userProfile) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Generic API request handler
  const makeRequest = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios({
        baseURL: API_BASE_URL,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        ...config,
      });
      console.log(response);

      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch current user
  const fetchUser = useCallback(async () => {
    try {
      const data = await makeRequest({
        url: '/getuser',
        method: 'get',
      });
        console.log(data);
      if (data?.success) {
        localStorage.setItem('userProfile', JSON.stringify(data.userInfo));
        setUser(data.user);
      }
      return data;
    } catch (err) {
      console.error('Failed to fetch user:', err);
      return { success: false, error: err.message };
    }
  }, [makeRequest]);

  // Login user
  const login = useCallback(async (credentials) => {
    try {
      const data = await makeRequest({
        url: '/login',
        method: 'post',
        data: credentials,
      });

      if (data?.success) {
        showAlert('Successfully logged in', 'success');
        console.log(data);
        const fetchedUser=await fetchUser();
        if(!fetchedUser?.success)
        {
          showAlert('Something Went Wrong', 'danger');
          return { success: false};
         
        }
        
      } else {
        showAlert(data?.error || 'Login failed', 'danger');
      }
      return {success:true};
    } catch (err) {
      showAlert(err.message || 'Login failed', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, fetchUser, showAlert]);
  

  const submitMessage = useCallback(async (d) => {
    try {
      const data = await makeRequest({
        url: '/contact',
        method: 'post',
        data: d,
      });
  
      if (data?.success) {
        showAlert(data.msg || 'Your message has been received. We will contact you shortly.', 'success');
        return { success: true };
      }
  
      // Fallback if success is false but no exception was thrown
      showAlert('Something went wrong. Please try again.', 'danger');
      return { success: false };
  
    } catch (err) {
      // Handle validation error format from your backend
      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        showAlert(firstError.msg || 'Validation error', 'danger');
        return {
          success: false,
          error: firstError.msg,
          errors: err.response.data.errors
        };
      }
  
      // General error fallback
      showAlert(err.message || 'Something went wrong', 'danger');
      return {
        success: false,
        error: err.message
      };
    }
  }, [makeRequest, showAlert]);

  // Register new user
  // const signup = useCallback(async (userData) => {
  //   try {
  //     console.log(userData);
  //     const data = await makeRequest({
  //       url: '/createuser',
  //       method: 'post',
  //       data: userData,
  //     });
  //     console.log(data);
  
  //     if (data?.success) {
  //       showAlert('Account created successfully! Please verify your email.', 'success');
  //     } else {
  //       showAlert(data?.errors || 'Registration failed', 'danger');
  //     }
  //     return data;
  //   } catch (err) {
  //     showAlert(err.message || 'Registration failed', 'danger');
  //     return { success: false, error: err.message };
  //   }
  // }, [makeRequest, showAlert]);
  const signup = useCallback(async (userData) => {
    try {
      console.log(userData);
      const data = await makeRequest({
        url: '/createuser',
        method: 'post',
        data: userData,
      });
  
      console.log(data);
  
      if (data?.success) {
        setFieldErrors({}); // Clear previous errors
        showAlert('Account created successfully! Please verify your email.', 'success');
      } else {
        if (Array.isArray(data?.errors)) {
          const fieldErrorsMap = {};
          data.errors.forEach(err => {
            if (err.path) {
              fieldErrorsMap[err.path] = err.msg;
            }
          });
          setFieldErrors(fieldErrorsMap);
        }
        showAlert('Registration failed. Please fix the errors.', 'danger');
      }
  
      return data;
    } catch (err) {
      showAlert(err.message || 'Registration failed', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert, setFieldErrors]);
  
  // Verify email
  const verifyEmail = useCallback(async (token) => {
    try {
      const data = await makeRequest({
        url: '/verify',
        method: 'post',
        headers: { 'email_auth_token': token },
      });

      if (data?.success) {
        showAlert('Email verified successfully', 'success');
        // await fetchUser();
      } else {
        showAlert(data?.error || 'Email verification failed', 'danger');
      }
      return data;
    } catch (err) {
      showAlert(err.message || 'Email verification failed', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);

  // Forgot password
  const forgotPassword = useCallback(async (email) => {
    try {
      const data = await makeRequest({
        url: '/forgot-password',
        method: 'post',
        headers: { email },
      });

      if (data?.success) {
        showAlert('Password reset link sent to your email', 'success');
      } else {
        showAlert(data?.error || 'Failed to send reset email', 'danger');
      }
      return data;
    } catch (err) {
      showAlert(err.message || 'Failed to send reset email', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);

  // Reset password
  const resetPassword = useCallback(async ({ token, newPassword }) => {
    try {
      const data = await makeRequest({
        url: '/reset-password',
        method: 'post',
        headers: { 'forgot_password_token': token },
        data: { password: newPassword },
      });

      if (data?.success) {
        showAlert('Password reset successfully', 'success');
      } else {
        showAlert(data?.error || 'Password reset failed', 'danger');
      }
      return data;
    } catch (err) {
      showAlert(err.message || 'Password reset failed', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);

  // Resend verification email
  const resendVerification = useCallback(async () => {
    try {
      const data = await makeRequest({
        url: '/resend-verification',
        method: 'post',
      });

      if (data?.success) {
        showAlert('Verification email resent successfully', 'success');
      } else {
        showAlert(data?.error || 'Failed to resend verification email', 'danger');
      }
      return data;
    } catch (err) {
      showAlert(err.message || 'Failed to resend verification email', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);

  // Logout user
  const logout = useCallback(async () => {
    try {
      await makeRequest({
        url: '/logout',
        method: 'post',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('userProfile');
      setUser(null);
      showAlert('Logged out successfully', 'success');
    }
  }, [makeRequest, showAlert]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setUser,
        fetchUser,
        login,
        signup,
        verifyEmail,
        forgotPassword,
        resetPassword,
        resendVerification,
        makeRequest,
        logout,
        submitMessage,
        fieldErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;