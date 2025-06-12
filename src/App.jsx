import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import LoginPage from './components/LoginPage';
import SignUpPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/Products"; 
import ForgotPassword from "./components/FPass";
import ResetPassword from "./components/ResetPassword";
import AdminDash from "./components/AdminDash";
import AddProducts from "./components/AddProducts";
import Dashboard from "./components/Dashboard"; 
import Quotations from "./components/Quotations";
import Orders from "./components/Orders";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import CustomerMng from "./components/CustomerMng"; 
import Cart from "./components/Cart";
import Wishlist from "./components/WishList";
import CheckoutPage from "./components/CheckoutPage";
import OrderSummary from "./components/OrderSummary";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ProfilePage from "./components/ProfilePage";
import SearchResults from "./components/SearchResult";
import ProductDetails from "./components/ProductDetails";
import UserQuotations from "./components/UserQuotations";
import AdminContact from "./components/AdminContact";
import Notification from "./components/Notification";
import Reviews from "./components/Reviews";
import Chat from "./components/Chat";
import Adminchat from "./components/Adminchat";

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get("https://deckbackend-production.up.railway.app/api/cart")
      .then(response => setCartItems(response.data))
      .catch(error => console.error("Error fetching cart items:", error));
  }, []);

  const addToCart = (product) => {
    axios.post("https://deckbackend-production.up.railway.app/api/cart/add", product)
      .then(() => axios.get("http://localhost:8080/api/cart"))
      .then(response => setCartItems(response.data))
      .catch(error => console.error("Error adding to cart:", error));
  };

  const removeFromCart = (id) => {
    axios.delete(`https://deckbackend-production.up.railway.app/api/cart/remove/${id}`)
      .then(() => axios.get("http://localhost:8080/api/cart"))
      .then(response => setCartItems(response.data))
      .catch(error => console.error("Error removing from cart:", error));
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
       
        <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
        <Route path="/fpass" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/my_quotations" element={<UserQuotations />} />
        <Route path="/notify" element={<Notification />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/chat" element={<Chat />} />
       
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminDash />}>
        <Route path="contact" element={<AdminContact />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AddProducts />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<CustomerMng />} />
          <Route path="reports" element={<Reports />} />
          <Route path="chat" element={<Adminchat />} />
        
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirect /admindash to /admin/dashboard */}
        <Route path="/admindash" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
