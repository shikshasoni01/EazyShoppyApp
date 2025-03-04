import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./CategoryManager.scss"; // Add a CSS file for custom styles

const CategoryManager = () => {
  const [mainCategoryName, setMainCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/category/getAllCategories"
      );
      if (response.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      }
    } catch (err) {
      setError("Failed to fetch categories.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMainCategory = async () => {
    if (!mainCategoryName) {
      setError("Main category name is required.");
      return;
    }

    try {
      const payload = {
        name: mainCategoryName,
        parentId: null, // Main category has no parent
      };

      const response = await axios.post(
        "http://localhost:8000/api/category/create",
        payload
      );
      if (response.data && response.data.status === "Success") {
        setMainCategoryName("");
        setError("");
        fetchCategories(); // Refresh the list of categories
      }
    } catch (err) {
      setError("Failed to add main category.");
      console.error(err);
    }
  };

  const handleAddSubCategory = async () => {
    if (!subCategoryName || !selectedMainCategory) {
      setError("Subcategory name and main category selection are required.");
      return;
    }

    try {
      const payload = {
        name: subCategoryName,
        parentId: selectedMainCategory, // Subcategory belongs to the selected main category
      };

      const response = await axios.post(
        "http://localhost:8000/api/category/create",
        payload
      );
      if (response.data && response.data.status === "Success") {
        setSubCategoryName("");
        setSelectedMainCategory("");
        setError("");
        fetchCategories(); // Refresh the list of categories
      }
    } catch (err) {
      setError("Failed to add subcategory.");
      console.error(err);
    }
  };

  return (
    <div className="categoryManager">
      <div className="sidebarContainer">
        <Sidebar />
      </div>
      <div className="mainContent">
        <Navbar />
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Category Manager
          </Typography>
          <Grid container spacing={3}>
            {/* Left Side: Add Main Category */}
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Add Main Category
                </Typography>
                <TextField
                  fullWidth
                  label="Main Category Name"
                  value={mainCategoryName}
                  onChange={(e) => setMainCategoryName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddMainCategory}
                >
                  Add Main Category
                </Button>
              </Paper>
            </Grid>

            {/* Right Side: Add Subcategory */}
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Add Subcategory
                </Typography>
                <Select
                  fullWidth
                  value={selectedMainCategory}
                  onChange={(e) => setSelectedMainCategory(e.target.value)}
                  displayEmpty
                  sx={{ marginBottom: 2 }}
                >
                  <MenuItem value="" disabled>
                    Select Main Category
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  fullWidth
                  label="Subcategory Name"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddSubCategory}
                >
                  Add Subcategory
                </Button>
              </Paper>
            </Grid>
          </Grid>

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}

          {/* Loading Indicator */}
          {loading && <Typography sx={{ marginTop: 2 }}>Loading...</Typography>}
        </Box>
      </div>
    </div>
  );
};

export default CategoryManager;
