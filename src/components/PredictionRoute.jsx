import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PredContext from '../context/PredContext';

const PredictionRoute = ({ children }) => {
  const { fetchDashboardData } = useContext(PredContext);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
//   const location = useLocation(); // 👈 detects route change

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // reset loading on new route
      try {
        const dResult = await fetchDashboardData();
        console.log("Prediction Routes", dResult);
        setAuthorized(dResult.success);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchDashboardData]); // 👈 re-fetch when route path changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PredictionRoute;
