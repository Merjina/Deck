import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Quotation.css"; // 🎨 Custom CSS

const AdminQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    fetchQuotations();
  }, [filterStatus]);

  const fetchQuotations = () => {
    const url =
      filterStatus === "ALL"
        ? "http://localhost:8081/api/quotations"
        : `http://localhost:8081/api/quotations/status/${filterStatus}`;

    axios
      .get(url)
      .then((res) => setQuotations(res.data))
      .catch((err) => console.error("Error fetching quotations:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quotation?")) {
      axios
        .delete(`http://localhost:8081/api/quotations/${id}`)
        .then(() => {
          fetchQuotations();
          alert("Quotation deleted.");
        })
        .catch((err) => console.error("Error deleting quotation:", err));
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8081/api/quotations/${id}/approve`);
      console.log("✅ Quotation approved!");
      fetchQuotations(); // Refresh the list safely
    } catch (err) {
      console.error(
        "Approval error:",
        err.response?.data || err.message || err
      );
      alert("Failed to approve the quotation. Please check the backend.");
    }
  };

  const handleReject = (id) => {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      axios
        .post(`http://localhost:8081/api/quotations/${id}/reject`, null, {
          params: { reason },
        })
        .then(() => {
          fetchQuotations();
          alert("Quotation rejected.");
        })
        .catch((err) =>
          console.error("Rejection error:", err.response?.data || err)
        );
    }
  };

  const handleDownload = (fileName) => {
    const url = `http://localhost:8081/api/quotations/pdf/${fileName}`;
    window.open(url, "_blank");
  };

  return (
    <div className="admin-quotation">
      <div className="container">
        <h2 className="text-center">Manage Quotations</h2>

        {/* 🔘 Filter Buttons */}
        <div className="filter-buttons mb-3 text-center">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
            <button
              key={status}
              className={`btn btn-filter ${
                filterStatus === status ? "active" : ""
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* 🧾 Quotations Table */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Options</th>
              <th>Price</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.productName}</td>
                <td>{q.customerName}</td>
                <td>{q.customerEmail}</td>
                <td>{q.customOptions}</td>
                <td>₹{q.quotedPrice}</td>
                <td>
                  <span className={`status-${q.status.toLowerCase()}`}>
                    {q.status}
                  </span>
                </td>
                <td>{new Date(q.createdDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-approve"
                    onClick={() => handleApprove(q.id)}
                    disabled={q.status === "APPROVED"}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-reject"
                    onClick={() => handleReject(q.id)}
                    disabled={q.status === "REJECTED"}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-pdf"
                    onClick={() => handleDownload(`Quotation_${q.id}.pdf`)}
                  >
                    PDF
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(q.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuotations;
