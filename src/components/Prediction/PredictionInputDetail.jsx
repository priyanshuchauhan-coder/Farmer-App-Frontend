


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
  Tab,
  Tabs,
  Modal,
  Form,
  ProgressBar,
  ListGroup
} from 'react-bootstrap';
import {
  FaArrowLeft,
  FaChartLine,
  FaHistory,
  FaSave,
  FaCalendarAlt,
  FaSeedling,
  FaMoneyBillWave,
  FaClock,
  FaPercentage,
  FaBoxOpen,
  FaEdit,
  FaTrashAlt,
  FaWater,
  FaThermometerHalf,
  FaCloudRain,
  FaMapMarkerAlt
} from 'react-icons/fa';
import PredContext from '../../context/PredContext';

const PredictionInputDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPredictionInput, getAllPredictionResultForInput,requestPredictionResultForInput } = useContext(PredContext);
  
  const [inputData, setInputData] = useState(null);
  const [predictions, setPredictions] = useState({
    current: [],
    saved: [],
    historical: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getPredictionInput(id);
        
        if (result?.success) {
          setInputData(result.data);
          
          const allPredictions = await getAllPredictionResultForInput(id);
          if (allPredictions?.success) {
            const processPrediction = (pred) => {
              if (!pred) return null;
              
              return {
                ...pred,
                crops: pred.landDivisions?.map(division => ({
                  plotName: division.plotName,
                  name: division.predictedCrop,
                  duration: `${division.cropDurationWeeks} weeks`,
                  investment: `₹${division.moneyUsed}`,
                  landSize: `${division.landSize?.value || 0} ${division.landSize?.unit || 'acres'}`,
                  activities: division.activities || [],
                  status: division.status || 'planned',
                  budgetAllocation: division.budgetAllocation
                })) || [],
                financialSummary: pred.financialSummary,
                predictionDate: pred.predictionDate
              };
            };

            const transformedPredictions = {
              current: allPredictions.data.current 
                ? [processPrediction(allPredictions.data.current)] 
                : [],
              saved: allPredictions.data.saved 
                ? [processPrediction(allPredictions.data.saved)] 
                : [],
              historical: allPredictions.data.historical?.map(processPrediction) || []
            };

            setPredictions(transformedPredictions);
          }
        }
      } catch (err) {
        setError('Failed to load input details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id,getAllPredictionResultForInput,getPredictionInput]);
const handleNewPrediction = async (id) => {
    const rData= await requestPredictionResultForInput(id);
    // console.log("I will do Prediction",id);
    
if (rData?.success)
{
  if (rData?.prediction?._id)
{
  navigate(`/prediction-output/${rData?.prediction?._id}`);
}
else{
  navigate(`/prediction-input/${rData.inputId}`);
}
    navigate(`/prediction-inputs`);
  };
}
  const handleSavePrediction = (predictionId) => {
    console.log('Saving prediction:', predictionId);
    // API call to save prediction
  };

  const handleSetCurrent = (predictionId) => {
    console.log('Setting as current prediction:', predictionId);
    // API call to set as current prediction
  };

  const handleDeletePrediction = () => {
    console.log('Deleting input:', id);
    // API call to delete input
    setShowDeleteModal(false);
  };

  const handleEditInputData = () => {
    console.log('Editing input data');
    setShowEditModal(false);
    // API call to update input data
  };

  const getProfitBadge = () => {
    // Calculate profit potential based on your business logic
    const profitPotential = 'Medium'; // Replace with actual calculation
    switch (profitPotential.toLowerCase()) {
      case 'high': return <Badge bg="success">High</Badge>;
      case 'medium': return <Badge bg="warning" text="dark">Medium</Badge>;
      case 'low': return <Badge bg="danger">Low</Badge>;
      default: return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const renderCropCard = (crop, predictionStatus) => {
    return (
      <Card key={`${crop.plotName}-${crop.name}`} className="mb-3 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h4 className="mb-1">
                <FaSeedling className="me-2 text-success" />
                {crop.name} ({crop.plotName})
              </h4>
              <small className="text-muted">
                <FaCalendarAlt className="me-1" />
                {new Date(crop.predictionDate).toLocaleDateString()}
              </small>
            </div>
            <div>
              <Badge bg={
                predictionStatus === 'current' ? 'primary' :
                predictionStatus === 'saved' ? 'success' : 'secondary'
              }>
                {predictionStatus}
              </Badge>
            </div>
          </div>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <h6 className="text-muted">Land Size</h6>
                <p>{crop.landSize}</p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">Investment</h6>
                <p>{crop.investment}</p>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <h6 className="text-muted">Duration</h6>
                <p>{crop.duration}</p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">Profit Potential</h6>
                <p>{getProfitBadge(crop)}</p>
              </div>
            </Col>
          </Row>

          <div className="mt-3">
            <h6 className="text-muted">Activities</h6>
            <ListGroup>
              {crop.activities.slice(0, 3).map((activity, idx) => (
                <ListGroup.Item key={idx}>
                  Week {activity.week}: {activity.activity}
                  {activity.alert && activity.alert[0] !== 'None' && (
                    <Badge bg="warning" className="ms-2">{activity.alert.join(', ')}</Badge>
                  )}
                </ListGroup.Item>
              ))}
              {crop.activities.length > 3 && (
                <ListGroup.Item>
                  + {crop.activities.length - 3} more activities...
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderPredictionTab = (predictionArray, status) => {
    if (!predictionArray || predictionArray.length === 0) {
      return <Alert variant="info">No {status} predictions available</Alert>;
    }

    return predictionArray.map(prediction => (
      <div key={prediction._id}>
        {prediction.crops.map(crop => renderCropCard(crop, status))}
        <div className="d-flex justify-content-end mb-4">
          {status !== 'current' && (
            <Button
              variant="outline-primary"
              size="sm"
              className="me-2"
              onClick={() => handleSetCurrent(prediction._id)}
            >
              Set as Current
            </Button>
          )}
          {status !== 'saved' && (
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => handleSavePrediction(prediction._id)}
            >
              <FaSave className="me-1" />
              Save
            </Button>
          )}
        </div>
      </div>
    ));
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading input details...</p>
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

  if (!inputData) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Input not found</Alert>
        <Button variant="outline-success" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ marginTop: '7%' }}>
      <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-4">
        <FaArrowLeft className="me-2" />
        Back to All Inputs
      </Button>

      <h2 className="mb-4">
        <FaChartLine className="me-2 text-success" />
        {inputData.landIdentifier} Details
      </h2>

      {/* Field Information Card */}
      <Card className="mb-4 shadow-lg">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Field Information</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <h6 className="text-muted">
                  <FaMapMarkerAlt className="me-2" />
                  Location
                </h6>
                <p>Latitude: {inputData.latitude}</p>
                <p>Longitude: {inputData.longitude}</p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">
                  <FaMoneyBillWave className="me-2" />
                  Budget
                </h6>
                <p>₹{inputData.budget}</p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">
                  <FaSeedling className="me-2" />
                  Soil Information
                </h6>
                <p>Type: {inputData.soilType}</p>
                <p>pH: {inputData.soilPh}</p>
                <p>N-P-K: {inputData.nitrogenLevel}-{inputData.phosphorusLevel}-{inputData.potassiumLevel} kg/ha</p>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <h6 className="text-muted">
                  <FaThermometerHalf className="me-2" />
                  Climate Data
                </h6>
                <p>Rainfall: {inputData.averageRainfall} mm/year</p>
                <p>Temperature: {inputData.averageTemperature} °C</p>
                <p>Humidity: {inputData.averageHumidity}%</p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">
                  <FaWater className="me-2" />
                  Water Source
                </h6>
                <p>{inputData.waterSource}</p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">
                  <FaBoxOpen className="me-2" />
                  Previous Crop
                </h6>
                <p>{inputData.previousCrop || 'None specified'}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Edit/Delete Buttons */}
      <div className="d-flex justify-content-end mb-4">
        <Button
          variant="outline-warning"
          onClick={() => navigate(`/prediction-input/${inputData._id}`)}
          className="me-2"
        >
          <FaEdit className="me-1" />
          Edit
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => setShowDeleteModal(true)}
        >
          <FaTrashAlt className="me-1" />
          Delete
        </Button>
      </div>

      {/* Predictions Section */}
      <h3 className="mb-3">
        <FaChartLine className="me-2 text-success" />
        Crop Predictions
      </h3>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        <Tab eventKey="current" title="Current Prediction">
          {renderPredictionTab(predictions.current, 'current')}
        </Tab>
        <Tab eventKey="saved" title="Saved Prediction">
          {renderPredictionTab(predictions.saved, 'saved')}
        </Tab>
        <Tab eventKey="history" title="Prediction History">
          {renderPredictionTab(predictions.historical, 'historical')}
        </Tab>
      </Tabs>

      <div className="d-flex justify-content-end mt-4">
        {predictions.current.length===0 &&
        <Button variant="success" onClick={ () => handleNewPrediction(inputData._id)}>
          <FaChartLine className="me-2" />
          Create New Prediction
        </Button>
}
      </div>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Input Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Land Identifier</Form.Label>
              <Form.Control 
                type="text" 
                defaultValue={inputData.landIdentifier} 
              />
            </Form.Group>
            {/* Add more fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditInputData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this input and all associated predictions?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeletePrediction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PredictionInputDetail;