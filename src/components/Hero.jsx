
import { Container,Row,Col,Button } from "react-bootstrap";
import happyFarmer from '../assets/happyFarmer.jpg';
import heroImage from '../assets/happyFarmer.jpg';
import { useNavigate } from "react-router-dom";
function Hero()
{
  const navigate = useNavigate();
    return(
        <header className="hero-section"  style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${heroImage})`}}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-text">
              <h1 className="display-4 fw-bold mb-4">Empowering Farmers with Smart Agriculture</h1>
              <p className="lead mb-4">FarmEzy bridges the gap between traditional farming and modern technology, helping farmers maximize yields and profits.</p>
              <div className="d-flex gap-3">
                <Button variant="warning" size="lg" className="px-4" onClick={()=>{navigate('/signup')}}>Get Started</Button>
                <Button variant="outline-light" size="lg" className="px-4" onClick={()=>{navigate('/about')}}>Learn More</Button>
              </div>
            </Col>
            <Col lg={6} className="hero-image">
              <img src={happyFarmer} alt="Happy Farmer" className="img-fluid rounded shadow" />
            </Col>
          </Row>
        </Container>
      </header>
    )

}

export default Hero;