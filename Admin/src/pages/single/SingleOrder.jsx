import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import "./single.scss";

const SingleOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    trackingId: "",
    date: "",
    status: "",
    totalAmount: 0,
    userName: "",
    address: "",
    products: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [updatedStatus, setUpdatedStatus] = useState(""); // State to hold the updated status

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/order/getOrderId",
          {
            headers: {
              id: id,
            },
          }
        );

        console.log("Order:", res.data.data);
        setOrder(res.data.data);
        setUpdatedStatus(res.data.data.status); // Initialize updatedStatus with the current status
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value); // Update the status when dropdown changes
  };

  const handleSaveClick = async () => {
    try {
      // Send the updated status to the backend
      const res = await axios.put(
        "http://localhost:8000/api/order/updateStatus",
        null,
        {
          headers: {
            orderId: id,
            status: updatedStatus,
          },
        }
      );

      console.log("Status updated:", res.data);
      setOrder({ ...order, status: updatedStatus }); // Update the local state
      setIsEditing(false); // Disable edit mode
    } catch (err) {
      console.error("Failed to update status:", err);
      setError("Failed to update status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <span
              className="editButton"
              onClick={isEditing ? handleSaveClick : handleEditClick}
            >
              {isEditing ? "Save" : "Edit"}
            </span>

            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{order.trackingId}</h1>
                <div className="detailItem">
                  <span className="itemkey">Tracking Id: </span>
                  <span className="itemValue">{order.trackingId}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Date: </span>
                  <span className="itemValue">
                    {new Date(order.date).toLocaleString()}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Customer Name: </span>
                  <span className="itemValue">{order.userName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Address: </span>
                  <span className="itemValue">{order.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Products : </span>
                  <ol>
                    {order.products.map((item) => (
                      <li className="itemValue" key={item.productId}>
                        {item.name} - {item.brand} (₹{item.discountedPrice})
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Status: </span>
                  {isEditing ? (
                    <select
                      value={updatedStatus}
                      onChange={handleStatusChange}
                      className="statusDropdown"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  ) : (
                    <span className="itemValue">{order.status}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="itemkey">Total Amount: </span>
                  <span className="itemValue">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
