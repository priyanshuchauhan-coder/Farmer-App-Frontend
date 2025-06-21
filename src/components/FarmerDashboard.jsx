
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import { 
  FaChartLine, 
  FaShoppingCart, 
  FaCalendarAlt, 
  FaTractor, 
  FaMoneyBillWave,
  FaUser
} from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { useContext ,useMemo} from 'react';
import PredContext from '../context/PredContext';
import LoadingSpinner from '../components/LoadingSpinner';

function FarmerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const {  latestPredictionInput,latestPredictionOutput,fetchDashboardData } = useContext(PredContext);
  const [activeTab, setActiveTab] = useState('prediction');
  const [weatherData, setWeatherData] = useState(null);
  const [marketTrends, setMarketTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  
 
  const getProbability = (crop) => {
    const probabilities = {
      Wheat: 78,
      Rice: 85,
      Maize: 64,
    };
    return probabilities[crop] || 70;
  };
  
  const getYieldEstimate = (crop) => {
    const yields = {
      Wheat: "20 quintals/acre",
      Rice: "25 quintals/acre",
      Maize: "30 quintals/acre",
    };
    return yields[crop] || "15 quintals/acre";
  };
  
  const getMarketPrice = (crop) => {
    const prices = {
      Wheat: "₹2100/quintal",
      Rice: "₹1850/quintal",
      Maize: "₹1750/quintal",
    };
    return prices[crop] || "₹1600/quintal";
  };
  
  // Memoize initial data to prevent unnecessary recreations
  const initialData = useMemo(() => ({
    weather: { temp: 28, humidity: 65, rainfall: '10%' },
    market: { rice: 1850, wheat: 2100, maize: 1750 }
  }), []);

  // useEffect(() => {
  //   let isMounted = true; // Flag to prevent state updates after unmount
    
  //   const fetchDashboardData = async () => {
  //     try {
  //       if (isMounted) setLoading(true);
        
  //       // Set initial data
  //       if (isMounted) {
  //         setWeatherData(initialData.weather);
  //         setMarketTrends(initialData.market);
  //       }

  //       // Fetch prediction data
        
  //       // const inputs = await getAllPredictionInputs();
  //       // if (isMounted && inputs) {
  //       //   await fetchingLatestData(inputs);
  //       // }
        
  //     } catch (error) {
  //       console.error("Error fetching dashboard data:", error);
  //     } finally {
  //       if (isMounted) setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();

  //   return () => {
  //     isMounted = false; // Cleanup function
  //   };
  // }, [ initialData]);
  
  useEffect(() => {
    let isMounted = true;
  
    const loadDashboard = async () => {
      if (isMounted) setLoading(true);
  
      try {
        if (isMounted) {
          setWeatherData(initialData.weather);
          setMarketTrends(initialData.market);
        }
  
        // ✅ Fetch prediction data from context
        // await fetchDashboardData();
  
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    loadDashboard();
  
    return () => {
      isMounted = false;
    };
  }, [initialData, fetchDashboardData]);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container fluid className="dashboard-container px-0">
      {/* Header */}
      <header className="dashboard-header py-3 bg-success text-white shadow">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-0">
                <FaTractor className="me-2" />
                FarmEzy Dashboard
              </h2>
            </Col>
            <Col md={6} className="text-end">
              <div className="d-flex align-items-center justify-content-end">
                <span className="me-3">
                  <FaUser className="me-1" />
                  {user?.name || 'Farmer'}
                </span>
                <Button 
                  variant="outline-light" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Main Content */}
      <Container className="py-4">
        <Row>
          {/* Sidebar */}
          <Col md={3} className="mb-4">
            <Card className="shadow-sm h-100">
              {/* <Card.Body>
                <div className="text-center mb-4">
                  <div className="profile-icon bg-success-light text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                    <FaUser size={24} />
                  </div>
                  <h5>{user?.name || 'Farmer'}</h5>
                  <p className="text-muted small">{user?.address?.city || 'Farm Location'}</p>
                </div>

                <hr />

                <div className="d-grid gap-2">
                  <Button 
                    variant={activeTab === 'prediction' ? 'success' : 'outline-success'}
                    onClick={() => setActiveTab('prediction')}
                    className="text-start"
                  >
                    <FaChartLine className="me-2" />
                    Prediction Dashboard
                  </Button>
                  <Button 
                    variant={activeTab === 'ecommerce' ? 'success' : 'outline-success'}
                    onClick={() => setActiveTab('ecommerce')}
                    className="text-start"
                  >
                    <FaShoppingCart className="me-2" />
                    E-commerce Dashboard
                  </Button>
                </div>

                <hr />

                <h6 className="text-muted mb-3">Quick Actions</h6>
                <div className="d-grid gap-2">
                  <Button variant="outline-secondary" size="sm">
                    <FaCalendarAlt className="me-2" />
                    Farming Calendar
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <FaMoneyBillWave className="me-2" />
                    Market Prices
                  </Button>
                </div>
              </Card.Body> */}
              <Card.Body>
  <div className="text-center mb-4">
    <div className="profile-icon bg-success-light text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '60px', height: '60px' }}>
      <FaUser size={28} />
    </div>
    <h5 className="mb-1">{user?.name || 'Farmer'}</h5>
    <p className="text-muted small mb-0">{user?.email}</p>
    <p className="text-muted small">{user?.phone}</p>
  </div>

  <hr />

  <div className="mb-3">
    <h6 className="text-success mb-2">Farmer ID Info</h6>
    <p className="mb-1"><strong>Aadhar:</strong> {user?.aadharCard}</p>
    <p className="mb-1"><strong>Farmer ID:</strong> {user?.farmerId || 'N/A'}</p>
    <p className="mb-1"><strong>DOB:</strong> {new Date(user?.dob).toLocaleDateString()}</p>
    <p className="mb-1"><strong>Location:</strong> {`${user?.address?.city}, ${user?.address?.state}`}</p>
  </div>

  <hr />

  <div className="d-grid gap-2">
    <Button 
      variant={activeTab === 'prediction' ? 'success' : 'outline-success'}
      onClick={() => setActiveTab('prediction')}
      className="text-start"
    >
      <FaChartLine className="me-2" />
      Prediction Dashboard
    </Button>
    <Button 
      variant={activeTab === 'ecommerce' ? 'success' : 'outline-success'}
      onClick={() => setActiveTab('ecommerce')}
      className="text-start"
    >
      <FaShoppingCart className="me-2" />
      E-commerce Dashboard
    </Button>
  </div>

  <hr />

  <h6 className="text-muted mb-3">Quick Actions</h6>
  <div className="d-grid gap-2">
    <Button variant="outline-secondary" size="sm">
      <FaCalendarAlt className="me-2" />
      Farming Calendar
    </Button>
    <Button variant="outline-secondary" size="sm">
      <FaMoneyBillWave className="me-2" />
      Market Prices
    </Button>
  </div>
</Card.Body>

            </Card>
          </Col>

          {/* Main Dashboard Area */}
          <Col md={9}>
            {loading ? (
              // <div className="text-center py-5">
              //   <div className="spinner-border text-success" role="status">
              //     <span className="visually-hidden">Loading...</span>
              //   </div>
              //   <p className="mt-2">Loading Dashboard...</p>
              // </div>
              <LoadingSpinner/>
            ) : (
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
                id="dashboard-tabs"
              >
                {/* Prediction Dashboard Tab */}
                <Tab eventKey="prediction" title={
                  <span>
                    <FaChartLine className="me-1" />
                    Prediction
                  </span>
                }>
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <h4 className="text-success mb-4">
                        <FaChartLine className="me-2" />
                        Crop Prediction Dashboard 
                        <Button variant="success" size="sm" className="mx-4" onClick={() => navigate('/prediction-dashboard')}>
                                Prediction Dashboard
                              </Button>
                      </h4>
                      
                      <Row>
                        <Col md={6}>
                          <Card className="mb-3">
                            <Card.Body>
                              <h5>Weather Conditions</h5>
                              {weatherData && (
                                <ul className="list-unstyled">
                                  <li>Temperature: {weatherData.temp}°C</li>
                                  <li>Humidity: {weatherData.humidity}%</li>
                                  <li>Rainfall Probability: {weatherData.rainfall}</li>
                                </ul>
                              )}
                              <Button variant="success" size="sm" className="mt-2">
                                View Detailed Forecast
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card className="mb-3">
                            {/* <Card.Body>
                              <h5>{latestPredictionInput? 'Soil Health':'Optimal Soil Conditions'}</h5>
                              {!loading && latestPredictionInput ? (
  <p className="text-muted">
    Last tested: {formatDistanceToNow(new Date(latestPredictionInput.updatedAt), { addSuffix: true })}
  </p>
) : (
  <p className="text-muted">Loading soil test info...</p>
)}
                                {latestPredictionInput? 
                              <ul className="list-unstyled">
                                <li>Nitrogen Level: Medium</li>
                                <li>pH Value: 6.8</li>
                                <li>Moisture: Optimal</li>
                              </ul>:<ul className="list-unstyled">
                                <li>Nitrogen Level: {latestPredictionInput?.nitrogenLevel}</li>
                                <li>pH Value: {latestPredictionInput?.soilPh}</li>
                                <li>Moisture: {latestPredictionInput?.averageHumidity}</li>
                              </ul>}
                              <Button variant="success" size="sm" className="mt-2">
                                Schedule New Test
                              </Button>
                            </Card.Body> */}
                            
                            {loading ? ( 
    // Loading spinner 
    <LoadingSpinner />
  ) : (
    
    <Card.Body>
      <h5>{latestPredictionInput ? 'Soil Health' : 'No Soil Data'}</h5>
      {latestPredictionInput ? (
        <>
          <p className="text-muted">
            Last tested: {formatDistanceToNow(new Date(latestPredictionInput.updatedAt), { addSuffix: true })}
          </p>
          <ul className="list-unstyled">
            <li>Nitrogen Level: {latestPredictionInput.nitrogenLevel || 'N/A'}</li>
            <li>pH Value: {latestPredictionInput.soilPh || 'N/A'}</li>
            <li>Moisture: {latestPredictionInput.averageHumidity || 'N/A'}</li>
          </ul>
        </>
      ) : (
        <Alert variant="info">No soil test data available</Alert>
      )}
    </Card.Body>
  )}
                          </Card>
                        </Col>
                      </Row>

                      <Card className="mt-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">Recommended Crops</h5>
                            <Button variant="outline-success" size="sm" onClick={()=>{navigate('/prediction-inputs')}}>
                              Get New Prediction
                            </Button>
                          </div>
                          {!latestPredictionOutput ? (<div className="table-responsive">
                            {/* <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Crop</th>
                                  <th>Probability</th>
                                  <th>Expected Yield</th>
                                  <th>Market Price</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                               
                                <tr>
                                  <td>Rice</td>
                                  <td>85%</td>
                                  <td>25 quintals/acre</td>
                                  <td>₹1850/quintal</td>
                                  <td>
                                    <Button variant="outline-success" size="sm">
                                      View Plan
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Wheat</td>
                                  <td>78%</td>
                                  <td>20 quintals/acre</td>
                                  <td>₹2100/quintal</td>
                                  <td>
                                    <Button variant="outline-success" size="sm">
                                      View Plan
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Maize</td>
                                  <td>65%</td>
                                  <td>30 quintals/acre</td>
                                  <td>₹1750/quintal</td>
                                  <td>
                                    <Button variant="outline-success" size="sm">
                                      View Plan
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                             <Alert variant="info">No Prediction made for available input</Alert>
                          </div>):(<div className="table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Crop</th>
                                  <th>Probability</th>
                                  <th>Expected Yield</th>
                                  <th>Market Price</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {latestPredictionOutput?.landDivisions?.filter((plot, index, self) =>
    self.findIndex(p => p.predictedCrop === plot.predictedCrop) === index
  ).map((plot, index) => (
                                  <tr key={index}>
                                    <td>{plot.predictedCrop}</td>
                                    <td>{getProbability(plot.predictedCrop)}%</td>
                                    <td>{getYieldEstimate(plot.predictedCrop)}</td>
                                    <td>{getMarketPrice(plot.predictedCrop)}</td>
                                    <td>
                                      <Button variant="outline-success" size="sm" onClick={()=>{navigate(`/prediction-output/${latestPredictionOutput._id}`)}}>
                                        View Plan
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          )}
                          {/* <div className="table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Crop</th>
                                  <th>Probability</th>
                                  <th>Expected Yield</th>
                                  <th>Market Price</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                               
                                <tr>
                                  <td>Rice</td>
                                  <td>85%</td>
                                  <td>25 quintals/acre</td>
                                  <td>₹1850/quintal</td>
                                  <td>
                                    <Button variant="outline-success" size="sm">
                                      View Plan
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Wheat</td>
                                  <td>78%</td>
                                  <td>20 quintals/acre</td>
                                  <td>₹2100/quintal</td>
                                  <td>
                                    <Button variant="outline-success" size="sm">
                                      View Plan
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Maize</td>
                                  <td>65%</td>
                                  <td>30 quintals/acre</td>
                                  <td>₹1750/quintal</td>
                                  <td>
                                    <Button variant="outline-success" size="sm">
                                      View Plan
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div> */}
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>
                  {/* <DashboardCard latestPredictionInput={latestPredictionInput} weatherData={weatherData}/> */}
                </Tab>

                {/* E-commerce Dashboard Tab */}
                <Tab eventKey="ecommerce" title={
                  <span>
                    <FaShoppingCart className="me-1" />
                    E-commerce
                  </span>
                }>
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <h4 className="text-success mb-4">
                        <FaShoppingCart className="me-2" />
                        Market Access Dashboard
                        <Button variant="success" size="sm" className="mx-4" onClick={() => navigate('/ecommerce-dashboard')}>
                                Market Dashboard
                              </Button>
                      </h4>
                      
                      <Row>
                        <Col md={6}>
                          <Card className="mb-3">
                            <Card.Body>
                              <h5>Current Market Prices</h5>
                              {marketTrends && (
                                <ul className="list-unstyled">
                                  <li>Rice: ₹{marketTrends.rice}/quintal</li>
                                  <li>Wheat: ₹{marketTrends.wheat}/quintal</li>
                                  <li>Maize: ₹{marketTrends.maize}/quintal</li>
                                </ul>
                              )}
                              <Button variant="success" size="sm" className="mt-2">
                                View All Prices
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card className="mb-3">
                            <Card.Body>
                              <h5>Your Inventory</h5>
                              <p className="text-muted">Last updated: 2 days ago</p>
                              <ul className="list-unstyled">
                                <li>Rice: 50 quintals</li>
                                <li>Wheat: 30 quintals</li>
                                <li>Maize: 20 quintals</li>
                              </ul>
                              <Button variant="success" size="sm" className="mt-2">
                                Update Inventory
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>

                      <Card className="mt-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">Recent Market Activity</h5>
                            <div>
                              <Button variant="outline-success" size="sm" className="me-2">
                                Sell Crops
                              </Button>
                              <Button variant="success" size="sm">
                                Buy Inputs
                              </Button>
                            </div>
                          </div>
                          
                          <div className="table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Transaction</th>
                                  <th>Crop/Product</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>15/06/2023</td>
                                  <td>Sale</td>
                                  <td>Rice</td>
                                  <td>10 quintals</td>
                                  <td>₹18,500</td>
                                  <td>
                                    <span className="badge bg-success">Completed</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>10/06/2023</td>
                                  <td>Purchase</td>
                                  <td>Fertilizer</td>
                                  <td>5 bags</td>
                                  <td>₹2,500</td>
                                  <td>
                                    <span className="badge bg-success">Completed</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>05/06/2023</td>
                                  <td>Sale</td>
                                  <td>Wheat</td>
                                  <td>15 quintals</td>
                                  <td>₹31,500</td>
                                  <td>
                                    <span className="badge bg-warning text-dark">Pending</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>
                </Tab>
              </Tabs>
            )}
          </Col>
        </Row>
      </Container>

      

      {/* CSS Styles */}
      <style jsx="true">{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f8f9fa;
        }
        .dashboard-header {
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .profile-icon {
          width: 60px;
          height: 60px;
          font-size: 1.25rem;
        }
        .bg-success-light {
          background-color: rgba(40, 167, 69, 0.1);
        }
        .nav-tabs .nav-link.active {
          color: #28a745;
          font-weight: 500;
        }
        .nav-tabs .nav-link {
          color: #6c757d;
        }
        .table-hover tbody tr:hover {
          background-color: rgba(40, 167, 69, 0.05);
        }
      `}</style>
    </Container>
  );
}

export default FarmerDashboard;