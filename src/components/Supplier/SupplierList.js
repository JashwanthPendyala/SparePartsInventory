import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    FormLabel,
    InputGroup,
    Row,
    Table,
} from "react-bootstrap";

const SupplierList = () => {
    const [supplierList, setSupplierList] = useState([])

    const getSupplierList = () => {
        axios.get("http://192.168.0.7:8011/inventory/supplier/").then(res => {
            setSupplierList(res.data);
        })
    }
    const handleEdit = (e,id) => {
        e.preventDefault();

    }
    const handleDelete = (e,id)=>{
        e.preventDefault();
        alert(id)
    }
    useEffect(() => {
        getSupplierList();
    }, [])
    return (
        <Container>
            <div className="supplier-list-title">
                Supplier List
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <div className="supplier-list-subtitle">
                    <p>Supplier List</p>
                </div>
                <div className="addStockBtn">
                    <Button className="addNewStockBtn fs-5">Add New Supplier</Button>
                </div>
            </div>
            <InputGroup className="mb-3 mt-4">
                <Form.Control
                    placeholder="Search By Supplier Name"
                />
                <InputGroup.Text id="basic-addon2" className="searchSupplier">Search</InputGroup.Text>
            </InputGroup>

            <Table responsive="sm">
                <thead style={{ borderStyle: "none", backgroundColor: "#707070", color: "white" }}>
                    <tr>
                        <th>#</th>
                        <th>Supplier Name</th>
                        <th>Contact</th>
                        <th>GSTIN No</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        supplierList.map((map, i) =>
                            <tr key={i}>
                                <td>{map.id}</td>
                                <td>{map.name}</td>
                                <td>{map.phone}</td>
                                <td>{map.gstin}</td>
                                <td><Button onClick={(e) => handleEdit(e,map.id)}>Edit</Button></td>
                                <td><Button onClick={(e) => handleDelete(e,map.id)}>Delete</Button></td>
                            </tr>)
                    }

                </tbody>
            </Table>


        </Container>
    );
};

export default SupplierList;