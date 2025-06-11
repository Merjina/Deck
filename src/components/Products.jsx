import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Products.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query")?.toLowerCase() || "";

  // Fetch products and wishlist
  useEffect(() => {
    // Fetch all products from the backend
    axios.get("http://localhost:8081/api/products")
      .then(response => {
        setProducts(response.data);
        filterProducts(response.data, searchQuery);
      })
      .catch(error => console.error("Error fetching products:", error));

    fetchWishlist();
  }, []);

  // Re-filter when search query changes
  useEffect(() => {
    filterProducts(products, searchQuery);
  }, [searchQuery, products]);

  // Filter products based on search query
  const filterProducts = (allProducts, query) => {
    if (!query) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  // Fetch wishlist items from the backend
  const fetchWishlist = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get("http://localhost:8081/api/wishlist", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => setWishlist(response.data))
    .catch(error => console.error("Error fetching wishlist:", error));
  };

  // Add product to the cart
  const addToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const cartItem = {
      productId: product.id,
      name: product.name,
      imagePath: product.imagePath,
      price: product.price,
      quantity: 1,
    };

    axios.post("http://localhost:8081/api/cart/add", cartItem, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(() => window.alert(`${product.name} added to cart! 🛒`))
    .catch(error => {
      if (error.response?.status === 409) {
        window.alert(`${product.name} is already in the cart! ⚠️`);
      } else {
        console.error("Error adding to cart:", error);
        window.alert("Something went wrong while adding to cart! 😓");
      }
    });
  };

  // Add product to wishlist
  const addToWishlist = (product) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.post("http://localhost:8081/api/wishlist/add", {
      productId: product.id,
      name: product.name,
      imagePath: product.imagePath,
      price: product.price
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(() => {
      fetchWishlist();
      window.alert(`${product.name} added to wishlist! ❤️`);
    })
    .catch(error => {
      if (error.response?.status === 409) {
        window.alert(`${product.name} is already in the wishlist! 📝`);
      } else {
        console.error("Error adding to wishlist", error);
        window.alert("Something went wrong while adding to wishlist! 😬");
      }
    });
  };

  return (
    <>
      <Navbar />
      <Container className="text-center my-5">
        <h2 className="text-light">Our Products</h2>
        <Row className="mt-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col md={4} key={product.id} className="mb-4">
                <Card className="bg-dark text-light product-card">
                  <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <Card.Img 
                      variant="top" 
                      src={`http://localhost:8081/api/products/images/${product.imagePath}`} 
                      onError={(e) => e.target.src = "placeholder.jpg"} 
                      className="product-image"
                    />
                    <Card.Body>
                      <Card.Title className="text-warning">{product.name}</Card.Title>
                    </Card.Body>
                  </Link>
                  <Card.Body>
                    <Card.Text>{product.description}</Card.Text>
                    <h5 className="text-light">₹{product.price}</h5>
                    <div className="d-flex justify-content-between">
                      <Button variant="warning" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                      <FaHeart
                        size={24}
                        color={wishlist.some(item => item.productId === product.id) ? "red" : "white"}
                        style={{ cursor: "pointer" }}
                        onClick={() => addToWishlist(product)}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <h4 className="text-light mt-4">No products found.</h4>
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Products;
