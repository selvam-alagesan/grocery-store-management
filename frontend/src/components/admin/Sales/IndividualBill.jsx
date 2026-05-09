import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import API from '../../../api/axios';
import { useAdmin } from '../../../context/AdminContext';
export default function IndividualBill({show,onHide,id}) {
  const [oneBill,setOneBill] = useState([]);
   const [item,setItem] = useState([]);
   
  const {checkAuth} = useAdmin()
  useEffect(()=>{
    checkAuth();
  },[])
  useEffect(()=>{
    const one = async () =>{
      const individual = await API.get(`/admin/getOneBill/${id}`)
       setOneBill(individual.data)
       setItem(individual.data.items);
    }
    if(id) one();
  },[id]);
  
  
  

  return (
    <div>
        
        <Modal
     show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ backgroundColor: "rgb(23, 85, 109)",color:'white'}} >
        <Modal.Title id="contained-modal-title-vcenter">
          Billing Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <form>
        <Row>
        <Form.Group as={Col}>
          <Form.Label>
            Cashier Name
          </Form.Label>
          <Form.Control disabled value={oneBill.cashierName}>
          
          </Form.Control >

        </Form.Group >
        <Form.Group as={Col} >
          <Form.Label>
            Date
          </Form.Label>
          <Form.Control value={oneBill.createdAt} disabled />
        </Form.Group>
        
        </Row>
        <Row>
        <Form.Group as={Col} controlId='custName'>
          <Form.Label>
            Customer Name
          </Form.Label>
          <Form.Control disabled value={oneBill.customerName} />
        </Form.Group>
        <Form.Group as={Col} controlId='custNo'>
          <Form.Label>
            Customer Number
          </Form.Label>
          <Form.Control  value={oneBill.customerNumber} disabled/>
        </Form.Group>
        </Row>
        <Row>
          <Form.Label>
            Purchased Item
          </Form.Label>
          <table>
            <thead>
              <tr>
                <th>
                  S.No
                </th>
              <th>
                Product Name
              </th>
              <th>
                barcode
              </th>
              <th>
                quantity
              </th>
              <th>
                Amount
              </th>
              </tr>
            </thead>
            <tbody>
              {item.map((a,index)=>{
                return(
                  <tr key={a._id}>
                    <td>
                      {index+1}
                    </td>
                    <td>
                      {a.productname}
                    </td>
                    <td>
                      {a.barcode}
                    </td>
                    <td>
                      {a.quantity}
                    </td>
                    <td>
                      {a.price}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Row>
              <Row>
                <Form.Group as={Col} controlId='paymentMethod'>
                <Form.Label>
                  Payment Method
                </Form.Label>
                <Form.Control value={oneBill.paymentMethod} disabled />
              </Form.Group>
            <Form.Group as={Col} controlId='totalamount'>
              <Form.Label>
                Total Amount
              </Form.Label>
              <Form.Control value={oneBill.totalAmount} disabled/>
            </Form.Group>
              </Row>
       </form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(23, 85, 109)"}}>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>


    </div>
  )
}
