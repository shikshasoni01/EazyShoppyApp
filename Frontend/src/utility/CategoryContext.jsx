import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create the context
const CategoryContext = createContext();

// Create a provider component
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/category/getAllCategories"
        );

        const allCategories = response.data.data;
        // console.log(allCategories);

        // Separate parent categories and subcategories
        const parentCategories = allCategories.filter(
          (category) => category.parentId === null
        );

        const subCategories = allCategories
          .flatMap((category) => category.subcategories)
          .filter((sub) => sub !== null);

        setParentCategories(parentCategories);
        setCategories(subCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, parentCategories, loading, error }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the CategoryContext
export const useCategories = () => useContext(CategoryContext);
