import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaLock, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const { resetPassword, loading, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    
    const result = await resetPassword({ token, newPassword: password });
    if (result?.success) {
      setMessage('Password reset successfully!');
      setTimeout(() => navigate('/login'), 2000);
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
                <h3>Reset Your Password</h3>
                <p className="text-muted">
                  Create a new password for your account
                </p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaLock className="text-muted" />
                    </span>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                    <button 
                      type="button" 
                      className="input-group-text bg-light"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaCheck className="text-muted" />
                    </span>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="input-group-text bg-light"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </Form.Group>

                <Button 
                  variant="success" 
                  type="submit" 
                  className="w-100 py-2 fw-bold"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;