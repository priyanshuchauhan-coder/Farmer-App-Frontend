import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Footer() {
    return(
        <footer className="py-5 bg-dark text-white" id="contact">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <h5 className="fw-bold mb-4">FarmEzy</h5>
              <p>Empowering farmers with technology to make informed decisions and maximize agricultural productivity.</p>
            </Col>
            <Col md={2} className="mb-4">
              <h5 className="fw-bold mb-4">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><Link className={`nav-link`} to="/">Home</Link></li>
                <li className="mb-2"><Link className={`nav-link`} to="/contact">Contact</Link></li>
                <li className="mb-2"><Link className={`nav-link`} to="/about">About Us</Link></li>
              </ul>
            </Col>
            <Col md={3} className="mb-4">
              <h5 className="fw-bold mb-4">Contact Us</h5>
              {/* <p ><i className="bi bi-envelope me-2"></i> contact@farmEzy.com</p> */}
             <a style={{textDecoration:"none",color:"white"}} href="mailto:contact@farmEzy.com" className="text-decoration-none">
  <i className="bi bi-envelope me-2"></i>contact@farmEzy.com
</a>
              <p><i className="bi bi-phone me-2"></i> +91 7983188807</p>
              <p><i className="bi bi-geo-alt me-2"></i> Ghaziabad, India</p>
            </Col>
            <Col md={3} className="mb-4">
              <h5 className="fw-bold mb-4">Newsletter</h5>
              <p>Subscribe to get updates on new features and farming tips.</p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Your Email" />
                <button className="btn btn-success" type="button">Subscribe</button>
              </div>
            </Col>
          </Row>
          <hr className="my-4" />
          <Row>
            <Col className="text-center">
              <p className="mb-0">&copy; {new Date().getFullYear()} FarmEzy. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    )

}

export default Footer;