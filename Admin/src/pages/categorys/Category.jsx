import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Category.scss";
import Cattable from "../../components/Category/Cattable";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="category">
      <Sidebar />
      <div className="catContainer">
        <Navbar />
        <div className="catList">
          <div className="datatableTitle">
            <span>Add New Category</span>
            <Link
              to="/category/:categoryId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add Add</span>
            </Link>
          </div>
          <Cattable />
        </div>
      </div>
    </div>
  );
};

export default Category;
