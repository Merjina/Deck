import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Products.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch JWT token from localStorage
  const token = localStorage.getItem('token'); // Or wherever you're storing the token

  // Set up Axios default headers with the Authorization token
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    axios.get("http://localhost:8081/api/wishlist")
      .then(response => setWishlist(response.data))
      .catch(error => console.error("Error fetching wishlist:", error));
  };

  const removeFromWishlist = (productId) => {
    axios.delete(`http://localhost:8081/api/wishlist/remove/${productId}`)
      .then(() => {
        fetchWishlist();
        window.alert("Item removed from wishlist ❌");
      })
      .catch(error => console.error("Error removing item from wishlist", error));
  };

  const moveToCart = (productId) => {
    axios.post(`http://localhost:8081/api/cart/move-from-wishlist/${productId}`)
      .then(() => {
        fetchWishlist();
        window.alert("Item moved to cart! 🛒");
      })
      .catch(error => console.error("Error moving item to cart", error));
  };

  return (
    <>
      <Navbar />
      <Container className="text-center my-5">
        <h2 className="text-light">Your Wishlist ❤️</h2>
        {wishlist.length === 0 ? (
          <p className="text-warning">Your wishlist is empty.</p>
        ) : (
          <Row className="mt-4">
            {wishlist.map((item) => (
              <Col md={4} key={item.id} className="mb-4">
                <Card className="bg-dark text-light product-card">
                  <Card.Img 
                    variant="top" 
                    src={item.imagePath.startsWith("http") ? item.imagePath : `http://localhost:8081/api/products/images/${item.imagePath}`}
                    onError={(e) => e.target.src = "placeholder.jpg"} 
                    className="product-image"
                  />
                  <Card.Body>
                    <Card.Title className="text-warning">{item.name}</Card.Title>
                    <h5 className="text-light">₹{item.price}</h5>

                    <div className="d-flex justify-content-between">
                      <Button variant="success" onClick={() => moveToCart(item.productId)}>
                        Move to Cart 🛒
                      </Button>
                      <Button variant="danger" onClick={() => removeFromWishlist(item.productId)}>
                        Remove ❌
                      </Button>
                    </div>
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

export default Wishlist;
