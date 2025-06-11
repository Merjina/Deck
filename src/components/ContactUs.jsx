import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ContactUs.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const ContactUs = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    appointmentType: "Online",
    date: "",
    startTime: "",
    endTime: "",
    message: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8081/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setError("Failed to fetch user profile"));
    } else {
      setError("You must be logged in to access this page");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      appointmentType: formData.appointmentType,
      preferredDate: formData.date, // <-- this key must match the DTO field name
      startTime: formData.startTime,
      endTime: formData.endTime,
      message: formData.message,
      name: user.name,
      email: user.email,
      phone: user.phone
    };
    
  
    console.log("Form Data to Submit:", payload);  // Check if date is included
  
    try {
      await axios.post("http://localhost:8081/api/contact/send", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess("Your message has been sent successfully!");
      setFormData({
        appointmentType: "Online",
        date: "",
        startTime: "",
        endTime: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    }
  };
  

  return (
    <>
      <Navbar />

      <section className="hero-section text-center">
        <Container>
          <h1 className="text-light">
            Contact <span className="text-warning">Us</span>
          </h1>
          <p className="lead text-light">
            Have questions? We’re here to help. Reach out to us today!
          </p>
        </Container>
      </section>

      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={5}>
            <Card className="contact-info bg-dark text-light">
              <Card.Body>
                <Card.Title className="text-warning">Get in Touch</Card.Title>
                <Card.Text><strong>📍 Address:</strong> 123 Interior Design Street, City</Card.Text>
                <Card.Text><strong>📞 Phone:</strong> +123 456 7890</Card.Text>
                <Card.Text><strong>📧 Email:</strong> contact@deckline.com</Card.Text>
                <Card.Text><strong>🕒 Business Hours:</strong> Mon-Fri, 9 AM - 6 PM</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <div className="contact-form-box">
              <h2 className="text-warning text-center">Send Us a Message</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={user.name || ""} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={user.email || ""} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" value={user.phone || ""} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Appointment Type</Form.Label>
                  <Form.Select name="appointmentType" value={formData.appointmentType} onChange={handleChange}>
                    <option>Online</option>
                    <option>Offline</option>
                  </Form.Select>
                </Form.Group>
                <Form.Control
  type="date"
  name="date"
  value={formData.date}
  onChange={handleChange}
  required
/>

                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message"
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="warning" type="submit">Send Message</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <section className="cta-section text-center py-5">
        <Container>
          <h2 className="text-light">Let's Work Together</h2>
          <p className="lead text-light">
            We’re excited to help you with your design needs. Get in touch today!
          </p>
          <Button variant="warning" size="lg">Get in Touch</Button>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default ContactUs;
