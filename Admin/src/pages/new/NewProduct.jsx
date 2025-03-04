import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./new.scss";
// import { DriveFolderUploadOutlined } from "@mui/icons-material";

const NewProduct = ({ inputs, title }) => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    discountedPrice: "",
    originalPrice: 0,
    discount: 0,
    productDescription: "",
    ratings: "",
    reviews: "",
    categoryId: "",
    images: [],
  });

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category/getAllCategories")
      .then((res) => {
        const allCategories = res.data.data;
        console.log("Fetched Categories:", allCategories);
        const categoryList = allCategories
          .flatMap((category) => category.subcategories)
          .filter((sub) => sub !== null);
        setCategories(categoryList);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle image selection
  const handleFileChange = (e) => {
    setProduct({ ...product, images: Array.from(e.target.files) });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: product.name,
      brand: product.brand,
      discountedPrice: product.discountedPrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      productDescription: product.productDescription,
      ratings: product.ratings,
      categoryId: product.categoryId,
    };

    console.log("Sending Product Data:", productData);

    try {
      // Step 1: Create the product in the database
      const createProductResponse = await axios.post(
        "http://localhost:8000/api/product/create",
        productData,
        { headers: { "Content-Type": "application/json" } }
      );

      const productId = createProductResponse.data.data;
      console.log("Product Created with ID:", productId);

      // Step 2: Upload images if available
      if (product.images.length > 0) {
        const formData = new FormData();
        formData.append("file", product.images[0]);

        console.log("Uploading Images...");
        await axios.post(
          `http://localhost:8000/api/product/upload?productId=${productId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("Images Uploaded Successfully!");
      }

      alert("Product and images added successfully!");
      setProduct({
        name: "",
        brand: "",
        discountedPrice: 0,
        originalPrice: 0,
        discount: 0,
        productDescription: "",
        ratings: "",
        reviews: "",
        categoryId: "",
        images: [],
      });
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("Failed to add product. Check the console for details.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="datatableTitle">
          <span>Add New Product</span>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <span className="link">Back </span>
          </Link>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit} className="form-container">
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Brand"
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              required
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Price"
              value={product.originalPrice}
              onChange={(e) =>
                setProduct({ ...product, originalPrice: e.target.value })
              }
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Discount"
              value={product.discount}
              onChange={(e) =>
                setProduct({ ...product, discount: e.target.value })
              }
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={product.productDescription}
              onChange={(e) =>
                setProduct({ ...product, productDescription: e.target.value })
              }
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Rating"
              value={product.ratings}
              onChange={(e) =>
                setProduct({ ...product, ratings: e.target.value })
              }
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={product.categoryId}
              onChange={(e) =>
                setProduct({ ...product, categoryId: e.target.value })
              }
              required
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-green-600 transition"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
