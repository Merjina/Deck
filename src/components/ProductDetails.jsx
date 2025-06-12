import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  // ✅ ALL HOOKS DECLARED UP FRONT
  const [product, setProduct] = useState(null);
  const [useCustomDimension, setUseCustomDimension] = useState(false);
  const [customDimension, setCustomDimension] = useState("");
  const [profile, setProfile] = useState({
    customerName: "",
    customerEmail: "",
  });

  // 🔁 Fetch product
  useEffect(() => {
    axios
      .get(`https://deckbackend-production.up.railway.app/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  // 🔐 Fetch profile if token is available
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://deckbackend-production.up.railway.app/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProfile({
            customerName: res.data.name,
            customerEmail: res.data.email,
          });
        });
    }
  }, []);

  // 🛒 Add to Cart
  const addToCart = () => {
    if (!product) return;
    const cartItem = {
      productId: Number(product.id),
      name: product.name,
      imagePath: product.imagePath,
      price: product.price,
      quantity: 1,
    };

    axios
      .post("https://deckbackend-production.up.railway.app/api/cart/add", cartItem, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        window.alert(`${product.name} added to cart! 🛒`);
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  // ❤️ Add to Wishlist
  const addToWishlist = () => {
    if (!product) return;
    axios
      .post("https://deckbackend-production.up.railway.app/api/wishlist/add", {
        productId: product.id,
        name: product.name,
        imagePath: product.imagePath,
        price: product.price,
      })
      .then(() => {
        window.alert(`${product.name} added to wishlist! ❤️`);
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          window.alert(`${product.name} is already in your wishlist! 📝`);
        } else {
          console.error("Error adding to wishlist", error);
          window.alert("Something went wrong while adding to wishlist 😢");
        }
      });
  };
  
  // ⏳ Show loading while product is null
  if (!product) {
    return <p className="text-center text-light">Loading product details...</p>;
  }

  return (
    <>
      <Navbar />
      <Container className="d-flex justify-content-center align-items-center my-5">
        <Card className="bg-dark text-light product-detail-card">
          <Card.Img
            variant="top"
            src={`https://deckbackend-production.up.railway.app/api/products/images/${product.imagePath}`}
            onError={(e) => (e.target.src = "placeholder.jpg")}
            className="product-detail-image"
          />
          <Card.Body>
            <Card.Title className="text-warning">{product.name}</Card.Title>
            <Card.Text>{product.description}
            {product.dimension && (
  <p className="text-info fw-bold">
    Dimensions:{" "}
    <span className="badge bg-secondary">
      {product.dimension.split(",").map((dim, idx) => (
        <span key={idx}>
          {dim.trim()}
          {idx < product.dimension.split(",").length - 1 && ", "}
        </span>
      ))}
    </span>
  </p>
)}

    <p className="text-info fw-bold">
        *All dimensions are in meters.
    </p>

            </Card.Text>
            <h5 className="text-light">₹{product.price}</h5>
            <Button variant="warning" className="me-3" onClick={addToCart}>
              Add to Cart
            </Button>
            <Button variant="danger" onClick={addToWishlist}>
              Add to Wishlist
            </Button>

            <hr className="my-4 text-light" />
            <h4 className="text-light">Request a Quotation</h4>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const selectedDimension = useCustomDimension
                  ? customDimension
                  : e.target.dimension.value;

                const payload = {
                  productId: product.id,
                  productName: product.name,
                  quotedPrice:
                    product.price * Number(e.target.quantity.value),
                  quantity: Number(e.target.quantity.value),
                  customerName: e.target.customerName.value,
                  customerEmail: e.target.customerEmail.value,
                  customOptions: selectedDimension,
                };

                console.log("🚀 Quotation Payload:", payload);

                axios
                  .post("https://deckbackend-production.up.railway.app/api/quotations/create", payload)
                  .then((res) => {
                    alert("Quotation requested successfully! 📄");

                    const fileName = res.data.pdfFileName;
                    const downloadUrl = `https://deckbackend-production.up.railway.app/api/quotations/pdf/${fileName}`;

                    const link = document.createElement("a");
                    link.href = downloadUrl;
                    link.setAttribute("download", fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  })
                  .catch((error) => {
                    alert(
                      "Failed to request quotation: " +
                        (error.response?.data?.message || error.message)
                    );
                  });
              }}
            >
              <div className="mb-3">
                <label className="form-label text-light">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={profile.customerName}
                  className="form-control"
                  required
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-light">Customer Email</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={profile.customerEmail}
                  className="form-control"
                  required
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light">
                  Select Dimension
                </label>
                {!useCustomDimension ? (
                  <select name="dimension" className="form-control" required>
                    {product.dimension?.split(",").map((dim, index) => (
                      <option key={index} value={dim.trim()}>
                        {dim.trim()}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="dimension"
                    className="form-control"
                    placeholder="Enter custom dimensions (e.g., 5ft x 3ft)"
                    value={customDimension}
                    onChange={(e) => setCustomDimension(e.target.value)}
                    required
                  />
                )}

                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={useCustomDimension}
                    onChange={() =>
                      setUseCustomDimension(!useCustomDimension)
                    }
                    id="customDimToggle"
                  />
                  <label
                    className="form-check-label text-light"
                    htmlFor="customDimToggle"
                  >
                    Use custom dimensions
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-light">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  min="1"
                  defaultValue="1"
                  required
                />
              </div>
              <Button type="submit" variant="success">
                Request Quotation
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
