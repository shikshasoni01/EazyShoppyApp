import "./select.css";
import { useState } from "react";
import PropTypes from "prop-types";
import ClickAwayListener from "react-click-away-listener";
import { IoIosArrowDown } from "react-icons/io";

const Select = ({ data = [], placeholder, icon }) => {
  const [isOpenSelect, setisOpenSelect] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [selectedItem, setselectedItem] = useState(placeholder);
  const [listData1, setListData1] = useState(data);
  const [listData2] = useState(data);

  const openSelect = () => {
    setisOpenSelect(!isOpenSelect);
  };

  const closeSelect = (index, name) => {
    setselectedIndex(index);
    setisOpenSelect(false);
    setselectedItem(name);
  };

  const filterList = (e) => {
    const keyword = e.target.value;
    const l = listData2.filter((item) => {
      return item.toLowerCase().includes(keyword);
    });
    const list = l.filter((item, index) => l.indexOf(item) === index);
    // console.log(list);
    setListData1(list);
  };

  return (
    <ClickAwayListener onClickAway={() => setisOpenSelect(false)}>
      <div className="selectDrop cursor position-relative">
        {icon}
        <span className="openSelect" onClick={openSelect}>
          {selectedItem.length > 17
            ? selectedItem.substr(0, 17) + "..."
            : selectedItem}
          <IoIosArrowDown className="arrow" />
        </span>
        {isOpenSelect && (
          <div className="selectdrop">
            <div className="searchField">
              <input
                type="text"
                placeholder="Search categories..."
                onChange={filterList}
              />
            </div>
            <ul className="searchResults">
              <li
                key={0}
                onClick={() => closeSelect(0, placeholder)}
                className={`${selectedIndex === 0 ? "active" : ""}`}
              >
                {placeholder}
              </li>
              {Array.isArray(data) &&
                listData1.map((category, index) => (
                  <li
                    key={index + 1}
                    onClick={() => closeSelect(index + 1, category)}
                    className={`${selectedIndex === index + 1 ? "active" : ""}`}
                  >
                    {category}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

Select.propTypes = {
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default Select;
