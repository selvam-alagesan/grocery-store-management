import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import API from '../../../api/axios';
export default function SupervisorAddingModal(props) {
    const [formData,setFormData] = useState({
            username:"",
            name:"",
            password:"",
            gender:"",
            temadd:"",
            phoneno:"",
            salary:"",
            aadharno:'',
            peradd:"",
            dob:'',
    
        });

        const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const supervisor = {
                username: formData.username,
                name: formData.name,
                password: formData.password,
                gender: formData.gender,
                temadd: formData.temadd,
                peradd: formData.peradd,
                dob: formData.dob,
                phoneno: formData.phoneno ? Number(formData.phoneno) : 0,
                aadharno: formData.aadharno ? Number(formData.aadharno) : 0,
                salary: formData.salary ? Number(formData.salary) : 0,
            };
            const response = await  API.post('/admin/supervisorRegistor', supervisor);
            alert(response.data.message);
            props.onHide();
            
            
        }catch(err){
            console.log('Error:', err.response?.data || err.message);
            alert(err.response?.data?.message || 'Failed to register employee');
        }

    }
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name] : e.target.value})
    }
  return (
    <div>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{backgroundColor:"rgb(23, 85, 109)",color:"white"}}>
        <Modal.Title id="contained-modal-title-vcenter" >
         Supervisor Registration
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="string" name="username" placeholder="Enter email" value={formData.username} onChange={handleChange} required/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" value={formData.password} required />
        </Form.Group>
      </Row>
        <Row>
      <Form.Group as={Col}  className="mb-3" controlId="formGridAddress1">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="Name" name="name" onChange={handleChange} value={formData.name} required/>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
        <Form.Label>phone no</Form.Label>
        <Form.Control placeholder="Enter 10 digit phone no" onChange={handleChange} type='text' name="phoneno" value={formData.phoneno} required minLength={10} maxLength={10}  pattern='[0-9]{10}'/>
      </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Temporary Address</Form.Label>
          <Form.Control as='textarea' name="temadd" value={formData.temadd} onChange={handleChange} placeholder='enteryour temproary address' required/>
        </Form.Group>

       
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Permenent Address</Form.Label>
          <Form.Control as='textarea' name="peradd" value={formData.peradd} onChange={handleChange} placeholder='enter your permenent address' required/>
        </Form.Group>
      </Row>
       <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Aadhar NO</Form.Label>
          <Form.Control type='number' name="aadharno" value={formData.aadharno} onChange={handleChange} placeholder='enteryour aadharnumber' minLength={12} maxLength={12} pattern='[0-9]{12}' required/>
        </Form.Group>

       
        <Form.Group as={Col}>
          <Form.Label>Salary</Form.Label>
          <Form.Control type='number' name="salary" value={formData.salary} onChange={handleChange} placeholder='enter your salary' required/>
        </Form.Group>
      </Row>
        <Row>
          <Form.Group as={Col} >
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type='date' name="dob" value={formData.dob} onChange={handleChange} required />
        </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>gender</Form.Label>
      <Form.Check 
            type='radio'
            
            label='male'
            name='gender'
            value='male'
            onChange={handleChange}
          />

          <Form.Check
            type='radio'
            label='female'
           
            name='gender'
            value='female'
            onChange={handleChange}
          />
          </Form.Group>
          </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </Modal.Body>
      <Modal.Footer style={{backgroundColor:"rgb(23, 85, 109)",color:"white"}}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    </div>
  )
}
