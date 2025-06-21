import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import PredContext from '../../context/PredContext';
import {
  Container,
  Button,
  Alert,
  Spinner,
  Form,
  Row,
  Col,
  InputGroup,
  Card
} from 'react-bootstrap';
import {
  FaSave,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaSeedling,
  FaWater,
  FaThermometerHalf,
  FaCloudRain,
  FaChartLine
} from 'react-icons/fa';

const EditPredictionInputPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { predictionInputs, updatePredictionInputData, loading: contextLoading, error: contextError } = useContext(PredContext);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  
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

  useEffect(() => {
    if (!contextLoading && predictionInputs.length > 0) {
      const inputToEdit = predictionInputs.find(input => input._id === id);
      if (inputToEdit) {
        setFormData({
          landIdentifier: inputToEdit.landIdentifier || '',
          latitude: inputToEdit.latitude?.toString() || '',
          longitude: inputToEdit.longitude?.toString() || '',
          area: inputToEdit.area?.toString() || '',
          budget: inputToEdit.budget?.toString() || '',
          areaUnit: inputToEdit.areaUnit || 'acres',
          soilType: inputToEdit.soilType || 'Loamy',
          soilPh: inputToEdit.soilPh?.toString() || '',
          nitrogenLevel: inputToEdit.nitrogenLevel?.toString() || '',
          phosphorusLevel: inputToEdit.phosphorusLevel?.toString() || '',
          potassiumLevel: inputToEdit.potassiumLevel?.toString() || '',
          averageRainfall: inputToEdit.averageRainfall?.toString() || '',
          averageTemperature: inputToEdit.averageTemperature?.toString() || '',
          averageHumidity: inputToEdit.averageHumidity?.toString() || '',
          waterSource: inputToEdit.waterSource || 'Rainfed',
          previousCrop: inputToEdit.previousCrop || ''
        });
      } else {
        setError('Input not found');
      }
      setLoading(false);
    }
    
    if (contextError) {
      setError(contextError);
      setLoading(false);
    }
  }, [id, predictionInputs, contextLoading, contextError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

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
        averageHumidity: parseFloat(formData.averageHumidity)
      };

      await updatePredictionInputData(id, submissionData);
      navigate(`/prediction-input/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update input');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading input data...</p>
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

  return (
    <Container className="mb-5" style={{ marginTop: "8%" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaChartLine className="me-2" />
          Edit Field Input
        </h2>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Back
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

            <div className="d-flex justify-content-end mt-4">
              <Button 
                variant="outline-secondary" 
                className="me-3" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button 
                variant="success" 
                type="submit" 
                disabled={loading}
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
                  <>
                    <FaSave className="me-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditPredictionInputPage;