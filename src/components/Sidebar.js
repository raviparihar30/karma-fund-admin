import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="flex-column sidebar">
      <Navbar.Brand>FUND</Navbar.Brand>
      <Nav.Link as={Link} to="/blog-listing" className="nav-link">
        Blog Listing
      </Nav.Link>
      <Nav.Link as={Link} to="/create-blog" className="nav-link">
        Add Blog
      </Nav.Link>
    </Navbar>
  );
};

export default Sidebar;
