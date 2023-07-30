// LoginPage.js
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./LoginPage.css"; // Import the updated CSS file with the correct path
// import { login } from "../api";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loaded, setLoaded] = useState(false);

  const onSubmit = async (data) => {
    // try {
    //   // Call the login API
    //   const token = await login(data.username, data.password);
    //   // Assuming login was successful, store the token in localStorage or state
    //   localStorage.setItem("token", token);
    // } catch (error) {
    //   // Handle login error here
    //   console.error("Login failed:", error);
    // }
  };

  // Set loaded to true after a short delay to trigger the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`login-page ${loaded ? "loaded" : ""}`}>
      <div className={`login-form ${loaded ? "loaded" : ""}`}>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            {errors.username && (
              <span className="text-danger">Username is required</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <span className="text-danger">Password is required</span>
            )}
          </div>

          <Button type="submit" variant="primary">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
