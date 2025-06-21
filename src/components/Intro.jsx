
import { Container,Row,Col } from "react-bootstrap";
function Intro()
{
return (
    <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold text-success">Welcome to FarmEzy</h2>
              <p className="lead">Your digital partner in agricultural success</p>
            </Col>
          </Row>
          <Row>
            <Col md={10} className="mx-auto">
              <p className="text-center">
                FarmEzy is revolutionizing agriculture by providing farmers with cutting-edge tools to make informed decisions. 
                Our platform combines data science with agricultural expertise to help you choose the right crops, 
                optimize your farming practices, and connect directly with markets to get the best prices for your produce.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
)
}
export default Intro;