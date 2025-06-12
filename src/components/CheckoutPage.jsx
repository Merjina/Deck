import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentButton from "./PaymentButton";
import { BASE_URL } from "../api"; // Use your centralized API base URL

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const quotation = location.state?.quotation;

  const cartItems =
    location.state?.cartItems ||
    (quotation
      ? [
          {
            name: quotation.productName,
            price: quotation.quotedPrice,
            quantity: quotation.quantity,
          },
        ]
      : []);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const user = response.data;
        setCustomerName(user.name || "");
        setEmail(user.email || "");
        setAddress(user.address || "");
        setPhone(user.phone || "");
        setPincode(user.pincode || "");
      })
      .catch((error) => {
        console.error("Error fetching user profile", error);
      });
  }, []);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!customerName || !email || !address || !phone || !pincode) {
      alert("Please fill in all details before proceeding.");
      return;
    }

    const orderData = {
      customerName,
      email,
      address,
      phone,
      pincode,
      totalAmount,
      quotationId: quotation?.id || null,
    };

    try {
      await axios.post(`${BASE_URL}/orders/place`, orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("🎉 Order placed successfully!");
      navigate("/order-summary");
    } catch (error) {
      console.error("Error placing order", error);
      alert("❌ Order failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h2 className="text-warning">Checkout</h2>
        {cartItems.length === 0 ? (
          <p className="text-warning">No items found for checkout.</p>
        ) : (
          <>
            <Form className="text-light">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </Form.Group>
            </Form>

            <h4 className="text-light">Items:</h4>
            <ul className="text-light">
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} — {item.quantity} x ₹{item.price}
                </li>
              ))}
            </ul>

            <h4 className="mt-3 text-success">Total: ₹{totalAmount.toFixed(2)}</h4>

            <div className="p-3 bg-dark rounded mt-3">
              <PaymentButton
                totalAmount={totalAmount}
                onSuccess={() => setPaymentSuccessful(true)}
              />
            </div>

            <Button
              variant="success"
              className="mt-3 w-100"
              onClick={handleCheckout}
              disabled={!paymentSuccessful}
            >
              Place Order
            </Button>

            {!paymentSuccessful && (
              <p className="text-warning mt-2">
                ⚠️ Please complete payment before placing your order.
              </p>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default CheckoutPage;
