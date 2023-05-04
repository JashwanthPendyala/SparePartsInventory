import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "../Login/Login.css";

import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import { useWindowSize } from "@react-hook/window-size";

const Profile = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            old_password1: oldPassword,
            new_password2: newPassword
        };
        axios.post("http://192.168.7.148:8011/user/changepas/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
                console.log("status done");
                toast.success("Password Updated Successfully...!", {
                    position: "top-right",
                    theme: "colored"
                })
                toast.success("Kindly login again...!", {
                    position: "top-right",
                    theme: "colored"
                })
            }
            navigate("/")
        });
    };
    useEffect(() => {
        if (token === "") {
            navigate("/");
        }
    })
    return (
        <Container fluid className="full-height">
            <Row className="full-height justify-content-center">
                <Col lg={12} md={12} sm={12} className="p-0 shadow-lg">
                    <Card className="cardborder p-4 h-100 shadow-lg full-height">
                        <Card
                            className="full-height"
                            style={{ height: "inherit", width: "100%" }}
                        >
                            <Card.Body>
                                <div className="supplier-sub-title text-center mt-4 mb-4">
                                    <p>Sign Up</p>
                                </div>
                                <Form className="justify-content-md-center">



                                    <Row className="mb-4 mt-3">
                                        <Col sm={12} md={6}>
                                            <Form.Label>Old Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                className="supplier-input mb-4"
                                                onChange={(e) => setOldPassword(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                className="supplier-input mb-4"
                                                onChange={(e) => setNewPassword(e.target.value)}
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
                            </Card.Body>
                        </Card>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
