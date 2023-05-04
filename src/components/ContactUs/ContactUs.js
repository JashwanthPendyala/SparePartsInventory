import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap'
import './ContactUs.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TopNav from '../Navbar/TopNav'
import { toast } from 'react-toastify'
import AxiosServices from '../Services/AxiosServices'
const ContactUs = () => {

    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "email": email,
            "subject": subject,
            "message": message,

        }
        // axios.post("http://192.168.7.148:8011/user/contact/", data, {
        //     headers: {
        //         "Authorization": "Token " + token
        //     }
        // })
        AxiosServices.contact(data).then(res => {
            console.log(res.data);
            
            toast.success("Request Submitted Successfully...!",{
                position: "top-right",
                theme: "colored"
            })
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
            <Container><div className="mt-3 Contact-title">
                <p>Contact us</p>
            </div>
                <hr />
                <div className="Contact-sub-title">
                    <p>CONTACT US</p>
                </div>
                <Form className='justify-content-md-center'>
                    <Row className="mb-3">
                        <Col sm={12} md={6}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" className='Contact-input' onChange={(e) => setEmail(e.target.value)} />
                        </Col>

                        <Col sm={12} md={6}>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" className='Contact-input' onChange={(e) => setSubject(e.target.value)} />
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} className='Contact-input' onChange={(e) => setMessage(e.target.value)} />
                    </Form.Group>



                    <div className='d-flex justify-content-center'>

                        <div className='ms-4'>
                            <Button size="lg" className='add-Contact-btn' onClick={(e) => handleSubmit(e)}>Submit</Button>
                        </div>
                    </div>

                </Form> </Container>



        </Container>
    )


}

export default ContactUs