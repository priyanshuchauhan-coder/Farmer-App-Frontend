import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaHeadset
} from 'react-icons/fa';
import customerSupport from '../assets/customerSupport.jpg'
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import AlertContext from '../context/AlertContext';
const Contact = () => {
    const {makeRequest}=useContext(AuthContext);
    const {showAlert}=useContext(AlertContext)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
      const [errors, setErrors] = useState({});
      const validate = () => {
        const newErrors = {};
        const phonePattern = /^[0-9\b]+$/;
    
        if (!formData.firstName) newErrors.firstName = 'First name is required.';
        if (!formData.lastName) newErrors.lastName = 'Last name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        if (!formData.message) newErrors.message = 'Message is required.';
        if (!formData.phone) newErrors.phone = 'Phone number is required.';
        else if (!phonePattern.test(formData.phone)) newErrors.phone = 'Phone number must be numeric.';
        else if (formData.phone.length < 10 || formData.phone.length > 15) newErrors.phone = 'Phone number must be between 10 and 15 digits.';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        
    
        if (!validate()) return;
        
        try {
          const response = await makeRequest({
            url: '/contact',
            method: 'post',
            data: formData,
          });
    
          if (response?.success) {
            showAlert(response.msg, 'success');
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              subject: 'General Inquiry',
              message: '',
            });
          } else {
            const errorMessages = response.errors.reduce((acc, error) => {
              acc[error.path] = error.msg;
              return acc;
            }, {});
            setErrors(errorMessages);
            showAlert('Please correct the errors and try again.', 'danger');
          }
        } catch (err) {
          showAlert(err.message || 'Something went wrong. Please try again later.', 'danger');
        }
      };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero bg-success text-white py-5" style={{marginTop:"3%"}}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                We're Here to Help
              </h1>
              <p className="lead mb-4">
                Have questions about our services or need support with your farm management? 
                Our team is ready to assist you.
              </p>
              <div className="d-flex gap-3">
                <Button variant="light" size="lg">
                  <FaPhone className="me-2" />
                  Call Now
                </Button>
                <Button variant="outline-light" size="lg">
                  <FaHeadset className="me-2" />
                  Support Center
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0">
              <img 
                src={customerSupport}
                alt="FarmEzy support team" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Options */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-success">
                Contact Options
              </h2>
              <p className="lead text-muted">
                Choose your preferred way to get in touch
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="icon-wrapper bg-success text-white rounded-circle mx-auto mb-4">
                  <FaPhone size={24} />
                </div>
                <h3>Phone Support</h3>
                <p className="text-muted mb-2">
                  Speak directly with our agricultural experts
                </p>
                <div className="mt-3">
                  <Button variant="success" href="tel:+18005551234">
                    +1 (800) 555-1234
                  </Button>
                </div>
                <p className="small text-muted mt-2">
                  Available Monday-Friday, 9AM-6PM IST
                </p>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="icon-wrapper bg-success text-white rounded-circle mx-auto mb-4">
                  <FaEnvelope size={24} />
                </div>
                <h3>Email Us</h3>
                <p className="text-muted mb-2">
                  Get responses within 24 hours
                </p>
                <div className="mt-3">
                  <Button variant="success" href="mailto:support@farmEzy.com">
                    support@farmEzy.com
                  </Button>
                </div>
                <p className="small text-muted mt-2">
                  For general inquiries and partnerships
                </p>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="icon-wrapper bg-success text-white rounded-circle mx-auto mb-4">
                  <FaHeadset size={24} />
                </div>
                <h3>Live Chat</h3>
                <p className="text-muted mb-2">
                  Instant help from our support team
                </p>
                <div className="mt-3">
                  <Button variant="success">
                    Start Chat Now
                  </Button>
                </div>
                <p className="small text-muted mt-2">
                  Available 24/7 for urgent inquiries
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h2 className="display-5 fw-bold text-success mb-4">
                Send Us a Message
              </h2>
              <p className="lead mb-4">
                Have a specific question? Fill out the form and our team will get back to you.
              </p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your first name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          isInvalid={!!errors.firstName} required />
                      <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your last name" value={formData.lastName}  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          isInvalid={!!errors.lastName} required />
                      <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          isInvalid={!!errors.email} required />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter your phone number" value={formData.phone}  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          isInvalid={!!errors.phone}/>
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formSubject" className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Sales Questions</option>
                    <option>Partnership Opportunities</option>
                    <option>Feedback/Suggestions</option>
                  </Form.Select>
                  
                </Form.Group>
                <Form.Group controlId="formMessage" className="mb-4">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="How can we help you?" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          isInvalid={!!errors.message} required />
                  <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="success" size="lg" type="submit">
                  Send Message
                </Button>
              </Form>
            </Col>
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h3 className="mb-4 text-success">
                    <FaMapMarkerAlt className="me-2" />
                    Our Offices
                  </h3>
                  <div className="mb-4">
                    <h5>Headquarters</h5>
                    <p className="mb-1">
                      FarmEzy Technologies Pvt. Ltd.
                    </p>
                    <p className="mb-1">
                      Ghaziabad
                    </p>
                    <p className="mb-1">
                      Uttar Pradesh
                    </p>
                    <p className="mb-0">
                      India
                    </p>
                  </div>
                  <div className="mb-4">
                    <h5>Regional Offices</h5>
                    <p className="mb-1">
                      <strong>North India:</strong> Chandigarh Tech Center
                    </p>
                    <p className="mb-1">
                      <strong>South India:</strong> Bangalore Agri-Innovation Hub
                    </p>
                    <p className="mb-1">
                      <strong>East India:</strong> Kolkata FarmTech Center
                    </p>
                    <p className="mb-1">
                      <strong>West India:</strong> Ahmedabad Agri-Zone
                    </p>
                  </div>
                  <div className="mb-4">
                    <h5>
                      <FaClock className="me-2" />
                      Business Hours
                    </h5>
                    <p className="mb-1">
                      <strong>Monday-Friday:</strong> 9:00 AM - 6:00 PM
                    </p>
                    <p className="mb-1">
                      <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                    </p>
                    <p className="mb-0">
                      <strong>Sunday:</strong> Closed
                    </p>
                  </div>
                  <div>
                    <h5 className="mb-3">Follow Us</h5>
                    <div className="social-links d-flex gap-3">
                      <a href="/" className="text-success">
                        <FaFacebook size={24} />
                      </a>
                      <a href="/" className="text-success">
                        <FaTwitter size={24} />
                      </a>
                      <a href="/" className="text-success">
                        <FaLinkedin size={24} />
                      </a>
                      <a href="/" className="text-success">
                        <FaInstagram size={24} />
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <Container fluid className="px-0">
          <div className="ratio ratio-21x9">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4668507627093!2d77.49942917520421!3d28.675678282120675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf30885b1e2a5%3A0x9983675e24c6638b!2sAjay%20Kumar%20Garg%20Engineering%20College!5e0!3m2!1sen!2sin!4v1746733144862!5m2!1sen!2sin" 
              width="600" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy"
              title="FarmEzy Headquarters Location"
            ></iframe>
          </div>
        </Container>
      </section>

      {/* FAQ CTA */}
      <section className="py-5 bg-success text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-3">
                Need Immediate Answers?
              </h2>
              <p className="lead mb-lg-0">
                Check our comprehensive FAQ section for quick solutions to common questions.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
              <Button variant="light" size="lg">
                Visit Help Center
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CSS Styles */}
      <style jsx="true">{`
        .contact-hero {
          background: linear-gradient(rgba(40, 167, 69, 0.9), rgba(40, 167, 69, 0.9)), url('');
          background-size: cover;
          background-position: center;
        }
        .icon-wrapper {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .social-links a {
          transition: transform 0.3s ease;
        }
        .social-links a:hover {
          transform: translateY(-3px);
          opacity: 0.8;
        }
        .form-control, .form-select {
          border: 1px solid #ced4da;
          padding: 10px 15px;
        }
        .form-control:focus, .form-select:focus {
          border-color: #28a745;
          box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Contact;