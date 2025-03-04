import "./footer.css";

import logo from "./images/EazyShoppy-bg.png";
import foot1 from "./images/foot1.svg";
import foot2 from "./images/foot2.svg";
import foot3 from "./images/foot3.svg";
import foot4 from "./images/foot4.svg";
import foot5 from "./images/foot5.svg";

const Footer = () => {
  return (
    <section className="featuresList">
      {/* Benefits Section */}
      <div
        className="d-flex justify-content-between flex-wrap text-center m-4 pt-4"
        style={{ gap: "20px" }}
      >
        {[
          {
            icon: foot1,
            title: "Best prices & offers",
            description: "Orders $50 or more",
          },
          {
            icon: foot2,
            title: "Free delivery",
            description: "Blink of Eye",
          },
          {
            icon: foot3,
            title: "Great daily deal",
            description: "When you sign up",
          },
          {
            icon: foot4,
            title: "Wide assortment",
            description: "24/7 amazing service",
          },
          {
            icon: foot5,
            title: "Easy returns",
            description: "Within 30 days",
          },
        ].map((item, index) => (
          <div
            className="p-3 rounded shadow-sm items"
            style={{ flex: "1" }}
            key={index}
          >
            <img
              src={item.icon}
              alt={item.title}
              className="mb-2 transition"
              style={{ width: "50px", height: "50px" }}
            />
            <h6>{item.title}</h6>
            <p className="text-muted">{item.description}</p>
          </div>
        ))}
      </div>
      <footer className="bg-light pt-5">
        <div className="container">
          {/* Company Information */}
          <div className="row">
            <div className="col-md-4">
              <img src={logo} style={{ weight: "65px", height: "65px" }} />
              <p className="text-muted">
                Shopping Made Simple, Savings Made Easy!
              </p>
              <ul className="list-unstyled">
                <li>
                  <i className="bi bi-geo-alt text-g"></i> 5171 W Campbell Ave
                  undefined Kent, Utah 53127 United States
                </li>
                <li>
                  <i className="bi bi-telephone text-g"></i> Call Us: (+91)
                  540-025-124553
                </li>
                <li>
                  <i className="bi bi-envelope text-g"></i> Email: sale@Eazy.com
                </li>
                <li>
                  <i className="bi bi-clock text-g"></i> Hours: 10:00 - 18:00,
                  Mon - Sat
                </li>
              </ul>
            </div>
            {["Company", "Corporate", "Popular"].map((section, index) => (
              <div className="col-md-2" key={index}>
                <h6>{section}</h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Delivery Information</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Support Center</a>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="text-center mt-4">
            <h6>Follow Us</h6>
            {["facebook", "twitter", "instagram", "youtube"].map(
              (platform, index) => (
                <a
                  href="#"
                  className="text-success me-3"
                  key={index}
                  style={{ fontSize: "1.5rem" }}
                >
                  <i className={`bi bi-${platform}`}></i>
                </a>
              )
            )}
          </div>

          <hr />
          <p className="text-center text-muted pb-4">
            &copy; 2024, Eazy Shoppy. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
