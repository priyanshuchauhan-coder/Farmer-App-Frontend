import { Container,Row,Col } from "react-bootstrap";

function Working()
{
    return(
<section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold text-success">How FarmEzy Works</h2>
              <p className="lead">Simple steps to agricultural success</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={3} className="text-center">
              <div className="bg-success text-white rounded-circle p-4 mb-3 mx-auto" style={{width: '80px', height: '80px'}}>
                <h3 className="m-0">1</h3>
              </div>
              <h5>Sign Up</h5>
              <p>Create your free account as a farmer or buyer</p>
            </Col>
            <Col md={3} className="text-center">
              <div className="bg-success text-white rounded-circle p-4 mb-3 mx-auto" style={{width: '80px', height: '80px'}}>
                <h3 className="m-0">2</h3>
              </div>
              <h5>Input Data</h5>
              <p>Provide details about your land and preferences</p>
            </Col>
            <Col md={3} className="text-center">
              <div className="bg-success text-white rounded-circle p-4 mb-3 mx-auto" style={{width: '80px', height: '80px'}}>
                <h3 className="m-0">3</h3>
              </div>
              <h5>Get Recommendations</h5>
              <p>Receive crop predictions or market opportunities</p>
            </Col>
            <Col md={3} className="text-center">
              <div className="bg-success text-white rounded-circle p-4 mb-3 mx-auto" style={{width: '80px', height: '80px'}}>
                <h3 className="m-0">4</h3>
              </div>
              <h5>Take Action</h5>
              <p>Implement the plan or connect with buyers/sellers</p>
            </Col>
          </Row>
        </Container>
      </section>
    )
}

export default Working;