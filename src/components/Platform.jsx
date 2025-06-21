
import { Container,Row,Col,Card,Button } from "react-bootstrap"
import happyFarmer from '../assets/happyFarmer.jpg';
import marketPlace from '../assets/marketPlace.jpg'
import { useNavigate } from "react-router-dom";
function Platform()
{
  const navigate=useNavigate();
    return(
<section className="py-5" id="platforms">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold text-success">Our Platforms</h2>
              <p className="lead">Tools designed to empower farmers</p>
            </Col>
          </Row>
          <Row className="g-4">
            {/* Crop Prediction Platform */}
            <Col md={6} id="crop-prediction">
              <Card className="h-100 border-success shadow">
                <Card.Img variant="top" src={happyFarmer} />
                <Card.Body>
                  <Card.Title className="fw-bold text-success">Crop Prediction System</Card.Title>
                  <Card.Text>
                    Our AI-powered platform analyzes your land data to recommend the most suitable crops with:
                  </Card.Text>
                  <ul className="mb-4">
                    <li>Detailed cultivation timelines</li>
                    <li>Activity guidance for each growth phase</li>
                    <li>Cost estimates and budget planning</li>
                    <li>Yield predictions</li>
                    <li>Personalized recommendations</li>
                  </ul>
                  <Button variant="success" onClick={()=>{navigate('/prediction-dashboard')}}>Try Prediction Tool</Button>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Market Access Platform */}
            <Col md={6} id="market-access">
              <Card className="h-100 border-success shadow">
                <Card.Img variant="top" src={marketPlace} />
                <Card.Body>
                  <Card.Title className="fw-bold text-success">Direct Market Access</Card.Title>
                  <Card.Text>
                    Connect directly with buyers and sellers through our marketplace:
                  </Card.Text>
                  <ul className="mb-4">
                    <li>Sell your produce at competitive prices</li>
                    <li>Buy seeds and other farm inputs directly</li>
                    <li>No middlemen - better profits</li>
                    <li>Real-time market prices</li>
                    <li>Secure transactions</li>
                  </ul>
                  <Button variant="success" onClick={()=>{navigate('/ecommerce-dashboard')}}>Explore Marketplace</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    )
}
export default Platform;