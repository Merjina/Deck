import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";

const Notification = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("https://deckbackend-production.up.railway.app/api/contact/approved", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessages(res.data))
    .catch(err => console.error("Failed to fetch approved messages"));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center text-warning mb-4">Approved Notifications</h2>
      <Row>
        {messages.map((msg) => (
          <Col md={6} key={msg.id} className="mb-3">
            <Card className="shadow-sm">
              <Card.Body className="text-white">
                <Card.Title>{msg.name} ({msg.email})</Card.Title>
                <Card.Text><strong>Phone:</strong> {msg.phone}</Card.Text>
                <Card.Text><strong>Appointment:</strong> {msg.appointmentType} on {msg.date} from {msg.startTime} to {msg.endTime}</Card.Text>
                <Card.Text><strong>Message:</strong> {msg.message}</Card.Text>
                <Card.Text><strong>Status:</strong> <span className="text-success">{msg.status}</span></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Notification;
