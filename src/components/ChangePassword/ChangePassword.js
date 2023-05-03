import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './ChangePassword.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TopNav from '../Navbar/TopNav'
const ChangePassword = () => {
    const [old_password, setOldPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "old_password": old_password,
            "new_password": new_password,
            
        }
        axios.put("http://192.168.7.241:8011/user/changepas/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then(res => {
            console.log(res.data);
            if (res.status === 201) {
                console.log("status done");
                navigate("/")
            }

        })
    }
    useEffect(() => {
        if (token === "") {
            navigate("/")
        }
    })



    return (
        <Container fluid>
            <TopNav />
            <div className='mt-3'>
                <div className="changepassword-title">
                    <p>ChangePassword</p>
                </div>
                <hr />
                <div className="changepassword-sub-title">
                    <p>ChangePassword</p>
                </div>
                <Form className='justify-content-md-center'>
                    <Row className="mb-3">
                        <Col sm={12} md={6}>
                            <Form.Label className="changepassword-list-subtitle">OldPassword</Form.Label>
                            <Form.Control type="password" className='changepassword-input' onChange={(e) => setOldPassword(e.target.value)} />
                        </Col>

                        <Col sm={12} md={6}>
                            <Form.Label className="changepassword-list-subtitle">NewPassword</Form.Label>
                            <Form.Control type="password" className='changepassword-input' onChange={(e) => setNewPassword(e.target.value)} />
                        </Col>
                    </Row>

                    <div className='d-flex justify-content-center'>
                        <div className='me-4'>
                            <Button size="lg" className='cancel-changepassword-btn'>
                                Cancel
                            </Button>
                        </div>
                        <div className='ms-4'>
                            <Button size="lg" className='add-changepassword-btn' onClick={(e) => handleSubmit(e)}>Change Password</Button>
                        </div>
                    </div>

                </Form> </div>



        </Container>
    )
}

export default ChangePassword