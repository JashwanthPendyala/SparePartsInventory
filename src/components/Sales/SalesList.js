import axios from "axios";
import React, { useEffect, useState } from "react";
// import $ from 'jquery'
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
import TopNav from "../Navbar/TopNav";

const SalesList = () => {
  const [salesList, setSalesList] = useState([]);

  const getSalesList = () => {
    axios
      .get("http://192.168.7.148:8011/transactions/saleitem/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSalesList(res.data);
        console.log(res.data);
      });
  };
  const handleEdit = (e, id) => {
    e.preventDefault();
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    alert(id);
  };
  useEffect(() => {
    getSalesList();
    // $(document).ready(function () {
    //     $("#example").DataTable();
    //   });
  }, []);
  return (
    <Container fluid>
      <TopNav/>
      <div className="mt-3 supplier-list-title">Sales List</div>
      <hr />
      <div className="d-flex justify-content-between">
        <div className="supplier-list-subtitle">
          <p>Sales List</p>
        </div>
        <div className="addStockBtn">
          <Button className="addNewStockBtn fs-5">Add New Sales</Button>
        </div>
      </div>
      <InputGroup className="mb-3 mt-4">
        <Form.Control placeholder="Search By Supplier Name" />
        <InputGroup.Text id="basic-addon2" className="searchSupplier">
          Search
        </InputGroup.Text>
      </InputGroup>

      <Table responsive="sm">
        <thead
          style={{
            borderStyle: "none",
            backgroundColor: "#707070",
            color: "white",
          }}
        >
          <tr>
            <th>#</th>
            <th>Bill No</th>
            <th>Quantity</th>
            <th>Per Pice</th>
            <th>Total Price</th>
            <th>Stock</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {salesList.map((map, i) => (
            <tr key={i}>
              <td>{map.id}</td>
              <td>{map.billno}</td>
              <td>{map.quantity}</td>
              <td>{map.perprice}</td>
              <td>{map.totalprice}</td>
              <td>{map.stock_name}</td>
              <td>
                <Button onClick={(e) => handleEdit(e, map.id)}>Edit</Button>
              </td>
              <td>
                <Button onClick={(e) => handleDelete(e, map.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SalesList;
