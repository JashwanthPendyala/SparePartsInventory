// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   ButtonGroup,
//   Card,
//   Col,
//   Container,
//   Form,
//   Row,
// } from "react-bootstrap";
// import "./Signup.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const Signup = () => {
//   const [uname, setUname] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstname, setFirstName] = useState("");
//   const [phone, setPhone] = useState();
//   const [lastname, setLastName] = useState("");
//   const[password,setPassword] = useState("");
//   const[confirmPassword,setConfirmPassword] = useState("");
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       name: uname,
//       mobile: phone,
//       firstname:firstname,
//       lastname:lastname,
//       email: email,
//       password:password,
//       confirmPassword:confirmPassword
//     };
//     axios.post("http://192.168.0.7:8011/user/signup/", data).then((res) => {
//       console.log(res.status);
//       if (res.status === 201) {
//         console.log("status done");
//         navigate("/");
//       }
//     });
//   };
//   useEffect(() => {
//     if (token === "") {
//       navigate("/");
//     }
//   });

//   return (
//     <Container fluid>
//       <Card className="cardborder h-100 m-0">
//         <Card className="h-100">
//         <div className="supplier-sub-title text-center">
//           <p>Sign Up</p>
//         </div>
//         <Form className="justify-content-md-center">
//           <Row className="mb-3">
//             <Col sm={12} md={6}>
//               <Form.Label>UserName</Form.Label>
//               <Form.Control
//                 type="text"
//                 className="supplier-input"
//                 onChange={(e) => setUname(e.target.value)}
//               />
//             </Col>

//             <Col sm={12} md={6}>
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="text"
//                 className="supplier-input"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col sm={12} md={6}>
//               <Form.Label>FirstName</Form.Label>
//               <Form.Control
//                 type="text"
//                 className="supplier-input"
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </Col>

//             <Col sm={12} md={6}>
//               <Form.Label>LastName</Form.Label>
//               <Form.Control
//                 type="text"
//                 className="supplier-input"
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col sm={12} md={6}>
//               <Form.Label>Mobile</Form.Label>
//               <Form.Control
//                 type="email"
//                 className="supplier-input"
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col sm={12} md={6}>
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 className="supplier-input"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </Col>
//             <Col sm={12} md={6}>
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 className="supplier-input"
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </Col>
//           </Row>

//           <div className="d-flex justify-content-center">
//             <div className="me-4">
//               <Button size="lg" className="cancel-supplier-btn">
//                 Cancel
//               </Button>
//             </div>
//             <div className="ms-4">
//               <Button
//                 size="lg"
//                 className="add-supplier-btn"
//                 onClick={(e) => handleSubmit(e)}
//               >
//                 sign-up
//               </Button>
//             </div>
//           </div>
//         </Form>{" "}
//         </Card>
//       </Card>
//     </Container>
//   );
// };

// export default Signup;
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "../Login/Login.css";
import banner from "../Images/login-left.jpg";
import vehicles from "../Images/All-Vehicles_Small@2x.png";
import { useState } from "react";

import axios from "axios";
import useMatchMedia from "use-match-media";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import { useWindowSize } from "@react-hook/window-size";

const Signup = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [phone, setPhone] = useState();
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      username: uname,
      first_name: firstname,
      last_name: lastname,
      mobile_number: phone,
      password1: password,
      password2: confirmPassword,
    };
    axios.post("http://192.168.0.8:8011/user/signup/", data).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        console.log("status done");
        navigate("/");
      }
    });
  };
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
                  <Row className="mb-4 mt-3 h-100">
                    <Col sm={12} md={6}>
                      <Form.Label>UserName</Form.Label>
                      <Form.Control
                        type="text"
                        className="supplier-input mb-4"
                        onChange={(e) => setUname(e.target.value)}
                      />
                    </Col>

                    <Col sm={12} md={6}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        className="supplier-input mb-4"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4 mt-3">
                    <Col sm={12} md={6}>
                      <Form.Label>FirstName</Form.Label>
                      <Form.Control
                        type="text"
                        className="supplier-input mb-4"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Col>

                    <Col sm={12} md={6}>
                      <Form.Label>LastName</Form.Label>
                      <Form.Control
                        type="text"
                        className="supplier-input mb-4"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4 mt-3">
                    <Col sm={12} md={6}>
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="email"
                        className="supplier-input mb-4"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4 mt-3">
                    <Col sm={12} md={6}>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        className="supplier-input mb-4"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        className="supplier-input mb-4"
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        sign-up
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

export default Signup;
