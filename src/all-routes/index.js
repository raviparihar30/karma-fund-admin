// Routes.js
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../components/Home";
import Layout from "../components/Layout";
import BlogListing from "../components/BlogListing";
import ReadMorePage from "../components/ReadMorePage";
import BlogCreationPage from "../components/BlogCreationPage";
import LoginPage from "../components/LoginPage";

export const useAuth = () => {
  const isAuthenticated = localStorage.getItem("token") !== null; // Check if token exists in localStorage
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Redirect to login page if the user is not authenticated
    navigate("/login");
  }

  return isAuthenticated;
};

const AllRoutes = () => {
  return (
    <Routes>
      {/* Protected routes */}

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/blog-listing" element={<BlogListing />} />
        <Route path="/create-blog" element={<BlogCreationPage />} />
        <Route path="/blogs/:blogId" element={<ReadMorePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />

      {/* 404 page */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AllRoutes;
