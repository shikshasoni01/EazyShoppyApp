import "./NewsLetter.css";
import { useRef } from "react";
import { TbSend } from "react-icons/tb";
import BannerImage from "../../assets/images/bannerximage.png";

const NewsLetter = () => {
  const inputRef = useRef(null);
  return (
    <section className="subscribe-section">
      <div className="subscribe-container">
        <div className="col-sm-7">
          <div className="subscribe-text">
            <h1>Stay home & get your daily needs from our shop</h1>
            <p>Start You`r Daily Shopping with Eazy Shoppy</p>
          </div>
          <br />
          <form className="subscribe-form">
            <div className="email-input">
              <TbSend size={20} opacity={0.7} />
              <input
                type="email"
                className="m-1 px-3"
                ref={inputRef}
                placeholder="Enter Your Email"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
              className="subscribe-button"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="col-sm-5">
          <div className="subscribe-image">
            <img src={BannerImage} alt="Daily Shopping" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
