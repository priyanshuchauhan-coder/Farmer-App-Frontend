import { Container,Row,Col,Carousel } from "react-bootstrap";
import womenFarmer from '../assets/womenFarmer.jpg'
import menFarmer from '../assets/menFarmer.jpg'

function Testimonials()
{
    return(
        <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold text-success">What Farmers Say</h2>
              <p className="lead">Success stories from our community</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Carousel>
                <Carousel.Item>
                  <div className="testimonial text-center p-4 mx-auto" style={{maxWidth: '800px'}}>
                    <p className="lead mb-4">"FarmEzy's crop prediction helped me choose the right crops for my land. My yield increased by 30% in the first season itself!"</p>
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={menFarmer} alt="User" className="rounded-circle me-3" width="60" />
                      <div>
                        <h5 className="mb-0">Rajesh Kumar</h5>
                        <p className="text-muted mb-0">Farmer, Punjab</p>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="testimonial text-center p-4 mx-auto" style={{maxWidth: '800px'}}>
                    <p className="lead mb-4">"The direct market access platform eliminated middlemen. Now I get fair prices for my produce and can plan my crops based on market demand."</p>
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={womenFarmer} alt="User" className="rounded-circle me-3" width="60" />
                      <div>
                        <h5 className="mb-0">Priya Sharma</h5>
                        <p className="text-muted mb-0">Farmer, Maharashtra</p>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>
    )

}
export default Testimonials;