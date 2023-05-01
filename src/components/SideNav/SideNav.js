import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate } from 'react-router-dom';

import './SideNav.css'
function SideNav({ open }) {
  // const dispat=useDispatch() 
  // const titlechange=(value)=>{ 
  //   dispat(titles(value)) 

  return (
    <div>
      <aside id="sidebar" className={open ? 'sidebar collapse' : 'sidebar'}>
        <ul className="nav flex-column" id="sidebar-nav">

          <li className="nav-item">
            <a className="nav-link" aria-current="page">
              <span><i class="bi bi-house-add"></i>Home</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">
              <i class="bi bi-boxes"></i><span>Inventory</span>
              <NavDropdown
                id="navbarScrollingDropdown"
                className="bold">
                <NavDropdown.Item href="#action3" onClick={() => {
                  Navigate("/Dropveg")
                }}>
                  <i class="bi bi-cloud-plus-fill"></i>Add New</NavDropdown.Item>
                <NavDropdown.Item href="/newStock" onClick={() => {
                //   Navigate("/Dropveg")
                }}>
                  <i class="bi bi-card-list"></i>Inventory List</NavDropdown.Item>
              </NavDropdown>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">
            <i class="bi bi-currency-dollar"></i><span>Sales</span>
              <NavDropdown
                id="navbarScrollingDropdown"
                className="bold">
                <NavDropdown.Item href="#action3" onClick={() => {
                  Navigate("/Dropveg")
                }}>
                  <i class="bi bi-cart-plus"></i>New Outgoing Stock</NavDropdown.Item>
                <NavDropdown.Item href="#action3" onClick={() => {
                  Navigate("/Dropveg")
                }}>
                  <i class="bi bi-card-list"></i>Sales Orders</NavDropdown.Item>
              </NavDropdown>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">
              <i class="bi bi-boxes"></i><span>Supplier</span>
              <NavDropdown
                id="navbarScrollingDropdown"
                className="bold">
                <NavDropdown.Item href="#action3" onClick={() => {
                  Navigate("/Dropveg")
                }}>
                  <i class="bi bi-cloud-plus-fill"></i>Add New Supplier</NavDropdown.Item>
                <NavDropdown.Item href="#action3" onClick={() => {
                  Navigate("/Dropveg")
                }}>
                  <i class="bi bi-card-list"></i>Suppliers List</NavDropdown.Item>
              </NavDropdown>
            </a>
          </li>
        </ul>
      </aside>
    </div >
  )
}
export default SideNav
