import { Container,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Call()
{
  const navigate=useNavigate();
    return (
        <section className="py-5 bg-success text-white">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">Ready to Transform Your Farming Experience?</h2>
          <p className="lead mb-5">Join thousands of farmers who are already benefiting from FarmEzy's smart agriculture solutions.</p>
          <Button variant="light" size="lg" className="px-5 py-3 fw-bold text-success" onClick={()=>{navigate('/signup')}}>Sign Up Now - It's Free!</Button>
        </Container>
      </section>

    )
}
export default Call;