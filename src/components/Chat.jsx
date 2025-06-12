import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Chat.css";
import { BASE_URL } from "../api"; // use your deployed base URL

const Chat = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    comment: "",
    rating: 1,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchReviews();
    }
  }, [token]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/messages/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/messages/submit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({ comment: "", rating: 1 });
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="chat-container" style={{ padding: "2rem" }}>
      <h2 className="text-success">Submit a Review</h2>
      <form onSubmit={handleReviewSubmit} className="chat-form mb-4">
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
              {rating} Star{rating > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!token} className="btn btn-success mt-2">
          Send
        </button>
        {!token && <p className="text-danger mt-2">Login to submit a review.</p>}
      </form>

      <h3 className="text-success">Chat History</h3>
      <ul className="chat-history">
        {reviews.map((review) => (
          <li key={review.id} className="chat-message">
            <strong>{review.user?.name || "Anonymous"}</strong> ({review.rating}/5): {review.comment}
            <br />
            <small>Email: {review.user?.email || "N/A"}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
