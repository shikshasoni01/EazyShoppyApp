import "./SignIn.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        }
      );

      // Validate API response
      if (response.status === 200 && response.data.status === "Success") {
        const userId = response.data.data;

        // Store user ID and token (if available) in localStorage
        localStorage.setItem("userId", userId);

        // Optionally, store a token if the API returns one
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
        }

        toast.success("Logged in successfully!", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
            backgroundColor: "#f0f0f0",
          },
        });
        navigate("/"); // Redirect to the home page or dashboard
      } else {
        setError("Invalid login. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);

      // Handle specific error messages from the API
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="signin-box">
          <h2>Sign In</h2>
          {error && (
            <p className="error-message text-danger fw-bold">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="signin-button"
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="signup-link">
            {`Don't have an account?`} <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>

      {/* Loading backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SignIn;
