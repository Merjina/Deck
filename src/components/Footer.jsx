import React from "react";
import "../styles/Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../assets/images/decklineLogo.png";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <Container>
        <Row className="align-items-center">
          {/* Left: Logo & Contact Info */}
          <Col md={4} className="text-md-start text-center mb-3 mb-md-0">
            <img
              src={logo}
              alt="Logo"
              width="150"
              height="60"
              className="d-inline-block align-top mb-2"
            />
            <p className="footer-text">
              <FaEnvelope className="me-2" /> support@deckline.com
            </p>
            <p className="footer-text">
              <FaPhone className="me-2" /> +1 234 567 890
            </p>
          </Col>

          {/* Center: Navigation Links */}
          <Col md={4} className="text-center">
            <a href="/home" className="footer-link">Home</a> |
            <a href="/products" className="footer-link"> Products</a> |
            <a href="/about-us" className="footer-link"> About</a> |
            <a href="/contact-us" className="footer-link"> Contact</a>
          </Col>

          {/* Right: Social Media Icons */}
          <Col md={4} className="text-md-end text-center">
            <a href="https://facebook.com" className="social-icon mx-2"><FaFacebook /></a>
            <a href="https://twitter.com" className="social-icon mx-2"><FaTwitter /></a>
            <a href="https://instagram.com" className="social-icon mx-2"><FaInstagram /></a>
            <a href="https://linkedin.com" className="social-icon mx-2"><FaLinkedin /></a>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Deckline. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;