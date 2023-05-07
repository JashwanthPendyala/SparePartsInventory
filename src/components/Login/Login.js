import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./Login.css";
import banner from "../Images/login-left.jpg";
import vehicles from "../Images/All-Vehicles_Small@2x.png";
import { useState } from "react";
import logo from "../Images/Group 3.svg";
import axios from "axios";
import useMatchMedia from "use-match-media";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import minilogo from "../Images/Group 4.svg";
import AxiosServices from "../Services/AxiosServices";
// import { useWindowSize } from "@react-hook/window-size";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  localStorage.setItem("token", "");
  // const size = useWindowSize();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     email: email,
  //     password: password,
  //   };
  //   setEmail("");
  //   setPassword("");
  //   console.log(data);
  //   AxiosServices.login(data).then((res) => {
  //     console.log(res.data);
  //     if (res.data.token == undefined) {
  //       toast.error("Invalid credentials", {
  //         position: "top-right",
  //         theme: "colored",
  //       });
  //     } else {
  //       localStorage.setItem("token", res.data.token);
  //       navigate("/newSale");
  //     }
  //   });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!password && email) {
  //     toast.error("Email and Password is mandatory", {
  //       position: "top-right",
  //       theme: "colored",
  //     });
  //     return;
  //   }
  //   const data = {
  //     email: email,
  //     password: password,
  //   };
  //   setEmail("");
  //   setPassword("");
  //   console.log(data);
  //   AxiosServices.login(data).then((res) => {
  //     console.log(res.data);
  //     if (res.data.token == undefined) {
  //       toast.error("Invalid credentials", {
  //         position: "top-right",
  //         theme: "colored",
  //       });
  //     } else {
  //       localStorage.setItem("token", res.data.token);
  //       navigate("/newSale");
  //     }
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }
    if (isValid) {
      const data = {
        email: email,
        password: password,
      };
      setEmail("");
      setPassword("");
      console.log(data);
      AxiosServices.login(data).then((res) => {
        console.log(res.data);
        if (res.data.token == undefined) {
          toast.error("Invalid credentials", {
            position: "top-right",
            theme: "colored",
          });
        } else {
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        }
      });
    }
  };

  const isDesktopResolution = useMatchMedia("(min-width:992px)", true);
  return (
    <div  className="full-height left-banner-img overflow-container">
      <Row className="full-height justify-content-center">
        
        {isDesktopResolution && (
          <Col lg={5} md={12} sm={12} className="left-banner h-100">
            <div className="h-100">
              <img src={logo} className="img-fluid logo p-3" />
              <img src={vehicles} className="w-100" />
            </div>
          </Col>
        )}
        <Col lg={7} md={12} sm={12} className="p-0 shadow-lg">
          <Card className="cardborder p-3 h-100 shadow-lg full-height">
            <Card className="full-height h-100" style={{ width: "100%" }}>
              <Card.Body className="">
                <div className="text-center">
                  <Card.Img
                    src={minilogo}
                    style={{ width: "258px", height: "93px" }}
                  ></Card.Img>
                  <Card.Text className="title">
                    Inventory Management System
                  </Card.Text>
                  <Card.Text
                    className="sign-in"
                    style={{
                      textDecoration: "underline",
                      color: "#005A6D",
                      fontWeight: "bold",
                    }}
                  >
                    Sign in to your account
                  </Card.Text>
                </div>
                <Form className="p-2 d-flex justify-content-center">
                  <div className="">
                    <Form.Group
                      className="mb-3 mt-3"
                      style={{ maxWidth: "400px" }}
                    >
                      <Form.Label className="login-label">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="p-3 mx-auto login-input shadow-lg w-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <p className="form-text text-danger">{emailError}</p>
                    <Form.Group className="mb-3 mt-3">
                      <Form.Label className="login-label">Password</Form.Label>
                      <Form.Control
                        type="password"
                        className="p-3 login-input mx-auto shadow-lg w-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <p className="form-text text-danger">{passwordError}</p>
                    </Form.Group>
                    <div className="text-center mt-3">
                      <Button
                        as="input"
                        type="submit"
                        value="Submit"
                        className="submit-login text-white shadow-lg mb-3 p-3 mt-4"
                        onClick={(e) => handleSubmit(e)}
                      />
                    </div>
                    <Card.Text className="sign-up mt-5 mb-0">
                      <Link
                        to={"/signup"}
                        style={{
                          textDecoration: "none",
                          color: "#005A6D",
                          fontWeight: "bold",
                        }}
                      >
                        Don't Have Account? Create
                      </Link>
                    </Card.Text>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
