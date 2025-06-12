import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaBox, FaUsers, FaShoppingCart } from "react-icons/fa"; // Added FaShoppingCart for orders
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/admin";

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0); // State to store total orders

  // Fetch total users
  useEffect(() => {
    axios
      .get("https://deckbackend-production.up.railway.app/api/auth/all")
      .then((response) => {
        const nonAdminUsers = response.data.filter(
          (user) => user.role !== "ADMIN"
        );
        setTotalUsers(nonAdminUsers.length);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Fetch total products
  useEffect(() => {
    axios
      .get("https://deckbackend-production.up.railway.app/api/products")
      .then((response) => {
        setTotalProducts(response.data.length);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Fetch total orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://deckbackend-production.up.railway.app/api/orders");
        setTotalOrders(response.data.length); // Set the total count of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-content text-dark">
        <h1 style={{ marginLeft: "400px" }}>Welcome to Admin</h1>
        <Container className="mt-5">
          <Row className="justify-content-center gx-5 gy-4">
            <Col xs={12} md={5}>
              <Card className="admin-card text-center p-4">
                <FaUsers className="admin-icon users-icon mb-3" size={40} />
                <h4>Total Users</h4>
                <p>{totalUsers}</p>
                <Link to="/admin/customers" className="btn btn-primary">
                  Manage Users
                </Link>
              </Card>
            </Col>
            <Col xs={12} md={5}>
              <Card className="admin-card text-center p-4">
                <FaBox className="admin-icon products-icon mb-3" size={40} />
                <h4>Total Products</h4>
                <p>{totalProducts}</p>
                <Link to="/admin/products" className="btn btn-success">
                  Manage Products
                </Link>
              </Card>
            </Col>
            <Col xs={12} md={5}>
              <Card className="admin-card text-center p-4">
                <FaShoppingCart className="admin-icon orders-icon mb-3" size={40} /> {/* Added new icon */}
                <h4>Total Orders</h4>
                <p>{totalOrders}</p>
                <Link to="/admin/orders" className="btn btn-info">
                  Manage Orders
                </Link>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
