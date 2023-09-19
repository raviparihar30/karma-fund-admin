// BlogCreationPage.js
import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import "./BlogCreationPage.css";
import { IMAGE_URL, getRequest, postRequest, putRequest } from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import CKEditorComponent from "./QuillEditor";

const BlogCreationPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (newContent) => {
    setValue("description", newContent);
  };
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogId");

  const fetchBlogPost = useCallback(async () => {
    try {
      const response = await getRequest(`/api/posts/${blogId}`);
      const { success, data: responseData } = response || {};
      const { post: data } = responseData || {};
      success &&
        Object.keys(data).map((key) => {
          // eslint-disable-next-line
          if (key == "image") {
            setImagePreview(IMAGE_URL + data.image);
            setExistingImage(data.image);
          } else {
            setValue(key, data[key]);
          }
        });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
    // react-hooks/exhaustive-deps
  }, [blogId]);

  useEffect(() => {
    if (blogId) {
      fetchBlogPost();
    }
  }, [blogId, fetchBlogPost]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);
    formData.append("description", data.description);
    formData.append("image", data.image[0] ?? existingImage);
    if (blogId) {
      try {
        const response = await putRequest(`/api/posts/${blogId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response?.success) {
          navigate("/blog-listing");
        }
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    } else {
      try {
        const response = await postRequest("/api/posts/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response) {
          navigate("/blog-listing");
        }
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    }
  };

  const handleImagePreview = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="blog-creation-page">
      <h2>Create New Blog</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            label={existingImage || "Choose an image"}
            accept="image/*"
            {...register("image")}
            custom
            onChange={handleImagePreview}
            data-browse="Select an image"
          />
          {errors.image && (
            <Form.Text className="text-danger">
              {errors.image.message}
            </Form.Text>
          )}
          {/* Image preview section */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <Form.Text className="text-danger">
              {errors.title.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="subTitle">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the subTitle"
            {...register("subTitle", { required: "Subtitle is required" })}
          />
          {errors.subTitle && (
            <Form.Text className="text-danger">
              {errors.subTitle.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          {/* Use the QuillEditor component here */}
          <CKEditorComponent
            value={watch("description")}
            onChange={handleEditorChange}
          />
          {errors.description && (
            <Form.Text className="text-danger">
              {errors.description.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          {blogId ? "Update Blog" : "Create Blog"}
        </Button>
      </Form>
    </div>
  );
};

export default BlogCreationPage;
