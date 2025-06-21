import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { 
  FaLeaf, 
  FaTractor, 
  FaChartLine, 
  FaUsers,
  FaHandshake,
  FaGlobeAmericas,
  FaLightbulb,
  FaMobileAlt,
  FaSeedling
} from 'react-icons/fa';
import teamMembers from '../data/team'; // Your team data
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import openLand from '../assets/openLand.jpg'
import openLand1 from '../assets/openLand1.jpeg'
import { useNavigate } from 'react-router-dom';


const About = () => {
  const navigate=useNavigate();
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section bg-success text-white py-5" style={{marginTop:"3%"}}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                <FaLeaf className="me-3" />
                About FarmEzy
              </h1>
              <p className="lead mb-4">
                Empowering farmers with smart technology and data-driven insights 
                to revolutionize agriculture for a sustainable future.
              </p>
              <div className="d-flex gap-3">
                <Button variant="light" size="lg">
                  Meet Our Team
                </Button>
                <Button variant="outline-light" size="lg">
                  Our Mission
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0">
              <div className="ratio ratio-16x9">
                <iframe 
                  src="https://www.youtube.com/embed/Y7WX8G6enbc?si=s9qgeWHYBoSAlhnO"
                  title="FarmEzy Introduction" 
                  allowFullScreen
                  className="rounded shadow"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-success">
                Our Mission & Vision
              </h2>
              <p className="lead text-muted">
                Bridging the gap between traditional farming and modern technology
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="icon-wrapper bg-success-light text-success rounded-circle mx-auto mb-4">
                  <FaTractor size={32} />
                </div>
                <h3>Modernize Agriculture</h3>
                <p className="text-muted">
                  Bring cutting-edge technology to every farm, regardless of size or location, 
                  to increase productivity and sustainability.
                </p>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="icon-wrapper bg-success-light text-success rounded-circle mx-auto mb-4">
                  <FaChartLine size={32} />
                </div>
                <h3>Data-Driven Decisions</h3>
                <p className="text-muted">
                  Provide farmers with actionable insights powered by AI and machine learning 
                  to optimize every aspect of their operations.
                </p>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="icon-wrapper bg-success-light text-success rounded-circle mx-auto mb-4">
                  <FaGlobeAmericas size={32} />
                </div>
                <h3>Sustainable Future</h3>
                <p className="text-muted">
                  Promote eco-friendly farming practices that protect our planet while 
                  ensuring food security for growing populations.
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src={openLand}
                alt="Farmers using FarmEzy" 
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col lg={6}>
              <h2 className="display-5 fw-bold text-success mb-4">
                Our Story
              </h2>
              <p className="lead">
                FarmEzy was born from a simple idea: technology should serve those who feed the world.
              </p>
              <p>
                Founded in 2024 by agricultural engineers and data scientists, FarmEzy began as a small 
                project to help local farmers in Uttar Pradesh optimize their irrigation schedules. Today, 
                we've grown into a comprehensive platform serving thousands of farmers across India.
              </p>
              <p>
                What sets us apart is our deep understanding of both agriculture and technology. Our team 
                includes third-generation farmers alongside top tech talent, creating solutions that are 
                both innovative and practical for real-world farming.
              </p>
              <Button variant="success" size="lg" className="mt-3">
                Learn More About Our Journey
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-5 bg-success text-white">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold">
                Our Core Values
              </h2>
              <p className="lead">
                The principles that guide everything we do
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <div className="value-card p-4 text-center h-100">
                <div className="icon-wrapper bg-white text-success rounded-circle mx-auto mb-4">
                  <FaUsers size={24} />
                </div>
                <h4>Farmer First</h4>
                <p>
                  Every decision starts with the question: "How does this help farmers?"
                </p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="value-card p-4 text-center h-100">
                <div className="icon-wrapper bg-white text-success rounded-circle mx-auto mb-4">
                  <FaLightbulb size={24} />
                </div>
                <h4>Innovation</h4>
                <p>
                  We constantly push boundaries to develop groundbreaking agricultural solutions.
                </p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="value-card p-4 text-center h-100">
                <div className="icon-wrapper bg-white text-success rounded-circle mx-auto mb-4">
                  <FaHandshake size={24} />
                </div>
                <h4>Integrity</h4>
                <p>
                  We're transparent, honest, and accountable in all our relationships.
                </p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="value-card p-4 text-center h-100">
                <div className="icon-wrapper bg-white text-success rounded-circle mx-auto mb-4">
                  <FaSeedling size={24} />
                </div>
                <h4>Sustainability</h4>
                <p>
                  We promote practices that ensure long-term environmental and economic health.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-success">
                Meet The Team
              </h2>
              <p className="lead text-muted">
                The passionate people behind FarmEzy
              </p>
            </Col>
          </Row>
          <Row>
            {teamMembers.map((member, index) => (
              <Col key={index} lg={3} md={6} className="mb-4">
                <Card className="h-100 border-0 shadow-sm text-center">
                  <div className="team-img-wrapper">
                    <Card.Img 
                      variant="top" 
                      src={member.image} 
                      alt={member.name}
                      className="img-fluid"
                    />
                  </div>
                  <Card.Body>
                    <h5 className="mb-1">{member.name}</h5>
                    <p className="text-muted small mb-2">{member.position}</p>
                    <p className="small">{member.bio}</p>
                    <div className="social-links">
                      {member.linkedin && (
                        <a href={member.linkedin} className="text-success mx-1">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} className="text-success mx-1">
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
            <Col className="text-center">
              <Button variant="outline-success" size="lg">
                View All Team Members
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-success">
                What Farmers Say
              </h2>
              <p className="lead text-muted">
                Success stories from our community
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <TestimonialsCarousel />
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-success text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-3">
                Ready to transform your farming experience?
              </h2>
              <p className="lead mb-lg-0">
                Join thousands of farmers already benefiting from FarmEzy's innovative solutions.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
              <Button variant="light" size="lg" className="me-3" onClick={()=>{navigate('/signup')}}>
                Get Started
              </Button>
              <Button variant="outline-light" size="lg" onClick={()=>{navigate('/contact')}}>
                Contact Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CSS Styles */}
      <style jsx="true">{`
        .hero-section {
        

           background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('${openLand1}'); 
  background-size: cover;
  background-position: center;
        }
        .icon-wrapper {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-success-light {
          background-color: rgba(40, 167, 69, 0.1);
        }
        .team-img-wrapper {
          height: 250px;
          overflow: hidden;
        }
        .team-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .team-img-wrapper:hover img {
          transform: scale(1.05);
        }
        .value-card {
          transition: transform 0.3s ease;
        }
        .value-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default About;