import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddProducts.css";

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    productId: "",
    description: "",
    price: "",
    dimension: "", // ✅ Added dimension
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://deckbackend-production.up.railway.app/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products from the server.");
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.productId ||
      !product.description ||
      !product.price ||
      !product.dimension
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }

    if (!editingProduct && !product.image) {
      alert("Please upload an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("productId", product.productId);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("dimension", product.dimension); // ✅ Added dimension
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      let response;
      if (editingProduct && editingProduct.id) {
        response = await axios.put(
          `https://deckbackend-production.up.railway.app/api/products/${editingProduct.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Product updated successfully!");
        setEditingProduct(null);
      } else {
        response = await axios.post("https://deckbackend-production.up.railway.app/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product added successfully!");
      }

      if (response.status === 200 || response.status === 201) {
        setProduct({
          name: "",
          productId: "",
          description: "",
          price: "",
          dimension: "",
          image: null,
        });
        fetchProducts();
      } else {
        alert("Failed to save product. Please try again.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert(`Failed to save product: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  const handleEdit = (item) => {
    setProduct({
      name: item.name,
      productId: item.productId,
      description: item.description,
      price: item.price,
      dimension: item.dimension || "", // ✅ Add dimension in edit
      image: null,
    });
    setEditingProduct(item);
  };

  const handleDelete = async (id) => {
    if (!id || id === "undefined") {
      alert("Invalid product ID. Cannot delete.");
      return;
    }

    try {
      const response = await axios.delete(`https://deckbackend-production.up.railway.app/api/products/${id}`);
      if (response.status === 200 || response.status === 204) {
        alert("Product deleted successfully!");
        fetchProducts();
      } else {
        alert("Failed to delete product. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(`Failed to delete product: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">{editingProduct ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Product ID</label>
            <input type="text" name="productId" value={product.productId} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Product Description</label>
            <textarea name="description" value={product.description} onChange={handleChange} required></textarea>
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Dimension</label>
            <input type="text" name="dimension" value={product.dimension} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <button type="submit" className="submit-btn">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Display Products in Table Format */}
      <div className="products-container">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Dimension</th> {/* ✅ Display dimension */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-dark">
              {products.map((item, index) => (
                <tr key={item.id || `product-${index}`}>
                  <td>
                    <img
                      src={
                        item.imagePath
                          ? `https://deckbackend-production.up.railway.app/api/products/images/${item.imagePath}`
                          : "https://via.placeholder.com/50"
                      }
                      alt={item.name}
                      className="product-table-image"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>₹{item.price}</td>
                  <td>{item.dimension || "N/A"}</td> {/* ✅ Show dimension */}
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddProducts;
