import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Chat.css';

const Chat = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    comment: "",
    rating: 1,  // default rating
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchReviews();
    }
  }, [token]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/messages/all", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/messages/submit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setFormData({ ...formData, comment: "", rating: 1 });
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Submit a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          name="comment"
          placeholder="Write your review here..."
          value={formData.comment}
          onChange={handleChange}
          required
        />
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Star{rating > 1 ? 's' : ''}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!token}>Send</button>
        {!token && <p style={{ color: "red" }}>Login to submit a review.</p>}
      </form>

      <h3>Chat History</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.user.name}</strong> ({review.rating}/5): {review.comment}
            <br />
            <small>Email: {review.user.email}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
