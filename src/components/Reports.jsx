import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Reviews.css"; // 🎨 Custom CSS


const Reports = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the backend API
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }} className="text-warning">
      <h3 >All Reviews</h3>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <li key={r.id} style={{ marginBottom: "1rem" }}>
              <strong>{r.username}</strong> ({r.rating}/5):
              <p>{r.comment}</p>
              <small>Email: {r.email}</small>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default Reports;
