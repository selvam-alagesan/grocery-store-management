import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import API from '../../../api/axios';




export default function AddItemModal(props) {
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);
const getItems = async () => {
    try {
      const Items = await API.get('/employee/getitems');
      setItems(Items.data);
      setLoading(false);
    } catch (err) {
      alert('Error while getting Items');
    }
  };

  useEffect(() => {
    getItems(); 
  }, []);
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(''); 
  const [barcode, setBarcode] = useState('');
  const [totBarcode,setTotBarcode] = useState([])
  const [expDate,setExpDate] = useState('');
  const types = [... new Set(items.map(item => item.type))];
  const filteredBrand = [... new Set(items.filter(item=>item.type === selectedType ).map(next=> next.productname))];
  const filteredProduct =[... new Set(items.filter(item => item.type === selectedType &&  item.productname === selectedBrand))]
   const handleSubmit = async (e) =>{
    try{
    e.preventDefault();
   const payload = {
  productId: selectedProduct, 
  expDate: expDate,
  barcode: totBarcode, 
  purchaseDate: new Date().toISOString().split('T')[0]
};

    const res = await API.post('/employee/addItems', payload);

      if (res.status === 200 || res.status === 201) {
        alert('Item added successfully');
        
        
        if(props.refreshData) {
                await props.refreshData(); 
            }

        
        setBarcode('');
        setExpDate('');
        setTotBarcode([]);
        setExpDate('')
        
        
        props.onHide();
      }}catch(err){
      alert('item not added');
    }
    
    

  }

 
  return (
    <div>
    <div>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{backgroundColor:" rgb(23, 85, 109)" ,color:"white"}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Stocks
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
         {items.length === 0 ? (<div>No items found</div>):( 
          <form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} controlId='type'>
              <Form.Label >Product type</Form.Label>
              <Form.Select  onChange={(e)=>{setSelectedType(e.target.value); setSelectedBrand('');setSelectedProduct('');}} required >
                <option value={selectedType}>Select the type</option>
                {items ? (types.map((type,i)=>(
                  <option value={type} key={i}>{type}</option>
                ))):(<>No items found</>)}
              </Form.Select>

            </Form.Group>
            <Form.Group as={Col} controlId='brandname'>
              <Form.Label>
                Productname
              </Form.Label>
              <Form.Select onChange={(e)=>{
                setSelectedBrand(e.target.value) ;
                setSelectedProduct("");
              }} value={selectedBrand}
              disabled={!selectedType} required >
                <option value='' >Select the product</option>
                {filteredBrand.map((brand,i) => <option key={i} value={brand}>{brand}</option>)}

              </Form.Select>

            </Form.Group>
            <Form.Group as={Col} controlId='quantity'>
              <Form.Label>
                Quantity (grams)
              </Form.Label>
              <Form.Select onChange={(e)=>{setSelectedProduct(e.target.value);} }disabled={!selectedBrand} required >
              <option value=''>Select the quantity</option>
             {filteredProduct.map((prod, index) => (
  <option key={index} value={prod._id}> {/* Pass the ID, not the weight */}
    {prod.unitquantity}
  </option>
))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId='barcode'>
              <Form.Label>
                Barcode
              </Form.Label>
            <Form.Control placeholder='Scan the barcode'  value={barcode} onChange={(e)=>setBarcode( e.target.value)} onKeyDown={(e)=>{
              if(e.key ==='Enter'){
                e.preventDefault();
                if(barcode.trim('')){
                  setTotBarcode(prev=>[...prev,barcode]);
                  setBarcode('');
                }
              }
            }}>

              </Form.Control>

            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId='expdate'>
              <Form.Label>
                Expiry Date
              </Form.Label>
              <Form.Control type='Date' required value={expDate} onChange={(e)=>setExpDate(e.target.value)} ></Form.Control>

            </Form.Group>
            <Form.Group as={Col} controlId='purchaseDate'>
              <Form.Label>
                Purchasing Date
              </Form.Label>
              <Form.Control type='Date' disabled value={new Date().toISOString().split('T')[0]} required ></Form.Control>
            </Form.Group>
          </Row>
          <br /><br />
         
          <Button onClick={()=>{setTotBarcode(prev=>[...prev,barcode]),setBarcode('')
          }}style={{marginLeft:'280px',marginRight:'30px'}}>Add Stock</Button>
          <Button variant='success' type='submit' style={{width:"120px"}}>submit</Button>
        </form>
       
        )}
         <br /><br />
         <div style={{ border:'1px solid black',padding:'10px',borderRadius:'16px',minHeight:'200px',}}>
            <table style={{width:'100%'}}>
            <thead>
              <tr>
                <th>
                  S.no
                </th>
                <th>
                  Barcode
                </th>
                <th>
                  Action
                </th>
              </tr>
              
            </thead>
            <tbody>
              {totBarcode.map((a,index)=>{
                
                return(
                  <tr key={index}>
                    <td>
                      {index+1}
                    </td>
                    <td>
                      {a}
                    </td>
                    <td>
                      <Button onClick={()=>setTotBarcode(prev => prev.filter((_, i) => i !== index))}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
         </div>
      </Modal.Body>
      <Modal.Footer style={{backgroundColor: "rgb(23, 85, 109)"}}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        
      </div>
    </div>
  )
}
