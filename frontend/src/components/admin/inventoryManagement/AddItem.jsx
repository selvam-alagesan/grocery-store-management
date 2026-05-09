import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import API from '../../../api/axios';
export default function AddItem(props) {
    const [formData,setFormData] = useState({
        productname:'',
        brandname:'',
        price:'',
        unitquantity:'',
        type:'',

    });

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await API.post('/admin/addItem',{
                productname: formData.productname,
                brandname: formData.brandname,
                price: Number(formData.price) || 0,
                unitquantity: Number(formData.unitquantity) || 0,
                type: formData.type,
            })
            if(response){
                alert('Item added successfully');
                props.onHide();
                setFormData({
                  productname:'',
                  brandname:'',
                  price:'',
                  unitquantity:'',
                  type:'',
                });
            }
        }catch(err){
            alert("product not added")
        }

    }
    const handleChange = (e)=>{
     setFormData({...formData,[e.target.name] : e.target.value })   

    }
  return (
    <div>
        {/* Modal for creating a new Item */}

         <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{backgroundColor:"rgb(23, 85, 109)",color:"white"}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Adding new Items
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* Form for creating a new item */}


        <Form onSubmit={handleSubmit}> 
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" name='productname' placeholder="Enter the product Name" value={formData.productname} onChange={handleChange} required  />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Brand Name</Form.Label>
          <Form.Control type="text" name='brandname' placeholder="Enter the Brand Name" value={formData.brandname} onChange={handleChange} required />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Price</Form.Label>
        <Form.Control type='number' name='price' placeholder="Enter the price" onChange={handleChange} value={formData.price} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Quantity in Kilogram(Kg)</Form.Label>
        <Form.Control type='number' name='unitquantity' placeholder="enter the quantiy in kilogram ex:1.25" onChange={handleChange} value={formData.unitquantity}  required />
      </Form.Group>

      <Row className="mb-3">

        {/* dropdown for type of the  product */}

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Type</Form.Label>
          <Form.Select name='type' onChange={handleChange}>
            <option value="">-- Select Category --</option>
            <option value="Fruits & Vegetables">Fruits & Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat & Eggs">Meat & Eggs</option>
            <option value="Grains & Staples">Grains & Staples</option>
            <option value="Packaged Foods">Packaged Foods</option>
            <option value="Spices & Masalas">Spices & Masalas</option>
            <option value="Sweets & Confectionery">Sweets & Confectionery</option>
            <option value="Beverages">Beverages</option>
            <option value="Cleaning & Household">Cleaning & Household</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Baby Products">Baby Products</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Frozen Foods">Frozen Foods</option>
            <option value="Bakery">Bakery</option>
            <option value="Dry Fruits & Nuts">Dry Fruits & Nuts</option>
          </Form.Select>
        </Form.Group>

       
      </Row>

     

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    {/* End of the  form */}
      </Modal.Body>
      <Modal.Footer style={{backgroundColor:"rgb(23, 85, 109)",color:"white"}}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}
