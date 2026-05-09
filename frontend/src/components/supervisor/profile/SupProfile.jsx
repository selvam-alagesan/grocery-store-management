import React, { useEffect } from 'react'
import styles from './SupProfile.module.css'
import { useAdmin } from '../../../context/AdminContext'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import API from '../../../api/axios'
import SupDetails from './SupDetails'
import { useState } from 'react'

export default function SupProfile() {
    const {user,loading,checkAuth} = useAdmin();
       const [modalShow, setModalShow] = React.useState(false);
       const [salaryHistory, setSalaryHistory] = useState([]);

      useEffect(() => {
  const fetchSalary = async () => {
    try {
      const res = await API.get("/supervisor/salary");

      const allSalary = res.data;

      const supId = user._id;

      const filtered = allSalary.map(item => {
        const sup = item.supervisors.find(
          s => s.supervisorId === supId
        );

        if (!sup) return null;

        return {
          month: item.month,
          year: item.year,
          finalSalary: sup.finalSalary,
          remarks: sup.remarks
        };
      }).filter(Boolean);

      setSalaryHistory(filtered);

    } catch (err) {
      console.log(err);
    }
  };

  fetchSalary();
}, []);
       useEffect(()=>{
        checkAuth();
       },[])
       const todayDate = ()=>{
        return new Date().toISOString().split('T')[0];
       }
       const empPresent = async(_id)=>{
        
          try{
            const response = await API.post('/supervisor/supattendence/present',{id: _id});
            if(response.status ==200){
              alert('Marked as present')
            }
            else{
              alert('Failed to Mark')
            }
          }catch(err){
           
            const status = err.response?.status;
            if(status === 405){
              alert('already marked')
              
            }
    
          }
       }
      
          
  return (
    <div>
      <h1 style={{backgroundColor:" rgb(23, 85, 109)",color:'white'}}>Profile</h1>
      <br /><br />
      <div className={styles.section}>
        
       
        <div className={styles.body}>
          
           <form action="">
          <Row>
            <h3 style={{textAlign:'center'
            }}>Personal Details</h3>

            <Form.Group as={Col}>
            <Form.Label>
              Supervisor name
            </Form.Label>
              <Form.Control value={user?.name || ''} readOnly  disabled/>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                Mobile number
              </Form.Label>
              <Form.Control value={user?.phoneno || ''} readOnly disabled />
             </Form.Group>
             
            </Row>
            <br />
            <Row>

              <Form.Group as={Col} >
                <Form.Label>
                  User name
                </Form.Label>
                <Form.Control value={user?.username || ''} disabled/>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label  >
                  Salary
                </Form.Label>
                <Form.Control value={user?.salary || ''} disabled />
              </Form.Group>
            </Row>
            <br />
            <Row>
              
             <Col>
              <Button onClick={() => setModalShow(true)}>
                More Details
              </Button>
             </Col>
             <Col>
              <Button variant="outline-primary" onClick={checkAuth} disabled={loading}>
                            {loading ? <Spinner size="sm" /> : "Refresh"}
                  </Button>
             </Col>
          </Row>
          </form>
         </div>
         <div className={styles.body2}>
           <h3 style={{textAlign:'center'}}>
              Today attendence
            </h3>
          <div className={styles.att}>
          <br /><br />
           <Form.Label >Date</Form.Label>
            <Form.Control type="date" value={todayDate()} readOnly  />
            <br /><br />
            
            <Button onClick={()=>empPresent(user._id)} style={{marginLeft:"30px"}}>Mark present</Button>
            

          </div>
          </div>
          </div>
      
          <SupDetails show={modalShow}
          onHide={()=>setModalShow(false)}
          user={user}></SupDetails>
        

            <div className={styles.salary}>
              <h3>Salary History</h3>
             {salaryHistory.length===0?(<>No salary History</>):( <table className={styles.table}>
  <thead>
    <tr>
      <th>Month</th>
      <th>Year</th>
      <th>Salary</th>
      <th>Remarks</th>
    </tr>
  </thead>

  <tbody>
    {salaryHistory.map((sal, i) => (
      <tr key={i}>
        <td>{sal.month + 1}</td>
        <td>{sal.year}</td>
        <td>{sal.finalSalary}</td>
        <td>{sal.remarks}</td>
      </tr>
    ))}
  </tbody>
</table>)}
            </div>



    </div>
  )
}
