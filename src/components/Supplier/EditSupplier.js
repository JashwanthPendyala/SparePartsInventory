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
import { useNavigate, useParams } from "react-router-dom";
import TopNav from "../Navbar/TopNav";
const EditSupplier = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [gstin, setGstin] = useState();
    const token = localStorage.getItem("token");
    const [supplierList, setSupplierList] = useState([]);
    const { id } = useParams("id")
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        phone: "",
        gstin: "",
        address:"",
        email:"",
        

    })
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://192.168.7.148:8011/inventory/supplier/"+id+"/", data, {
            headers: {
                "Authorization": "Token " + localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res.data)
            //Toastify
            navigate("/supplierList")
        });


    };
    useEffect(() => {
        axios
            .get("http://192.168.7.148:8011/inventory/supplier/")
            .then((res) => {
                setSupplierList(res.data)
                console.log(res.data)
            });

        axios.get("http://192.168.7.148:8011/inventory/supplier/" + id).then(res => {
            console.log(res.data);
            setData(res.data)
        })
        // if(token === ""){
        //     navigate("/")
        // }
    }, []);

    return (
        <Container fluid>
            <TopNav />
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

                                type="text"
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

export default EditSupplier;