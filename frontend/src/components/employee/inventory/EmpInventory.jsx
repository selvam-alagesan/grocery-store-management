import React from 'react'
import styles from './EmpInventory.module.css'
import Button from 'react-bootstrap/esm/Button'
import AddItemModal from './AddItemModal';
import { useState,useEffect } from 'react';
import API from '../../../api/axios';

export default function EmpInventory() {
   const [modalShow, setModalShow] = React.useState(false);
   const [items,setItems] =useState([]);
    const [expiringItems, setExpiringItems] = useState([]);
    const [lowStocks,setLowStocksItems] = useState([])
   const [showExpiringStocks,setExpiringStocks] = useState(true);
    const [showLowStocks,setLowStocks] = useState(false);
    const [showFullStocks,setFullStocks] = useState(false);
        const fetchItems = async ()=>{
            const Items = await API.get('/admin/items');
            setItems(Items.data);
        }
         useEffect(()=>{
        fetchItems();
       
    },[]);
    useEffect(()=>{
        const today = new Date();
        const next5days = new Date();
        next5days.setDate(today.getDate() + 5);

        const expItems = items.flatMap(product => product.Items.filter(item => {
            const expDate = new Date(item.expiringDate);
            return expDate >=today && expDate <= next5days;
        }).map(item=>({
            ...item,
            productname: product.productname
        }))
    )
    setExpiringItems(expItems);

    },[items])
    useEffect(()=>{
        const lowStock =  () =>{
           const lowStockitem = items.filter(product =>
            product.Items.length < 10
           );
           setLowStocksItems(lowStockitem);
        }
        lowStock();
    },[items])
  return (
    <div>
        <h1 className={styles.hone}>
            Inventory 
        </h1>
        <div style={{display:'flex', justifyContent:'center'}} >
          
            <Button onClick={()=>{setExpiringStocks(true);setLowStocks(false);setFullStocks(false)}} style={{marginRight:'15px'}} >
              Expiring Items
            </Button>
            
            
            <Button onClick={()=>{setExpiringStocks(false);setLowStocks(true);setFullStocks(false)}} style={{marginRight:'15px'}}>
                Low quantity
            </Button>
            
            
            <Button onClick={()=>{setExpiringStocks(false);setLowStocks(false);setFullStocks(true)}}>
              All stocks
            </Button>
            
        </div>
        <div>
          <Button onClick={() => setModalShow(true)} className={styles.Button}>Update Stocks</Button>
        </div>
        <AddItemModal show={modalShow}
        onHide={() => setModalShow(false) 
        } refreshData={fetchItems}/>
        
        {showExpiringStocks? (<div className={styles.div}>
                    <h1>
                        Expiring Items
                    </h1>
                    {expiringItems.length === 0 ?(<>No expiring items</>):(<>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>BarCode No</th>
                                <th>ExpiringDate</th>
                            </tr>
        
                        </thead>
                        <tbody>
                            {expiringItems.map((item,index) =>
                                (
                                    <tr key={index}>
                                        <td>{item.productname}</td>
                                        <td>{item.barcode}</td>
                                        <td>{new Date(item.expiringDate).toDateString()}</td>
                                    </tr>
                                ))}        
                        </tbody>
                        
                        
                    </table></>)}
               
                </div >
        ):(<></>)}       
                    {showLowStocks? (<div className={styles.div}>
                        <h1>
                        Low quantity Products
                    </h1>
        
                   {lowStocks.length ===0 ? (
             <>
             No Low quantity stocks
             </>
                ) : (
                <>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>productname</th>
                            <th>brandname</th>
                            <th>type</th>
                            <th>quantity(grams)</th>
                            <th>
                                price
                            </th>
                            <th>unitquantity</th>
                        </tr>
                    </thead>
                    <tbody>
                         {lowStocks.map((item,index)=>(
                        <tr key={index}>
                           
                                <td>{item.productname}</td>
                                <td>{item.brandname}</td>
                                <td>{item.type}</td>
                                <td>{item.unitquantity}</td>
                                <td>{item.price}</td>
                                <td>{item.Items.length}</td>
                               
                             </tr>
                            ))}
                       
                    </tbody>
                </table></>
                )}
                    </div>):(<></>)}
               {showFullStocks? ( <div className={styles.div}>
                    <h1>Full Stocks</h1>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>
                                    Product Name
                                </th>
                                <th>
                                    Brand Name
                                </th>
                                <th>
                                    Type
                                </th>
                                <th>
                                    Weight
                                </th>
                                <th>
                                    price
                                </th>
                                <th>
                                    unitquantity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                       
                           {items.map((item,index)=>(
                             <tr key={index}>
                                <td>{item.productname}</td>
                                <td>{item.brandname}</td>
                                <td>{item.type}</td>
                                <td>{item.unitquantity}</td>
                                <td>{item.price}</td>
                                <td>{item.Items.length}</td>
                                 </tr>
                           ))}
                          
                           </tbody>
                    </table>
        
                </div>):(<></>)}
    </div>
  )
}
