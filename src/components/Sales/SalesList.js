import axios from "axios";
import React, { useEffect, useState } from "react";
// import $ from 'jquery'
import {
  Button,
  Card,
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
import "/node_modules/jquery/dist/jquery.min.js";
//Datatable Modules 
import "/node_modules/datatables.net-dt/js/dataTables.dataTables";
import "/node_modules/datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import AxiosServices from "../Services/AxiosServices";
const SalesList = () => {
  const [salesList, setSalesList] = useState([]);
  const navigate = useNavigate();
  const getSalesList = async () => {
    // await 
    // axios
    //   .get("http://192.168.7.148:8011/transactions/saleitem/", {
    //     headers: {
    //       Authorization: "Token " + localStorage.getItem("token"),
    //     },
    //   })
     await AxiosServices.getSaleItem().then((res) => {
        setSalesList(res.data);
        console.log(res.data);
      });
    getDataTable();
  };
  const getDataTable = () => {
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }
  const handleEdit = (e, id) => {
    e.preventDefault();
    alert("Hii")
    navigate('/editSale/' + id)
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    alert(id);
    // axios.delete("http://192.168.7.148:8011/inventory/stock/" + id + "/")
    
    AxiosServices.deleteSale(id).then(res => {
      console.log(res.data);
      setSalesList(salesList.filter(item => item.id !== id));
    })
  };
  useEffect(() => {
    getSalesList();
  }, []);
  return (
    <Container fluid>
      <TopNav />
      <Container>
      <div className="mt-3 supplier-list-title">Sales</div>
      <hr />
      <div className="d-flex justify-content-between">
        <div className="supplier-list-subtitle">
          <p>Sales Details</p>
        </div>
        <div className="addStockBtn">
          <Link to={'/newSale'}><Button className="addNewStockBtn fs-5">Add New Sales</Button></Link>
        </div>
      </div>
      <InputGroup className="mb-3 mt-4">
        <Form.Control placeholder="Search By Supplier Name" />
        <InputGroup.Text id="basic-addon2" className="searchSupplier">
          Search
        </InputGroup.Text>
      </InputGroup>

      {/* <table id="example">
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
      </table> */}
      <Card className="bg-light">
            <Card.Body>
      <table id="example">
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
            <th className="text-center">
              Edit
            </th>
            <th className="text-center">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {salesList.map((map, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
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
      </table>
      </Card.Body>
      </Card>
      </Container>
    </Container>
  );
};

export default SalesList;
