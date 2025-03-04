import "./CatSlider.css";
import { useState } from "react";
import Slider from "react-slick";
import { useCategories } from "../../utility/CategoryContext";

const CatSlider = () => {
  const [itemBg] = useState([
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3ff",
    "#f2fce4",
    "#ecffec",
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3ff",
    "#f2fce4",
    "#ecffec",
  ]);

  const { parentCategories, loading, error } = useCategories();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: window.innerWidth > 768 ? 8 : 2,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="catSliderSection">
      <div className="container-fluid">
        <h2 className="hd mx-2">Featured Categories</h2>
        <Slider {...settings} className="cat_slider_menu">
          {parentCategories.length !== 0 &&
            parentCategories.map((category, index) => (
              <div className="item" key={category.id}>
                <div
                  className="info"
                  style={{ background: itemBg[index % itemBg.length] }}
                >
                  <img src={category.imageUrl} alt={category.name} />
                  <h5>{category.name}</h5>
                  {/* <p>{category.itemCount} items</p> */}
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default CatSlider;
