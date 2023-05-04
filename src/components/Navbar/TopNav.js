import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import minilogo from '../Images/Group 4.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TopNav() {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="md"
      expanded={expanded}
      className="d-flex justify-content-around p-2"
    >
      {/* <Image src={minilogo} alt="minilogo" height={"90px"} width={"90px"} roundedCircle /> */}
      <Navbar.Toggle onClick={toggleNavbar} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-around w-100">
          <NavDropdown title="Inventory" id="basic-nav-dropdown">
            <NavDropdown.Item href="/newStock">New Stock</NavDropdown.Item>
            <NavDropdown.Item href="/inventoryList">Inventory List</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Supplier" id="basic-nav-dropdown">
            <NavDropdown.Item href="/newSupplier">New Supplier</NavDropdown.Item>
            <NavDropdown.Item href="/supplierList">Supplier List</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Transactions" id="basic-nav-dropdown">
            <NavDropdown.Item href="/newSale">New Sale</NavDropdown.Item>
            <NavDropdown.Item href="/salesList">Sales List</NavDropdown.Item>
            <NavDropdown.Item href="/searchByBillno">Search By Bill No</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/contactus">Contact Us</Nav.Link>
          <Nav.Link href="/feedback">Feedback</Nav.Link>
          <NavDropdown id="image-dropdown" title={"Admin"}>
            <NavDropdown.Item href="/newSale">New Sale</NavDropdown.Item>
            <NavDropdown.Item href="/salesList">Sales List</NavDropdown.Item>
            <NavDropdown.Item href="/searchByBillno">Search By Bill No</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNav;
