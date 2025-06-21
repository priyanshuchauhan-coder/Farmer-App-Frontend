// src/contexts/AuthContext.js
import { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import  AlertContext  from './AlertContext';
import AuthContext from './AuthContext';

const PredContext = createContext();

export const PredProvider = ({ children }) => {
  const { showAlert } = useContext(AlertContext);
  const {user}=useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const API_BASE_URL = `${apiUrl}/api/predict`;
  

  // Prediction Input state
  const [predictionInputs,setPredictionInputs]=useState([]);
  const [latestPredictionInput,setPredictionInput]=useState(null);
  const [latestPredictionOutput,setPredictionOutput]=useState(null);
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
//   const [fieldErrors, setFieldErrors] = useState({});

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
      // console.log("I am the error ")
      // const errorMsg = err.response?.data?.error || err.message || 'An error occurred';
      // setError(errorMsg);
      // throw new Error(errorMsg);
    const status = err.response?.status;
    const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'An error occurred';

    // Set general error
    setError(errorMsg);

    // Instead of throwing, return error details
    return { success: false, error: errorMsg, status };
    } finally {
      setLoading(false);
    }
  }, []);


 

  // to get all the prediction Inputs for a farmer
  const getAllPredictionInputs = useCallback(async () => {
    try {
      const rdata = await makeRequest({
        url: '/inputs',
        method: 'get',
        
      });
if (rdata?.status === 404) {
    return { success: false, error: 'No prediction input data found for this farmer.' };
  }
      if (rdata?.success) {
        showAlert('Data Fetched Successfully', 'success');
        console.log(rdata);
        setPredictionInputs(rdata?.data)
       
          return { success: true, data: rdata.data }; // return the data
        
        
      } 
else {
        showAlert(rdata?.error || 'Prediction Inputs Not Fetched ', 'danger');
        return {success:false}
      }
      
    } catch (err) {
      if (err.response?.status === 404 && err.response?.data?.message) {
  return { success: false, error: err.response.data.message };
}
      showAlert(err.message || 'Something Went Wrong', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);

  // to get  single prediction Input  for a farmer
  const getPredictionInput = useCallback(async (inputId) => {
    try {
      const rdata = await makeRequest({
        url: '/input',
        method: 'get',
        headers:{"pred_id":inputId}
        
      });

      if (rdata?.success) {
        showAlert('Data Fetched Successfully', 'success');
        console.log(rdata);
        // setPredictionInputs(rdata?.data)
        
        
      } else {
        showAlert(rdata?.error || 'Prediction Input Not Fetched ', 'danger');
        //  showAlert( 'Prediction Input Not Fetched ', 'danger');
        return {success:false}
      }
      return {success:true,data:rdata?.data};
    } catch (err) {
      showAlert(err.message || 'Something Went Wrong', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);

//    to get a prediction result for prediction id 
  const getPredictionResult = useCallback(async (inputId) => {
    try {
      const rdata = await makeRequest({
        url: '/prediction-output',
        method: 'get',
        headers:{"pred_id":inputId}
        
      });

      if (rdata?.success) {
        // showAlert('Data Fetched Successfully', 'success');
        console.log(rdata);
        // setPredictionInputs(rdata?.data)
        
        
      } else {
        showAlert(rdata?.error || 'Not Predicted Yet ', 'warning');
        return {success:false}
      }
      return {success:true,data:rdata?.data};
    } catch (err) {
      showAlert(err.message || 'Something Went Wrong', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);

  const getAllPredictionResultForInput = useCallback(async (inputId) => {
    try {
      const rdata = await makeRequest({
        url: '/predictions',
        method: 'get',
        headers:{"pred_id":inputId}
        
      });
      // console.log("I am everyone");
      if (rdata?.success) {
        // showAlert('Data Fetched Successfully', 'success');
        console.log(rdata);
        // setPredictionInputs(rdata?.data)
        
        
      } else {
        console.log(rdata.error);
        showAlert(rdata?.error || 'Prediction Results Not Fetched ', 'warning');
        return {success:false}
      }
      return {success:true,data:rdata?.data};
    } catch (err) {
      showAlert(err.message || 'Something Went Wrong', 'warning');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);
 const requestPredictionResultForInput = useCallback(async (inputId) => {
    try {
      const rdata = await makeRequest({
        url: '/request-prediction',
        method: 'post',
        headers:{"pred_id":inputId}
        
      });

      if (rdata?.success) {
        // showAlert('Data Fetched Successfully', 'success');
        console.log(rdata);
        // setPredictionInputs(rdata?.data)
        
        
      } else {
        showAlert(rdata?.error || 'Prediction Results Not Fetched ', 'danger');
        return {success:false}
      }
      return {success:true,data:rdata?.data};
    } catch (err) {
      showAlert(err.message || 'Something Went Wrong', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);
   const updatePredictionInputData = useCallback(async (inputId,d) => {
    try {
      const rdata = await makeRequest({
        url: '/collect-data',
        method: 'put',
        headers:{"pred_id":inputId},
        data:d
        
      });

      if (rdata?.success) {
        showAlert('Input Data Updated Successfully', 'success');
        console.log(rdata);
        // setPredictionInputs(rdata?.data)
        
        
      } else {
        showAlert(rdata?.error || 'Input Data Not Updated  ', 'danger');
        return {success:false}
      }
      return {success:true,data:rdata?.data};
    } catch (err) {
      showAlert(err.message || 'Something Went Wrong', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);
  const deletePredictionInputData = useCallback(async (inputId) => {
    try {
      const rdata = await makeRequest({
        url: '/collect-data',
        method: 'delete',
        headers:{"pred_id":inputId},
      
        
      });

      if (rdata?.success) {
        showAlert('Input Data Deleted Successfully', 'success');
        console.log(rdata);
        // setPredictionInputs(rdata?.data)
        
        
      } else {
        showAlert(rdata?.error || 'Input Data Not Deleted  ', 'danger');
        return {success:false}
      }
      return {success:true,data:rdata?.data};
    } catch (err) {
      showAlert(err.message || 'Something Went Wrong', 'danger');
      return { success: false, error: err.message };
    }
  }, [makeRequest, showAlert]);
// const fetchDashboardData=useCallback(async ()=>{
  
//   try {
//       await getAllPredictionInputs();
    
//           console.log("inputs",predictionInputs)
//           if (predictionInputs?.length > 0) {
//             let latestId = predictionInputs[0]?._id;
//             console.log("latest Id",latestId)
//             const result = await getPredictionInput(latestId);
            
//             if (result?.success) {
//               const inputData = result.data;
//               setPredictionInput(inputData);
      
//               let predictionId = latestId;
//               if (inputData.status !== "pending") {
//                 predictionId = inputData.currentPrediction || inputData.savedPrediction || latestId;
//               }
      
//               const predResult = await getPredictionResult(predictionId);
//               if (predResult?.success) {
//                 console.log("Prediction result",predResult.data)
//                 setPredictionOutput(predResult.data);
//               }
//             }
//           }
//           return {success:true}
     
//       }
//       catch (err) {
//       showAlert(err.message || 'Something Went Wrong', 'danger');
//       return { success: false, error: err.message };}
// },[getAllPredictionInputs,getPredictionInput,getPredictionResult,predictionInputs,showAlert])
// const fetchDashboardData = useCallback(async () => {
//   try {
//     const inputsResult = await getAllPredictionInputs();

//     if (!inputsResult.success) return { success: false };

//     const inputs = inputsResult.data || []; // use the fresh data directly
//     setPredictionInputs(inputs); // update context

//     if (inputs.length > 0) {
//       const latestId = inputs[0]._id;

//       const result = await getPredictionInput(latestId);
//       if (result?.success) {
//         const inputData = result.data;
//         setPredictionInput(inputData);
// //  here is the error
//         let predictionId = latestId; 
//         if (inputData.status !== "pending") {
//           predictionId = inputData.currentPrediction || inputData.savedPrediction;
//           const predResult = await getPredictionResult(predictionId);
//           console.log("Prediction Result of the input",predResult)
//         if (predResult?.success) {
//           setPredictionOutput(predResult.data);
//         }
//         else
//         {
//           setPredictionOutput(null);
//         }
//         }
//         else{
//           setPredictionOutput(null);
//         }
//       }
//     }

//     return { success: true };
//   } catch (err) {
//     showAlert(err.message || 'Something went wrong', 'danger');
//     return { success: false, error: err.message };
//   }
// }, [getAllPredictionInputs, getPredictionInput, getPredictionResult, showAlert]);
// const fetchDashboardData = useCallback(async () => {
//   try {
//     // Fetch all prediction inputs
//     const inputsResult = await getAllPredictionInputs();

//     if (!inputsResult.success || !inputsResult.data) {
//       return { success: false, error: 'Failed to fetch prediction inputs' };
//     }

//     const inputs = inputsResult.data;
//     setPredictionInputs(inputs); // Update context with fresh inputs

//     // If there are inputs, fetch the latest one
//     if (inputs.length > 0) {
//       const latestId = inputs[0]._id;
//       const result = await getPredictionInput(latestId);

//       if (!result?.success || !result.data) {
//         return { success: false, error: 'Failed to fetch prediction input' };
//       }

//       const inputData = result.data;
//       setPredictionInput(inputData); // Update context with the latest input

//       // Handle prediction output based on status
//       if (inputData.status !== 'pending') {
//         // Use currentPrediction or savedPrediction, fallback to null if neither exists
//         const predictionId = inputData.currentPrediction || inputData.savedPrediction;

//         if (predictionId) {
//           const predResult = await getPredictionResult(predictionId);
//           console.log('Prediction Result:', predResult);

//           if (predResult?.success && predResult.data) {
//             setPredictionOutput(predResult.data); // Set valid prediction output
//           } else {
//             setPredictionOutput(null); // Clear output on failure
//             return {
//               success: false,
//               error: 'Failed to fetch prediction result',
//             };
//           }
//         } else {
//           setPredictionOutput(null); // No valid prediction ID
//         }
//       } else {
//         setPredictionOutput(null); // Clear output for pending status
//       }
//     }

//     return { success: true };
//   } catch (err) {
//     console.error('Error in fetchDashboardData:', err);
//     showAlert(err.message || 'Something went wrong', 'danger');
//     return { success: false, error: err.message || 'Unexpected error' };
//   }
// }, [getAllPredictionInputs, getPredictionInput, getPredictionResult, showAlert]);

const fetchDashboardData = useCallback(async () => {
  try {
    const inputsResult = await getAllPredictionInputs();

    // Handle 404 case: no prediction inputs yet
   if (
  !inputsResult.success &&
  inputsResult.error === 'No prediction input data found for this farmer.'
) {
  setPredictionInputs([]);
  setPredictionInput(null);
  setPredictionOutput(null);
  return { success: true, message: 'No inputs found for user' };
}

    // Handle other unexpected failures
    if (!inputsResult.success || !inputsResult.data) {
      return { success: false, error: 'Failed to fetch prediction inputs' };
    }

    const inputs = inputsResult.data;
    setPredictionInputs(inputs);

    if (inputs.length > 0) {
      const latestId = inputs[0]._id;
      const result = await getPredictionInput(latestId);

      if (!result?.success || !result.data) {
        return { success: false, error: 'Failed to fetch prediction input' };
      }

      const inputData = result.data;
      setPredictionInput(inputData);

      if (inputData.status !== 'pending') {
        const predictionId = inputData.currentPrediction || inputData.savedPrediction;

        if (predictionId) {
          const predResult = await getPredictionResult(predictionId);

          if (predResult?.success && predResult.data) {
            setPredictionOutput(predResult.data);
          } else {
            setPredictionOutput(null);
            return {
              success: false,
              error: 'Failed to fetch prediction result',
            };
          }
        } else {
          setPredictionOutput(null);
        }
      } else {
        setPredictionOutput(null);
      }
    }

    return { success: true };
  } catch (err) {
    console.error('Error in fetchDashboardData:', err);
    showAlert(err.message || 'Something went wrong', 'danger');
    return { success: false, error: err.message || 'Unexpected error' };
  }
}, [getAllPredictionInputs, getPredictionInput, getPredictionResult, showAlert]);

const savePredictionInputData = useCallback(async (d,toPredict) => {
  try {
    console.log("In the Function",d)
      const rdata = await makeRequest({
        url: '/collect-data',
        method: 'post',
        data:d
        
      });

      if (rdata?.success) {
        showAlert('Input Data Submitted Successfully', 'success');
        console.log(rdata);
        if(toPredict)
        {
           const predResult=await requestPredictionResultForInput(rdata.inputId);
           if (predResult.success)
           {
            showAlert("Successfully Predicted  ",'success');
            return {success:true,predResultId:predResult.prediction?._id,predInputId:rdata.inputId};
           }
           else
        {
          showAlert("Prediction Results Failed",'danger');
          return {success:true,predInputId:rdata.inputId};
        }
           
        }
        else
        {
          return {success:true,predInputId:rdata.inputId};
        }
        
        // setPredictionInputs(rdata?.data)
        
        
      } 
      else{
      return {success:false};
      }
    } catch (err) {
      showAlert(err.message || 'Something Went Wrong', 'danger');
      return { success: false, error: err.message };
}}, [makeRequest,showAlert,requestPredictionResultForInput]);
 

  return (
    <PredContext.Provider
      value={{
        user,
        loading,
        error,
        predictionInputs,
        latestPredictionInput,
        latestPredictionOutput,
        getAllPredictionInputs,
        getAllPredictionResultForInput,
        savePredictionInputData,
        getPredictionInput,
        getPredictionResult,
        deletePredictionInputData,
        updatePredictionInputData,
        fetchDashboardData,
        requestPredictionResultForInput
      }}
    >
      {children}
    </PredContext.Provider>
  );
};

export default PredContext;