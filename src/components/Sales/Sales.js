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
import "./Sales.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNav from "../Navbar/TopNav";
import AxiosServices from "../Services/AxiosServices";
import { toast } from "react-toastify";

const NewSale = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState();
  const [qty, setQty] = useState();
  const [bill, setBill] = useState("");
  const [address, setAddress] = useState("");
  const [stock, setStock] = useState();
  const [buy, setBuy] = useState("");
  const [price, setPrice] = useState("");
  const [stockList, setStockList] = useState([]);
  const token = localStorage.getItem("token");
  const [billNO, setBillNo] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [phoneerror, setPhoneError] = useState("");
  const [addError, setAddressError] = useState("");
  const [gstinError, setGstinError] = useState("");
  const [qtyError, setQtyError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [buyError, setBuyError] = useState("");
  const [nameError, setNameError] = useState("");
  const [stockerror, setStockError] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    console.log(stock);
    // if (stock === undefined) {
    //   setStockError("Stock is required.")
    // }
    // if (!name) {
    //   setNameError("Name is required.");
    //   isValid = false;
    // }
    // if (!phone) {
    //   setPhoneError("Phone number is required.");
    //   isValid = false;
    // }
    // if (!address) {
    //   setAddressError("Address is required.");
    //   isValid = false;
    // }
    // if (!email) {
    //   setEmailError("Email is required.");
    //   isValid = false;
    // }
    // if (!gstin) {
    //   setGstinError("GSTIN is required.");
    //   isValid = false;
    // }
    // if (!qty) {
    //   setQtyError("Quantity is required.");
    //   isValid = false;
    // }
    // if (!price) {
    //   setPriceError("Price is required.");
    //   isValid = false;
    // }
    // if (!buy) {
    //   setBuyError("Stock is required.");
    //   isValid = false;
    // }

    if (isValid) {
      const saleBill = {
        name: name,
        phone: phone,
        address: address,
        email: email,
        gstin: gstin,
      };
      console.log(saleBill);
      setName("");
      setAddress("");
      setEmail("");
      setGstin("");
      setPhone("");

      let cc = 0;
      await AxiosServices.setSaleBill(saleBill)
        .then((res) => {
          console.log(res.data.billno, " BILL NO");
          cc = res.data.billno;
          setBillNo(res.data.billno);
          if (res.data.billno) {
            const saleItem = {
              quantity: qty,
              perprice: price,
              totalprice: bill,
              billno: cc,
              stock: buy,
            };
            setQty("")
            setPrice("")
            setBill("")
            setBuy("")
            console.log(saleItem, " Sale Item With Bill No");

            setSaleItem(saleItem);
          }
        })
        .catch((error) => {
          if (error.response) {
            setErrors(error.response.data);
          } else {
            console.error(error);
            console.log("HII");
          }
        });
    }
  };

  const setSaleItem = async (data) => {
    console.log(data);
    await AxiosServices.setSaleItem(data)
      .then((res) => {console.log(res.data)
        const flag = true;
        if(res.data.non_field_errors){
          toast.error(res.data.non_field_errors[0])
          flag = false;
        }
        
        if(flag){
          toast.success("Sale Added Successfully..!", {
            position: "top-right",
            theme: "colored",
          });
        }
        
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
        } else {
          console.error(error);
          console.log("HII");
        }
      });
  };
  const getStockPrice = (id) => {
    // axios.get("http://192.168.7.148:8011/inventory/stock/" + id)
    AxiosServices.getStockById(id).then((res) => {
      console.log(res.data);
      setPrice(res.data.price);
    });
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const RETRY_INTERVAL = 1000;
  const MAX_RETRIES = 5;
  let retryCount = 0;

  const getInventoryStock = async () => {
    console.log("Hii");
    setLoading(true);
    setError(null);

    console.log(token);
    await AxiosServices.getStock()
      .then((res) => {
        console.log(token);
        setStockList(res.data);
        console.log(res.data);
        setEmailError(res.data.email);
      })
      .catch((error) => {
        retryCount++;
        if (retryCount > MAX_RETRIES) {
          setError(error);
          setLoading(false);
        } else {
          window.location.reload();
        }
      });

    // setName("")
    // setAddress("")
    // setEmail("")
    // setGstin("")
    // setPhone("")
  };

  const calBill = (qty) => {
    console.log(buy, " buy");
    setBill(price * qty);
  };

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
    getInventoryStock();
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
          <Card className="bg-light">
            <Card.Body>
          <Form className="justify-content-md-center">
            <Row className="mb-3">
              <Col sm={12} md={6}>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                value={name}
                  required
                  type="text"
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
                value={phone}
                  required
                  type="text"
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
                value={email}
                  required
                  type="email"
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
                value={gstin}
                  required
                  type="text"
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
              value={address}
                required
                as="textarea"
                rows={3}
                className="supplier-input"
                onChange={(e) => {
                  setAddress(e.target.value);
                  errors.address = "";
                }}
              />
              <p className="form-text text-danger">{errors.address}</p>
            </Form.Group>

            <div className="supplier-sub-title">
              <p>Product DETAILS</p>
            </div>
            <Row>
              <Col>
                <Form.Label>Stock</Form.Label>
                <Form.Select
                value={stock}
                  required
                  aria-label="Default select example"
                  onChange={(e) => {
                    setStock(e.target.selectedIndex.text);
                    setBuy(e.target.value);
                    getStockPrice(e.target.value);
                    errors.stock = "";
                  }}
                >
                  <option>Select Stock</option>
                  {stockList
                    ? stockList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))
                    : getInventoryStock()}
                  {/* // {stockList.map((s) => (
                  //   <option key={s.id} value={s.id}>
                  //     {s.name}
                  //   </option>
                  // ))} */}
                </Form.Select>
                <p className="form-text text-danger">{errors.stock}</p>
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
                  onChange={(errors.perprice = "")}
                />
                <p className="form-text text-danger">{errors.perprice}</p>
              </Col>
              <Col>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={qty}
                  onChange={(e) => {
                    setQty(parseInt(e.target.value));
                    calBill(e.target.value);
                    errors.quantity = "";
                  }}
                />
                <p className="form-text text-danger">{errors.quantity}</p>
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
                  onChange={(errors.totalprice = "")}
                />
                <p className="form-text text-danger">{errors.totalprice}</p>
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
          </Card.Body>
          </Card>
        </div>
      </Container>
    </Container>
  );
};

export default NewSale;
