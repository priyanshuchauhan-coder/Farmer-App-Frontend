import { Carousel } from 'react-bootstrap';
import menFarmer1 from '../assets/menfarmer1.jpeg'
import womenFarmer1 from '../assets/womenFarmer1.jpg'

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Vikram Singh",
      location: "Punjab",
      role: "Wheat Farmer",
      quote: "FarmEzy's predictions increased my yield by 30% while reducing water usage. It's transformed how I farm.",
      image: menFarmer1
    },
    {
      id: 2,
      name: "Ananya Reddy",
      location: "Andhra Pradesh",
      role: "Organic Vegetable Grower",
      quote: "The marketplace connected me directly with buyers, eliminating middlemen and increasing my profits.",
      image: womenFarmer1
    },
    // Add more testimonials
  ];

  return (
    <Carousel indicators={false} controls={false} interval={5000}>
      {testimonials.map((testimonial) => (
        <Carousel.Item key={testimonial.id}>
          <div className="text-center px-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="rounded-circle mb-4"
              width="120"
              height="120"
            />
            <blockquote className="blockquote mb-4">
              <p className="lead font-italic">"{testimonial.quote}"</p>
            </blockquote>
            <h5 className="mb-1">{testimonial.name}</h5>
            <p className="text-muted">
              {testimonial.role}, {testimonial.location}
            </p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TestimonialsCarousel;