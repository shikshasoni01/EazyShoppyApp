import "./Product.css";

import { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { GrView } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { CartContext } from "../../utility/CartContext";
import { useProductContext } from "../../utility/ProductContext";

const Product = ({ product }) => {
  const { addToCart, addToWishlist } = useContext(CartContext);
  const { images, fetchProductImage } = useProductContext();

  useEffect(() => {
    if (!images[product.productId]) {
      fetchProductImage(product.productId);
    }
  }, [product.productId, fetchProductImage, images]);

  const handleAddToCart = () => {
    const productToAdd = {
      productId: product.productId,
      name: product.name,
      discountedPrice: product.discountedPrice,
      quantity: 1,
      image: images[product.productId] || "no image",
    };
    addToCart(productToAdd);
  };

  return (
    <div className="productContainer transition">
      {product.tag && (
        <span className={`badge ${product.tag}`}>{product.tag}</span>
      )}

      <div className="imgWrapper">
        <img
          src={images[product.productId] || "no image"}
          alt={product.name}
          className="w-100 transition"
        />
        <div className="overlay transition">
          <ul className="list list-inline mb-0">
            <li className="list-inline-item">
              <Tooltip title="Wishlist" placement="top-start">
                <Link to="">
                  <FaRegHeart
                    size={18}
                    onClick={() => addToWishlist(product)}
                  />
                </Link>
              </Tooltip>
            </li>

            <li className="list-inline-item">
              <Tooltip title="See" placement="top-end">
                <Link to={`/shop/product/details/${product.productId}`}>
                  <GrView size={18} />
                </Link>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>

      <div className="info">
        <span className="d-block catName">{product.categoryName}</span>
        <h4 className="title">
          <Link to={`/shop/product/details/${product.productId}`}>
            {product.name.length > 35
              ? `${product.name.substr(0, 35)}...`
              : product.name}
          </Link>
        </h4>
        <Stack spacing={1}>
          <Rating
            className="rating"
            name="half-rating-read"
            defaultValue={product.ratings}
            precision={0.5}
            readOnly
          />
        </Stack>
        <span className="brand d-block text-g">
          by <Link className="text-g">{product.brand}</Link>
        </span>
        <div className="d-flex align-items-center mt-3">
          <div className="d-flex align-items-center priceWrap">
            <span className="price text-g font-weight-bold">
              ₹{product.discountedPrice.toFixed(2)}
            </span>
            {/* {product.originalPrice && (
              <span className="oldPrice">${product.originalPrice}</span>
            )} */}
          </div>
          <button className="text-g transition" onClick={handleAddToCart}>
            <PiShoppingCartSimpleBold
              size={15}
              style={{ transform: "translateY(-2px)" }}
            />{" "}
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    tag: PropTypes.string,
    categoryName: PropTypes.string,
    name: PropTypes.string,
    ratings: PropTypes.number,
    brand: PropTypes.string,
    discountedPrice: PropTypes.number,
    originalPrice: PropTypes.number,
  }).isRequired,
};

export default Product;
