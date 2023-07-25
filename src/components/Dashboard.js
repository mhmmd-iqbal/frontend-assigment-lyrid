import React, { useReducer } from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavigationBar from './NavigationBar';
import { Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


const Dashboard = () => {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([]);
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false)

  const [email, setEmail]       = useState('')
  const [phone, setPhone]       = useState('')
  const [name, setName]         = useState('')
  const [photo, setPhoto]       = useState('')
  const [gender, setGender]     = useState('male')
  const [password, setPassword] = useState('')

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const genderList = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getEmployees = async () => {
    let token   = localStorage.getItem('token')
    let payload = { headers: {"Authorization" : `Bearer ${token}`} }

    setLoading(true)

    try {
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/employee', payload)
      .then((result) => {
        setLoading(false)
        setEmployees(result.data.data)
      })
    } catch (error) {
      NotificationManager.error('Unauthorized token')
      navigate("/auth");
    }
  }  

  const submitData = async (e) => {
    e.preventDefault()

    let token    = localStorage.getItem('token')
    let formData = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('password', password);
    formData.append('photo', photo.pictureAsFile);
    let payload = {
      'content-type': 'multipart/form-data',
      headers: {'Authorization' : `Bearer ${token}`} 
    }

    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/employee', formData, payload)
      .then((res) => {
        NotificationManager.success('Data created!')
        setShow(false)
        window.location.reload();

      })
    } catch (error) {
      NotificationManager.error(error.response.data.message)
    }
  }

  const formatDate = (inputDateStr ) => {
    // Convert the input date string to a Date object
    const dateObj = new Date(inputDateStr);

    // Function to add leading zero for single-digit numbers
    function addLeadingZero(num) {
      return num < 10 ? "0" + num : num;
    }

    // Extract date components
    const year = dateObj.getFullYear();
    const month = addLeadingZero(dateObj.getMonth() + 1);
    const day = addLeadingZero(dateObj.getDate());
    const hours = addLeadingZero(dateObj.getHours());
    const minutes = addLeadingZero(dateObj.getMinutes());
    const seconds = addLeadingZero(dateObj.getSeconds());

    // Form the formatted date string
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  function handleChange(e) {
    setPhoto({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  }

  useEffect(() => {
    getEmployees()
  }, [forceUpdate])

  return (
    <>
      <NavigationBar/>
      <div className='row'>
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <Modal className='modal modal-lg' show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Data Pegawai</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Phone
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" placeholder="Phone..." onChange={(e) => setPhone(e.target.value)} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" placeholder="Name..." onChange={(e) => setName(e.target.value)} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Photo
                  </Form.Label>
                  <Col sm="10">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" onChange={handleChange} accept="image/png, image/gif, image/jpeg"  />
                  </Form.Group>
                  <Image src={photo.picturePreview} resizeMode={'cover'}
                  style={{ width: 'auto', height: 200 }} rounded/>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Gender
                  </Form.Label>
                  <Col sm="10">
                  {genderList.map((x, i) => <div key={i}>
                      <Form.Check
                        type="radio"
                        name="gender"
                        value={x.value}
                        label={x.label}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>)}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Password
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
                  </Col>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={submitData}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-10 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
            <div class="container">
              <div class="row">
                <div class="col-md-10">
                  <Card.Title >Data Pegawai</Card.Title>
                </div>
                <div class="col-md-2 text-end">
                  <Button variant="primary" onClick={handleShow}>Add Data</Button>
                </div>
              </div>
            </div>
            </div>
            <div className='col-md-12 px-2 mb-5'>
            {loading ? (
                <div>Loading...</div>
              ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => {
                    {console.log(employee)}
                    return <tr key={employee.uid}>
                      <td>{index+1} </td>
                      <td>
                        <Image src={employee.photo} width={'100px'} thumbnail />
                      </td>
                      <td>{employee.email} </td>
                      <td>{employee.name} </td>
                      <td>{employee.gender} </td>
                      <td>{employee.phone} </td>
                      <td>{formatDate(employee.created_at)} </td>
                      <td></td>
                    </tr>
                  })}
                </tbody>
              </Table>
              )
            }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard