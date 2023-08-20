// LoginPage.js
import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./LoginPage.css"; // Import the updated CSS file with the correct path
import { postRequest } from "../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../context/user";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setLoggedInUser, loggedInUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/blog-listing");
    }
  }, [loggedInUser]);

  const onSubmit = async ({ email, password }) => {
    try {
      // Call the login API
      const response = await postRequest("api/users/login", {
        email,
        password,
        role: "admin",
      });

      if (response) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("rn-user", JSON.stringify(response?.data?.user));
        setLoggedInUser(response?.data?.user);
        navigate("/blog-listing");
      }
      // Assuming login was successful, store the token in localStorage or state
    } catch (error) {
      // Handle login error here
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error("Login failed:", error?.response?.data?.message);
    }
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
            <label>Email</label>
            <input
              type="text"
              {...register("email", { required: true })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <span className="text-danger">Email is required</span>
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
