import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";

const OrderSummary = () => {
  return (
    <>
      <Navbar />
      <Container className="my-5 text-center">
        <h2>Order Confirmed!</h2>
        <p>Your order has been placed successfully. Thank you for shopping with us!</p>
      </Container>
      <Footer />
    </>
  );
};

export default OrderSummary;
