import React, { useEffect, useState } from 'react'
import API from '../../../api/axios'
import Button from 'react-bootstrap/Button'
import styles from './Sales.module.css';
import IndividualBill from './IndividualBill';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import Form from 'react-bootstrap/Form'
export default function Sales() {
  const [bills,setBills] =useState([]);
  const [cashbill,setCash] =useState([]);
  const [onlinebill,setOnlineBill] = useState([]);
  const [cardBill,setCardBill] = useState([]);
  const [showCashBill,setShowCashBill] = useState(true);
  const [showOnlineBill,setShowOnlineBill] = useState(false);
  const [showCardBill,setShowCardBill] = useState(false);
  const [filterCash,setFilteredCash] = useState([]);
  const [filterOnline,setFilteredOnline] = useState([])
  const [showFilteredCash,setShowFilteredCash] = useState(false)
  const [showFIlteredOnline,setShowFilteredOnline] = useState(false);
  const [showFilteredCard,setShowFilteredCard] = useState(false);
  const [filteredcard,setFilteredCard] = useState([])
  const [individualBillId,setIndividualBillId] = useState([])
  const [showModal,setShowModal] = useState(false)

  useEffect(()=>{
    const getBills = async ()=>{
      const items = await API.get('/admin/purchasings');
      setBills(items.data);
    }
    getBills();
  },[])
  useEffect(()=>{
  const cash = ()=>{
    const cashBills = bills.filter(a=>{
      return a.paymentMethod === 'cash'
    }
  );
  setCash(cashBills)
     }
     cash();
  },[bills])
  
  useEffect(()=>{
    const online =()=>{
    const onlineBills = bills.filter(a=>{
      return a.paymentMethod === 'online'
    }
  );
  setOnlineBill(onlineBills);
    
  }
  online();
  },[bills]);


 useEffect(()=>{
   const card =()=>{
    const cardBills = bills.filter(a=>{
      return a.paymentMethod === 'card'
    });
    setCardBill(cardBills);
    
  }
  card();

 },[bills]);
 const getFormattedDate = (bill) =>{
  return new Date(bill).toISOString().split('T')[0];

 }
 const cashFilter = (date) =>{
  const filteredCash = cashbill.filter(a=>{
  
  return getFormattedDate(a.createdAt) == date;
  })
  setFilteredCash(filteredCash);
 }
 const onlineFilter =(date)=>{
  const filOnline = onlinebill.filter(a=>{
    return getFormattedDate(a.createdAt) === date;
  })
  setFilteredOnline(filOnline)
 }
 const cardFilter =(date) =>{
  const card = cardBill.filter(a=>{
    return getFormattedDate(a.createdAt) == date;
  });
  setFilteredCard(card);
 }
  const [filterDate,setfilterDate] = useState(getFormattedDate(new Date()));

const downloadPDF = async()=>{
  let tableId ='';
    const elements = document.querySelectorAll('.no-print');
  elements.forEach(el => el.style.display = 'none');

  if (showFilteredCash) tableId='cashTable';
  if (showFIlteredOnline) tableId='onlineTable';
  if (showFilteredCard) tableId = 'cardTable';


  const input = document.getElementById(tableId);

  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL('image/png');
 

  const pdf = new jsPDF('p','mm','a4');

  const imgWidth = 190;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width ;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData,'PNG',10,position,imgWidth,imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0 ){
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData,"PNG",10,position,imgWidth,imgHeight);
    heightLeft -= pageHeight;
  }
  pdf.save('Sales.pdf');
  elements.forEach(el => el.style.display = '');



}

  return (
    <div>
      <h1 style={{ backgroundColor: "rgb(23, 85, 109)",
    height: "55px",
    color: "white"}}>Sales</h1>
      <div style={{display:'flex', justifyContent:'center'}} >
          
            <Button onClick={()=>{setShowCashBill(true);setShowOnlineBill(false);setShowCardBill(false);setShowFilteredOnline(false);setShowFilteredCash(false);setShowFilteredCard(false);setShowCardBill(false);}} style={{marginRight:'15px'}} >
              Cash 
            </Button>
            
            
            <Button onClick={()=>{setShowCashBill(false);setShowOnlineBill(true);setShowCardBill(false);setShowFilteredCash(false);setShowFilteredCard(false);setShowCardBill(false)}} style={{marginRight:'15px'}}>
                Online 
            </Button>
            
            
            <Button onClick={()=>{setShowCashBill(false);setShowOnlineBill(false);setShowCardBill(true);setShowFilteredCash(falsee);setShowFilteredOnline(false);setShowFilteredCard(false)}}>
              Card
            </Button>

            
        </div>

        <div className={styles.tablediv}>
          {!showFilteredCash? (<>
            {showCashBill? (<div>
              <h1 style={{display:'inline'}}>CashBills</h1> <Form.Control type="date" name='filterDate' onChange={(e)=> setfilterDate(e.target.value)} value={filterDate} style={{width:'150px',display:'inline',marginLeft:"825px"}}
                /> <Button onClick={()=>{cashFilter(filterDate);setShowFilteredOnline(false);setShowCashBill(false);setShowCardBill(false);setShowFilteredCash(true)}}>Show</Button>
              <br /><br />
              {cashbill.length === 0 ? (<>No cashbills</>):(
                <table className={styles.table}>
                <thead>
                  <tr>
                    <th style={{width:'20px'}}>S.No</th>
                    <th>
                      Date
                    </th>

                  <th>
                    Cashier Name
                  </th>
                  <th>
                    Custmer Name
                  </th>
                  <th>
                    Total Amount
                  </th>
                
                  <th>
                    More
                  </th>
                  </tr>
                </thead>

                <tbody>
                  {cashbill.map((bill,index)=>{
                    return(
                    <tr key={bill._id}>
                      <td style={{width:'20px'}}>
                        {index+1}
                      </td>
                      <td>
                        {getFormattedDate(bill.createdAt)}
                      </td>
                      <td>
                        {bill.cashierName}
                      </td>
                      <td>
                        {bill.customerName}
                      </td>
                      <td>
                        {bill.totalAmount}
                      </td>
                     
                      <td>
                        <Button onClick={()=>{setIndividualBillId(bill._id);setShowModal(true)}}>
                           Details
                        </Button>
                      </td>

                    </tr>
                    )

                  })

                  }
                </tbody>
              </table>
            
            )}
        
          </div>):(<></>)

          }</>) : (
            <div id='cashTable'>
                {!filterCash.length == 0? (<>
                <h1 style={{display:'inline'}}>CashBills</h1> <Form.Control type="date" name='filterDate' style={{width:'150px',display:'inline',marginLeft:"825px"}} onChange={(e)=> setfilterDate(e.target.value)} value={filterDate} className='no-print' /> <Button onClick={()=>{cashFilter(filterDate);setShowFilteredCash(true);setShowFilteredCard(false);setShowFilteredOnline(false)}} className='no-print'>Show</Button><Button variant='danger' onClick={()=>setShowFilteredCash(false)} className='no-print'>Cancel</Button>
                <br /><br />
                  <table className={styles.table} id='cashTable'>
                    <thead>
                      <tr>
                        <th style={{width:'20px'}}>
                          S.No
                        </th>
                        <th>
                          Date
                        </th>
                        <th>
                          Cashier Name
                        </th>
                        <th>
                          Customer Name
                        </th>
                        <th>
                          Total Amount
                        </th>
                        <th className='no-print'>
                          More
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterCash.map((bill,index)=>{
                        return(
                          <tr key={bill._id}>
                            <td style={{width:'20px'}}>
                              {index+1}
                            </td>
                          <td>
                            {getFormattedDate(bill.createdAt)}
                          </td>
                          <td>
                            {bill.cashierName}
                          </td>
                          <td>
                            {bill.customerName}
                          </td>
                          <td>
                            {bill.totalAmount}
                          </td>
                          <td className='no-print'>
                            <Button  onClick={()=>{setIndividualBillId(bill._id);setShowModal(true)}}>
                               Details
                            </Button>
                          </td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <br /><br />
                      <Button style={{marginLeft:'1110px'}} variant='danger' onClick={downloadPDF} className='no-print'><i className="fa-solid fa-file-pdf" ></i> Make a PDF</Button>
                </>):(<>  <h1 style={{display:'inline'}}>CashBills</h1> <Form.Control type="date" name='filterDate' style={{width:'150px',display:'inline',marginLeft:"825px"}} onChange={(e)=> setfilterDate(e.target.value)} value={filterDate} /> <Button onClick={()=>{cashFilter(filterDate);setShowFilteredCash(true)}}>Show</Button><Button variant='danger' onClick={()=>setShowFilteredCash(false)}>Cancel</Button>
                      <br />
                No Bills on {filterDate} </>)}
            </div>
          )}
          
          {!showFIlteredOnline ? (<>
          {showOnlineBill? (<div >
            <h1 style={{display:'inline'}}>
              Online Bill
            </h1> <Form.Control type="date" name='filterDate' style={{width:'150px',display:'inline',marginLeft:"825px"}} onChange={(e)=> setfilterDate(e.target.value)} value={filterDate} /> <Button onClick={()=>{onlineFilter(filterDate);setShowFilteredOnline(true)}}>Show</Button>
            <br /><br />
            <table className={styles.table}>
             {onlinebill.length ===0 ? (<>No online bills</>) : (<> 
                  <thead>
                    <tr>
                      <th style={{width:'20px'}}>
                        S.No
                      </th>
                      <th>
                        Date
                      </th>
                      <th>
                        Cashier Name
                      </th>
                      <th>
                        Customer Name
                      </th>
                      <th>
                        Total Amount
                      </th>
                     
                      <th>
                        More
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {onlinebill.map((bill,index)=>{
                      return(
                        <tr key={bill._id}>
                          <td style={{width:'20px'}}>
                            {index+1}
                          </td>
                          <td>
                            {getFormattedDate(bill.createdAt)}
                          </td>
                          <td>
                            {bill.cashierName}
                          </td>
                          <td>
                            {bill.customerName}
                          </td>
                          <td>
                            {bill.totalAmount}
                          </td>
                         
                          <td>
                            <Button  onClick={()=>{setIndividualBillId(bill._id);setShowModal(true)}}>
                               Details
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody></>)}
               
                </table>

           
          </div>):(<></>)
          
          }</>) :(<div id='onlineTable'>
                {!filterOnline.length == 0? (<>
                 <h1 style={{display:'inline'}}>
              Online Bill
            </h1> <Form.Control type="date" name='filterDate' style={{width:'150px',display:'inline',marginLeft:"825px"}} onChange={(e)=> setfilterDate(e.target.value)} value={filterDate} className='no-print' /> <Button onClick={()=>{onlineFilter(filterDate);setShowFilteredOnline(true);setShowFilteredCash(false)}} className='no-print'>Show</Button><Button variant='danger' onClick={()=>setShowFilteredOnline(false)} className='no-print'>Cancel</Button>
                  <br /><br />
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th style={{width:'20px'}}>
                          S.No
                        </th>
                        <th>
                          Date
                        </th>
                        <th>
                          Cashier Name
                        </th>
                        <th>
                          Customer Name
                        </th>
                        <th>
                          Total Amount
                        </th>
                        <th className='no-print'>
                          More
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterOnline.map((bill,index)=>{
                        return(
                          <tr key={bill._id}>
                            <td style={{width:'20px'}}>
                              {index+1}
                            </td>
                          <td>
                            {getFormattedDate(bill.createdAt)}
                          </td>
                          <td>
                            {bill.cashierName}
                          </td>
                          <td>
                            {bill.customerName}
                          </td>
                          <td>
                            {bill.totalAmount}
                          </td>
                          <td className='no-print'>
                            <Button  onClick={()=>{setIndividualBillId(bill._id);setShowModal(true)}}>
                               Details
                            </Button>
                          </td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <br /><br />
                      <Button style={{marginLeft:'1110px'}} variant='danger' onClick={downloadPDF} className='no-print'><i className="fa-solid fa-file-pdf" ></i> Make a PDF</Button>
                </>):(<>  <h1 style={{display:'inline'}}>Online Bills</h1> <Form.Control type="date" name='filterDate' style={{width:'150px',display:'inline',marginLeft:"825px"}} onChange={(e)=> setfilterDate(e.target.value)} value={filterDate} /> <Button onClick={()=>{cashFilter(filterDate);setShowFilteredCash(true)}}>Show</Button><Button variant='danger' onClick={()=>setShowFilteredCash(false)}>Cancel</Button>
                      <br />
                No Bills on {filterDate} </>)}
            </div>)

          }



          {!showFilteredCard ? (<>
          
          {showCardBill? (
            <div>

            <h1 style={{display:'inline'}}>
              Card Bill
            </h1><Form.Control type="date" name='filterDate' style={{width:'150px',display:'inline',marginLeft:"825px"}}onChange={(e)=> setfilterDate(e.target.value)} value={filterDate} /> <Button onClick={()=>{cardFilter(filterDate);setShowFilteredCard(true);setShowFilteredCash(false);setShowFilteredOnline(false)}}>Show</Button> 
            <br /><br />
            {cardBill.length === 0 ? (<>No card bills</>):(
             <table className={styles.table}>
              <thead>
              <tr>
                <th style={{width:'20px'}}>
                  S.No
                </th>
                <th>
                  Date
                </th>
                <th>
                  Cashier Name
                </th>
                <th>
                  Customer Name
                </th>
                <th>
                  Total Amount
                </th>
                <th>
                  More
                </th>
              </tr>
              </thead>

              <tbody>
                {cardBill.map((bill,index)=>{
                  return(
                    <tr key={bill._id}>
                      <td style={{width:"20px"}}>
                        {index+1}
                      </td>
                      <td>
                        {getFormattedDate(bill.createdAt)}
                      </td>
                      <td>
                        {bill.cashierName}
                      </td>
                      <td>
                        {bill.customerName}
                      </td>
                      <td>
                        {bill.totalAmount}
                      </td>
                      <td>
                        <Button  onClick={()=>{setIndividualBillId(bill._id);setShowModal(true)}}>
                           Details
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>

             </table>
            )}
          </div>
          ):(<></>)}
          </>) : (<>
          {!filteredcard.length ==0 ? (<>
          <div id='cardTable'>
          <h1 style={{display:'inline'}}>
              Card Bill
            </h1> <Form.Control type="date" name='filterDate' style={{width:'150px',display:'inline',marginLeft:"825px"}} onChange={(e)=> setfilterDate(e.target.value)} value={filterDate} className='no-print' /> <Button onClick={()=>{cardFilter(filterDate);setShowFilteredCard(true);setShowFilteredCash(false);setShowFilteredOnline(false);}} className='no-print'>Show</Button><Button variant='danger' onClick={()=>setShowFilteredCard(false)} className='no-print'>Cancel</Button>
                  <br /><br />
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th style={{width:'20px'}}>
                          S.No
                        </th>
                        <th>
                          Date
                        </th>
                        <th>
                          Cashier Name
                        </th>
                        <th>
                          Customer Name
                        </th>
                        <th>
                          Total Amount
                        </th>
                        <th className='no-print'>
                          More
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredcard.map((bill,index)=>{
                        return(
                          <tr key={bill._id}>
                            <td style={{width:'20px'}}>
                              {index+1}
                            </td>
                          <td>
                            {getFormattedDate(bill.createdAt)}
                          </td>
                          <td>
                            {bill.cashierName}
                          </td>
                          <td>
                            {bill.customerName}
                          </td>
                          <td>
                            {bill.totalAmount}
                          </td>
                          <td className='no-print'>
                            <Button  onClick={()=>{setIndividualBillId(bill._id);setShowModal(true)}}>
                              Details
                            </Button>
                          </td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <br /><br />
                      <Button style={{marginLeft:'1110px'}} variant='danger' onClick={downloadPDF} className='no-print'><i className="fa-solid fa-file-pdf" ></i> Make a PDF</Button>
                  </div></>)
                  : 
                  (<> <h1 style={{display:'inline'}}>
              Card Bill
            </h1> <Form.Control type="date" name='filterDate' style={{width:'150px',display:'inline',marginLeft:"825px"}} onChange={(e)=> setfilterDate(e.target.value)} value={filterDate} /> <Button onClick={()=>{cardFilter(filterDate);setShowFilteredCard(true);setShowFilteredCash(false);setShowFilteredOnline(false);}}>Show</Button><Button variant='danger' onClick={()=>setShowFilteredCard(false)}>Cancel</Button>
                  <br /><br />
                  No card Bills in {filterDate}</>)}
          </>)

          }


        </div>
        <IndividualBill show={showModal}
        onHide={()=>setShowModal(false)}
          id={individualBillId}
          

        />
    </div>
  )
}
