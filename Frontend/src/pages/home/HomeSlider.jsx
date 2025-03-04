import "./homeSlider.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slide1 from "../../assets/images/banner1.jpg";
import Slide2 from "../../assets/images/banner2.jpg";
import Slide3 from "../../assets/images/banner3.jpg";
import Slide4 from "../../assets/images/banner4.jpg";
import Slide5 from "../../assets/images/banner5.jpg";
import Slide6 from "../../assets/images/banner6.jpg";

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };

  return (
    <section className="homeSlider">
      <div className="container-fluid">
        <Slider {...settings} className="home_slider_main">
          <div className="items">
            <img src={Slide1} alt="Slide 1" />
          </div>
          <div className="items">
            <img src={Slide2} alt="Slide 2" />
          </div>
          <div className="items">
            <img src={Slide3} alt="Slide 3" />
          </div>
          <div className="items">
            <img src={Slide4} alt="Slide 4" />
          </div>
          <div className="items">
            <img src={Slide5} alt="Slide 5" />
          </div>
          <div className="items">
            <img src={Slide6} alt="Slide 6" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default HomeSlider;
