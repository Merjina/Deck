import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css"; // Reuse the dark theme CSS

const UserQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const navigate = useNavigate();

  const handleProceedToOrder = (quote) => {
    navigate("/checkout", { state: { quotation: quote } });
  };

  // 🔐 Extract email from JWT
  const token = localStorage.getItem("token");
  let userEmail = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userEmail = payload.sub; // Email was stored in subject field by backend
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  }

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/quotations");
        const userQuotations = response.data.filter(
          (q) => q.customerEmail === userEmail
        );
        setQuotations(userQuotations);
      } catch (error) {
        console.error("Error fetching quotations:", error);
      }
    };

    if (userEmail) {
      fetchQuotations();
    }
  }, [userEmail]);

  return (
    <>
      <Navbar />
      <Container className="my-5 text-light">
        <h2 className="text-warning text-center mb-4">Your Quotation Requests</h2>
        <Row>
          {quotations.length === 0 ? (
            <p className="text-center">No quotations found.</p>
          ) : (
            quotations.map((quote) => (
              <Col md={4} key={quote.id} className="mb-4">
                <Card className="bg-dark text-light service-card">
                  <Card.Body>
                    <Card.Title>{quote.productName}</Card.Title>
                    <Card.Text>
                      <strong>Quantity:</strong> {quote.quantity} <br />
                      <strong>Quoted Price:</strong> ₹{quote.quotedPrice} <br />
                      <strong>Status:</strong>{" "}
                      <Badge
                        bg={
                          quote.status === "APPROVED"
                            ? "success"
                            : quote.status === "REJECTED"
                            ? "danger"
                            : "secondary"
                        }
                      >
                        {quote.status}
                      </Badge>
                    </Card.Text>
                    {quote.status === "APPROVED" && (
                      <Button variant="primary" onClick={() => handleProceedToOrder(quote)}>
                        Proceed to Order
                      </Button>
                    )}
                    {quote.status === "REJECTED" && quote.rejectionReason && (
                      <Card.Text className="text-danger mt-2">
                        <strong>Reason:</strong> {quote.rejectionReason}
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default UserQuotations;
