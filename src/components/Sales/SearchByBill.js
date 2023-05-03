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
import CardHeader from "react-bootstrap/esm/CardHeader";
const SearchByBill = () => {
    const token = localStorage.getItem("token")
    const [data, setData] = useState([])
    const [cgst, setCGST] = useState("")
    const [sgst, setSGST] = useState("")
    const [total, setTotal] = useState("")
    const [grandTotal, setGrandTotal] = useState("")
    const [billno, setBillNo] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const [visibility, setVisibility] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://192.168.7.148:8011/transactions/salebilldetails/", {
            "billno": billno
        }, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            console.log(res.data[0]);
            setData(res.data[0])
            console.log(res.data[1]);
            console.log(res.data);
            setCGST(res.data[1])
            setSGST(res.data[2])
            setGrandTotal(res.data[3])
            setName(res.data[4])
            if (res.data[0] != undefined) {
                setVisibility(true)
            }else{
                setVisibility(false)
            }
        });
    };
    useEffect(() => {
        if (token === "") {
            navigate("/")
        }
    }, []);

    return (
        <Container fluid>
            <TopNav />
            <Container>
                <div className="mt-3">
                    <div className="supplier-title">
                        <p>Search By Bill</p>
                    </div>
                    <hr />
                    <div className="supplier-sub-title">
                        <p>Search By Bill</p>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                        <Form className="">
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Enter Bill No </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        className="supplier-input"
                                        onChange={(e) => {
                                            setBillNo(e.target.value)
                                            setVisibility(false)
                                        }}
                                    />
                                </Col>
                            </Row>


                            <div className="d-flex justify-content-center mt-4">
                                {/* <div className="me-4">
                                    <Button size="lg" className="cancel-supplier-btn">
                                        Cancel
                                    </Button>
                                </div> */}
                                {/* <div className="ms-4"> */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="add-supplier-btn"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Get Details
                                </Button>
                                {/* </div> */}
                            </div>
                        </Form>

                    </div>
                    {
                        visibility && (


                            <Card>
                                <CardHeader >
                                    <Card.Title className="text-center">Bill No : {billno}</Card.Title>
                                </CardHeader>
                                <Card.Body>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Stock Name</th>
                                                <th>Quantity</th>
                                                <th>Unit Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((e, i) => <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{e.stock}</td>
                                                    <td>{e.quantity}</td>
                                                    <td>{e.perprice}</td>
                                                    <td>{e.totalprice}</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Bill No</th>
                                                <th>Customer Name</th>
                                                <th>CGST</th>
                                                <th>SGST</th>
                                                <th>Grand Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{billno}</td>
                                                <td>{name}</td>
                                                <td>{cgst}</td>
                                                <td>{sgst}</td>
                                                <td>{grandTotal}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Card.Body>
                            </Card>
                        )}
                </div>
            </Container>
        </Container>
    );
};

export default SearchByBill;
