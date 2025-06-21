import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function VerifyEmail() {
  const { token } = useParams();
  console.log(token)
  const navigate = useNavigate();
  const { verifyEmail, loading, error, resendVerification } = useContext(AuthContext);
  const [message, setMessage] = useState('Verifying your email address...');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const result = await verifyEmail(token);
      if (result?.success) {
        setMessage('Email verified successfully!');
        setVerified(true);
      } else {
        setMessage(error || 'Email verification failed');
      }
    };
    verify();
  }, [token, verifyEmail, error]);

  const handleResend = async () => {
    const result = await resendVerification();
    if (result?.success) {
      setMessage('Verification email resent successfully!');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5 text-center">
              <div className="mb-4">
                {verified ? (
                  <div className="icon-lg bg-success-light text-success rounded-circle d-inline-flex align-items-center justify-content-center">
                    <FaCheckCircle size={40} />
                  </div>
                ) : loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <div className="icon-lg bg-success-light text-success rounded-circle d-inline-flex align-items-center justify-content-center">
                    <FaEnvelope size={40} />
                  </div>
                )}
              </div>

              <h3 className="mb-3">
                {verified ? 'Email Verified!' : 'Verifying Your Email'}
              </h3>
              
              <p className="text-muted mb-4">
                {message}
              </p>

              {verified ? (
                <Button 
                  variant="success" 
                  className="px-4 py-2 fw-bold"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard <FaArrowRight className="ms-2" />
                </Button>
              ) : error ? (
                <div className="d-flex flex-column gap-2">
                  <Button 
                    variant="success" 
                    className="px-4 py-2 fw-bold"
                    onClick={handleResend}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Resend Verification Email'}
                  </Button>
                  <Button 
                    variant="outline-success" 
                    className="px-4 py-2"
                    onClick={() => navigate('/login')}
                  >
                    Back to Login
                  </Button>
                </div>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default VerifyEmail;