// BlogListing.js
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { BASE_URL, getRequest } from "../api";
import { useNavigate } from "react-router-dom";
import "./BlogListing.css"; // Import your custom CSS

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
      const response = await getRequest("blogs");
      setBlogPosts(response ?? []);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  return (
    <>
      <div className="text-center m-3">
        <h2>Blog Listing</h2>
      </div>
      <div className="blog-listing-container">
        {blogPosts.map((post) => (
          <Card key={post._id} className="blog-card">
            {/* Add the Card.Img component with the image prop */}
            <Card.Img
              variant="top"
              src={post.image ? `${BASE_URL}${post.image}` : DEFAULT_IMAGE_URL}
              alt="Blog Image"
              className="blog-card-img"
            />
            <Card.Body>
              <Card.Title className="blog-card-title">{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted blog-card-subtitle">
                {post.subtitle}
              </Card.Subtitle>
              <Button
                variant="primary"
                onClick={() => navigate(`/blogs/${post._id}`)}
                className="blog-card-button me-2"
              >
                Read More
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate(`/create-blog?blogId=${post._id}`)}
                className="blog-card-button"
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default BlogListing;
