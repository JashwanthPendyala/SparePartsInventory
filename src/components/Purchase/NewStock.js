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
import { toast } from "react-toastify";
import AxiosServices from "../Services/AxiosServices";
const NewStock = () => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState();
  const [supplier, setSupplier] = useState("");
  const token = localStorage.getItem("token");
  const [supplierList, setSupplierList] = useState([]);
  const [buy, setBuy] = useState(0);
  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     name: name,
  //     price: price,
  //     quantity: qty,
  //     supplier_name: supplier,
  //     supplier_id: buy
  //   };
  //   console.log(data);
  //   // axios
  //   //   .post("http://192.168.7.148:8011/inventory/stock/", data, {
  //   //     headers: {
  //   //       Authorization: "Token " + localStorage.getItem("token"),
  //   //     },
  //   //   })
  //    AxiosServices.addStock(data).then((res) => {
  //       console.log(res.data);
  //       if (res.status === 201) {
  //         toast.success("Stock Added Successfully..!", {
  //           position: "top-right",
  //           theme: "colored",
  //         });
  //       } else {
  //         alert("Hi");
  //         toast.error("Stock Not Added..!", {
  //           position: "top-right",
  //           theme: "colored",
  //         });
  //       }
  //     });
  // };
  const [errors, setErrorMessages] = useState({});

  const handleSubmit = (e) => {
    console.log("hii");
    e.preventDefault();
    let errors = {};
    if (!name) {
      errors.name = "Please enter item name";
    }
    if (!qty) {
      errors.qty = "Please enter quantity";
    }
    if (!price) {
      errors.price = "Please enter price";
    }
    if (!supplier) {
      errors.supplier = "Please select a supplier";
    }
    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      const data = {
        name: name,
        price: price,
        quantity: qty,
        supplier_name: supplier,
        supplier_id: buy,
      };

      AxiosServices.addStock(data)
        .then((res) => {
          console.log(res.data);
          if (res.status === 201) {
            toast.success("Stock Added Successfully..!", {
              position: "top-right",
              theme: "colored",
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error(error.response.data.detail, {
            position: "top-right",
            theme: "colored",
          });
        });
    }
    setName("")
    setPrice("")
    setQty("")
    setSupplier("")
  };
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
    // axios.get("http://192.168.7.148:8011/inventory/supplier/")
    
    AxiosServices.getSupplier().then((res) => {
      setSupplierList(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Container fluid>
      <TopNav />
      <Container>
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
                  onChange={(e) => {setName(e.target.value)
                    errors.name = ""
                  }
                }
                />
                <p className="form-text text-danger">{errors.name}</p>
              </Col>

              <Col sm={12} md={6}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  className="supplier-input"
                  onChange={(e) =>{ setPrice(e.target.value)
                    errors.price = ""
                  }
                  
                  }
                />
                 <p className="form-text text-danger">{errors.price}</p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={12} md={6}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  className="supplier-input"
                  onChange={(e) => {setQty(e.target.value)
                    errors.qty = ""
                  }}
                />
                 <p className="form-text text-danger">{errors.qty}</p>
              </Col>

              <Col sm={12} md={6}>
                <Form.Label>Supplier</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="supplier-input"
                  onChange={(e) => {
                    setSupplier(e.target.options[e.target.selectedIndex].text);
                    setBuy(e.target.value);
                    errors.supplier = ""
                  }}
                >
                  <option>Select Supplier</option>
                  {supplierList.map((contact,i) => (
                    <option key={i} value={contact.id}>
                      {contact.name}
                    </option>
                  ))}
                </Form.Select>
                <p className="form-text text-danger">{errors.supplier}</p>
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
    </Container>
  );
};

export default NewStock;
