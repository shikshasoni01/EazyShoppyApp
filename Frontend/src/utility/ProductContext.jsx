import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Create the context
const ProductContext = createContext();

// Create a custom hook to use the ProductContext
export const useProductContext = () => useContext(ProductContext);

// Create the provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/product/getAllProducts"
      );
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch product image
  const fetchProductImage = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/product/images/${productId}`
      );
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

  // Fetch images for all products after the products are fetched
  // useEffect(() => {
  //   if (products.length > 0) {
  //     products.forEach((product) => {
  //       fetchProductImage(product.productId);
  //     });
  //   }
  // }, [products]);

  // Fetch product by ID
  const fetchProductById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product/getProductById`,
        {
          headers: { id },
        }
      );
      return response.data.data;
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Fetch all products and their images only once on component mount
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategoryId(selectedCategory);
    } else {
      fetchAllProducts();
    }
  }, [selectedCategory]);

  // Fetch products by category ID
  const fetchProductsByCategoryId = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product/getProductByCategoryId`,
        {
          headers: { categoryId },
        }
      );
      return response.data.data;
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter products by name
  const filterProductsByName = async (name) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product/filterProductByName`,
        {
          headers: { name },
        }
      );
      return response.data.data;
    } catch (err) {
      setError(err.message);
    }
  };

  // Upload product image
  const uploadProductImage = async (file, productId) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", productId);

      const response = await axios.post(
        "http://localhost:8000/api/product/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(err.message);
    }
  };

  // Create product
  const createProduct = async (productRequestWrapper) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/product/create",
        productRequestWrapper
      );
      return response.data.data;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        images,
        loading,
        error,
        fetchAllProducts,
        fetchProductById,
        fetchProductsByCategoryId,
        filterProductsByName,
        uploadProductImage,
        fetchProductImage,
        createProduct,
        selectedCategory,
        handleCategoryChange,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
