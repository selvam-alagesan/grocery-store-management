import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'

export default function SupDetails(props) {
    const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  return (
    <div>
            <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{backgroundColor:" rgb(23, 85, 109)",color:'white'}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Supervisor details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.user ? (
         <>
         <div>

          {/* Employee deltail section */}
                      <Form >
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name='employeeusername'  value={props.user.username}  disabled/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder='*****' value={props.user.password || ''} disabled/>
                </Form.Group>
              </Row>
              <Row>
              <Form.Group as={Col}  className="mb-3" controlId="formGridAddress1">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="Name" name="employeename"  value={props.user.name} disabled />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
        <Form.Label>phone no</Form.Label>
        <Form.Control placeholder="Enter 10 digit phone no" type='number' name="phoneno" value={props.user.phoneno}  disabled />
      </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Temproary Address</Form.Label>
          <Form.Control as='textarea' name="temadd" value={props.user.temadd}   disabled/>
        </Form.Group>

       
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Permenent Address</Form.Label>
          <Form.Control as='textarea' name="peradd" value={props.user.peradd}  disabled/>
        </Form.Group>
      </Row>
       <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Aadhar NO</Form.Label>
          <Form.Control type='number' name="aadharno" value={props.user.aadharno} disabled/>
        </Form.Group>

       
        <Form.Group as={Col}>
          <Form.Label>Salary</Form.Label>
          <Form.Control type='number' name="salary" value={props.user.salary}  disabled/>
        </Form.Group>
      </Row>
        <Row>
          <Form.Group as={Col} >
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type='date' name="dob" value={formatDateForInput(props.user.dob)} disabled />
        </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>gender</Form.Label>
            <Form.Control type='text' name='gender' value={props.user.gender} disabled/>
            </Form.Group>
         </Row>

              
            </Form>
            
           
         </div>
         </>
        ) : (
          <p>No employee data</p>
        )}
      
      </Modal.Body>
      <Modal.Footer style={{backgroundColor:" rgb(23, 85, 109)",color:'white'}}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    </div>
  )
}
