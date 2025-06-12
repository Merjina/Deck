import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import {
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaStar,
  FaComments, // Added chat icon
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/decklineLogo.png";
import axios from "axios";
import "../styles/NavBar.css";

const Navbar1 = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [showChatModal, setShowChatModal] = useState(false); // State for chat modal

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigates to the products page with the query as a URL parameter
      navigate(`/products?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Toggle chat modal visibility
  const handleChatToggle = () => {
    setShowChatModal(!showChatModal);
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" className="px-3">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="Logo"
              width="150"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-between">
            <Nav className="mx-auto ml-5">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              {/* <Nav.Link href="/about-us">About</Nav.Link> */}
              <Nav.Link href="/contact-us">Contact Us</Nav.Link>
              <Nav.Link href="/notify">Notification</Nav.Link>
           
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/my_quotations">My Quotations</Nav.Link>
             </Nav>

            {/* Search bar */}
            <InputGroup className="mx-3" style={{ maxWidth: "200px" }}>
              <FormControl
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)} // Pass the event here
              />
            </InputGroup>

            <Nav className="right-end">
            
              <Nav.Link href="/wishlist">
                <FaHeart />
              </Nav.Link>
              <Nav.Link href="/cart">
                <FaShoppingCart />
              </Nav.Link>
             
             
              <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                <FaSignOutAlt title="Logout" />
              </Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

     
    
    </>
  );
};

export default Navbar1;
