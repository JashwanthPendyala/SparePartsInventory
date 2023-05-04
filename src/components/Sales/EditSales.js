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
import { useNavigate, useParams } from "react-router-dom";
import TopNav from "../Navbar/TopNav";
import AxiosServices from "../Services/AxiosServices";
const EditSales = () => {
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
    const [saleBill, setSaleBill] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        gstin: ""
    });
    const [saleItem, setSaleItem] = useState({
        quantity: "",
        perprice: "",
        totalprice: "",
        billno: "",
        stock_name: "",
        id:""
    });

    const navigate = useNavigate();
    const { id } = useParams("id");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(saleBill, " Bill");
        console.log(saleItem, "Item");
        // axios
        //     .put("http://192.168.7.148:8011/transactions/saleBill/" + saleItem.billno + "/", saleBill, {
        //         headers: {
        //             "Authorization": "Token " + localStorage.getItem("token")
        //         }
        //     })
        //     .then((res) => {
        //         console.log(res.data);

        //     });

        // axios
        //     .put("http://192.168.7.148:8011/transactions/saleitem/" + id + "/", saleItem, {
        //         headers: {
        //             "Authorization": "Token " + localStorage.getItem("token")
        //         }
        //     })
        //     .then((res) => console.log(res.data));

        // navigate("/salesList")
    };

    const getStockPrice = (id) => {
        // axios.get("http://192.168.7.148:8011/inventory/stock/" + id)
        
        AxiosServices.getStockById(id).then((res) => {
            console.log(res.data);
            // setPrice(res.data.price);
            setSaleItem({ ...saleItem, perprice: res.data.price, quantity: 0, totalprice: 0 })
        });
    };

    const getSaleBill = (billno) => {
        console.log(billno, "Hii");
        // axios.get("http://192.168.7.148:8011/transactions/saleBill/" + billno, {
        //     headers: {
        //         "Authorization": "Token " + token
        //     }
        // })
        AxiosServices.getSaleBillByBillNo(billno).then(res => {
            setSaleBill(res.data)
        })
    }
    const calBill = (qty) => {
        // console.log(buy, " buy");
        // setBill(price * qty);
        setSaleItem({ ...saleItem, totalprice: saleItem.perprice * qty })
    };
    useEffect(() => {
        //   if(token === ""){
        //       navigate("/")
        //   }
        // axios.get("http://192.168.7.148:8011/inventory/stock/")
        
        AxiosServices.getStock().then((res) => {
            setStockList(res.data);
            console.log(res.data);
        });
        // axios.get("http://192.168.7.148:8011/transactions/saleitem/" + id, {
        //     headers: {
        //         "Authorization": "Token " + token
        //     }
        // })
        
       AxiosServices.getSaleItemById().then(res => {
            console.log(res.data);
            setSaleItem(res.data);
            getSaleBill(res.data.billno);
        });


    }, []);

    return (
        <Container fluid>
            <TopNav />
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
                                value={saleBill.name}
                                onChange={(e) => setSaleBill({ ...saleBill, name: e.target.value })}
                            />
                        </Col>

                        <Col sm={12} md={6}>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                className="supplier-input"
                                value={saleBill.phone}
                                onChange={(e) => setSaleBill({ ...saleBill, phone: e.target.value })}
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
                                value={saleBill.email}
                                onChange={(e) => setSaleBill({ ...saleBill, email: e.target.value })}
                            />
                        </Col>

                        <Col sm={12} md={6}>
                            <Form.Label>GSTIN No.</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                className="supplier-input"
                                value={saleBill.gstin}
                                onChange={(e) => setSaleBill({ ...saleBill, gstin: e.target.value })}
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
                            value={saleBill.address}
                            onChange={(e) => setSaleBill({ ...saleBill, address: e.target.value })}
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
                                    const selectedIndex = e.target.selectedIndex;
                                    const selectedOption = e.target.options[selectedIndex];
                                    console.log(selectedOption.text," stock name");
                                    setSaleItem({ ...saleItem, stock_name: selectedOption.text, id: e.target.value })
                                    getStockPrice(e.target.value)
                                }}
                            // onChange={(e) => {
                            //     setStock(e.target.selectedIndex.text);
                            //     setBuy(e.target.value);
                            //     getStockPrice(e.target.value);
                            // }}
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
                                value={saleItem.perprice}
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
                                value={saleItem.quantity}
                                onChange={(e) => {
                                    setSaleItem({ ...saleItem, quantity: e.target.value, totalprice: saleItem.perprice * e.target.value });
                                    // setSaleItem({ ...saleItem,  });
                                    // calBill(e.target.value);
                                }}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Total</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={saleItem.totalprice}
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
    );
};

export default EditSales;
