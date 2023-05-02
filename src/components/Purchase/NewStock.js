import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import "./Stock.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNav from "../Navbar/TopNav";
const NewStock = () => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState();
  const [supplier, setSupplier] = useState("");
  const token = localStorage.getItem("token");
  const [supplierList, setSupplierList] = useState([]);
  const [buy, setBuy] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      price: price,
      qty: qty,
      supplier: supplier,
      buy: buy
    };
    axios.post("http://192.168.7.148:8011/inventory/stock/", data,{
      headers:{
        "Authorization":"Token "+localStorage.getItem("token")
      }
    }).then((res) => {
      console.log(res.data);
    });

    
  };
  useEffect(() => {
    axios
      .get("http://192.168.7.148:8011/inventory/supplier/")
      .then((res) => {setSupplierList(res.data)
    console.log(res.data)});
    // if(token === ""){
    //     navigate("/")
    // }
  }, []);

  return (
    <Container fluid>
      <TopNav/>
      <div className="mt-3">
        <div className="supplier-title">
          <p>New Stock</p>
        </div>
        <hr />
        <div className="supplier-sub-title">
          <p>New Stock</p>
        </div>
        <Form className="justify-content-md-center">
          <Row className="mb-3">
            <Col sm={12} md={6}>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                className="supplier-input"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>

            <Col sm={12} md={6}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                className="supplier-input"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={12} md={6}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                className="supplier-input"
                onChange={(e) => setQty(e.target.value)}
              />
            </Col>

            <Col sm={12} md={6}>
              <Form.Label>Supplier</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="supplier-input"
                onChange={(e) => {
                  setSupplier(e.target.selectedIndex.text);
                  setBuy(e.target.value);
                }}
              >
                {supplierList.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <div className="d-flex justify-content-center">
            <div className="me-4">
              <Button size="lg" className="cancel-supplier-btn">
                Cancel
              </Button>
            </div>
            <div className="ms-4">
              <Button
                size="lg"
                className="add-supplier-btn"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default NewStock;
