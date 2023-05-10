import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import minilogo from "../Images/Group 4.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosServices from "../Services/AxiosServices";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './TopNavbar.css'
function TopNav() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    // axios.get("http://192.168.7.148:8011/user/logout/",{
    //   headers: {
    //     Authorization: "Token " + localStorage.getItem("token"),
    //   }
    // })
    AxiosServices.logout().then((res) => {
      console.log(res.data);
      toast.success("User Logout Successfully..!", {
        position: "top-right",
        theme: "colored",
      });
      navigate("/");
    });
  };
  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar
      bg="dark"
      variant="light"
      expand="md"
      expanded={expanded}
      className="d-flex justify-content-around p-2"
    >
      {/* <Image src={minilogo} alt="minilogo" height={"90px"} width={"90px"} roundedCircle /> */}
      <Navbar.Toggle onClick={toggleNavbar} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-around w-100">
          <Nav.Link href="/home" className="text-white">
            Dashboard
          </Nav.Link>
          <NavDropdown
            title="Inventory"
            id="basic-nav-dropdown"
            className="custom-dropdown"
          >
            <NavDropdown.Item href="/newStock">New Stock</NavDropdown.Item>
            <NavDropdown.Item href="/inventoryList">
              Inventory List
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Supplier" id="basic-nav-dropdown"  className="custom-dropdown">
            <NavDropdown.Item href="/newSupplier">
              New Supplier
            </NavDropdown.Item>
            <NavDropdown.Item href="/supplierList">
              Supplier List
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Sales" id="basic-nav-dropdown"  className="custom-dropdown">
            <NavDropdown.Item href="/newSale">New Sale</NavDropdown.Item>
            <NavDropdown.Item href="/salesList">Sales List</NavDropdown.Item>
            <NavDropdown.Item href="/searchByBillno">
              Search By Bill No
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/contactus"  className="text-white">Contact Us</Nav.Link>
          <Nav.Link href="/feedback"  className="text-white">Feedback</Nav.Link>
          <NavDropdown
            id="image-dropdown"
            title={<FontAwesomeIcon icon={faUser}  />  }
            className="custom-dropdown">
            <NavDropdown.Item href="/changepas">
              Change Password
            </NavDropdown.Item>
            {/* <NavDropdown.Item oncli>Logout</NavDropdown.Item> */}
            <NavDropdown.Item>
              <p onClick={() => handleLogout()}>Logout</p>
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNav;
