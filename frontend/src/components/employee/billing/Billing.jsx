import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import styles from './Billing.module.css'
import { useEffect } from 'react'
import {useAdmin} from '../../../context/AdminContext'
import Button from 'react-bootstrap/esm/Button'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import API from '../../../api/axios'
export default function Billing() {
    const { user,checkAuth,loading} = useAdmin();
    const [items,setItems] = useState([]);
    const [selectedItems,setSelectedItems] = useState([]);
    const [cusName,setCusName] = useState('');
    const [cusNumber,setCusNumber] = useState('');
    const [paymentMethod,setPaymentMethod] = useState('')

    const [barcode,setBarCode] = useState(""); 
    useEffect(()=>{
        checkAuth();
    },[]);
    /* barcode input box enter button configuration */
    const handleKeyDown = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            handleBarcodeSubmit();
        }

    }
    /* fetch all the inventory item to bill */
    const fetchItems = async ()=>{
                const Items = await API.get('/admin/items');
                setItems(Items.data);
            }
    useEffect(()=>{
            fetchItems();
           
    },[]);
    /* coding for adding the items to billing */
    const handleBarcodeSubmit =()=>{
        /* extract the item from the inventory */
        const product = items.find(p=>p.Items.some(item=> item.barcode == Number(barcode)));
        if(product) {
            /* the item is stored in the selectedItems its check the previose item is selected in the list */
            setSelectedItems(prevItem=>{
                const existingItemIndex = prevItem.findIndex(item=> item._id === product._id);
                /* if the item its already in the billing then its updated as count +1 and the total amount added */
                if(existingItemIndex !== -1){
                    const updatedItems = [...prevItem];
                    const itemToUpdate = updatedItems[existingItemIndex];
                    updatedItems[existingItemIndex] ={
                        ...itemToUpdate,
                        count: itemToUpdate.count +1,
                        totalAmount: (itemToUpdate.count +1) * product.price,        
                }
                
                return updatedItems;
                }else{
                return [...prevItem,{
                    _id: product._id,
                    productname: product.productname,
                    price: product.price,
                    unitquantity: product.unitquantity,
                    count: 1,
                    totalAmount: product.price,
                    barcode:Number(barcode),
                }];
            }
            })
            
        }else{
            alert('Barcode not found in inventory!');
        }
        setBarCode("")
    }
    /* after submitting the whole products for the billing */
    const handleBilling = async(e)=>{
        e.preventDefault();
        const billData = {
        selectedProduct: selectedItems,
        paymentMethod: paymentMethod,
        customerName: cusName,
        customerNumber: Number(cusNumber),
        cashierName: user.employeename,
    };
        const response = await API.post('/employee/billing',billData);
        if(response.status === 200){
            alert('billed successfully');
            setSelectedItems([]);
            setPaymentMethod('');
            fetchItems();
        }else{
           
            console.log(err.response?.data?.message);
        alert('error in billing');
        }

    }
    
  return (
    <>
    <div style={{display:"flex"}}>
        <div className={styles.datediv}>
            <label>Date</label> 
             <Form.Control type='date' value={new Date().toISOString().split('T')[0]} disabled style={{width:"50%"}}>
            </Form.Control>
        </div>
        <div className={styles.billing}>
            <Form.Label>Cashier Name</Form.Label>
            <Form.Control value={user?.employeename || ""} readOnly disabled/>

        </div>
        <Button variant="outline-primary" onClick={checkAuth} disabled={loading}>
              {loading ? <Spinner size="sm" /> : "↻"}
            </Button>
    </div>
    <div className={styles.bill}>
        <form onSubmit={handleBilling}>
            <Row>
                <Form.Group as={Col} controlId='cusName'>
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control type='text' required value={cusName} onChange={(e)=>{setCusName(e.target.value)}}></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='cusNum'>
                    <Form.Label>
                        Customer Number
                    </Form.Label>
                    <Form.Control type='text' minLength={10} maxLength={10} value={cusNumber} onChange={(e)=>{setCusNumber(e.target.value)}} pattern='[0-9]{10}'></Form.Control>
                </Form.Group>
            </Row>
            <h1>Products</h1>
            <div className={styles.tablediv}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            S.No
                        </th>
                    <th>
                        Product Name
                    </th>
                    <th>
                        Product Quantiy
                    </th>
                    <th>
                        No of items
                    </th>
                    <th>
                        Amount
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.map((item,Index)=>(
                        <tr key={item._id || Index}>
                            <td>
                                {Index+1}
                            </td>
                            <td>{item.productname}</td>
                            <td>{item.unitquantity}</td>
                            <td>{item.count}</td>
                            <td>{item.totalAmount}</td>

                        </tr>


                    ))}
                </tbody>
            </table>
            </div>
            <br /><br />
            <Row>
            <Form.Group as={Col}>
            <Form.Label><b>Payment Method</b></Form.Label>
            <Form.Select size="md" onChange={(e)=> setPaymentMethod(e.target.value)}>
             <option value=''>Select</option>
             <option value='cash'>Cash</option>
             <option value="online">UPI</option>
             <option value="card">Card</option>
      </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
                <Button type='submit' variant='success'>Confirm Billing</Button>
                <Button variant='danger'>Cancel</Button>

            </Form.Group>
            </Row>
        </form>
      

    </div>
    <div className={styles.bill}>
          <Row>
            <Form.Group as={Col} controlId='bar'>
        
        <Form.Label>Barcode</Form.Label>

        <Form.Control type='text' placeholder='Scan the barcode' autoFocus value={barcode} onChange={(e)=>{setBarCode(e.target.value)}} onKeyDown={handleKeyDown}></Form.Control> 
        </Form.Group>
        <Form.Group as={Col}>
           <Button onClick={handleBarcodeSubmit}>Enter</Button>
        </Form.Group>
        </Row>
    </div>
    </>
  )
  
}
