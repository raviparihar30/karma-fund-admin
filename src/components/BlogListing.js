// BlogListing.js
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { IMAGE_URL, deleteRequest, getRequest } from "../api";
import { useNavigate } from "react-router-dom";
import "./BlogListing.css"; // Import your custom CSS
import Swal from "sweetalert2";

const DEFAULT_IMAGE_URL =
  "https://www.mericity.com/resources/images/Default.jpg"; // Replace with your default image URL

const BlogListing = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await getRequest("api/posts/");
      const { success, data } = response || {};
      if (success) setBlogPosts(data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    const shouldDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this blog post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (shouldDelete.isConfirmed) {
      try {
        const response = await deleteRequest(`api/posts/${postId}`);
        console.log("response  => ", response);
        const { success, data } = response || {};
        if (success) fetchBlogPosts();
      } catch (error) {
        console.error("Error deleting blog post:", error);
        Swal.fire(
          "Error",
          "An error occurred while deleting the blog post.",
          "error"
        );
      }
    }
  };

  return (
    <>
      <div className="text-center m-3">
        <h2>Blog Listing</h2>
      </div>
      <div className="blog-listing-container">
        {!!blogPosts?.length ? (
          blogPosts.map((post) => (
            <Card key={post.id} className="blog-card">
              {/* Add the Card.Img component with the image prop */}
              <Card.Img
                variant="top"
                src={
                  post.image ? `${IMAGE_URL}${post.image}` : DEFAULT_IMAGE_URL
                }
                alt="Blog Image"
                className="blog-card-img"
              />
              <Card.Body>
                <Card.Title className="blog-card-title">
                  {post.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted blog-card-subtitle">
                  {post.subtitle}
                </Card.Subtitle>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/blogs/${post.id}`)}
                  className="blog-card-button me-2"
                >
                  Read More
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/create-blog?blogId=${post.id}`)}
                  className="blog-card-button bg-secondary me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="error"
                  className="blog-card-button bg-danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>No Blogs</div>
        )}
      </div>
    </>
  );
};

export default BlogListing;
