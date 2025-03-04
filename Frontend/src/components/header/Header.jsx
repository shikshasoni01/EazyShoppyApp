import "./header.css";
import { useEffect, useRef, useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { CartContext } from "../../utility/CartContext";

import { FaRegHeart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import {
  CiUser,
  CiLocationOn,
  CiHeart,
  CiSettings,
  CiLogout,
} from "react-icons/ci";

import Nav from "./nav/Nav";
import Select from "../selectDrop/Select";
import Logo from "./images/EazyShoppy.png";
import { useProductContext } from "../../utility/ProductContext";

const Header = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { wishlistItems, cartItems } = useContext(CartContext);
  const { products } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter products based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // If search term is empty, show all products
    }
  }, [searchTerm, products]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenMenu = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("userId") !== null;

  // Handle logout
  const handleLogout = () => {
    setIsOpenDropDown(!isOpenDropDown);
    localStorage.removeItem("userId");
    localStorage.removeItem("eazyShoppyWishlist");
    localStorage.removeItem("eazyShoppyCart");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const countryList = [];

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  });

  const getCountry = async (url) => {
    try {
      await axios.get(url).then((res) => {
        if (res !== null) {
          res.data.data.map((item) => {
            countryList.push(item.country);
            // console.log(item[index].country);
          });
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.pageYOffset > 200) {
        headerRef.current.classList.add("fixed");
      } else {
        headerRef.current.classList.remove("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header ref={headerRef}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <Link to="/">
                <img src={Logo} className="logo" />
              </Link>
            </div>

            {/* header search start hear */}
            <div className="col-sm-5">
              <div className="headerSearch d-flex align-items-center">
                <div className="search">
                  <input
                    type="text"
                    placeholder="Search for items..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                  />
                  <IoIosSearch className="searchIcon cursor position-relative" />
                </div>
              </div>
              {/* Display Filtered Products */}
              {isOpen && (
                <div className="mt-4 searchBarResults ">
                  <ul className="list-group">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <li key={product.productId} className="list-group-item">
                          {product.name}
                        </li>
                      ))
                    ) : (
                      <div
                        style={{
                          padding: "10px",
                          color: "#999",
                          backgroundColor: "#fff",
                          border: "black",
                        }}
                      >
                        No results found
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {/* header search end hear */}

            <div className="col-sm-5 d-flex align-items-center">
              <div className="countryWrapper">
                <Select
                  data={countryList}
                  placeholder={"Your Location"}
                  icon={<MdOutlineLocationOn style={{ opacity: "0.6" }} />}
                />
              </div>
              <div className="ml-auto d-flex align-items-center">
                {isLoggedIn ? (
                  <>
                    <ul className="list list-inline mb-0 headerTabs">
                      <li className="list-inline-item">
                        <span>
                          <Link to={"/shop/wishlist"}>
                            <FaRegHeart className="icon" size={21} />
                            {wishlistItems.length > 0 && (
                              <span className="badge rounded-circle">
                                {wishlistItems.length > 9
                                  ? "9+"
                                  : wishlistItems.length}
                              </span>
                            )}
                            Wishlist
                          </Link>
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span>
                          <Link to="/shop/cart">
                            <FiShoppingCart className="icon" size={21} />
                            {cartItems.length > 0 && (
                              <span className="badge rounded-circle">
                                {cartItems.length > 9 ? "9+" : cartItems.length}
                              </span>
                            )}
                            Cart
                          </Link>
                        </span>
                      </li>

                      {/* DropDown for Account start*/}
                      <li className="list-inline-item">
                        <span
                          onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                        >
                          <MdOutlineAccountCircle
                            className="icon profile"
                            size={22}
                          />
                          Account
                        </span>
                        {isOpenDropDown && (
                          <ul className="dropdownmenu">
                            <li>
                              <button
                                className="btn align-items-center"
                                onClick={handleOpenMenu}
                              >
                                <CiUser />
                                My Account
                              </button>
                            </li>
                            <li>
                              <Link to={"/shop/orders"}>
                                <button
                                  className="btn align-items-center"
                                  onClick={handleOpenMenu}
                                >
                                  <CiLocationOn /> Order Tracking
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to={"/shop/wishlist"}>
                                <button
                                  className="btn align-items-center"
                                  onClick={handleOpenMenu}
                                >
                                  <CiHeart /> My Wishlist
                                </button>
                              </Link>
                            </li>
                            <li>
                              <button
                                className="btn align-items-center"
                                onClick={handleOpenMenu}
                              >
                                <CiSettings /> Setting
                              </button>
                            </li>
                            <li>
                              <button
                                className="btn align-items-center"
                                onClick={handleLogout}
                              >
                                <CiLogout /> Sign Out
                              </button>
                            </li>
                          </ul>
                        )}

                        {/* DropDown for Account end*/}
                      </li>
                    </ul>
                  </>
                ) : (
                  <button
                    className="btn align-items-center bg-g"
                    onClick={() => navigate("/login")}
                  >
                    <MdOutlineAccountCircle
                      className="icon profile"
                      size={22}
                    />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Nav />
    </>
  );
};

export default Header;
