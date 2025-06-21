import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaLock, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { forgotPassword, loading, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await forgotPassword(email);
    if (result?.success) {
      setMessage('Password reset link has been sent to your email');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <div className="icon-lg bg-success-light text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <FaLock size={24} />
                </div>
                <h3>Forgot Password?</h3>
                <p className="text-muted">
                  Enter your email and we'll send you a link to reset your password
                </p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaEnvelope className="text-muted" />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Button 
                  variant="success" 
                  type="submit" 
                  className="w-100 py-2 fw-bold mb-3"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'} <FaArrowRight className="ms-2" />
                </Button>

                <div className="text-center mt-3">
                  <Button 
                    variant="success" 
                    className="text-decoration-none"
                    onClick={() => navigate('/login')}
                  >
                    Back to Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;