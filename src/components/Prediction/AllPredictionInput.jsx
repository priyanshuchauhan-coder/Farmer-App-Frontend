
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import PredContext from '../../context/PredContext';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Table, 
  Button, 
  Badge, 
  Spinner, 
  Alert,
  Dropdown,
  Pagination,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Card
} from 'react-bootstrap';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaChartLine,
  FaHistory,
  FaSearch,
  FaFilter,
  FaPlus,
  FaMapMarkerAlt,
  FaSeedling,
  FaWater,
  FaThermometerHalf,
  FaCloudRain
} from 'react-icons/fa';

const AllPredictionInputsPage = () => {
  const navigate = useNavigate();
  const { predictionInputs,requestPredictionResultForInput,deletePredictionInputData,  savePredictionInputData,loading: contextLoading, error: contextError } = useContext(PredContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    landIdentifier: '',
    latitude: '',
    longitude: '',
    area: '',
    budget: '',
    areaUnit: 'acres',
    soilType: 'Loamy',
    soilPh: '',
    nitrogenLevel: '',
    phosphorusLevel: '',
    potassiumLevel: '',
    averageRainfall: '',
    averageTemperature: '',
    averageHumidity: '',
    waterSource: 'Rainfed',
    previousCrop: ''
  });

  const soilTypes = ['Sandy', 'Loamy', 'Clay', 'Silty', 'Chalky', 'Peaty', 'Black', 'Red', 'Laterite', 'Alluvial'];
  const waterSources = ['Rainfed', 'Canal', 'Borewell', 'River', 'Tank', 'Other'];
  const areaUnits = ['acres', 'hectares', 'sqmeter', 'bigha'];

  // Use effect to handle loading state from context
  useEffect(() => {
    if (!contextLoading) {
      setLoading(false);
    }
    if (contextError) {
      setError(contextError);
    }
  }, [contextLoading, contextError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


const handleSubmit = async (e, toPredict) => {
  e.preventDefault();
  e.stopPropagation();

  const form = e.currentTarget;

  if (!form.checkValidity()) {
    setValidated(true);
    return;
  }

  setValidated(true); // Ensure validation feedback is shown

  try {
    setLoading(true);

    // Prepare data for submission
    const submissionData = {
      ...formData,
      landIdentifier: formData.landIdentifier.trim(),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      area: parseFloat(formData.area),
      budget: parseInt(formData.budget),
      soilPh: parseFloat(formData.soilPh),
      nitrogenLevel: parseFloat(formData.nitrogenLevel),
      phosphorusLevel: parseFloat(formData.phosphorusLevel),
      potassiumLevel: parseFloat(formData.potassiumLevel),
      averageRainfall: parseFloat(formData.averageRainfall),
      averageTemperature: parseFloat(formData.averageTemperature),
      averageHumidity: parseFloat(formData.averageHumidity),
      predictionStatus: 'pending',
    };

    console.log("Submitting:", submissionData);

    const rData = await savePredictionInputData(submissionData, toPredict);
    if (rData?.success) {
      if (rData?.predResultId) {
        navigate(`/prediction-output/${rData.predResultId}`);
      } else {
        navigate(`/prediction-input/${rData.predInputId}`);
      }
    }

    setShowModal(false);
    setFormData({
      landIdentifier: '',
      latitude: '',
      longitude: '',
      area: '',
      budget: '',
      areaUnit: 'acres',
      soilType: 'Loamy',
      soilPh: '',
      nitrogenLevel: '',
      phosphorusLevel: '',
      potassiumLevel: '',
      averageRainfall: '',
      averageTemperature: '',
      averageHumidity: '',
      waterSource: 'Rainfed',
      previousCrop: '',
    });
    setValidated(false); // Reset validation state
  } catch (err) {
    setError(err.message || 'Failed to save input');
  } finally {
    setLoading(false);
  }
};
  const handleView = (id) => {
    navigate(`/prediction-input/${id}`);
  };
  const handleClear = () => {
    // setShowModal(false);
      setFormData({
        landIdentifier: '',
        latitude: '',
        longitude: '',
        area: '',
        budget: '',
        areaUnit: 'acres',
        soilType: 'Loamy',
        soilPh: '',
        nitrogenLevel: '',
        phosphorusLevel: '',
        potassiumLevel: '',
        averageRainfall: '',
        averageTemperature: '',
        averageHumidity: '',
        waterSource: 'Rainfed',
        previousCrop: ''
      });
      setValidated(false);
  };
  const handleCancle=()=>
  {
    setShowModal(false);
    setFormData({
        landIdentifier: '',
        latitude: '',
        longitude: '',
        area: '',
        budget: '',
        areaUnit: 'acres',
        soilType: 'Loamy',
        soilPh: '',
        nitrogenLevel: '',
        phosphorusLevel: '',
        potassiumLevel: '',
        averageRainfall: '',
        averageTemperature: '',
        averageHumidity: '',
        waterSource: 'Rainfed',
        previousCrop: ''
      });
     setValidated(false);
  }


  const handleEdit = (id) => {
    navigate(`/prediction-input/${id}/edit`);
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
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
  const handleViewHistory = (id) => {
    navigate(`/prediction-input/${id}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'predicted':
        return <Badge bg="success">Predicted</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'failed':
        return <Badge bg="danger">Failed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };
 
  // Filter and pagination logic
  const filteredInputs = predictionInputs.filter(input => {
    const matchesSearch = input.landIdentifier?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || input.predictionStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInputs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInputs.length / itemsPerPage);

  if (contextLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading your inputs...</p>
      </Container>
    );
  }

  if (contextError) {
    return (
      <Container className="py-5">
        {contextError==="No prediction input data found for this farmer."? (<Alert style={{marginTop:"4%"}} variant="warning"><div className='d-flex justify-content-evenly align-items-center'><p className='my-2'> Please Submit New Input  </p> <Button  variant="success" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" />
          New Input
        </Button></div></Alert>):( <Alert style={{marginTop:"4%"}} variant="danger">{contextError}</Alert>)}
       
        <Button variant="outline-success" onClick={() => window.location.reload()}>
          Retry
        </Button>
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
  <Modal.Header style={{ background: "lightgreen" }} closeButton>
    <Modal.Title>
      <FaPlus className="me-2" />
      New Field Input
    </Modal.Title>
  </Modal.Header>
  <Form
    noValidate
    validated={validated}
    onSubmit={(e) => handleSubmit(e, false)} // Default to "Save Input"
  >
    <Modal.Body style={{ background: "lightgray" }}>
      {error!=="No prediction input data found for this farmer." && <Alert variant="danger">{error}</Alert>}

      <h5 className="mb-3 text-success">
        <FaMapMarkerAlt className="me-2" />
        Field Identification
      </h5>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="landIdentifier">
            <Form.Label>Field Name/Identifier*</Form.Label>
            <Form.Control
              type="text"
              name="landIdentifier"
              value={formData.landIdentifier}
              onChange={handleInputChange}
              required
              placeholder="e.g., East Field, Plot A"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a field name.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="area">
            <Form.Label>Area*</Form.Label>
            <Form.Control
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
              min="0.1"
              step="0.1"
              placeholder="2.5"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid area.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="areaUnit">
            <Form.Label>Unit*</Form.Label>
            <Form.Select
              name="areaUnit"
              value={formData.areaUnit}
              onChange={handleInputChange}
              required
            >
              {areaUnits.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* ... Other form fields remain the same ... */}
      {/* Include all other form fields as in your original code */}
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="latitude">
            <Form.Label>Latitude*</Form.Label>
            <Form.Control
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              required
              min="-90"
              max="90"
              step="0.000001"
              placeholder="27.1767"
            />
            <Form.Control.Feedback type="invalid">
              Valid latitude required (-90 to 90).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="longitude">
            <Form.Label>Longitude*</Form.Label>
            <Form.Control
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              required
              min="-180"
              max="180"
              step="0.000001"
              placeholder="78.0081"
            />
            <Form.Control.Feedback type="invalid">
              Valid longitude required (-180 to 180).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <hr className="my-4" />
      <h5 className="mb-3 text-success">
        <FaMapMarkerAlt className="me-2" />
        Budget Allocation
      </h5>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="budget">
            <Form.Label>Budget (INR)*</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              required
              min="100"
              step="10"
              placeholder="200"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Budget.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <hr className="my-4" />
      <h5 className="mb-3 text-success">
        <FaSeedling className="me-2" />
        Soil Information
      </h5>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="soilType">
            <Form.Label>Soil Type*</Form.Label>
            <Form.Select
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              required
            >
              {soilTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="soilPh">
            <Form.Label>Soil pH*</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="soilPh"
                value={formData.soilPh}
                onChange={handleInputChange}
                required
                min="0"
                max="14"
                step="0.1"
                placeholder="6.5"
              />
              <InputGroup.Text>pH</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter a valid pH (0-14).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="nitrogenLevel">
            <Form.Label>Nitrogen Level (kg/ha)*</Form.Label>
            <Form.Control
              type="number"
              name="nitrogenLevel"
              value={formData.nitrogenLevel}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="50"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid value.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="phosphorusLevel">
            <Form.Label>Phosphorus Level (kg/ha)*</Form.Label>
            <Form.Control
              type="number"
              name="phosphorusLevel"
              value={formData.phosphorusLevel}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="25"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid value.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="potassiumLevel">
            <Form.Label>Potassium Level (kg/ha)*</Form.Label>
            <Form.Control
              type="number"
              name="potassiumLevel"
              value={formData.potassiumLevel}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="40"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid value.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <hr className="my-4" />

      <h5 className="mb-3 text-success">
        <FaThermometerHalf className="me-2" />
        Climate & Water
      </h5>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="averageRainfall">
            <Form.Label>Avg. Rainfall (mm/year)*</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="averageRainfall"
                value={formData.averageRainfall}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="800"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter a valid value.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="averageTemperature">
            <Form.Label>Avg. Temperature (°C)*</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="averageTemperature"
                value={formData.averageTemperature}
                onChange={handleInputChange}
                required
                min="-50"
                max="50"
                placeholder="32"
              />
              <InputGroup.Text>°C</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter a valid value (-50 to 50).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="averageHumidity">
            <Form.Label>Avg. Humidity (%)*</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="averageHumidity"
                value={formData.averageHumidity}
                onChange={handleInputChange}
                required
                min="0"
                max="100"
                placeholder="70"
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter a valid value (0-100).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="waterSource">
            <Form.Label>Water Source*</Form.Label>
            <Form.Select
              name="waterSource"
              value={formData.waterSource}
              onChange={handleInputChange}
              required
            >
              {waterSources.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="previousCrop">
            <Form.Label>Previous Crop (if any)</Form.Label>
            <Form.Control
              type="text"
              name="previousCrop"
              value={formData.previousCrop}
              onChange={handleInputChange}
              placeholder="e.g., Maize, Wheat"
            />
          </Form.Group>
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={() => handleCancle()}>
        Cancel
      </Button>
      <Button variant="outline-secondary" onClick={handleClear}>
        Clear
      </Button>
      <Button variant="success" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Saving...
          </>
        ) : (
          'Save Input'
        )}
      </Button>
      <Button
        variant="success"
        disabled={loading}
        onClick={(e) => {
          e.preventDefault(); // Prevent default to handle custom submission
          handleSubmit(e, true); // Call handleSubmit with toPredict=true
        }}
      >
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Saving...
          </>
        ) : (
          'Save and Predict'
        )}
      </Button>
    </Modal.Footer>
  </Form>
</Modal>
      </Container>
    );
  }

  // Rest of your component remains the same...
  // [Keep all the JSX return code exactly as you have it]
  // The only change is that it will now use predictionInputs from context instead of mock data

  return (
    // ... [rest of your JSX remains exactly the same]
 
    <Container className="mb-5" style={{ marginTop: "8%" }}>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaChartLine className="me-2" />
          My Input Data
        </h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" />
          New Input
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="d-flex justify-content-between mb-4">
        <div className="w-50 me-3">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by field name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span className="me-2">
            <FaFilter className="text-muted" />
          </span>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="all">All Status</option>
            <option value="predicted">Predicted</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Inputs Table */}
      {currentItems.length > 0 ? (
        <>
          <div className="table-responsive">
            <Table striped hover className="mb-4">
              <thead>
                <tr>
                  <th>Input #</th>
                  <th>Field Name</th>
                  <th>Area</th>
                  <th>Soil Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((input, index) => (
                  <tr key={input._id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td className="fw-bold">{input.landIdentifier}</td>
                    <td>{input.area} {input.areaUnit}</td>
                    <td>{input.soilType}</td>
                    <td>{getStatusBadge(input.predictionStatus)}</td>
                    <td>{new Date(input.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-success" size="sm" id="dropdown-actions">
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleView(input._id)}>
                            <FaEye className="me-2" />
                            View Details
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleEdit(input._id)}>
                            <FaEdit className="me-2" />
                            Edit
                          </Dropdown.Item>
                          {input.currentPrediction && (
                            <Dropdown.Item onClick={() => navigate(`/prediction-output/${input.currentPrediction}`)}>
                              <FaChartLine className="me-2" />
                              View Prediction
                            </Dropdown.Item>
                          )}
                          {!input.currentPrediction && (
                          <Dropdown.Item onClick={() => handleNewPrediction(input._id)}>
                            <FaChartLine className="me-2" />
                            New Prediction
                          </Dropdown.Item>)}
                          <Dropdown.Item onClick={() => handleViewHistory(input._id)}>
                            <FaHistory className="me-2" />
                            History
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item 
                            onClick={() => handleDelete(input._id)}
                            className="text-danger"
                          >
                            <FaTrash className="me-2" />
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <Card className="text-center py-5">
          <Card.Body>
            <h5 className="text-muted">No Inputs found {!searchTerm?(""):(`for ${searchTerm}`)}</h5>
            <p>You haven't  any farming inputs yet for {filterStatus!=='all'? (capitalizeFirstLetter(filterStatus)):(searchTerm)}</p>
            <Button variant="success" onClick={() => setShowModal(true)}>
              Create Your First Input
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* New Input Modal */}
      {/* <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header style={{background:"lightgreen"}} closeButton>
          <Modal.Title >
            <FaPlus className="me-2" />
            New Field Input
          </Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} >
          <Modal.Body style={{background:"lightgray"}}>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <h5 className="mb-3 text-success">
              <FaMapMarkerAlt className="me-2" />
              Field Identification
            </h5>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="landIdentifier">
                  <Form.Label>Field Name/Identifier*</Form.Label>
                  <Form.Control
                    type="text"
                    name="landIdentifier"
                    value={formData.landIdentifier}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., East Field, Plot A"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a field name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={3}>
                <Form.Group controlId="area">
                  <Form.Label>Area*</Form.Label>
                  <Form.Control
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    min="0.1"
                    step="0.1"
                    placeholder="2.5"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid area.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
             
              <Col md={3}>
                <Form.Group controlId="areaUnit">
                  <Form.Label>Unit*</Form.Label>
                  <Form.Select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleInputChange}
                    required
                  >
                    {areaUnits.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="latitude">
                  <Form.Label>Latitude*</Form.Label>
                  <Form.Control
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    required
                    min="-90"
                    max="90"
                    step="0.000001"
                    placeholder="27.1767"
                  />
                  <Form.Control.Feedback type="invalid">
                    Valid latitude required (-90 to 90).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="longitude">
                  <Form.Label>Longitude*</Form.Label>
                  <Form.Control
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    required
                    min="-180"
                    max="180"
                    step="0.000001"
                    placeholder="78.0081"
                  />
                  <Form.Control.Feedback type="invalid">
                    Valid longitude required (-180 to 180).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />
 <h5 className="mb-3 text-success">
              <FaMapMarkerAlt className="me-2" />
              Budget Allocation
            </h5>
             <Row className="mb-3">
            
               <Col md={6}>
                <Form.Group controlId="budget">
                  <Form.Label>Budget (INR)*</Form.Label>
                  <Form.Control
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    min="100"
                    step="10"
                    placeholder="200"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Budget.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
             
             
            </Row>
             <hr className="my-4" />
            <h5 className="mb-3 text-success">
              <FaSeedling className="me-2" />
              Soil Information
            </h5>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="soilType">
                  <Form.Label>Soil Type*</Form.Label>
                  <Form.Select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleInputChange}
                    required
                  >
                    {soilTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="soilPh">
                  <Form.Label>Soil pH*</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="soilPh"
                      value={formData.soilPh}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="14"
                      step="0.1"
                      placeholder="6.5"
                    />
                    <InputGroup.Text>pH</InputGroup.Text>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid pH (0-14).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="nitrogenLevel">
                  <Form.Label>Nitrogen Level (kg/ha)*</Form.Label>
                  <Form.Control
                    type="number"
                    name="nitrogenLevel"
                    value={formData.nitrogenLevel}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="50"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="phosphorusLevel">
                  <Form.Label>Phosphorus Level (kg/ha)*</Form.Label>
                  <Form.Control
                    type="number"
                    name="phosphorusLevel"
                    value={formData.phosphorusLevel}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="25"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="potassiumLevel">
                  <Form.Label>Potassium Level (kg/ha)*</Form.Label>
                  <Form.Control
                    type="number"
                    name="potassiumLevel"
                    value={formData.potassiumLevel}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="40"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />

            <h5 className="mb-3 text-success">
              <FaThermometerHalf className="me-2" />
              Climate & Water
            </h5>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="averageRainfall">
                  <Form.Label>Avg. Rainfall (mm/year)*</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="averageRainfall"
                      value={formData.averageRainfall}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="800"
                    />
                    <InputGroup.Text>mm</InputGroup.Text>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="averageTemperature">
                  <Form.Label>Avg. Temperature (°C)*</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="averageTemperature"
                      value={formData.averageTemperature}
                      onChange={handleInputChange}
                      required
                      min="-50"
                      max="50"
                      placeholder="32"
                    />
                    <InputGroup.Text>°C</InputGroup.Text>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid value (-50 to 50).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="averageHumidity">
                  <Form.Label>Avg. Humidity (%)*</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="averageHumidity"
                      value={formData.averageHumidity}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="100"
                      placeholder="70"
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid value (0-100).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="waterSource">
                  <Form.Label>Water Source*</Form.Label>
                  <Form.Select
                    name="waterSource"
                    value={formData.waterSource}
                    onChange={handleInputChange}
                    required
                  >
                    {waterSources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="previousCrop">
                  <Form.Label>Previous Crop (if any)</Form.Label>
                  <Form.Control
                    type="text"
                    name="previousCrop"
                    value={formData.previousCrop}
                    onChange={handleInputChange}
                    placeholder="e.g., Maize, Wheat"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
             <Button variant="outline-secondary" onClick={() => handleClear()}>
              Clear
            </Button>
            <Button variant="success" type="submit" disabled={loading} onClick={(e)=>handleSubmit(e,false)} >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                'Save Input'
              )}
            </Button>
            <Button variant="success" type="submit" disabled={loading} onClick={(e)=>handleSubmit(e,true)}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                'Save and Predict'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal> */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
  <Modal.Header style={{ background: "lightgreen" }} closeButton>
    <Modal.Title>
      <FaPlus className="me-2" />
      New Field Input
    </Modal.Title>
  </Modal.Header>
  <Form
    noValidate
    validated={validated}
    onSubmit={(e) => handleSubmit(e, false)} // Default to "Save Input"
  >
    <Modal.Body style={{ background: "lightgray" }}>
      {error && <Alert variant="danger">{error}</Alert>}

      <h5 className="mb-3 text-success">
        <FaMapMarkerAlt className="me-2" />
        Field Identification
      </h5>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="landIdentifier">
            <Form.Label>Field Name/Identifier*</Form.Label>
            <Form.Control
              type="text"
              name="landIdentifier"
              value={formData.landIdentifier}
              onChange={handleInputChange}
              required
              placeholder="e.g., East Field, Plot A"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a field name.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="area">
            <Form.Label>Area*</Form.Label>
            <Form.Control
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
              min="0.1"
              step="0.1"
              placeholder="2.5"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid area.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="areaUnit">
            <Form.Label>Unit*</Form.Label>
            <Form.Select
              name="areaUnit"
              value={formData.areaUnit}
              onChange={handleInputChange}
              required
            >
              {areaUnits.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* ... Other form fields remain the same ... */}
      {/* Include all other form fields as in your original code */}
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="latitude">
            <Form.Label>Latitude*</Form.Label>
            <Form.Control
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              required
              min="-90"
              max="90"
              step="0.000001"
              placeholder="27.1767"
            />
            <Form.Control.Feedback type="invalid">
              Valid latitude required (-90 to 90).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="longitude">
            <Form.Label>Longitude*</Form.Label>
            <Form.Control
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              required
              min="-180"
              max="180"
              step="0.000001"
              placeholder="78.0081"
            />
            <Form.Control.Feedback type="invalid">
              Valid longitude required (-180 to 180).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <hr className="my-4" />
      <h5 className="mb-3 text-success">
        <FaMapMarkerAlt className="me-2" />
        Budget Allocation
      </h5>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="budget">
            <Form.Label>Budget (INR)*</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              required
              min="100"
              step="10"
              placeholder="200"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Budget.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <hr className="my-4" />
      <h5 className="mb-3 text-success">
        <FaSeedling className="me-2" />
        Soil Information
      </h5>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="soilType">
            <Form.Label>Soil Type*</Form.Label>
            <Form.Select
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              required
            >
              {soilTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="soilPh">
            <Form.Label>Soil pH*</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="soilPh"
                value={formData.soilPh}
                onChange={handleInputChange}
                required
                min="0"
                max="14"
                step="0.1"
                placeholder="6.5"
              />
              <InputGroup.Text>pH</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter a valid pH (0-14).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="nitrogenLevel">
            <Form.Label>Nitrogen Level (kg/ha)*</Form.Label>
            <Form.Control
              type="number"
              name="nitrogenLevel"
              value={formData.nitrogenLevel}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="50"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid value.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="phosphorusLevel">
            <Form.Label>Phosphorus Level (kg/ha)*</Form.Label>
            <Form.Control
              type="number"
              name="phosphorusLevel"
              value={formData.phosphorusLevel}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="25"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid value.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="potassiumLevel">
            <Form.Label>Potassium Level (kg/ha)*</Form.Label>
            <Form.Control
              type="number"
              name="potassiumLevel"
              value={formData.potassiumLevel}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="40"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid value.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <hr className="my-4" />

      <h5 className="mb-3 text-success">
        <FaThermometerHalf className="me-2" />
        Climate & Water
      </h5>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="averageRainfall">
            <Form.Label>Avg. Rainfall (mm/year)*</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="averageRainfall"
                value={formData.averageRainfall}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="800"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter a valid value.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="averageTemperature">
            <Form.Label>Avg. Temperature (°C)*</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="averageTemperature"
                value={formData.averageTemperature}
                onChange={handleInputChange}
                required
                min="-50"
                max="50"
                placeholder="32"
              />
              <InputGroup.Text>°C</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter a valid value (-50 to 50).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="averageHumidity">
            <Form.Label>Avg. Humidity (%)*</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="averageHumidity"
                value={formData.averageHumidity}
                onChange={handleInputChange}
                required
                min="0"
                max="100"
                placeholder="70"
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter a valid value (0-100).
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="waterSource">
            <Form.Label>Water Source*</Form.Label>
            <Form.Select
              name="waterSource"
              value={formData.waterSource}
              onChange={handleInputChange}
              required
            >
              {waterSources.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="previousCrop">
            <Form.Label>Previous Crop (if any)</Form.Label>
            <Form.Control
              type="text"
              name="previousCrop"
              value={formData.previousCrop}
              onChange={handleInputChange}
              placeholder="e.g., Maize, Wheat"
            />
          </Form.Group>
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={() => handleCancle()}>
        Cancel
      </Button>
      <Button variant="outline-secondary" onClick={handleClear}>
        Clear
      </Button>
      <Button variant="success" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Saving...
          </>
        ) : (
          'Save Input'
        )}
      </Button>
      <Button
        variant="success"
        disabled={loading}
        onClick={(e) => {
          e.preventDefault(); // Prevent default to handle custom submission
          handleSubmit(e, true); // Call handleSubmit with toPredict=true
        }}
      >
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Saving...
          </>
        ) : (
          'Save and Predict'
        )}
      </Button>
    </Modal.Footer>
  </Form>
</Modal>
    </Container>
  );
};

export default AllPredictionInputsPage;