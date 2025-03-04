import "./Banner.css";
import { IoIosArrowRoundForward } from "react-icons/io";

import Banner1 from "./images/artical1.png";
import Banner2 from "./images/artical2.png";
import Banner3 from "./images/artical3.png";

const Banner = () => {
  return (
    <div className="bannerSection mx-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="box">
              <div className="row">
                <div className="col-sm-5">
                  <div className="info">
                    <h3>Popping with Flavor, Packed with Fun</h3>
                    <button>
                      Shop Now <IoIosArrowRoundForward />
                    </button>
                  </div>
                </div>
                <div className="col-sm-7">
                  <img
                    src={Banner1}
                    alt="Banner1"
                    className="w-100 transition"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="box">
              <div className="row">
                <div className="col-sm-5">
                  <div className="info">
                    <h3>Make Your Breakfast Healthy and Easy</h3>
                    <button>
                      Shop Now <IoIosArrowRoundForward />
                    </button>
                  </div>
                </div>
                <div className="col-sm-7">
                  <img
                    src={Banner2}
                    alt="Banner2"
                    className="w-100 transition"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="box">
              <div className="row">
                <div className="col-sm-5">
                  <div className="info">
                    <h3>A journey of Flavors One Touch Awaits</h3>
                    <button>
                      Shop Now <IoIosArrowRoundForward />
                    </button>
                  </div>
                </div>
                <div className="col-sm-7">
                  <img
                    src={Banner3}
                    alt="Banner3"
                    className="w-100 transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
