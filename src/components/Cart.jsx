import React from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Products.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api"; // ✅ Use deployed API

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();

  // ✅ Set JWT token to axios headers
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // ✅ Update cart quantity
  const updateCartQuantity = async (itemId, action) => {
    try {
      await axios.put(`${BASE_URL}/cart/update/${itemId}`, { action });
      window.location.reload(); // Refresh after update
    } catch (error) {
      console.error("Error updating cart quantity", error);
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${BASE_URL}/cart/remove/${itemId}`);
      window.location.reload(); // Refresh after removal
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  // ✅ Navigate to checkout
  const handleCheckout = (item) => {
    navigate("/checkout", { state: { cartItems: [item] } });
  };

  return (
    <>
      <Navbar />
      <Container className="text-center my-5">
        <h2 className="text-light">Your Cart</h2>
        {cartItems?.length === 0 ? (
          <p className="text-warning">Your cart is empty.</p>
        ) : (
          <Row className="mt-4">
            {cartItems.map((item) => (
              <Col md={4} key={item.id} className="mb-4">
                <Card className="bg-dark text-light product-card">
                  <Card.Img
                    variant="top"
                    src={`${BASE_URL}/products/images/${item.imagePath}`}
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                    className="product-image"
                  />
                  <Card.Body>
                    <Card.Title className="text-warning">{item.name}</Card.Title>
                    <h5 className="text-light">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </h5>

                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <Button
                        variant="outline-warning"
                        onClick={() => updateCartQuantity(item.id, "increase")}
                      >
                        +
                      </Button>
                      <span className="mx-3">{item.quantity}</span>
                      <Button
                        variant="outline-warning"
                        onClick={() => updateCartQuantity(item.id, "decrease")}
                      >
                        -
                      </Button>
                    </div>

                    <Button
                      variant="success"
                      className="w-100 mb-2"
                      onClick={() => handleCheckout(item)}
                    >
                      Buy Now
                    </Button>

                    <Button
                      variant="danger"
                      className="w-100"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove from Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
