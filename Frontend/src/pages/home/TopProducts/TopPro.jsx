import "./TopPro.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

const TopPro = ({ title, products }) => {
  return (
    <div className="topSelling_box p-2">
      <h3>{title}</h3>
      {products.map((product, index) => (
        <div className="items d-flex align-items-center" key={index}>
          <div className="img">
            <Link to={`/shop/product/details/${product.id}`}>
              <img src={product.image} className="w-100" alt={product.name} />
            </Link>
          </div>
          <div className="info px-3">
            <Link to={`/shop/product/details/${product.id}`}>
              <h4>
                {product.name.length > 40
                  ? product.name.substr(0, 40) + "..."
                  : product.name}
              </h4>
            </Link>
            <Stack spacing={1}>
              <Rating
                className="rating"
                name={`rating-${index}`}
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
            </Stack>
            <div className="d-flex align-items-center priceWrap">
              <span className="price text-g font-weight-bold">
                ₹{product.price}
              </span>
              {product.oldPrice && (
                <span className="oldPrice">₹{product.oldPrice}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

TopPro.propTypes = {
  title: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      oldPrice: PropTypes.number,
    })
  ).isRequired,
};

export default TopPro;
