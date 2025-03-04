import "./UserOrders.css";
import { useEffect, useState } from "react";
import axios from "axios";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/order/getOrderByUserId", {
        headers: { userId },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          console.log("Orders:", res.data.data);
          setOrders(res.data.data);
        } else {
          setError("Expected an array of orders but got something else.");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="container mt-4">
      {/* <Popup title="Custom Title" message="This is a custom message." /> */}
      <h2 className="mb-3">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order, index) => (
            <div key={order.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-text">Order No: {index + 1}</h5> <hr />
                  <h5 className="card-title">Order ID: {order.trackingId}</h5>
                  <p className="card-text">
                    <strong>Total Amount:</strong> ₹
                    {order.totalAmount.toFixed(2)}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {order.status || "Pending"}
                  </p>
                  <h6>Items:</h6>
                  <ul className="list-group">
                    {order.products.map((item) => (
                      <li
                        key={item.productId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>
                            {item.name.length > 30
                              ? item.name.substr(0, 30) + "..."
                              : item.name}
                          </strong>{" "}
                          - {item.brand}
                        </div>
                        <span className="badge bg-primary rounded-pill">
                          ₹{item.discountedPrice.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
