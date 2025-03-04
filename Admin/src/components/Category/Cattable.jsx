import React, { useState, useEffect } from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import "./Cattable.scss";

const Cattable = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category/getAllCategories")
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          console.log("Categories:", res.data.data);
          setCategories(res.data.data);
        } else {
          setError("Expected an array of categories but got something else.");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Handle delete subcategory
  const handleDeleteSubCategory = async (subcategoryId) => {
    try {
      await axios.delete(
        "http://localhost:8000/api/category/deleteSubCategory",
        {
          headers: {
            subcategoryId: subcategoryId,
          },
        }
      );

      // Remove the deleted subcategory from the state
      const updatedCategories = categories.map((category) => ({
        ...category,
        subcategories: category.subcategories.filter(
          (sub) => sub.id !== subcategoryId
        ),
      }));
      setCategories(updatedCategories);

      toast.success("Subcategory deleted successfully", {
        style: {
          border: "1px solid #4CAF50",
          padding: "16px",
          color: "#FFFFFF",
          backgroundColor: "#66BB6A",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          fontSize: "14px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#66BB6A",
        },
      });
    } catch (err) {
      console.error("Failed to delete subcategory:", err);
      toast.error("Failed to delete subcategory", {
        style: {
          border: "1px solid #FF6B6B",
          padding: "16px",
          color: "#FFFFFF",
          backgroundColor: "#FF6B6B",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cattable">
      <Button
        variant="contained"
        color="primary"
        onClick={toggleEditMode}
        style={{ marginBottom: "20px" }}
      >
        {isEditing ? "Cancel" : "Edit"}
      </Button>

      <TableContainer component={Paper} className="tablecontainer">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Main Category</TableCell>
              <TableCell className="tableCell">Sub Category</TableCell>
              {/* <TableCell className="tableCell">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{category.name}</TableCell>
                <TableCell className="tableCell">
                  <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                    {category.subcategories.map((subcategory) => (
                      <li
                        key={subcategory.id}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {subcategory.name}
                        {isEditing && (
                          <DeleteOutlined
                            style={{
                              marginLeft: "10px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleDeleteSubCategory(subcategory.id)
                            }
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                {/* <TableCell className="tableCell">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleEditMode(category.id)}
                  >
                    Edit
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Cattable;
