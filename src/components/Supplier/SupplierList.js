import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import TopNav from "../Navbar/TopNav";
import { Link, useNavigate } from "react-router-dom";
//jquery
import "/node_modules/jquery/dist/jquery.min.js";
//Datatable Modules
import "/node_modules/datatables.net-dt/js/dataTables.dataTables";
import "/node_modules/datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { toast } from "react-toastify";
import AxiosServices from "../Services/AxiosServices";

const SupplierList = () => {
  const [supplierList, setSupplierList] = useState([]);
  const navigate = useNavigate();
  const getSupplierList = async () => {
    // await axios
    //   .get("http://192.168.0.25:8000/inventory/supplier/",{
    //     headers:{
    //       "Authorization":"Token "+localStorage.getItem("token")
    //     }
    //   })
    await AxiosServices.getSupplier().then((res) => {
      setSupplierList(res.data);
      console.log(res.data);
    });

    getDataTable();
  };
  const handleEdit = (e, id) => {
    e.preventDefault();
    navigate("/editSupplier/" + id);
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    // axios
    //   .delete("http://192.168.7.148:8011/inventory/supplier/" + id + "/")
    AxiosServices.deleteSupplier(id).then((res) => {
      console.log(res.data);
      toast.success("Deleted Successfully...!", {
        position: "top-right",
        theme: "colored",
      });
      // setSupplierList(supplierList.filter((item) => item.id !== id));
      window.location.reload();
    });
  };
  const getDataTable = () => {
    $(document).ready(function () {
      $("#example").DataTable();
    });
  };
  useEffect(() => {
    getSupplierList();
  }, []);
  return (
    <Container fluid>
      <TopNav />
      <Container>
        <div className="mt-3">
          <div className="supplier-list-title">Supplier</div>
          <hr />
          <div className="d-flex justify-content-between">
            <div className="supplier-list-subtitle">
              <p>Available Suppliers</p>
            </div>
            <div className="addStockBtn">
              <Link to={"/newSupplier"}>
                <Button className="addNewStockBtn fs-5">
                  Add New Supplier
                </Button>
              </Link>
            </div>
          </div>
          {/* <InputGroup className="mb-3 mt-4">
            <Form.Control placeholder="Search By Supplier Name" />
            <InputGroup.Text id="basic-addon2" className="searchSupplier">
              Search
            </InputGroup.Text>
          </InputGroup> */}
          <Card className="bg-light">
            <Card.Body>
              <table id="example">
                <thead
                  style={{
                    borderStyle: "none",
                    backgroundColor: "#707070",
                    color: "white",
                  }}
                >
                  <tr>
                    <th>#</th>
                    <th>Supplier Name</th>
                    <th>Contact</th>
                    <th>GSTIN No</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierList
                    .slice()
                    .reverse()
                    .map((map, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{map.name}</td>
                        <td>{map.phone}</td>
                        <td>{map.gstin}</td>
                        <td>
                          <Button onClick={(e) => handleEdit(e, map.id)}>
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button onClick={(e) => handleDelete(e, map.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </Container>
  );
};

export default SupplierList;
