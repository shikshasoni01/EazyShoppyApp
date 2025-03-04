import "./SideFilter.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { useCategories } from "../../utility/CategoryContext";
import { LiaFilterSolid } from "react-icons/lia";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#f5f8fa",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
    ...theme.applyStyles("dark", {
      backgroundColor: "#30404d",
    }),
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
    ...theme.applyStyles("dark", {
      background: "rgba(57,75,89,.5)",
    }),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
    backgroundColor: "#394b59",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{ "&:hover": { bgcolor: "transparent" } }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

function valuetext(value) {
  return `${value}°C`;
}

const SideBarFilter = ({ onCategorySelect, onPriceChange }) => {
  const [value, setValue] = useState([0, 1000]);
  const { categories, loading, error } = useCategories();

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onPriceChange) {
      onPriceChange(newValue); // Pass the new price range to the parent component
    }
  };

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category); // Pass the selected category to the parent component
    }
  };

  return (
    <>
      <section className="sideFilter">
        <div className="card border-0 shadow">
          <h3>Category</h3>
          <div className="catList cursor">
            {categories.map((category, index) => (
              <div
                className="catItem d-flex align-items-center"
                key={index}
                onClick={() => handleCategoryClick(category)}
              >
                <span className="img">{category.icon}</span>
                <h4 className="mb-0 mx-3 cat">{category.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sideFilter">
        <div className="card border-0 shadow">
          <h3>Fill by Price</h3>

          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            min={0}
            step={10}
            max={1000}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            color="success"
            style={{ zIndex: "1001" }}
          />

          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From:
              <strong className="text-success"> ₹{value[0]}</strong>
            </span>
            <span className="ml-auto ">
              To:
              <strong className="text-success"> ₹{value[1]}</strong>
            </span>
          </div>

          <div className="filters">
            <div>
              <h5>Color</h5>
              <ul className="px-0">
                <li>
                  <BpCheckbox /> Red (20)
                </li>
                <li>
                  <BpCheckbox defaultChecked /> Green (15)
                </li>
              </ul>
            </div>
            <div>
              <h5>Item Condition</h5>
              <ul className="px-0">
                <li>
                  <BpCheckbox /> New (20)
                </li>
                <li>
                  <BpCheckbox defaultChecked /> Refurbished (15)
                </li>
                <li>
                  <BpCheckbox /> Used (20)
                </li>
              </ul>
            </div>
            <Button className="bt">
              <LiaFilterSolid size={20} />
              &nbsp; Filter
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

SideBarFilter.propTypes = {
  onCategorySelect: PropTypes.func,
  onPriceChange: PropTypes.func, // Add prop type for price change callback
};

export default SideBarFilter;
