import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import "./Feedback.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNav from "../Navbar/TopNav";
import { toast } from "react-toastify";
import AxiosServices from "../Services/AxiosServices";
const Feedback = () => {
  const [Que1, setQue1] = useState("");
  const [Que2, setQue2] = useState("");
  const [Que3, setQue3] = useState("");
  const [Que4, setQue4] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Que1: Que1,
      Que2: Que2,
      Que3: Que3,
      Que4: Que4,
    };
    // axios
    //   .post("http://192.168.7.148:8011/user/feedback/", data, {
    //     headers: {
    //       Authorization: "Token " + token,
    //     },
    //   })
    AxiosServices.feedback(data).then((res) => {
      console.log(res.data);
      toast.success("Feedback Submitted Successfully...!", {
        position: "top-right",
        theme: "colored"
      })
    });
  };
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  });
  return (
    <Container fluid>
      <TopNav />
      <Container>
        <div className=" mt-3 feedback-title">
          <p>Feedback</p>
        </div>
        <hr />
        <div className="feedback-sub-title">
          <p>FEEDBACK</p>
        </div>
        <Form className="justify-content-md-center">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>How often do you use our app?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="feedback-input"
              onChange={(e) => setQue1(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>What is the motivation to use our app?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="feedback-input"
              onChange={(e) => setQue2(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>What is your most used feature?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="feedback-input"
              onChange={(e) => setQue3(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              What would you like to see imporoved the most?
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="feedback-input"
              onChange={(e) => setQue4(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <div className="ms-4">
              <Button
                size="lg"
                className="add-feedback-btn"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>{" "}
      </Container>
    </Container>
  );
};

export default Feedback;
