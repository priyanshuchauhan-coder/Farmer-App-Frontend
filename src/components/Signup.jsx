import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaIdCard, FaCalendarAlt, FaMapMarkerAlt,FaArrowRight } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import happyFarmer from '../assets/happyFarmer.jpg'

function Signup() {
  const navigate = useNavigate();
  const { signup, loading, error,fieldErrors } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  

  const [dob, setDob] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    dob: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    aadharCard: '',
    farmerId: ''
  });
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleDateChange = (date) => {
    setDob(date);
    setFormData({
      ...formData,
      dob: date.toISOString().split('T')[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);
    if (result?.success) {
      navigate('/login');
    }
  };

  const nextStep = () => {
    // Basic validation before proceeding
    if (step === 1 && (!formData.email || !formData.name || !formData.password)) {
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Container fluid className="signup-container min-vh-100 d-flex align-items-center" style={{marginTop:"3%"}}>
      <Row className="w-100 justify-content-center">
        <Col md={10} lg={8} xl={6}>
          <Card className="shadow-lg overflow-hidden">
            <Row className="g-0">
              {/* Left Side - Image */}
              <Col md={5} className="d-none d-md-block">
                <div className="signup-image-container h-100">
                  <img 
                    src={happyFarmer}
                    alt="Farm landscape" 
                    className="h-100 w-100 object-fit-cover" 
                  />
                  <div className="signup-image-overlay p-4">
                    <h3 className="text-white mb-3">
                      <FaUser className="me-2" />
                      Join FarmEzy
                    </h3>
                    <p className="text-white-50">
                      Register to access smart farming tools and direct market connections
                    </p>
                    <div className="step-indicator mt-4">
                      <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
                      <div className="step-line"></div>
                      <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
                      <div className="step-line"></div>
                      <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
                    </div>
                  </div>
                </div>
              </Col>
              
              {/* Right Side - Form */}
              <Col md={7}>
                <Card.Body className="p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h4 className="text-success">Create Your Account</h4>
                    <p className="text-muted">Fill in your details to get started</p>
                  </div>

                  {error && (
                    <Alert variant="danger" className="text-center">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FaUser />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                isInvalid={!!fieldErrors.name}
                                />
                                <Form.Control.Feedback type="invalid">
      {fieldErrors.name}
    </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FaEnvelope />
                            </InputGroup.Text>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              isInvalid={!!fieldErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
  {fieldErrors.email}
</Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FaLock />
                            </InputGroup.Text>
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Create a password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              minLength={8}
                              isInvalid={!!fieldErrors.password}
                              />
                              <Form.Control.Feedback type="invalid">
    {fieldErrors.password}
  </Form.Control.Feedback>
                            <Button 
                              variant="outline-secondary" 
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? 'Hide' : 'Show'}
                            </Button>
                          </InputGroup>
                          <Form.Text className="text-muted">
                            At least 8 characters
                          </Form.Text>
                        </Form.Group>

                        <div className="d-grid mt-4">
                          <Button variant="success" onClick={nextStep}>
                            Continue <FaArrowRight className="ms-2" />
                          </Button>
                        </div>
                      </>
                    )}

                    {/* Step 2: Personal Details */}
                    {step === 2 && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>Date of Birth</Form.Label>
                          <DatePicker
                            selected={dob}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select your date of birth"
                            className="form-control"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            maxDate={new Date()}
                            required

                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FaPhone />
                            </InputGroup.Text>
                            <Form.Control
                              type="tel"
                              name="phone"
                              placeholder="Enter your phone number"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              isInvalid={!!fieldErrors.phone}
                              />
                              <Form.Control.Feedback type="invalid">
    {fieldErrors.phone}
  </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Aadhar Card Number</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FaIdCard />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="aadharCard"
                              placeholder="Enter 12-digit Aadhar number"
                              value={formData.aadharCard}
                              onChange={handleChange}
                              required
                              pattern="[0-9]{12}"
                              isInvalid={!!fieldErrors.aadharCard}
                            />
                            <Form.Control.Feedback type="invalid">
  {fieldErrors.aadharCard}
</Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Farmer ID (if any)</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FaIdCard />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="farmerId"
                              placeholder="Enter your farmer ID"
                              value={formData.farmerId}
                              onChange={handleChange}
                              isInvalid={!!fieldErrors.farmerId}
                              />
                              <Form.Control.Feedback type="invalid">
    {fieldErrors.farmerId}
  </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        <div className="d-flex justify-content-between mt-4">
                          <Button variant="outline-secondary" onClick={prevStep}>
                            Back
                          </Button>
                          <Button variant="success" onClick={nextStep}>
                            Continue <FaArrowRight className="ms-2" />
                          </Button>
                        </div>
                      </>
                    )}

                    {/* Step 3: Address Information */}
                    {step === 3 && (
                      <>
                        <h6 className="mb-3 text-muted">
                          <FaMapMarkerAlt className="me-2" />
                          Address Information
                        </h6>

                        <Form.Group className="mb-3">
                          <Form.Label>Street Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.street"
                            placeholder="House no., Street, Village"
                            value={formData.address.street}
                            onChange={handleChange}
                            required
                            isInvalid={!!fieldErrors.address?.street}
                            />
                            <Form.Control.Feedback type="invalid">
  {fieldErrors.address?.street}
</Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                type="text"
                                name="address.city"
                                placeholder="Enter your city"
                                value={formData.address.city}
                                onChange={handleChange}
                                required
                                isInvalid={!!fieldErrors.address?.city}
                                />
                                <Form.Control.Feedback type="invalid">
      {fieldErrors.address?.city}
    </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>State</Form.Label>
                              <Form.Control
                                type="text"
                                name="address.state"
                                placeholder="Enter your state"
                                value={formData.address.state}
                                onChange={handleChange}
                                required
                                isInvalid={!!fieldErrors.address?.state}
                                />
                                <Form.Control.Feedback type="invalid">
      {fieldErrors.address?.state}
    </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Pincode</Form.Label>
                              <Form.Control
                                type="text"
                                name="address.pincode"
                                placeholder="Enter pincode"
                                value={formData.address.pincode}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{6}"
                                isInvalid={!!fieldErrors.address?.pincode}
                                />
                                <Form.Control.Feedback type="invalid">
      {fieldErrors.address?.pincode}
    </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Country</Form.Label>
                              <Form.Control
                                as="select"
                                name="address.country"
                                value={formData.address.country}
                                onChange={handleChange}
                                required
                                isInvalid={!!fieldErrors.address?.country}
                              >
                                <option value="India">India</option>
                                <option value="Other">Other</option>
                              </Form.Control>
                             
                            
                            <Form.Control.Feedback type="invalid">
  {fieldErrors.address?.country}
</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>

                        <div className="d-flex justify-content-between mt-4">
                          <Button variant="outline-secondary" onClick={prevStep}>
                            Back
                          </Button>
                          <Button 
                            variant="success" 
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Registering...
                              </>
                            ) : (
                              'Complete Registration'
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </Form>

                  <div className="text-center mt-4">
                    <p className="text-muted">
                      Already have an account?{' '}
                      {/* <a href="/login" className="text-success fw-bold text-decoration-none">
                        Log in
                      </a> */}
                       <Link className="fw-bold text-success text-decoration-none" to="/login">Log In</Link>
                  
                    </p>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Add some CSS for the component */}
      <style jsx="true">{`
        .signup-container {
          background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
            url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
          background-size: cover;
          background-position: center;
        }
        .signup-image-container {
          position: relative;
          height: 100%;
        }
        .signup-image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
        }
        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .step {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }
        .step.active {
          background-color: #28a745;
        }
        .step-line {
          width: 40px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.2);
          margin: 0 5px;
        }
        .btn-success {
          background-color: #28a745;
          border-color: #28a745;
        }
        .btn-success:hover {
          background-color: #218838;
          border-color: #1e7e34;
        }
        .react-datepicker-wrapper {
          width: 100%;
        }
      `}</style>
    </Container>
  );
}

export default Signup;