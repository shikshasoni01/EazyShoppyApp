import "./Nav.css";
import { Link } from "react-router-dom";

import { useCategories } from "../../../utility/CategoryContext";

import { BiCategoryAlt } from "react-icons/bi";
import { RiCustomerService2Fill, RiArrowDownSLine } from "react-icons/ri";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Nav = () => {
  const { categories, parentCategories, loading, error } = useCategories();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="nav d-flex align-items-center">
      <div className="container-fluid">
        <div className="row position-relative">
          {/* DropDown menu start  */}
          <div className="col-sm-3 part1 d-flex align-items-center">
            <button className="bg-g text-white catTab">
              <BiCategoryAlt size={25} /> Shopping is cheaper than therapy...
              and way more fun!
            </button>
          </div>
          {/* DropDown menu end  */}

          {/* Nav menu start  */}
          <div className="col-sm-7 part2 position-static">
            <nav>
              <ul className="list list-inline">
                <li className="list-inline-item">
                  <button className="navTabs">
                    <Link to="/">Home</Link>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button className="navTabs">
                    <Link to="/shop/:id">All Products</Link>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button className="navTabs">
                    <Link>Shop</Link>
                  </button>
                  {/* shop dropdown menu start*/}
                  <div className="dropdown_menu">
                    <ul>
                      {categories.map((category) => (
                        <li key={category.id}>
                          <button>
                            {/* Dynamically set the link */}
                            <Link to={`/shop/${category.id}`}>
                              {category.name}
                            </Link>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* shop dropdown menu start*/}
                </li>

                {/* Mega menu start*/}

                <li className="list-inline-item position-static">
                  <button className="navTabs">
                    <Link>
                      Categories <RiArrowDownSLine />
                    </Link>
                  </button>
                  {/* dropdown Mega menu start*/}
                  <div className="dropdown_menu megaMenu w-80 mb-2">
                    <div className="row">
                      {parentCategories.slice(0, 3).map((category) => (
                        <div className="col" key={category.id}>
                          <h4>{category.name}</h4>
                          <ul className="mt-4 mb-0">
                            {categories.map(
                              (sub) =>
                                category.id === sub.parentId && (
                                  <li key={sub.id}>
                                    <Link to={`/shop/${sub.id}`}>
                                      {sub.name}
                                    </Link>
                                  </li>
                                )
                            )}
                            <Backdrop
                              sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                              }}
                              open={loading}
                            >
                              <CircularProgress color="inherit" />
                            </Backdrop>
                          </ul>
                        </div>
                      ))}

                      <div className="col">
                        <img
                          src="https://api.spicezgold.com/download/file_1734525634299_NewProject(2).jpg"
                          className="w-100"
                        />
                      </div>
                    </div>
                  </div>
                  {/* dropdown Mega menu end*/}
                </li>
                {/* Mega menu end*/}

                <li className="list-inline-item">
                  <button className="navTabs">
                    <Link>Vendors</Link>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button className="navTabs">
                    <Link>
                      Pages <RiArrowDownSLine />
                    </Link>
                  </button>

                  {/* All pages dropdown menu start*/}
                  <div className="dropdown_menu">
                    <ul>
                      <li>
                        <button>
                          <Link to="/about/eazy-shoppy">About Us</Link>
                        </button>
                      </li>
                      <li>
                        <button>
                          <Link to="/contact">Contact</Link>
                        </button>
                      </li>
                      <li>
                        <button>
                          <Link to="/about/eazy-shoppy">My Account</Link>
                        </button>
                      </li>
                      <li>
                        <button>
                          <Link to="/login">Login</Link>
                        </button>
                      </li>
                      <li>
                        <button>
                          <Link to="/signup">Register</Link>
                        </button>
                      </li>
                      <li>
                        <button>
                          <Link to="/notfound">Purchase Guide</Link>
                        </button>
                      </li>
                      <li>
                        <button>
                          <Link to="/notfound">Privacy Policy</Link>
                        </button>
                      </li>
                      <li>
                        <button>
                          <Link to="/notfound">Terms of Service</Link>
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/* All pages dropdown menu start*/}
                </li>
                <li className="list-inline-item">
                  <button className="navTabs">
                    <Link>Contact</Link>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          {/* Nav menu end  */}

          <div className="col-sm-2 part3 d-flex align-items-center">
            <div className="phNo d-flex align-items-center ml-auto">
              <span>
                <RiCustomerService2Fill
                  size={40}
                  opacity={0.8}
                  style={{ paddingRight: "2px" }}
                />
              </span>
              <div className="info ml-3">
                <h3 className="text-g mb-0">1900-888</h3>
                <p className="mb-0">&nbsp;24/7 Support Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
