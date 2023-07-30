import React, { useState } from "react";
import { Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "react-quill/dist/quill.snow.css"; // Import the Quill CSS
import ReactQuill from "react-quill"; // Import the ReactQuill component

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveBlog = () => {
    // Handle saving the blog post (you can implement your save logic here)
    console.log("Title:", title);
    console.log("Subtitle:", subtitle);
    console.log("Description:", description);
    setShowModal(false);
  };

  // Define Quill modules and formats
  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Navbar.Brand>Admin Dashboard</Navbar.Brand>
        <Form inline className="ml-auto">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <BsSearch className="search-icon" />
        </Form>
        <Button variant="primary" onClick={handleShowModal}>
          Add Blog
        </Button>
      </Navbar>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="subtitle">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter blog description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveBlog}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
