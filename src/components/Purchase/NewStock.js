import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap'
import './Stock.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const NewStock = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gstin, setGstin] = useState("");
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "name": name,
            "phone": phone,
            "address": address,
            "email": email,
            "gstin": gstin
        }
        axios.post("http://192.168.4.9:8011/inventory/stock/", data).then(res => {
            console.log(res.data);
        })
    }
    // useEffect(()=>{
    //     if(token === ""){
    //         navigate("/")
    //     }
    // })



    return (
        <Container>

            <div><div className="supplier-title">
                <p>New Stock{token}</p>
            </div>
                <hr />
                <div className="supplier-sub-title">
                    <p>New Stock</p>
                </div>
                <Form className='justify-content-md-center'>
                    <Row className="mb-3">
                        <Col sm={12} md={6}>
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" className='supplier-input' onChange={(e) => setName(e.target.value)} />
                        </Col>

                        <Col sm={12} md={6}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" className='supplier-input' onChange={(e) => setPhone(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6}>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" className='supplier-input' onChange={(e) => setEmail(e.target.value)} />
                        </Col>

                        <Col sm={12} md={6}>
                            <Form.Label>GSTIN No.</Form.Label>
                            <Form.Select aria-label="Default select example" className='supplier-input'>
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Row>


                    <div className='d-flex justify-content-center'>
                        <div className='me-4'>
                            <Button size="lg" className='cancel-supplier-btn'>
                                Cancel
                            </Button>
                        </div>
                        <div className='ms-4'>
                            <Button size="lg" className='add-supplier-btn' onClick={(e) => handleSubmit(e)}>Submit</Button>
                        </div>
                    </div>

                </Form> </div>



        </Container>
    )
}

export default NewStock