import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Table, 
  Badge,
  ProgressBar,
  Alert,
  Spinner
} from 'react-bootstrap';
import { 
  FaTractor, 
  FaCloudSun, 
  FaChartLine, 
  FaCalendarAlt,
  FaSeedling,
  FaWater,
  FaFlask,
  FaHistory,
  FaList,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import PredContext from '../../context/PredContext';
import { useContext,useMemo } from 'react';

const PredictionDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
   const { predictionInputs,deletePredictionInputData, latestPredictionInput,latestPredictionOutput,fetchDashboardData } = useContext(PredContext);
 
  const [weatherData, setWeatherData] = useState(null);
  // const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const getLevelFromProbability = (value) => {
  if (value >= 70) return 'High';
  if (value >= 40) return 'Medium';
  return 'Low';
};
  const handleDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete this input?")) {
     
      const rData = await deletePredictionInputData(id);
    if (rData?.success) {
            navigate(0);
      } 
     
    
      console.log('Deleting input with id:', id);
    }
    }

 const initialData = useMemo(() => ({
    weather: {
          current: {
            temp: 28,
            humidity: 65,
            rainfall: "10% chance",
            wind: "12 km/h",
            condition: "Partly Cloudy"
          },
          forecast: [
            { day: "Today", high: 30, low: 24, condition: "Partly Cloudy" },
            { day: "Tomorrow", high: 31, low: 25, condition: "Sunny" },
            { day: "Day 3", high: 29, low: 25, condition: "Scattered Thunderstorms" },
            { day: "Day 4", high: 28, low: 24, condition: "Rain" },
            { day: "Day 5", high: 27, low: 23, condition: "Cloudy" }
          ]
        },
        recommendations: [
            "Add organic compost to improve soil fertility",
            "Schedule irrigation every 3 days during initial growth",
            "Monitor for common pests in rice crops",
            "Conduct regular soil testing (once per season) to tailor fertilizer application",
            "Rotate crops annually to reduce nutrient depletion and soil-borne diseases",
            "Apply mulch to retain soil moisture and suppress weeds",
            "Check soil moisture before watering to avoid over-irrigation",
            "Scout fields weekly for early signs of disease or infestation",
            "Adjust planting dates based on local weather forecasts and rainfall patterns."



          ],
   
  }), []);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API calls
        // const mockPredictionData = {
        //   inputs: {
        //     landSize: 5.2, // acres
        //     soilType: "Loamy",
        //     irrigation: "Drip",
        //     budget: 50000, // INR
        //     preferredCrops: ["Rice", "Wheat", "Vegetables"],
        //     submittedDate: "2023-06-15"
        //   },
        //   predictions: [
        //     {
        //       crop: "Rice",
        //       probability: 85,
        //       yield: "25-30 quintals/acre",
        //       duration: "120-150 days",
        //       investment: "₹42,000",
        //       profitPotential: "High"
        //     },
        //     {
        //       crop: "Wheat",
        //       probability: 78,
        //       yield: "18-22 quintals/acre",
        //       duration: "90-110 days",
        //       investment: "₹38,000",
        //       profitPotential: "Medium"
        //     },
        //     {
        //       crop: "Maize",
        //       probability: 65,
        //       yield: "30-35 quintals/acre",
        //       duration: "80-100 days",
        //       investment: "₹35,000",
        //       profitPotential: "Medium"
        //     }
        //   ],
        //   recommendations: [
        //     "Add organic compost to improve soil fertility",
        //     "Schedule irrigation every 3 days during initial growth",
        //     "Monitor for common pests in rice crops"
        //   ]
        // };

        const mockWeatherData = {
          current: {
            temp: 28,
            humidity: 65,
            rainfall: "10% chance",
            wind: "12 km/h",
            condition: "Partly Cloudy"
          },
          forecast: [
            { day: "Today", high: 30, low: 24, condition: "Partly Cloudy" },
            { day: "Tomorrow", high: 31, low: 25, condition: "Sunny" },
            { day: "Day 3", high: 29, low: 25, condition: "Scattered Thunderstorms" },
            { day: "Day 4", high: 28, low: 24, condition: "Rain" },
            { day: "Day 5", high: 27, low: 23, condition: "Cloudy" }
          ]
        };

        // const mockSoilData = {
        //   lastTested: "2023-05-20",
        //   ph: 6.8,
        //   nitrogen: "Medium",
        //   phosphorus: "High",
        //   potassium: "Medium",
        //   moisture: "Optimal",
        //   organicMatter: "2.8%"
        // };
       
          

        // setPredictionData(mockPredictionData);
        setWeatherData(mockWeatherData);
        // setSoilData(mockSoilData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);
 useEffect(() => {
    let isMounted = true;
  
    const loadDashboard = async () => {
      if (isMounted) setLoading(true);
  
      try {
        if (isMounted) {
          setWeatherData(initialData.weather);
          
        }
  
        // ✅ Fetch prediction data from context
        await fetchDashboardData();
  
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

  const handleNewPrediction = () => {

    navigate('/prediction-inputs');
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading Prediction Dashboard...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-success" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Container>
    );

    
  }

  return (
    <Container fluid className="px-0">
      {/* Header */}
      <header className="bg-success text-white py-3 shadow-sm" style={{marginTop:"4%"}}>
        <Container>
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-0">
                <FaChartLine className="me-2" />
                FarmEzy Prediction Dashboard
              </h2>
            </Col>
            <Col className="text-end">
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="me-2"
              >
                Back to Main Dashboard
              </Button>
              {/* <Button 
                variant="light" 
                size="sm"
                onClick={logout}
              >
                Logout
              </Button> */}
            </Col>
          </Row>
        </Container>
      </header>

      {/* Main Content */}
      <Container className="py-4">
        {/* Action Bar */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h4>
                <FaTractor className="me-2 text-success" />
                Hello, {user?.name || 'Farmer'}
              </h4>
              <Button variant="success" onClick={handleNewPrediction}>
                <FaSeedling className="me-2" />
                Get New Prediction
              </Button>
            </div>
          </Col>
        </Row>

        {/* Dashboard Sections */}
        <Row>
          {/* Farmer Inputs */}
          <Col lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">
                  <FaHistory className="me-2 text-success" />
                  Your Latest Farming Data
                </h5>
              </Card.Header>
              <Card.Body>
                {!latestPredictionInput? (
        <Alert variant="info">No Farming data available</Alert>
      ): (
                  
                  <Table borderless className="mb-0">
                    <tbody>
                      <tr>
                        <td><strong>Land Size</strong></td>
                        <td>{latestPredictionInput.area} {latestPredictionInput.areaUnit}</td>
                      </tr>
                      <tr>
                        <td><strong>Soil Type</strong></td>
                        <td>{latestPredictionInput.soilType}</td>
                      </tr>
                      <tr>
                        <td><strong>Irrigation</strong></td>
                        <td>{latestPredictionInput.waterSource}</td>
                      </tr>
                      <tr>
                        <td><strong>Budget</strong></td>
                        <td>₹{latestPredictionInput.budget.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td><strong>Previous Crops</strong></td>
                        <td>{latestPredictionInput.previousCrop? (latestPredictionInput.previousCrop):("Not Given")}</td>
                      </tr>
                      <tr>
                        <td><strong>Submitted On</strong></td>
                        <td>{formatDistanceToNow(new Date(latestPredictionInput.updatedAt), { addSuffix: true })}</td>
                      </tr>
                    </tbody>
                  </Table>
                
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Weather Information */}
          <Col lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">
                  <FaCloudSun className="me-2 text-success" />
                  Weather Conditions
                </h5>
              </Card.Header>
              <Card.Body>
                {weatherData?.current && (
                  <>
                    <div className="text-center mb-3">
                      <h1 className="display-4">{weatherData.current.temp}°C</h1>
                      <p className="lead">{weatherData.current.condition}</p>
                      <p>
                        Humidity: {weatherData.current.humidity}% | 
                        Rain: {weatherData.current.rainfall} | 
                        Wind: {weatherData.current.wind}
                      </p>
                    </div>

                    <h6 className="mb-3">5-Day Forecast</h6>
                    <div className="d-flex overflow-auto pb-2">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="text-center me-3">
                          <div className="bg-light rounded p-2">
                            <div className="fw-bold">{day.day}</div>
                            <div>{day.high}°/{day.low}°</div>
                            <small className="text-muted">{day.condition}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Soil Information */}
          <Col lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">
                  <FaFlask className="me-2 text-success" />
                 Latest Soil Health
                </h5>
              </Card.Header>
              <Card.Body>
                {!latestPredictionInput? (
        <Alert variant="info">No soil Health data available</Alert>
      ):
                 (
                  <>
                    <p className="text-muted small mb-3">
                      Last tested: {formatDistanceToNow(new Date(latestPredictionInput.updatedAt), { addSuffix: true })}
                    </p>
                    <Table borderless className="mb-3">
                      <tbody>
                        <tr>
                          <td><strong>pH Level</strong></td>
                          <td>
                            <ProgressBar 
                              now={(latestPredictionInput.soilPh / 14) * 100} 
                              label={latestPredictionInput.soilPh} 
                              variant={latestPredictionInput.soilPh >= 6 && latestPredictionInput.soilPh <= 7.5 ? 'success' : 'warning'}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Nitrogen (ppm)</strong></td>
                          <td>
                            <Badge 
                            bg={
    latestPredictionInput.nitrogenLevel >= 560
      ? 'success'    // High
      : latestPredictionInput.nitrogenLevel >= 280
      ? 'warning'    // Medium
      : 'danger'     // Low
  }
                            >
                             {
    latestPredictionInput.nitrogenLevel >= 560
      ? 'High'
      : latestPredictionInput.nitrogenLevel >= 280
      ? 'Medium'
      : 'Low'
  }
                            </Badge>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Phosphorus (ppm)</strong></td>
                          <td>
                            <Badge 
                            bg={
    latestPredictionInput.phosphorusLevel >= 25
      ? 'success'    // High
      : latestPredictionInput.phosphorusLevel >= 10
      ? 'warning'    // Medium
      : 'danger'     // Low
  }
                            >
                             {
    latestPredictionInput.phosphorusLevel >= 25
      ? 'High'
      : latestPredictionInput.phosphorusLevel >= 10
      ? 'Medium'
      : 'Low'
  }
                            </Badge>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Potassium (ppm)</strong></td>
                          <td>
                            <Badge 
                            bg={
    latestPredictionInput.potassiumLevel >= 280
      ? 'success'    // High
      : latestPredictionInput.potassiumLevel >= 110
      ? 'warning'    // Medium
      : 'danger'     // Low
  }
                            >
                             {
    latestPredictionInput.potassiumLevel >= 280
      ? 'High'
      : latestPredictionInput.potassiumLevel >= 110
      ? 'Medium'
      : 'Low'
  }
                            </Badge>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Average Humidity</strong></td>
                          <td>{latestPredictionInput.averageHumidity}</td>
                        </tr>
                        <tr>
                          <td><strong>Average Temperature</strong></td>
                          <td>{latestPredictionInput.averageTemperature}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button variant="outline-success" size="sm">
                      Schedule Soil Test
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Predictions Section */}
        <Row>
          <Col>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0">
                  <FaChartLine className="me-2 text-success" />
                 Latest Crop Prediction 
                 {latestPredictionOutput && <Button variant="success" className='mx-4' onClick={() => navigate(`/prediction-output/${latestPredictionOutput._id}`)}>
                <FaSeedling className="me-2" />
                See Prediction
              </Button>}
                 
                </h5>
              </Card.Header>
              <Card.Body>
                {!latestPredictionOutput? (<Alert variant="info">No Prediction data available</Alert>):(
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead>
                        <tr>
                          <th>Crop</th>
                          <th>Success Probability</th>
                          <th>Expected Yield</th>
                          <th>Duration</th>
                          <th>Estimated Investment</th>
                          <th>Profit Potential</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {predictionData.predictions.map((pred, index) => ( */}
                          {latestPredictionOutput?.landDivisions?.filter((plot, index, self) =>
    self.findIndex(p => p.predictedCrop === plot.predictedCrop) === index
  ).map((plot, index) => (
                          <tr key={index}>
                            <td className="fw-bold">{plot.predictedCrop}</td>
                            <td>
                              <ProgressBar 
                                now={getProbability(plot.predictedCrop)} 
                                label={`${getProbability(plot.predictedCrop)}%`}
                                variant={getProbability(plot.predictedCrop) > 75 ? 'success' : getProbability(plot.predictedCrop) > 50 ? 'warning' : 'danger'}
                              />
                            </td>
                            <td>{getYieldEstimate(plot.predictedCrop)}</td>
                            <td>{plot.cropDurationWeeks*7} days</td>
                            <td>{plot.moneyUsed}</td>
                            <td>
                             <Badge
  bg={
    getProbability(plot.predictedCrop) >= 70
      ? 'success'
      : getProbability(plot.predictedCrop) >= 40
      ? 'warning'
      : 'danger'
  }
>
  {getLevelFromProbability(getProbability(plot.predictedCrop))}
</Badge>
                            </td>
                            <td>
                              <Button variant="outline-success" size="sm" onClick={()=>{navigate(`/prediction-output/${latestPredictionOutput._id}`)}}>
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
{/*List recent inputs (maximum 5) */}
<Row>
  <Col>
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">
          <FaList className="me-2 text-primary" />
          Submitted Inputs List

          <Button variant="success" className='mx-4' onClick={() => navigate("/prediction-inputs")} >
                <FaSeedling className="me-2" />
                Saved Inputs
              </Button>
        </h5>
      </Card.Header>
      <Card.Body>
        {console.log("I am everything",predictionInputs)}
        {/* {inputsData?.inputs && ( */}
            {predictionInputs?.length===0?(<Alert variant="info">No Input data available</Alert>):(
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr>
                  <th>Input No</th>
                  <th>Input Name</th>
                  <th>Submitted Date</th>
                  <th>Prediction Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {predictionInputs.map((input, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{`${index+1}`}</td>
                    <td>{input.landIdentifier}</td>
                    <td>{new Date(input.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <Badge bg={input.predictionStatus === 'predicted' ? 'success' : 'warning'}>
                       {input.predictionStatus.charAt(0).toUpperCase() + input.predictionStatus.slice(1)}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => navigate(`/prediction-input/${input._id}`)} >
                        {/* onClick={(navigate("/prediction-input"))} */}
                          <FaEye className="me-2" />
                          View Details
                        </Button>
                        <Button variant="outline-warning" size="sm"  onClick={() => navigate(`/prediction-input/${input._id}/edit`)}>
                          <FaEdit className="me-2" />
                          Update
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(input._id)}>
                          <FaTrash className="me-2" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  </Col>
</Row>

        {/* Recommendations Section */}
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">
                  <FaCalendarAlt className="me-2 text-success" />
                  Farming Recommendations
                </h5>
              </Card.Header>
              <Card.Body>
                {initialData?.recommendations && (
                  <ul className="list-group list-group-flush">
                    {initialData.recommendations.map((rec, index) => (
                      <li key={index} className="list-group-item d-flex align-items-center">
                        <div className="me-3 text-success">
                          <FaSeedling />
                        </div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-3">
                  <Button variant="success" className="me-2">
                    Download Full Report
                  </Button>
                  <Button variant="outline-success">
                    View Farming Calendar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

     

      {/* CSS Styles */}
      <style jsx="true">{`
        .table-responsive {
          border-radius: 0.25rem;
          overflow: hidden;
        }
        .table thead th {
          background-color: #f8f9fa;
          border-bottom-width: 1px;
        }
        .list-group-item {
          border-left: 0;
          border-right: 0;
        }
        .list-group-item:first-child {
          border-top: 0;
        }
        .list-group-item:last-child {
          border-bottom: 0;
        }
      `}</style>
    </Container>
  );
};

export default PredictionDashboard;