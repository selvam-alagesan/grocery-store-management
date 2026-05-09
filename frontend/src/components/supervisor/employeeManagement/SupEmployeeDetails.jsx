import React from 'react'
import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button';
import API from '../../../api/axios';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function SupEmployeeDetails({ show, onHide, employeeId }) {
    const [visible,setVisible] = useState(true);
  const [empDetails,setEmployeeDet] = useState(null)
  const [edit,setEdit] = useState(false)


  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(()=>{ 
    const OneEmp = async () => {
      if (!employeeId) return;
      try{
        const response = await API.get('/admin/oneemp', {params: {id: employeeId}});
        setEmployeeDet(response.data);
        setVisible(true);
        setEdit(false);
      }catch(err){
        console.log('error in get empone ',err)
      }
    }
    OneEmp();
  },[employeeId]);

  const handleChange = (e)=>{
    setEmployeeDet({...empDetails,[e.target.name] : e.target.value})
  }
  const handleEdit =()=>{
    setVisible(false);
    setEdit(true)
  }
  const handleSubmit = async() => {

    
    setVisible(true);
    setEdit(false);
    const res = await API.post('/admin/updateSupervisor', {
  id: empDetails._id,
  work: empDetails.work
});
    console.log(res.data);

  }
  const handleClose = ()=>{
    setVisible(true);
    setEdit(false);
    onHide();
  }
  const todayAttendence = (empDetails) =>{
    const today = new Date();
    today.setHours(0,0,0,0);
    const attendance = empDetails.find((dates) =>{
        const attDate = new Date(dates.date).setHours(0,0,0,0)
        return attDate === today;

    })
    return attendance? attendance.status : 'absent'
  }
  return (
     <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton  style={{backgroundColor:"rgb(23, 85, 109)",color:"white"}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Employee Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Modal body section condtion if employee details are there only loads the details */}
        {empDetails ? (
         <>
         <div>

          {/* Employee deltail section */}
                      <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name='employeeusername'  value={empDetails.employeeusername} onChange={handleChange} disabled/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder='*****' value={empDetails.password || ''} onChange={handleChange} disabled/>
                </Form.Group>
              </Row>
              <Row>
              <Form.Group as={Col}  className="mb-3" controlId="formGridAddress1">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="Name" name="employeename" onChange={handleChange} value={empDetails.employeename} disabled />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
        <Form.Label>phone no</Form.Label>
        <Form.Control placeholder="Enter 10 digit phone no" onChange={handleChange} type='number' name="phoneno" value={empDetails.phoneno} required minLength={10} maxLength={10} disabled />
      </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Temporary Address</Form.Label>
          <Form.Control as='textarea' name="temadd" value={empDetails.temadd} onChange={handleChange} placeholder='enteryour temproary address' disabled/>
        </Form.Group>

       
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Permenent Address</Form.Label>
          <Form.Control as='textarea' name="peradd" value={empDetails.peradd} onChange={handleChange} placeholder='enter your permenent address' disabled/>
        </Form.Group>
      </Row>
       <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Aadhar NO</Form.Label>
          <Form.Control type='number' name="aadharno" value={empDetails.aadharno} onChange={handleChange} placeholder='enteryour aadharnumber' minLength={12} maxLength={12} disabled/>
        </Form.Group>

       
        <Form.Group as={Col}>
          <Form.Label>Salary</Form.Label>
          <Form.Control type='number' name="salary" value={empDetails.salary} onChange={handleChange} placeholder='enter salary' disabled/>
        </Form.Group>
      </Row>
        <Row>
          <Form.Group as={Col} >
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type='date' name="dob" value={formatDateForInput(empDetails.dob)} onChange={handleChange} disabled />
        </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>gender</Form.Label>
            <Form.Control type='text' name='gender' value={empDetails.gender} disabled/>
            </Form.Group>
         </Row>

              <Row>
                <Row>
                  <Form.Group as={Col} controlId='attendence'>

                    <Form.Label>Today attendance</Form.Label>
                    <Form.Control type='text' value={todayAttendence(empDetails.attendence)} disabled/>
                    </Form.Group>
                    <Form.Group as={Col} controlId='work' >
                      <Form.Label>
                        Assign work
                      </Form.Label>
                      <Form.Control value={empDetails.work || "Not assigned"} disabled />
                    </Form.Group>
                </Row>
                {!visible && <Form.Group>
                  <Form.Label>
                    Assign work
                  </Form.Label>
                  <Form.Select name='work' onChange={handleChange}>
                    <option value=""> -- Select One --</option>
                    <option value="inventory">Inventory</option>
                    <option value="billing">Billing</option>
                  </Form.Select>
                  </Form.Group>}
             
              {!edit ?(<>
              <Button type='button' variant='primary' onClick={handleEdit}>Assign work</Button></>) :
              (<>
              <Button type='button' variant='success' onClick={handleSubmit}>Update</Button>
              <Button type='button' variant='secondary' onClick={() => {setVisible(true); setEdit(false);}}>Cancel</Button></>)}
              
              
            </Row>
            </Form>
            
           
         </div>
         </>
        ) : (
          <p>No employee data</p>
        )}
      
      </Modal.Body>
      <Modal.Footer style={{backgroundColor:"rgb(23, 85, 109)",color:"white"}}>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
