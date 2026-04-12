import React from "react";
import "./../styles/styles.css";
import { Link } from "react-router-dom";
export default function Login({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
}) {
  return (
    <div className="login-container ">
      {/* left side image  */}
      <div className="login-left">
        <div className="overlay">
          <div className="center-content">
            <h1>Track Performance, Drive Growth.</h1>
          </div>

          <div className="bottom-content">
            <p>
              Empower your business with a comprehensive dashboard that enables
              you to monitor car sales, uncover actionable insights, and manage
              your team efficiently{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Right side content */}
      <div className="login-right">
        <div className="center-content">
          <h1>Welcome Back</h1>
          <p>Enter your email and password to access your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <label>
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="option">
            <label>
              <input type="checkbox" /> Remeber me
            </label>
            <span>
              Forgot password? <Link>Change Now</Link>
            </span>
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className="sign-up ">
          <p>
            Dont't have an account? <Link>Sign Up</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
