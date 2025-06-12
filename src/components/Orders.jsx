import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Products.css";


const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://deckbackend-production.up.railway.app/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      
      <Container className="text-center my-5">
        <h2 className="text-success">Placed Orders</h2>
        <Row className="mt-4">
          {orders.map((order) => (
            <Col md={6} lg={4} key={order.id} className="mb-4">
              <Card style={{ backgroundColor: "#0f4c5c", color: "#ffffff" }} className="product-card">
                <Card.Body>
                  <Card.Title className="text-warning">Order #{order.id}</Card.Title>
                  <Card.Text>
                    <strong>Customer:</strong> {order.customerName} <br />
                    <strong>Email:</strong> {order.email} <br />
                    <strong>Address:</strong> {order.address} <br />
                    <strong>Total:</strong> ${order.totalAmount.toFixed(2)} <br />
                    <strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
     
    </>
  );
};

export default AdminOrdersPage;
