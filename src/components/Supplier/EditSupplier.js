import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import "./Supplier.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import TopNav from "../Navbar/TopNav";
import { toast } from "react-toastify";
const EditSupplier = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState({
    supplier_id: "",
    name: "",
    phone: "",
    address: "",
    email: "",
    gstin: "",
  });
  const { id } = useParams("id");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .patch(
        "http://192.168.0.8:8011/inventory/supplier/" + data.id + "/",
        data,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          console.log("status done");
          toast.success("Supplier Updated Successfully...!",{
            position: "top-right",
            theme: "colored"
        })
          navigate("/supplierList");
        }
      });
  };
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
    axios
      .get("http://192.168.0.8:8011/inventory/supplier/" + id)
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <Container fluid>
      <TopNav />
      <Container>
        <div className="mt-3">
          <div className="supplier-title">
            <p>New Supplier</p>
          </div>
          <hr />
          <div className="supplier-sub-title">
            <p>SUPPLIER DETAILS</p>
          </div>
          <Form className="justify-content-md-center">
            <Row className="mb-3">
              <Col sm={12} md={6}>
                <Form.Label>Supplier Name</Form.Label>
                <Form.Control
                  type="text"
                  className="supplier-input"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </Col>

              <Col sm={12} md={6}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  className="supplier-input"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={12} md={6}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  className="supplier-input"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </Col>

              <Col sm={12} md={6}>
                <Form.Label>GSTIN No.</Form.Label>
                <Form.Control
                  type="text"
                  className="supplier-input"
                  value={data.gstin}
                  onChange={(e) => setData({ ...data, gstin: e.target.value })}
                />
              </Col>
            </Row>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="supplier-input"
                value={data.address}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <div className="me-4">
                <Link to="/supplierList">
                  {" "}
                  <Button size="lg" className="cancel-supplier-btn">
                    Cancel
                  </Button>
                </Link>
              </div>
              <div className="ms-4">
                <Button
                  size="lg"
                  className="add-supplier-btn"
                  onClick={(e) => handleSubmit(e)}
                >
                  Update Supplier
                </Button>
              </div>
            </div>
          </Form>{" "}
        </div>
      </Container>
    </Container>
  );
};

export default EditSupplier;
