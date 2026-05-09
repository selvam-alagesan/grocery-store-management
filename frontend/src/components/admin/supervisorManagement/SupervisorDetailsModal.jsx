import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import API from '../../../api/axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function SupervisorDetailsModal({ show, onHide, supervisorId }) {
     const [visible,setVisible] = useState(true);
      const [supDetails,setSupervisorDet] = useState(null)
      const [edit,setEdit] = useState(false)
    
    
      const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };
    
        useEffect(()=>{ 
          const OneEmp = async () => {
            if (!supervisorId) return;
            try{
              const response = await API.get('/admin/onesup', {params: {id: supervisorId}});
              setSupervisorDet(response.data);
              setVisible(true);
              setEdit(false);
            }catch(err){
              console.log('error in get empone ',err)
            }
          }
          OneEmp();
        },[supervisorId]);
      
        const handleChange = (e)=>{
          setSupervisorDet({...supDetails,[e.target.name] : e.target.value})
        }
        const handleEdit =()=>{
          setVisible(false);
          setEdit(true)
        }
        const handleSubmit = async () => {
      
         
          setVisible(true);
          setEdit(false);
          const res = await API.post('/admin/updateSupervisor/details',{
             id: supDetails._id,
      name: supDetails.name,
      username: supDetails.username,
      password: supDetails.password,
      gender: supDetails.gender,
      temadd: supDetails.temadd,
      peradd: supDetails.peradd,
      phoneno: supDetails.phoneno,
      salary: supDetails.salary,
      aadharno: supDetails.aadharno,
      dob: supDetails.dob

          });
          if (res.status ===200){
            alert('Supervisor Updated successfully')
          }
        }
        const handleClose = ()=>{
          setVisible(true);
          setEdit(false);
          onHide();
        }

  return (
    <div>
         
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Supervisor Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Modal body section condtion if employee details are there only loads the details */}
        {supDetails ? (
         <>
         <div>

         
                      <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name='username'  value={supDetails.username} onChange={handleChange} disabled={visible}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder='*****' value={supDetails.password || ''} onChange={handleChange} disabled={visible}/>
                </Form.Group>
              </Row>
              <Row>
              <Form.Group as={Col}  className="mb-3" controlId="formGridAddress1">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="Name" name="name" onChange={handleChange} value={supDetails.name} disabled={visible} />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
        <Form.Label>phone no</Form.Label>
        <Form.Control placeholder="Enter 10 digit phone no" onChange={handleChange} type='number' name="phoneno" value={supDetails.phoneno} required minLength={10} maxLength={10} disabled={visible} />
      </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Temporary Address</Form.Label>
          <Form.Control as='textarea' name="temadd" value={supDetails.temadd} onChange={handleChange} placeholder='enteryour temproary address' disabled={visible}/>
        </Form.Group>

       
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Permenent Address</Form.Label>
          <Form.Control as='textarea' name="peradd" value={supDetails.peradd} onChange={handleChange} placeholder='enter your permenent address' disabled={visible}/>
        </Form.Group>
      </Row>
       <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Aadhar NO</Form.Label>
          <Form.Control type='number' name="aadharno" value={supDetails.aadharno} onChange={handleChange} placeholder='enteryour aadharnumber' minLength={12} maxLength={12} disabled={visible}/>
        </Form.Group>

       
        <Form.Group as={Col}>
          <Form.Label>Salary</Form.Label>
          <Form.Control type='number' name="salary" value={supDetails.salary} onChange={handleChange} placeholder='enter salary' disabled={visible}/>
        </Form.Group>
      </Row>
        <Row>
          <Form.Group as={Col} >
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type='date' name="dob" value={formatDateForInput(supDetails.dob)} onChange={handleChange} disabled={visible} />
        </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>gender</Form.Label>
            <Form.Control type='text' name='gender' value={supDetails.gender} disabled={visible}/>
            </Form.Group>
         </Row>

              <Row>
             
              {!edit ?(<>
              <Button type='button' variant='primary' onClick={handleEdit}>Edit</Button></>) :
              (<>
              <Button type='button' variant='success' onClick={handleSubmit}>Update</Button>
              <Button type='button' variant='secondary' onClick={() => {setVisible(true); setEdit(false);}}>Cancel</Button></>)}
              
              
            </Row>
            </Form>
            
           
         </div>
         </>
        ) : (
          <p>No supervisor data</p>
        )}
      
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>

    </div>
  )
}
