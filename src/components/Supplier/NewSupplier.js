import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap'
import './Supplier.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const NewSupplier = () => {
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
        axios.post("http://192.168.0.7:8011/inventory/supplier/", data,{
            headers:{
                "Authorization":"Token "+token
            }
        }).then(res => {
            console.log(res.data);
        })
    }
    useEffect(()=>{
        if(token === ""){
            navigate("/")
        }
    })

    

    return (
        <Container>
            
               <div><div className="supplier-title">
                    <p>New Supplier{token}</p>
                </div>
                    <hr />
                    <div className="supplier-sub-title">
                        <p>SUPPLIER DETAILS</p>
                    </div>
                    <Form className='justify-content-md-center'>
                        <Row className="mb-3">
                            <Col sm={12} md={6}>
                                <Form.Label>Supplier Name</Form.Label>
                                <Form.Control type="text" className='supplier-input' onChange={(e) => setName(e.target.value)} />
                            </Col>

                            <Col sm={12} md={6}>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" className='supplier-input' onChange={(e) => setPhone(e.target.value)} />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={12} md={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" className='supplier-input' onChange={(e) => setEmail(e.target.value)} />
                            </Col>

                            <Col sm={12} md={6}>
                                <Form.Label>GSTIN No.</Form.Label>
                                <Form.Control type="text" className='supplier-input' onChange={(e) => setGstin(e.target.value)} />
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} className='supplier-input' onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>

                        <div className='d-flex justify-content-center'>
                            <div className='me-4'>
                                <Button size="lg" className='cancel-supplier-btn'>
                                    Cancel
                                </Button>
                            </div>
                            <div className='ms-4'>
                                <Button size="lg" className='add-supplier-btn' onClick={(e) => handleSubmit(e)}>Add Supplier</Button>
                            </div>
                        </div>

                    </Form> </div>
            


        </Container>
    )
}

export default NewSupplier