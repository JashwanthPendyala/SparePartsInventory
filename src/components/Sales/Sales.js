import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import "./Sales.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNav from "../Navbar/TopNav";
const NewSale = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState();
  const [qty, setQty] = useState("");
  const [bill, setBill] = useState("");
  const [address, setAddress] = useState("");
  const [stock, setStock] = useState("");
  const [buy, setBuy] = useState("");
  const [price, setPrice] = useState("");
  const [stockList, setStockList] = useState([]);
  const token = localStorage.getItem("token");
  const [billNO, setBillNo] = useState("");
  // const saleBill = {
  //   name: "",
  //   phone: "",
  //   address: "",
  //   email: "",
  //   gstin: "",
  // };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const saleBill = {
      name: name,
      phone: phone,
      address: address,
      email: email,
      gstin: gstin,
    };
    axios
      .post("http://192.168.0.8:8011/transactions/saleBill/", saleBill, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        },
      })
      .then((res) => {
        console.log(res.data.billno," BILL NO");
        setBillNo(res.data.billno);
      });

    const saleItem = {
      quantity: qty,
      perprice: price,
      totalprice: bill,
      billno: billNO,
      stock: buy,
    };
    console.log(saleItem, " Sale Item With Bill No");
    axios
      .post("http://192.168.0.8:8011/transactions/saleitem/", saleItem, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res.data));
  };

  const getStockPrice = (id) => {
    axios.get("http://192.168.0.8:8011/inventory/stock/" + id).then((res) => {
      console.log(res.data);
      setPrice(res.data.price);
    });
  };

  const calBill = (qty) => {
    console.log(buy, " buy");
    setBill(price * qty);
  };
  useEffect(() => {
      if(token === ""){
          navigate("/")
      }
    axios.get("http://192.168.0.8:8011/inventory/stock/").then((res) => {
      setStockList(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Container fluid>
      <TopNav />
      <Container>
      <div className="mt-3">
        <div className="supplier-title">
          <p>New Sale</p>
        </div>
        <hr />
        <div className="supplier-sub-title">
          <p>Customer DETAILS</p>
        </div>
        <Form className="justify-content-md-center">
          <Row className="mb-3">
            <Col sm={12} md={6}>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                required
                type="text"
                className="supplier-input"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>

            <Col sm={12} md={6}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="text"
                className="supplier-input"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={12} md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                className="supplier-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>

            <Col sm={12} md={6}>
              <Form.Label>GSTIN No.</Form.Label>
              <Form.Control
                required
                type="text"
                className="supplier-input"
                onChange={(e) => setGstin(e.target.value)}
              />
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              className="supplier-input"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <div className="supplier-sub-title">
            <p>Product DETAILS</p>
          </div>
          <Row>
            <Col>
              <Form.Label>Stock</Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                onChange={(e) => {
                  setStock(e.target.selectedIndex.text);
                  setBuy(e.target.value);
                  getStockPrice(e.target.value);
                }}
              >
                {stockList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="text"
                value={price}
                aria-label="Disabled input example"
                disabled
                readOnly
              />
            </Col>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                  calBill(e.target.value);
                }}
              />
            </Col>
            <Col>
              <Form.Label>Total</Form.Label>
              <Form.Control
                required
                type="text"
                value={bill}
                aria-label="Disabled input example"
                disabled
                readOnly
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <div className="me-4">
              <Button size="lg" className="cancel-supplier-btn">
                Cancel
              </Button>
            </div>
            <div className="ms-4">
              <Button
                type="submit"
                size="lg"
                className="add-supplier-btn"
                onClick={(e) => handleSubmit(e)}
              >
                Add Sale
              </Button>
            </div>
          </div>
        </Form>
      </div>
      </Container>
    </Container>
  );
};

export default NewSale;
