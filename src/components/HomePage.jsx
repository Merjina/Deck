import React from "react";
import { Container, Button, Carousel, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomePage.css"; // Custom CSS for styling
import commercial from "../assets/images/commercial.jpg";
import office from "../assets/images/office.jpg";
import residential from "../assets/images/residential.jpg";
import curtains from "../assets/images/curtains.jpg";
import livingRoom from "../assets/images/sofas.jpg";
import bedroom from "../assets/images/pexels-fotoaibe-1643383.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
const HomePage = () => {
  
const carouselImages = [
  { src: curtains, alt: "Curtains Interior", caption: "Elegant Curtain Designs for Your Home" },
  { src: livingRoom, alt: "Living Room Interior", caption: "Transform Your Living Room with Modern Designs" },
  { src: bedroom, alt: "Bedroom Interior", caption: "Create a Cozy and Stylish Bedroom Space" }
];

// Array of Services
const services = [
  { title: "COMMERCIAL DESIGN", description: "Commercial Interior Products.", image: commercial },
  { title: "OFFICE DESIGN", description: "Products For Office", image: office },
  { title: "RESIDENTIAL DESIGN", description: "Residential Products.", image: residential },
];

  return (
    <>
    
      <Navbar />
        {/* Hero Section with 3 Carousel Images */}
      <Carousel>
        {carouselImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={image.src} alt={image.alt} />
            <Carousel.Caption className="carousel-caption-custom">
              <h1>INTERIOR <span className="text-warning">DESIGN</span></h1>
              <p>{image.caption}</p>
              <div className="btn-group">
                <Button variant="warning" className="me-2">Get started</Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Services Section */}
      <Container className="text-center my-5">
        <h2 className="text-light">Our Services</h2>
        <Row className="mt-4">
          {services.map((service, index) => (
            <Col md={4} key={index}>
              <Card className="bg-dark text-light service-card">
                <Card.Body>
                  <Card.Title className="text-warning">{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src={service.image} />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default HomePage;