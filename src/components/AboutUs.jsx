import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/AboutUs.css"; // Custom CSS
import teamImg from "../assets/images/team.jpg";
import missionImg from "../assets/images/mission.jpg";
import visionImg from "../assets/images/vision.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section text-center">
        <Container>
          <h1 className="text-light">About <span className="text-warning">Us</span></h1>
          <p className="lead text-light">
            We specialize in bringing your interior design dreams to life.
          </p>
        </Container>
      </section>

      {/* About Content */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img src={teamImg} alt="Our Team" className="img-fluid rounded" />
          </Col>
          <Col md={6}>
            <h2 className="text-warning">Who We Are</h2>
            <p>
              We are a passionate team of interior designers dedicated to transforming spaces
              into beautiful and functional environments. With years of experience in the industry,
              we bring creativity and innovation to every project.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Mission & Vision */}
      <Container className="text-center my-5">
        <Row>
          <Col md={6}>
            <Card className="bg-dark text-light">
              <Card.Img variant="top" src={missionImg} />
              <Card.Body>
                <Card.Title className="text-warning">Our Mission</Card.Title>
                <Card.Text>
                  To create stunning interiors that reflect our clients' personality and style
                  while maintaining functionality and comfort.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="bg-dark text-light">
              <Card.Img variant="top" src={visionImg} />
              <Card.Body>
                <Card.Title className="text-warning">Our Vision</Card.Title>
                <Card.Text>
                  To be a leading name in the interior design industry by consistently delivering
                  innovative and stylish solutions that exceed client expectations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <section className="cta-section text-center py-5">
        <Container>
          <h2 className="text-light">Want to Work With Us?</h2>
          <p className="lead text-light">
            Let's bring your dream interiors to life. Contact us today!
          </p>
          <Button variant="warning" size="lg">Get in Touch</Button>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
