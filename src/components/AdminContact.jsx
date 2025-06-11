import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import "../styles/AdminContact.css";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios
      .get("http://localhost:8081/api/contact/all")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Failed to fetch messages:", err));
  };

  const handleApprove = (id) => {
    if (window.confirm("Are you sure you want to approve this message?")) {
      axios
        .post(`http://localhost:8081/api/contact/${id}/approve`)
        .then(() => {
          alert("Approved successfully.");
          fetchMessages();
        })
        .catch((err) => {
          console.error("Approval failed:", err);
          alert("Approval failed.");
        });
    }
  };

  const handleEditApproval = (id) => {
    const newStatus = prompt("Enter new approval status (PENDING, APPROVED, REJECTED):");
    if (newStatus) {
      axios
        .put(`http://localhost:8081/api/contact/${id}/edit-approval`, null, {
          params: { status: newStatus },
        })
        .then(() => {
          alert("Approval status updated.");
          fetchMessages();
        })
        .catch((err) => {
          console.error("Edit approval failed:", err);
          alert("Edit approval failed.");
        });
    }
  };

  const handleEditDate = (id, currentDate) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):", currentDate || "");
    if (newDate) {
      axios
        .put(`http://localhost:8081/api/contact/${id}/edit-datetime`, {
          preferredDate: newDate,
        })
        .then(() => {
          alert("Date updated.");
          fetchMessages();
        })
        .catch((err) => {
          console.error("Date update failed:", err);
          alert("Failed to update date.");
        });
    }
  };

  return (
    <Container className="admin-contact-container my-5">
      <h2 className="text-center mb-4">Submitted Contact Messages</h2>
      <Row>
        {messages.map((msg) => (
          <Col md={6} key={msg.id} className="mb-4">
            <Card className="contact-card shadow">
              <Card.Body>
                <Card.Title>
                  {msg.name} <span className="text-muted">({msg.email})</span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{msg.phone}</Card.Subtitle>
                <Card.Text>
                  <strong>Subject:</strong> {msg.subject}<br />
                  <strong>Appointment:</strong> {msg.appointmentType || "N/A"}<br />
                  <strong>Date:</strong> {msg.preferredDate || "Not set"}<br />
                  <strong>Time:</strong> {msg.startTime || "N/A"} - {msg.endTime || "N/A"}<br />
                  <strong>Message:</strong> {msg.message}<br />
                  <strong>Status:</strong>{" "}
                  <span className={`status-${msg.status?.toLowerCase()}`}>
                    {msg.status}
                  </span>
                </Card.Text>
                <div className="d-flex justify-content-end flex-wrap gap-2">
                  <Button
                    className="btn-approve"
                    onClick={() => handleApprove(msg.id)}
                    disabled={msg.status === "APPROVED"}
                  >
                    Approve
                  </Button>
                  {/* <Button className="btn-edit" onClick={() => handleEditApproval(msg.id)}>
                    Edit Approval
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleEditDate(msg.id, msg.preferredDate)}
                  >
                    Edit Date
                  </Button> */}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminContact;
