import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "../Login/Login.css";

import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosServices from "../Services/AxiosServices";
import TopNav from "../Navbar/TopNav";

// import { useWindowSize } from "@react-hook/window-size";

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            old_password: oldPassword,
            new_password: newPassword
        };
        // axios.post("http://192.168.7.148:8011/user/changepas/", data, {
        //     headers: {
        //         "Authorization": "Token " + token
        //     }
        // })
        AxiosServices.changePassword(data).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
                console.log("status done");
                toast.success("Password Updated Successfully...! Kindly login again...!", {
                    position: "top-right",
                    theme: "colored"
                })
                toast.success("Kindly login again...!", {
                    position: "top-left",
                    theme: "colored"
                })
                navigate("/")
            }
            
        });
    };
    useEffect(() => {
        if (token === "") {
            navigate("/");
        }
    })
    return (
        <Container fluid className="full-height ">
            <TopNav />
            <Container className="mt-5">
                <Row className="full-height justify-content-center">
                    <Col lg={12} md={12} sm={12} className="p-0 shadow-lg">
                        <Card className="cardborder p-4 h-100 shadow-lg full-height">
                            <Card
                                className="full-height"
                                style={{ height: "inherit", width: "100%" }}
                            >
                                <Card.Header>
                                    <div className="supplier-sub-title text-center mt-4 mb-4">
                                        <p>Change Password</p>
                                    </div>
                                </Card.Header>
                                <Card.Body>

                                    <Form style={{ maxwidth: "500px" }} className="text-center" >
                                        {/* className="" */}
                                        <Form.Group className="">

                                            <Row className="mb-4 mt-3 justify-content-center ">
                                                <Col style={{ maxWidth: "400px" }}>
                                                    <Form.Label>Old Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        className="supplier-input mb-4"
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                    />
                                                </Col>

                                            </Row>
                                            <Row className="mb-4 mt-3 justify-content-center">
                                                <Col style={{ maxWidth: "400px" }}>
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        className="supplier-input mb-4"
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                    </Form>
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
                                </Card.Body>
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default ChangePassword;
