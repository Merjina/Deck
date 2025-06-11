import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Chat.css";

const Adminchat = () => {
  const [reviews, setReviews] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null); // Store the selected message ID for reply

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/messages");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };


  return (
    <div style={{ padding: "2rem" }} className="admin-chat">
      <h3 className="text-success">Chat History</h3>
      <ul className="text-success">
        {reviews.map((r) => (
          <li key={r.id} className={r.isReply ? "admin-reply" : "user-msg"}>
            <strong>{r.username}</strong>: {r.comment}
            <br />
            <small>Email: {r.email}</small>
           
          </li>
        ))}
      </ul>

     
    </div>
  );
};

export default Adminchat;
