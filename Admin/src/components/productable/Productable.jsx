import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./productable.scss";

const Productable = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({}); // Store image URLs for each product
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product/getAllProducts")
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          console.log("Products:", res.data.data);
          setProducts(res.data.data);
        } else {
          setError("Expected an array of products but got something else.");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Function to fetch an image as a Blob and create an Object URL
  const fetchImage = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/product/images/${productId}`
      );
      console.log(res);
      if (!res.ok) {
        throw new Error("Image not found");
      }
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImages((prev) => ({
        ...prev,
        [productId]: imageObjectURL,
      }));
    } catch (error) {
      console.error("Error fetching image:", error);
      setImages((prev) => ({
        ...prev,
        [productId]: null,
      }));
    }
  };

  // Fetch images for each product
  useEffect(() => {
    products.forEach((product) => {
      fetchImage(product.productId);
    });
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="productable">
      <TableContainer component={Paper} className="tablecontainer">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Price</TableCell>
              <TableCell className="tableCell">Original Price</TableCell>
              <TableCell className="tableCell">Discount</TableCell>
              <TableCell className="tableCell">Rating</TableCell>
              <TableCell className="tableCell">Category</TableCell>
              <TableCell className="tableCell">Description</TableCell>
              <TableCell className="tableCell">Image</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">
                  {row.discountedPrice}
                </TableCell>
                <TableCell className="tableCell">{row.originalPrice}</TableCell>
                <TableCell className="tableCell">{row.discount}%</TableCell>
                <TableCell className="tableCell">{row.ratings}⭐</TableCell>
                <TableCell className="tableCell">{row.categoryName}</TableCell>
                <TableCell className="tableCell">
                  {row.productDescription.length > 70
                    ? row.productDescription.substr(0, 70) + "..."
                    : row.productDescription}
                </TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {images[row.productId] ? (
                      <img
                        src={images[row.productId]}
                        alt="Product"
                        className="image"
                      />
                    ) : (
                      <span>No Image Available</span>
                    )}

                    {/* <img src={row.img} alt="" className="image" />
                    {row.product} */}
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  <Link
                    to="/products/productId/new"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="link">Edit </span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Productable;
