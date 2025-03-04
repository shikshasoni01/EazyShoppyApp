import "./SignUp.css";

import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Password strength validation
  const validatePasswordStrength = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password strength
    if (!validatePasswordStrength(password)) {
      setError(
        "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true); // Set loading state to true
    setError(""); // Clear any previous errors

    try {
      const userData = {
        name,
        email,
        password,
        phoneNumber,
        roleId: 2,
      };

      const response = await axios.post(
        "http://localhost:8000/api/user/create",
        userData
      );
      console.log(response);

      setSuccessMessage(
        "User registered successfully! Redirecting to login..."
      );
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded-3 shadow-lg signup"
      >
        <h2 className="text-center mb-4 fw-bold text-primary">Sign Up</h2>

        {/* Display error message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Display success message */}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        <div className="row g-3">
          {/* Name Field */}
          <div className="col-md-6">
            <label htmlFor="name" className="form-label fw-medium">
              Name
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="col-md-6">
            <label htmlFor="email" className="form-label fw-medium">
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="col-md-6">
            <label htmlFor="password" className="form-label fw-medium">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password && !validatePasswordStrength(password) && (
              <small className="text-danger">
                Password must be at least 8 characters long, include uppercase
                and lowercase letters, a number, and a special character.
              </small>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="col-md-6">
            <label htmlFor="confirmPassword" className="form-label fw-medium">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label fw-medium">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-grid mt-4">
          <button type="submit" className="btn btn-primary btn-lg fw-bold">
            Sign Up
          </button>
        </div>
      </form>

      {/* Backdrop with CircularProgress */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SignUp;
