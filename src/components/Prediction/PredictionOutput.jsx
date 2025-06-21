// import { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   Container, 
//   Card, 
//   Button, 
//   Row, 
//   Col, 
//   Spinner, 
//   Alert,
//   Badge,
//   Accordion,
//   Table,
//   ListGroup
// } from 'react-bootstrap';
// import { 
//   FaArrowLeft, 
//   FaChartLine, 
//   FaSeedling,
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaEdit,
//   FaEye,
//   FaWater,
//   FaFlask,
//   FaBug,
//   FaClipboardCheck
// } from 'react-icons/fa';
// import PredContext from '../../context/PredContext';
// const PredictionOutput = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const {getPredictionResult}=useContext(PredContext);
//   const [predictionData, setPredictionData] = useState(null);
//   const [inputData, setInputData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Mock data - replace with actual API calls
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const result = await getPredictionResult("681e18242064c27eb8793183");
//         if (result?.success) {
//           console.log("Result Data",result);
//         }
        
//         // Simulate fetching prediction data
//         const mockPredictionData = {
//           _id: id,
//           farmer: "609b1b3f9e6f5a3f80fcf79b", 
//           inputId: "609b1c0b9e6f5a3f80fcf79c", 
//           status: "current", 
//           landDivisions: [
//             {
//               plotName: "Plot A",
//               landSize: {
//                 area: 2.5,
//                 unit: "hectares"
//               },
//               predictedCrop: "Wheat",
//               moneyUsed: 500,
//               cropDurationWeeks: 12,
//               activities: [
//                 {
//                   week: 1,
//                   activity: "Sowing Seeds",
//                   description: "Planting the first batch of wheat seeds.",
//                   alert: "None",
//                   actionRequired: false,
//                   notes: "Ensure that the soil is properly prepared before sowing."
//                 },
//                 {
//                   week: 2,
//                   activity: "Irrigating",
//                   description: "Watering the newly planted wheat seeds.",
//                   alert: "None",
//                   actionRequired: true,
//                   notes: "Use drip irrigation to save water."
//                 },
//                 {
//                   week: 3,
//                   activity: "Fertilizing",
//                   description: "Applying the first batch of fertilizers to enhance growth.",
//                   alert: "Fertilizer Alert",
//                   actionRequired: true,
//                   notes: "Apply nitrogen-rich fertilizers."
//                 },
//                 {
//                   week: 5,
//                   activity: "Weeding",
//                   description: "Weeding the plot to prevent competition for nutrients.",
//                   alert: "None",
//                   actionRequired: false,
//                   notes: "Manual weeding may be required."
//                 },
//                 {
//                   week: 8,
//                   activity: "Pesticide Application",
//                   description: "Spraying pesticide to control aphid infestation.",
//                   alert: "Pest Outbreak",
//                   actionRequired: true,
//                   notes: "Check the weather forecast before applying."
//                 },
//                 {
//                   week: 12,
//                   activity: "Harvesting",
//                   description: "Harvesting the mature wheat crop.",
//                   alert: "None",
//                   actionRequired: true,
//                   notes: "Ensure proper storage of harvested wheat."
//                 }
//               ]
//             },
//             {
//               plotName: "Plot B",
//               landSize: {
//                 area: 3,
//                 unit: "hectares"
//               },
//               predictedCrop: "Corn",
//               moneyUsed: 700,
//               cropDurationWeeks: 16,
//               activities: [
//                 {
//                   week: 1,
//                   activity: "Sowing Seeds",
//                   description: "Planting the first batch of corn seeds.",
//                   alert: "None",
//                   actionRequired: false,
//                   notes: "Ensure the soil is well-drained."
//                 },
//                 {
//                   week: 2,
//                   activity: "Irrigating",
//                   description: "Watering the corn seeds to ensure proper germination.",
//                   alert: "None",
//                   actionRequired: true,
//                   notes: "Use sprinkler irrigation."
//                 },
//                 {
//                   week: 5,
//                   activity: "Fertilizing",
//                   description: "Fertilizing to promote corn growth.",
//                   alert: "None",
//                   actionRequired: true,
//                   notes: "Use balanced fertilizers."
//                 },
//                 {
//                   week: 8,
//                   activity: "Weeding",
//                   description: "Removing weeds to avoid competition for nutrients.",
//                   alert: "None",
//                   actionRequired: false,
//                   notes: "Use herbicides if necessary."
//                 },
//                 {
//                   week: 10,
//                   activity: "Pesticide Application",
//                   description: "Spraying pesticide to control corn borers.",
//                   alert: "Pest Outbreak",
//                   actionRequired: true,
//                   notes: "Spray during the evening to avoid harming pollinators."
//                 },
//                 {
//                   week: 16,
//                   activity: "Harvesting",
//                   description: "Harvesting mature corn.",
//                   alert: "None",
//                   actionRequired: true,
//                   notes: "Ensure timely harvesting to prevent grain loss."
//                 }
//               ]
//             }
//           ],
//           predictionDate: "2025-05-07T00:00:00Z"
//         };

//         // Simulate fetching input data
//         const mockInputData = {
//           _id: "609b1c0b9e6f5a3f80fcf79c",
//           landIdentifier: 'East Field',
//           latitude: 27.1767,
//           longitude: 78.0081,
//           area: 5.5,
//           areaUnit: 'hectares',
//           soilType: 'Sandy Loam',
//           soilPh: 6.2,
//           nitrogenLevel: 45,
//           phosphorusLevel: 30,
//           potassiumLevel: 35,
//           averageRainfall: 750,
//           averageTemperature: 28,
//           averageHumidity: 65,
//           waterSource: 'Canal',
//           previousCrop: 'Soybean',
//           createdAt: '2025-04-20T08:30:00Z'
//         };

//         setPredictionData(mockPredictionData);
//         setInputData(mockInputData);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load prediction details");
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const renderActivityBadge = (alert) => {
//     if (alert === 'None') return null;
//     return <Badge bg="danger" className="ms-2">{alert}</Badge>;
//   };

//   const renderActionRequired = (required) => {
//     return required ? (
//       <Badge bg="warning" text="dark">Action Required</Badge>
//     ) : (
//       <Badge bg="secondary">No Action Needed</Badge>
//     );
//   };

//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" variant="success" />
//         <p className="mt-3">Loading prediction details...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="py-5">
//         <Alert variant="danger">{error}</Alert>
//         <Button variant="outline-success" onClick={() => navigate(-1)}>
//           Go Back
//         </Button>
//       </Container>
//     );
//   }

//   if (!predictionData || !inputData) {
//     return (
//       <Container className="py-5">
//         <Alert variant="warning">Prediction not found</Alert>
//         <Button variant="outline-success" onClick={() => navigate(-1)}>
//           Go Back
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-4" style={{marginTop:"7%"}}>
//       <Button 
//         variant="outline-secondary" 
//         onClick={() => navigate(-1)}
//         className="mb-4"
//       >
//         <FaArrowLeft className="me-2" />
//         Back to Predictions
//       </Button>
      
//       <h2 className="mb-4">
//         <FaChartLine className="me-2 text-success" />
//         Crop Prediction Results
//       </h2>
      
//       <Card className="mb-4 shadow-sm">
//         <Card.Header className="bg-light d-flex justify-content-between align-items-center">
//           <h4 className="mb-0">Prediction Overview</h4>
//           <Badge bg={predictionData.status === 'current' ? 'primary' : 'secondary'}>
//             {predictionData.status.toUpperCase()}
//           </Badge>
//         </Card.Header>
//         <Card.Body>
//           <Row className="mb-3">
//             <Col md={6}>
//               <p>
//                 <strong>Prediction Date:</strong>{' '}
//                 {new Date(predictionData.predictionDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Total Land Area:</strong>{' '}
//                 {predictionData.landDivisions.reduce((sum, division) => sum + division.landSize.area, 0)} hectares
//               </p>
//             </Col>
//             <Col md={6}>
//               <p>
//                 <strong>Predicted Crops:</strong>{' '}
//                 {[...new Set(predictionData.landDivisions.map(d => d.predictedCrop))].join(', ')}
//               </p>
//               <p>
//                 <strong>Total Investment:</strong>{' '}
//                 ₹{predictionData.landDivisions.reduce((sum, division) => sum + division.moneyUsed, 0)}
//               </p>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>
      
//       {/* Land Divisions */}
//       <h4 className="mb-3">Land Divisions</h4>
      
//       <Accordion defaultActiveKey="0" className="mb-5">
//         {predictionData.landDivisions.map((division, index) => (
//           <Accordion.Item eventKey={index.toString()} key={index}>
//             <Accordion.Header>
//               <div className="d-flex align-items-center">
//                 <FaSeedling className="me-2 text-success" />
//                 <strong>{division.plotName}</strong>
//                 <span className="ms-3">
//                   {division.landSize.area} {division.landSize.unit} of {division.predictedCrop}
//                 </span>
//               </div>
//             </Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 <Col md={4}>
//                   <Card className="mb-3">
//                     <Card.Body>
//                       <h5>
//                         <FaMoneyBillWave className="me-2 text-success" />
//                         Financials
//                       </h5>
//                       <p>
//                         <strong>Estimated Investment:</strong> ₹{division.moneyUsed}
//                       </p>
//                       <p>
//                         <strong>Duration:</strong> {division.cropDurationWeeks} weeks
//                       </p>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={8}>
//                   <h5>
//                     <FaCalendarAlt className="me-2 text-success" />
//                     Activity Timeline
//                   </h5>
                  
//                   <ListGroup>
//                     {division.activities.map((activity, idx) => (
//                       <ListGroup.Item key={idx}>
//                         <div className="d-flex justify-content-between">
//                           <div>
//                             <strong>Week {activity.week}:</strong> {activity.activity}
//                             {renderActivityBadge(activity.alert)}
//                           </div>
//                           <div>
//                             {renderActionRequired(activity.actionRequired)}
//                           </div>
//                         </div>
//                         <p className="mb-1">{activity.description}</p>
//                         {activity.notes && (
//                           <small className="text-muted">
//                             <FaClipboardCheck className="me-1" />
//                             {activity.notes}
//                           </small>
//                         )}
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 </Col>
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>
//         ))}
//       </Accordion>
      
//       {/* Input Data Section */}
//       <Card className="mb-4 shadow-sm">
//         <Card.Header className="bg-light d-flex justify-content-between align-items-center">
//           <h4 className="mb-0">Input Data Used for Prediction</h4>
//           <div>
//             <Button 
//               variant="outline-primary" 
//               size="sm" 
//               className="me-2"
//               onClick={() => navigate(`/inputs/${inputData._id}`)}
//             >
//               <FaEye className="me-1" />
//               View Details
//             </Button>
//             <Button 
//               variant="outline-success" 
//               size="sm"
//               onClick={() => navigate(`/inputs/${inputData._id}/edit`)}
//             >
//               <FaEdit className="me-1" />
//               Update
//             </Button>
//           </div>
//         </Card.Header>
//         <Card.Body>
//           <Row>
//             <Col md={6}>
//               <Table borderless>
//                 <tbody>
//                   <tr>
//                     <td><strong>Field Name:</strong></td>
//                     <td>{inputData.landIdentifier}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Location:</strong></td>
//                     <td>{inputData.latitude}, {inputData.longitude}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Area:</strong></td>
//                     <td>{inputData.area} {inputData.areaUnit}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Soil Type:</strong></td>
//                     <td>{inputData.soilType}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Soil pH:</strong></td>
//                     <td>{inputData.soilPh}</td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Col>
//             <Col md={6}>
//               <Table borderless>
//                 <tbody>
//                   <tr>
//                     <td><strong>N-P-K Levels:</strong></td>
//                     <td>{inputData.nitrogenLevel}-{inputData.phosphorusLevel}-{inputData.potassiumLevel} kg/ha</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Climate:</strong></td>
//                     <td>
//                       {inputData.averageRainfall}mm rain, {inputData.averageTemperature}°C, {inputData.averageHumidity}% humidity
//                     </td>
//                   </tr>
//                   <tr>
//                     <td><strong>Water Source:</strong></td>
//                     <td>{inputData.waterSource}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Previous Crop:</strong></td>
//                     <td>{inputData.previousCrop || 'None'}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Input Date:</strong></td>
//                     <td>{new Date(inputData.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>
      
//       <div className="d-flex justify-content-end mt-4">
//         <Button 
//           variant="success" 
//           onClick={() => navigate(`/predict?inputId=${inputData._id}`)}
//           className="me-2"
//         >
//           <FaChartLine className="me-2" />
//           Create New Prediction
//         </Button>
//         <Button 
//           variant="primary"
//           onClick={() => navigate('/dashboard')}
//         >
//           Go to Dashboard
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default PredictionOutput;


import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  Button, 
  Row, 
  Col, 
  Spinner, 
  Alert,
  Badge,
  Accordion,
  Table,
  ListGroup
} from 'react-bootstrap';
import { 
  FaArrowLeft, 
  FaChartLine, 
  FaSeedling,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaEdit,
  FaEye,
  FaWater,
  FaFlask,
  FaBug,
  FaClipboardCheck
} from 'react-icons/fa';
import PredContext from '../../context/PredContext';

const PredictionOutput = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPredictionResult, getPredictionInput } = useContext(PredContext);
  
  const [predictionData, setPredictionData] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch prediction data
        const predictionResult = await getPredictionResult(id);
        if (predictionResult?.success) {
          setPredictionData(predictionResult.data);
          
          // Fetch associated input data
          const inputResult = await getPredictionInput(predictionResult.data.inputId);
          if (inputResult?.success) {
            setInputData(inputResult.data);
          }
        } else {
          throw new Error('Failed to load prediction data');
        }
      } catch (err) {
        setError(err.message || "Failed to load prediction details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id,getPredictionInput,getPredictionResult]);

  const renderActivityBadge = (alerts) => {
    if (!alerts || alerts[0] === 'None') return null;
    return (
      <Badge bg="danger" className="ms-2">
        {alerts.join(', ')}
      </Badge>
    );
  };

  const renderActionRequired = (required) => {
    return required ? (
      <Badge bg="warning" text="dark">Action Required</Badge>
    ) : (
      <Badge bg="secondary">No Action Needed</Badge>
    );
  };

  const calculateTotalArea = () => {
    if (!predictionData?.landDivisions) return 0;
    return predictionData.landDivisions.reduce(
      (sum, division) => sum + (division.landSize?.value || 0), 0
    );
  };

  const calculateTotalInvestment = () => {
    if (!predictionData?.landDivisions) return 0;
    return predictionData.landDivisions.reduce(
      (sum, division) => sum + (division.moneyUsed || 0), 0
    );
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading prediction details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-success" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!predictionData) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Prediction not found</Alert>
        <Button variant="outline-success" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{marginTop:"7%"}}>
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <FaArrowLeft className="me-2" />
        Back to Predictions
      </Button>
      
      <h2 className="mb-4">
        <FaChartLine className="me-2 text-success" />
        Crop Prediction Results
      </h2>
      
      {/* Prediction Overview */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Prediction Overview</h4>
          <Badge bg={predictionData.status === 'current' ? 'primary' : 'secondary'}>
            {predictionData.status.toUpperCase()}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <p>
                <strong>Prediction Date:</strong>{' '}
                {new Date(predictionData.predictionDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Season:</strong> {predictionData.season} {predictionData.year}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Total Land Area:</strong>{' '}
                {calculateTotalArea()} acres
              </p>
              <p>
                <strong>Total Investment:</strong>{' '}
                ₹{calculateTotalInvestment()}
              </p>
            </Col>
          </Row>
          
          {/* Financial Summary */}
          {predictionData.financialSummary && (
            <Card className="mt-3">
              <Card.Header>
                <h5 className="mb-0">Financial Summary</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <p>
                      <strong>Total Budget:</strong>{' '}
                      ₹{predictionData.financialSummary.totalBudget?.value || 0}
                    </p>
                  </Col>
                  <Col md={4}>
                    <p>
                      <strong>Allocated:</strong>{' '}
                      {predictionData.financialSummary.allocatedBudget?.percentage || 0}%
                    </p>
                  </Col>
                  <Col md={4}>
                    <p>
                      <strong>Remaining:</strong>{' '}
                      ₹{predictionData.financialSummary.remainingBudget?.value || 0}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
      
      {/* Land Divisions */}
      <h4 className="mb-3">Land Divisions</h4>
      
      <Accordion defaultActiveKey="0" className="mb-5">
        {predictionData.landDivisions?.map((division, index) => (
          <Accordion.Item eventKey={index.toString()} key={division._id}>
            <Accordion.Header>
              <div className="d-flex align-items-center">
                <FaSeedling className="me-2 text-success" />
                <strong>{division.plotName}</strong>
                <span className="ms-3">
                  {division.landSize?.value || 0} {division.landSize?.unit || 'acres'} of {division.predictedCrop}
                </span>
                <Badge bg={division.status === 'planned' ? 'info' : 'success'} className="ms-2">
                  {division.status || 'planned'}
                </Badge>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col md={4}>
                  <Card className="mb-3">
                    <Card.Body>
                      <h5>
                        <FaMoneyBillWave className="me-2 text-success" />
                        Financials
                      </h5>
                      <p>
                        <strong>Investment:</strong> ₹{division.moneyUsed || 0}
                      </p>
                      <p>
                        <strong>Duration:</strong> {division.cropDurationWeeks || 0} weeks
                      </p>
                      {division.budgetAllocation && (
                        <p>
                          <strong>Budget Allocation:</strong>{' '}
                          {division.budgetAllocation.percentage || 0}%
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={8}>
                  <h5>
                    <FaCalendarAlt className="me-2 text-success" />
                    Activity Timeline
                  </h5>
                  
                  {division.activities?.length > 0 ? (
                    <ListGroup>
                      {division.activities.map((activity) => (
                        <ListGroup.Item key={activity._id}>
                          <div className="d-flex justify-content-between">
                            <div>
                              <strong>Week {activity.week}:</strong> {activity.activity}
                              {renderActivityBadge(activity.alert)}
                            </div>
                            <div>
                              {renderActionRequired(activity.actionRequired)}
                            </div>
                          </div>
                          <p className="mb-1">{activity.description}</p>
                          {activity.notes && (
                            <small className="text-muted">
                              <FaClipboardCheck className="me-1" />
                              {activity.notes}
                            </small>
                          )}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <Alert variant="info">No activities scheduled</Alert>
                  )}
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      
      {/* Input Data Section */}
      {inputData && (
        <Card className="mb-4 shadow-sm">
          <Card.Header className="bg-light d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Input Data Used for Prediction</h4>
            <div>
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="me-2"
                onClick={() => navigate(`/prediction-input/${inputData._id}`)}
              >
                <FaEye className="me-1" />
                View Details
              </Button>
              <Button 
                variant="outline-success" 
                size="sm"
                onClick={() => navigate(`/prediction-input/${inputData._id}/edit`)}
              >
                <FaEdit className="me-1" />
                Update
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td><strong>Field Name:</strong></td>
                      <td>{inputData.landIdentifier}</td>
                    </tr>
                    <tr>
                      <td><strong>Location:</strong></td>
                      <td>{inputData.latitude}, {inputData.longitude}</td>
                    </tr>
                    <tr>
                      <td><strong>Area:</strong></td>
                      <td>{inputData.area} {inputData.areaUnit}</td>
                    </tr>
                    <tr>
                      <td><strong>Soil Type:</strong></td>
                      <td>{inputData.soilType}</td>
                    </tr>
                    <tr>
                      <td><strong>Soil pH:</strong></td>
                      <td>{inputData.soilPh}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td><strong>N-P-K Levels:</strong></td>
                      <td>{inputData.nitrogenLevel}-{inputData.phosphorusLevel}-{inputData.potassiumLevel} kg/ha</td>
                    </tr>
                    <tr>
                      <td><strong>Climate:</strong></td>
                      <td>
                        {inputData.averageRainfall}mm rain, {inputData.averageTemperature}°C, {inputData.averageHumidity}% humidity
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Water Source:</strong></td>
                      <td>{inputData.waterSource}</td>
                    </tr>
                    <tr>
                      <td><strong>Previous Crop:</strong></td>
                      <td>{inputData.previousCrop || 'None'}</td>
                    </tr>
                    <tr>
                      <td><strong>Input Date:</strong></td>
                      <td>{new Date(inputData.createdAt).toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
      
      <div className="d-flex justify-content-end mt-4">
        <Button 
          variant="success" 
          onClick={() => navigate(`/prediction-inputs`)}
          className="me-2"
        >
          <FaChartLine className="me-2" />
          Create New Prediction
        </Button>
        <Button 
          variant="primary"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default PredictionOutput;