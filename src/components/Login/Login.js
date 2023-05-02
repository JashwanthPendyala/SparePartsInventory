import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import './Login.css'
import banner from '../Images/login-left.jpg'
import vehicles from '../Images/All-Vehicles_Small@2x.png'
import { useState } from "react";

import axios from "axios";
import useMatchMedia from "use-match-media";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import { useWindowSize } from "@react-hook/window-size";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const navigate = useNavigate();
    localStorage.setItem("token", "")
    // const size = useWindowSize();
    const handleSubmit = (e) => {

        e.preventDefault();
        const data = {
            "email": email,
            "password": password
        }
        setEmail("")
        setPassword("")
        console.log(data);
        axios.post("http://192.168.7.241:8011/user/login/", data).then(res => {
            console.log(res.data)
            if (res.data.token == undefined) {
                toast.error("Invalid credentials", { position: "top-right", theme: "colored" })
            } else {
                localStorage.setItem("token", res.data.token)
                navigate("/newSupplier")
            }
        })
    }

    const isDesktopResolution = useMatchMedia('(min-width:992px)', true)
    return (
        <Container fluid className="full-height">
            <Row className="full-height justify-content-center">
                {/* {
                    console.log(size.width)
                } */}
                {
                    isDesktopResolution &&

                    <Col lg={5} md={12} sm={12} className="left-banner">
                        <div className="mt-5 mb-5">
                            <div className="h-100">
                                <div className="h-100" style={{ position: 'relative' }}>
                                    <img src={banner} className="img-fluid left-banner-img" />
                                    <h1 className="left-banner-title">Spare Part{localStorage.getItem("token")}</h1>
                                    <img src={vehicles} className="img-fluid vehicles" />
                                </div>
                            </div>
                        </div>
                    </Col>
                }
                <Col lg={7} md={12} sm={12} className="p-0 shadow-lg">
                    <Card className="cardborder p-3 h-100 shadow-lg full-height">
                        <Card className="full-height" style={{ height: "inherit", width: "100%" }}>
                            <Card.Body className="">
                                <div className="text-center">
                                    <Card.Title className="login-title mb-0">Spare Part</Card.Title>
                                    <Card.Text className="login-title-rem mt-0 fs-5">Inventory</Card.Text>
                                    <Card.Text className="title">Inventory Management System</Card.Text>
                                    <Card.Text className="sign-in">Sign in to your account</Card.Text>
                                </div>
                                <Form className="p-2 d-flex justify-content-center">
                                    <div className="">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="login-label">Email address</Form.Label>
                                            <Form.Control type="text" className="p-3 mx-auto login-input shadow-lg w-100" value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="login-label">Password</Form.Label>
                                            <Form.Control type="password" className="p-3 login-input mx-auto shadow-lg w-100" value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                        </Form.Group>
                                        <div className="text-center">
                                            <Button as="input" type="submit" value="Submit" className="submit-login text-white shadow-lg mb-3 p-3 mt-4" onClick={(e) => handleSubmit(e)} />
                                        </div>
                                        <Card.Text className="sign-up mt-5">Don't Have Account? Create</Card.Text>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
