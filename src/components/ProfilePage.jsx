import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/HomePage.css"; // Use homepage styles for consistency

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    pincode: "",
  });
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("https://deckbackend-production.up.railway.app/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => setError("Error fetching profile. Please try again later."));
    } else {
      setError("You need to log in to view your profile.");
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("https://deckbackend-production.up.railway.app/api/auth/update-profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Profile updated successfully!");
        setShowModal(false);
      })
      .catch(() => alert("Error updating profile. Please try again."));
  };

  return (
    <>
      <Navbar />
      <Container className="text-center my-5">
        {error && <div className="alert alert-danger">{error}</div>}

        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="bg-dark text-light p-4 rounded shadow">
              <Card.Body>
                <Card.Title className="text-warning fs-3">{user.name}</Card.Title>
                <Card.Text><strong>Email: </strong>{user.email}</Card.Text>
                <Card.Text><strong>Phone: </strong>{user.phone}</Card.Text>
                <Card.Text><strong>Address: </strong>{user.address}</Card.Text>
                <Card.Text><strong>Location: </strong>{user.location}</Card.Text>
                <Card.Text><strong>Pincode: </strong>{user.pincode}</Card.Text>
                <Button variant="warning" onClick={() => setShowModal(true)}>Edit Profile</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />

      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={user.name} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={user.phone} onChange={handleInputChange} pattern="\d{10}" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={user.address} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={user.location} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pincode</Form.Label>
              <Form.Control type="text" name="pincode" value={user.pincode} onChange={handleInputChange} pattern="\d{6}" required />
            </Form.Group>
            <Button type="submit" variant="warning" className="mt-3 w-100">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfilePage;
