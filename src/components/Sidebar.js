import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";

const Sidebar = () => {
  const { setLoggedInUser } = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark" className="flex-column sidebar">
      <Navbar.Brand>KARMA FUND</Navbar.Brand>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "80%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Nav.Link as={Link} to="/blog-listing" className="text-light">
            Blog Listing
          </Nav.Link>
          <Nav.Link as={Link} to="/create-blog" className="text-light">
            Add Blog
          </Nav.Link>
        </div>
        <Nav.Link
          as={Link}
          to="/login"
          className="text-light"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("rn-user");
            setLoggedInUser(null);
          }}
        >
          Log out
        </Nav.Link>
      </div>
    </Navbar>
  );
};

export default Sidebar;
