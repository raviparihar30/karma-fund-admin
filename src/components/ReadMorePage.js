// ReadMorePage.js
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ReadMorePage.css"; // Import your custom styles
import { getRequest } from "../api";
import { Button } from "react-bootstrap";

const ReadMorePage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const fetchBlogPost = useCallback(async () => {
    try {
      const response = await getRequest(`blogs/${blogId}`);
      setBlog(response ?? {});
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  }, [blogId]);

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="read-more-page">
      <div className="text-end">
        <Button
          variant="primary"
          onClick={() => navigate(`/create-blog?blogId=${blogId}`)}
          className="blog-card-button"
        >
          Edit
        </Button>
      </div>

      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-subtitle">{blog.subtitle}</p>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
    </div>
  );
};

export default ReadMorePage;
