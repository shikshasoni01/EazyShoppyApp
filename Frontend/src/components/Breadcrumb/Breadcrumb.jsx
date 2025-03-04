import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Breadcrumb = ({ breadcrumbItems }) => {
  const breadcrumbContainerStyle = {
    display: "flex",
    listStyle: "none",
    gap: "5px",
    padding: 0,
    margin: 0,
  };

  const linkStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "#333",
    textDecoration: "none",
    transition: "all 0.3s ease-in-out",
  };

  const hoverLinkStyle = {
    color: "#3bb77e",
    textDecoration: "underline",
  };

  return (
    <div className="allListingPage breadcrumb mb-0">
      <ul style={breadcrumbContainerStyle}>
        {breadcrumbItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              style={linkStyle}
              onMouseEnter={(e) =>
                (e.target.style.color = hoverLinkStyle.color)
              }
              onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
            >
              {item.name}
            </Link>
            {index !== breadcrumbItems.length - 1 && (
              <span style={{ color: "#888", paddingLeft: "5px" }}>&gt;</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

Breadcrumb.propTypes = {
  length: PropTypes.number,
  breadcrumbItems: PropTypes.object,
};

export default Breadcrumb;
