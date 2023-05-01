import axios from "axios";
import React, { useEffect, useState } from "react";
// import $ from 'jquery'
//jquery 
import "/node_modules/jquery/dist/jquery.min.js"; 
//Datatable Modules 
import "/node_modules/datatables.net-dt/js/dataTables.dataTables"; 
import "/node_modules/datatables.net-dt/css/jquery.dataTables.min.css"; 
import $ from "jquery";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";

const InventoryList = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [supplierName, setSupplierName] = useState("");
  const getInventoryList = async() => {
    await axios.get("http://192.168.0.7:8011/inventory/stock/").then((res) => {
      setInventoryList(res.data);
      console.log(res.data);
    });
    getDataTable();
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    alert(id);
  };
  const getDataTable = ()=>{
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }
  useEffect(() => {
    getInventoryList();
      
  }, []);
  return (
    <Container>
      <div className="supplier-list-title">Inventory List</div>
      <hr />
      <div className="d-flex justify-content-between">
        <div className="supplier-list-subtitle">
          <p>Inventory List</p>
        </div>
        <div className="addStockBtn">
          <Button className="addNewStockBtn fs-5">Add New Stock</Button>
        </div>
      </div>
      <InputGroup className="mb-3 mt-4">
        <Form.Control placeholder="Search By Supplier Name" />
        <InputGroup.Text id="basic-addon2" className="searchSupplier">
          Search
        </InputGroup.Text>
      </InputGroup>

      <table  id="example">
        <thead
          style={{
            borderStyle: "none",
            backgroundColor: "#707070",
            color: "white",
          }}
        >
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Pice</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th className="text-center">
              Edit
            </th>
            <th className="text-center">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {inventoryList.map((map, i) => (
            <tr key={i}>
              <td>{map.id}</td>
              <td>{map.name}</td>
              <td>{map.price}</td>
              <td>{map.quantity}</td>
              <td>{map.supplier_name}</td>
              <td>
                <Button onClick={(e) => handleEdit(e, map.id)}>Edit</Button>
              </td>
              <td>
                <Button onClick={(e) => handleDelete(e, map.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default InventoryList;
