import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Order.scss";
import Ordertable from "../../components/order/Ordertable";

const Order = () => {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          {/* <div className="datatableTitle">
            <span>View</span>
            <Link
              to="/products/productId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">View </span>
            </Link>
          </div> */}
          <Ordertable />
        </div>
      </div>
    </div>
  );
};

export default Order;
