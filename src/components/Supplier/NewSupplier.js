import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import "./Supplier.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNav from "../Navbar/TopNav";
import { toast } from "react-toastify";
import AxiosServices from "../Services/AxiosServices";
const NewSupplier = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      phone: phone,
      address: address,
      email: email,
      gstin: gstin,
    };

    AxiosServices.addSupplier(data)
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          console.log("status done");
          toast.success("Supplier Added Successfully...!", {
            position: "top-right",
            theme: "colored",
          });
          // navigate("/supplierList")
        }
        // setErrors(res.data);
        console.log("hii");
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
        } else {
          console.error(error);
          console.log("HII");
        }
      });
    setName("");
    setAddress("");
    setEmail("");
    setGstin("");
    setPhone("");
  };
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  });
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
          <Card className="bg-light">
            <Card.Body>
              <Form className="justify-content-md-center">
                <Row className="mb-3">
                  <Col sm={12} md={6}>
                    <Form.Label>Supplier Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      className="supplier-input"
                      onChange={(e) => {
                        setName(e.target.value);
                        errors.name = "";
                      }}
                    />
                    <p className="form-text text-danger">{errors.name}</p>
                  </Col>

                  <Col sm={12} md={6}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={phone}
                      className="supplier-input"
                      onChange={(e) => {
                        setPhone(e.target.value);
                        errors.phone = "";
                      }}
                    />
                    <p className="form-text text-danger">{errors.phone}</p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={12} md={6}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      className="supplier-input"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        errors.email = "";
                      }}
                    />
                    <p className="form-text text-danger">{errors.email}</p>
                  </Col>

                  <Col sm={12} md={6}>
                    <Form.Label>GSTIN No.</Form.Label>
                    <Form.Control
                      type="text"
                      value={gstin}
                      className="supplier-input"
                      onChange={(e) => {
                        setGstin(e.target.value);
                        errors.gstin = "";
                      }}
                    />
                    <p className="form-text text-danger">{errors.gstin}</p>
                  </Col>
                </Row>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={address}
                    rows={3}
                    className="supplier-input"
                    onChange={(e) => {
                      setAddress(e.target.value);
                      errors.address = "";
                    }}
                  />
                  <p className="form-text text-danger">{errors.address}</p>
                </Form.Group>

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
                      Add Supplier
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </Container>
  );
};

export default NewSupplier;
