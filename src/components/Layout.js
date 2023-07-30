// Layout.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767.98);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767.98);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container fluid className="layout-container">
      <Row className="layout-row">
        {/* Sidebar for larger screens */}
        {!isMobile && (
          <Col xs={12} sm={3} md={2} className="sidebar p-0">
            <Sidebar />
          </Col>
        )}

        {/* Main content */}
        <Col
          xs={12}
          sm={!isMobile ? 9 : 12}
          md={!isMobile ? 10 : 12}
          className={`main-content ${isMobile ? "mobile-content" : ""}`}
        >
          {/* Toggle button to show/hide sidebar for mobile */}
          {isMobile && (
            <div className="mobile-navbar">
              <button onClick={handleToggleSidebar} className="menu-button">
                &#9776;
              </button>
            </div>
          )}
          <div className="content">
            <Outlet />
          </div>
        </Col>

        {/* Sidebar as an Offcanvas for mobile */}
        <Offcanvas
          show={showSidebar && isMobile}
          onHide={() => setShowSidebar(false)}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Sidebar</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Sidebar />
          </Offcanvas.Body>
        </Offcanvas>
      </Row>
    </Container>
  );
};

export default Layout;
