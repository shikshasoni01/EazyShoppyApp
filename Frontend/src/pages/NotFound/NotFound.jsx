import "./NotFound.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Nfound from "./images/404-error.png";

const NotFound = () => {
  return (
    <section className="notFound">
      <div className="container-fluid">
        <div className="box">
          <img src={Nfound} />
          <br />
          <h1>Page Not Found</h1>
          <br />
          <div className="d-flex align-items-center justify-content-center">
            <Link to="/">
              <Button className="bt">Back To Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
