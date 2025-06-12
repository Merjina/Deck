import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Reviews.css'; // Import the CSS file for the star rating styles

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    userId: null,
    username: "",
    email: "",
    rating: 0,
    comment: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
    fetchReviews();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("https://deckbackend-production.up.railway.app/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { id, name, email } = response.data;
      setFormData((prev) => ({
        ...prev,
        userId: id,
        username: name,
        email: email
      }));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("https://deckbackend-production.up.railway.app/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://deckbackend-production.up.railway.app/api/reviews", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFormData((prev) => ({
        ...prev,
        rating: 0,
        comment: ""
      }));
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating: rating
    }));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Submit a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          readOnly
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
        />
        
        {/* Star rating input */}
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${formData.rating >= star ? "filled" : ""}`}
              onClick={() => handleRatingClick(star)}
            >
              &#9733; {/* Unicode star character */}
            </span>
          ))}
        </div>

        <textarea
          name="comment"
          placeholder="Your comment"
          value={formData.comment}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={!token}>Submit Review</button>
        {!token && <p style={{ color: "red" }}>Login to submit a review.</p>}
      </form>

      <h3>All Reviews</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>
            <strong>{r.username}</strong> ({r.rating}/5): {r.comment}
            <br />
            <small>Email: {r.email}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
