import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import minilogo from '../Images/Group 4.svg'
function TopNav() {
    const [expanded, setExpanded] = useState(false);

    const toggleNavbar = () => {
        setExpanded(!expanded);
    };

    return (
        <Navbar bg="light" variant='light' expand="md" expanded={expanded} className='d-flex justify-content-around p-2' >
           {/* <Image src={minilogo} alt="minilogo" height={"80px"} width={"80px"} roundedCircle /> */}
            <Navbar.Toggle onClick={toggleNavbar} aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="justify-content-around w-100">
                    {/* <Nav.Link href="#home" >Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link> */}
                    <NavDropdown title="Inventory" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/newStock">New Stock</NavDropdown.Item>
                        <NavDropdown.Item href="/inventoryList">Inventory List</NavDropdown.Item>                        {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                    </NavDropdown>
                    <NavDropdown title="Supplier" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/newSupplier">New Supplier</NavDropdown.Item>
                        <NavDropdown.Item href="/supplierList">Supplier List</NavDropdown.Item>                        {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                    </NavDropdown>
                    <NavDropdown title="Transactions" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/newSale">New Sale</NavDropdown.Item>
                        <NavDropdown.Item href="/salesList">Sales List</NavDropdown.Item>                        {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                    </NavDropdown>
                    {/* <NavDropdown title="Contact Us" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/newStock">New Stock</NavDropdown.Item>
                        <NavDropdown.Item href="/inventoryList">Inventory List</NavDropdown.Item>                      
                         <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> 
                    </NavDropdown> */}
                    <Nav.Link href='/contactus'>Contact Us</Nav.Link>
                    <Nav.Link href='/feedback'>Feedback</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNav;
