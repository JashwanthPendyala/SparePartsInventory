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
import "./Stock.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TopNav from "../Navbar/TopNav";
import { toast } from "react-toastify";
import AxiosServices from "../Services/AxiosServices";
const EditStock = () => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState();
  const [supplier, setSupplier] = useState("");
  const token = localStorage.getItem("token");
  const [supplierList, setSupplierList] = useState([]);
  const [buy, setBuy] = useState(0);
  const { id } = useParams("id");
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    price: "",
    quantity: "",
    supplier_name: "",
    supplier_id: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    AxiosServices.editStock(id, data).then((res) => {
      console.log(res.data);
      //Toastify
      toast.success("Updated Successfully..!", {
        position: "top-right",
        theme: "colored",
      });
      navigate("/inventoryList");
    });
  };
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }

    AxiosServices.getSupplier().then((res) => {
      setSupplierList(res.data);
      console.log(res.data);
    });

    AxiosServices.getStockById(id).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <Container fluid>
      <TopNav />
      <Container>
        <div className="mt-3">
          <div className="supplier-title">
            <p>Edit Stock</p>
          </div>
          <hr />
          <div className="supplier-sub-title">
            <p>Edit Stock</p>
          </div>
          <Card className="bg-light">
            <Card.Body>
          <Form className="justify-content-md-center">
            <Row className="mb-3">
              <Col sm={12} md={6}>
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  className="supplier-input"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </Col>

              <Col sm={12} md={6}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  className="supplier-input"
                  value={data.price}
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={12} md={6}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  className="supplier-input"
                  value={data.quantity}
                  onChange={(e) =>
                    setData({ ...data, quantity: e.target.value })
                  }
                />
              </Col>

              <Col sm={12} md={6}>
                <Form.Label>Supplier</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="supplier-input"
                  value={data.supplier}
                  onChange={(e) => {
                    const selectedIndex = e.target.selectedIndex;
                    const selectedOption = e.target.options[selectedIndex];
                    setData({
                      ...data,
                      supplier_name: selectedOption.text,
                      supplier_id: e.target.value,
                    });
                  }}
                  // onChange={(e) => {
                  //     setSupplier(e.target.selectedIndex.text);
                  //     setBuy(e.target.value);
                  // }}
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
          </Card.Body>
          </Card>
        </div>
      </Container>
    </Container>
  );
};

export default EditStock;
