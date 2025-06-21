import { useState, useContext,useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Container, Row, Col, Form, Button, Alert, Card, Image,InputGroup } from 'react-bootstrap';
import { FaLeaf, FaSignInAlt,FaLock ,FaEnvelope} from 'react-icons/fa';
import farmImage from '../assets/farm-login.jpg'; // Replace with your image path
import logo from '../assets/logo.png'; // Replace with your logo path
import happyfarmer from '../assets/happyFarmer.jpg';
import { Link} from 'react-router-dom';
// import PredContext from '../context/PredContext';

function Login() {
  
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const { login, loading, error, user } = useContext(AuthContext);
    const navigate = useNavigate();
    // const isLoggedIn=!!localStorage.getItem('userProfile')
  
    // Redirect if user is already logged in
    useEffect(() => {
      if (user ) {
        navigate('/dashboard');
      }
    }, [user, navigate]);
  
    const handleSubmit = async (e) => {
   
      e.preventDefault();
  try {
    const result = await login({ email, password });
    console.log('Login result:', result);
    if (result?.success) {
      console.log('Redirecting to dashboard...');
      // navigate('/dashboard');
      // navigate('/login',{replace:true});
      navigate(0)
      
    } else {
      console.error('Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
  }
    };

  return (
    // <Container fluid className="login-container min-vh-100 d-flex align-items-center">
     
    //   <Row className="w-100 justify-content-center">
    //     <Col md={8} lg={6} xl={5}>
    //       <Card className="shadow-lg overflow-hidden">
    //         <Row className="g-0">
    //           {/* Left Side - Image */}
    //           <Col md={6} className="d-none d-md-block">
    //             <div className="login-image-container h-100">
    //               <Image src={farmImage} alt="Farm landscape" className="h-100 w-100 object-fit-cover" />
    //               <div className="login-image-overlay">
    //                 <h3 className="text-white mb-4">
    //                   <FaLeaf className="me-2" />
    //                   Welcome to FarmEzy
    //                 </h3>
    //                 <p className="text-white-50">
    //                   Your digital companion for smart farming and direct market access
    //                 </p>
    //               </div>
    //             </div>
    //           </Col>
              
    //           {/* Right Side - Form */}
    //           <Col md={6}>
    //             <Card.Body className="p-4 p-md-5">
    //               <div className="text-center mb-4">
    //                 <Image src={logo} alt="FarmEzy Logo" width="120" className="mb-3" />
    //                 <h4 className="text-success">Sign In to Your Account</h4>
    //                 <p className="text-muted">Enter your credentials to access your dashboard</p>
    //               </div>

    //               {error && (
    //                 <Alert variant="danger" className="text-center">
    //                   {error}
    //                 </Alert>
    //               )}

    //               <Form onSubmit={handleSubmit}>
    //                 <Form.Group className="mb-3">
    //                   <Form.Label>Email Address</Form.Label>
    //                   <div className="input-group">
    //                     <span className="input-group-text bg-light">
    //                       <i className="bi bi-envelope text-muted"></i>
    //                     </span>
    //                     <Form.Control
    //                       type="email"
    //                       placeholder="Enter your email"
    //                       value={email}
    //                       onChange={(e) => setEmail(e.target.value)}
    //                       required
    //                     />
    //                   </div>
    //                 </Form.Group>

    //                 <Form.Group className="mb-4">
    //                   <Form.Label>Password</Form.Label>
    //                   <div className="input-group">
    //                     <span className="input-group-text bg-light">
    //                       <i className="bi bi-lock text-muted"></i>
    //                     </span>
    //                     <Form.Control
    //                       type="password"
    //                       placeholder="Enter your password"
    //                       value={password}
    //                       onChange={(e) => setPassword(e.target.value)}
    //                       required
    //                     />
    //                   </div>
    //                 </Form.Group>

    //                 <div className="d-flex justify-content-between align-items-center mb-4">
    //                   <Form.Check type="checkbox" label="Remember me" />
    //                   <a href="/forgot-password" className="text-success text-decoration-none">
    //                     Forgot password?
    //                   </a>
    //                 </div>

    //                 <Button
    //                   variant="success"
    //                   type="submit"
    //                   className="w-100 py-2 fw-bold"
    //                   disabled={loading}
    //                 >
    //                   {loading ? (
    //                     <>
    //                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    //                       Logging in...
    //                     </>
    //                   ) : (
    //                     <>
    //                       <FaSignInAlt className="me-2" />
    //                       Login
    //                     </>
    //                   )}
    //                 </Button>

    //                 <div className="text-center mt-4">
    //                   <p className="text-muted">
    //                     Don't have an account?{' '}
    //                     <a href="/register" className="text-success fw-bold text-decoration-none">
    //                       Sign up
    //                     </a>
    //                   </p>
    //                 </div>
    //               </Form>
    //             </Card.Body>
    //           </Col>
    //         </Row>
    //       </Card>
    //     </Col>
    //   </Row>

    //   {/* Add some CSS for the component */}
    //   <style jsx="true">{`
    //     .login-container {
    //       background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
    //         url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    //       background-size: cover;
    //       background-position: center;
    //     }
    //     .login-image-container {
    //       position: relative;
    //       height: 100%;
    //     }
    //     .login-image-overlay {
    //       position: absolute;
    //       bottom: 0;
    //       left: 0;
    //       right: 0;
    //       padding: 2rem;
    //       background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    //     }
    //     .card {
    //       border: none;
    //       border-radius: 15px;
    //       overflow: hidden;
    //     }
    //     .btn-success {
    //       background-color: #28a745;
    //       border-color: #28a745;
    //     }
    //     .btn-success:hover {
    //       background-color: #218838;
    //       border-color: #1e7e34;
    //     }
    //   `}</style>
    // </Container>
    <Container fluid className="login-container min-vh-100 d-flex align-items-center justify-content-center">
  <Row className="w-100 justify-content-center">
    <Col md={10} lg={8} xl={6}>
      <Card className="login-card shadow-lg">
        <Row className="g-0">
          {/* Left Image */}
          <Col md={6} className="d-none d-md-block">
            <div className="login-image-container">
              <Image src={farmImage} alt="Farm" className="login-image" />
              <div className="login-image-overlay">
                <h3 className="text-white mb-3">
                  <FaLeaf className="me-2" />
                  Welcome to FarmEzy
                </h3>
                <p className="text-white-50 fs-6">
                  Your smart farming companion for crop prediction and market access
                </p>
              </div>
            </div>
          </Col>

          {/* Right Form */}
          <Col md={6}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <Image src={logo} alt="Logo" width="100" className="mb-3" />
                <h4 className="text-success fw-bold">Welcome Back</h4>
                <p className="text-muted">Please login to continue</p>
              </div>

              {error && <Alert variant="danger" className="text-center">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                                              <InputGroup.Text>
                                                <FaEnvelope />
                                              </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                            <InputGroup.Text>
                              <FaLock />
                            </InputGroup.Text>
                  <Form.Control
                   type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button 
                              variant="outline-secondary" 
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? 'Hide' : 'Show'}
                            </Button>
                            </InputGroup>
                </Form.Group>




                <div className="d-flex justify-content-between mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a href="/forgot-password" className="text-decoration-none text-success">Forgot password?</a>
                </div>

                <Button type="submit" variant="success" className="w-100 py-2 fw-bold" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt className="me-2" />
                      Login
                    </>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-muted">
                    Don’t have an account?{' '}
                    {/* <a href="/+signup" className="fw-bold text-success text-decoration-none">Sign up</a> */}
                     <Link className="fw-bold text-success text-decoration-none" to="/signup">Sign Up</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>

  {/* Embedded Styles */}
  <style jsx="true">{`
    .login-container {
      background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
                  url('${happyfarmer}') center/cover no-repeat;
                  margin-top:3%;
    }
    .login-card {
      border: none;
      border-radius: 15px;
      overflow: hidden;
      width:115%;
    }
    .login-image-container {
      height: 100%;
      position: relative;
    }
    .login-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .login-image-overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 2rem;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    }
    .btn-success {
      background-color: #28a745;
      border: none;
    }
    .btn-success:hover {
      background-color: #218838;
    }
  `}</style>
</Container>

  );
}

export default Login;