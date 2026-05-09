import React from 'react'
import { useState,useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import styles from './SupEmployee.module.css'
import Row from 'react-bootstrap/Row'
import SupEmployeeDetails from './SupEmployeeDetails'
import API from '../../../api/axios'


export default function SupEmployee() {
     const [getEmployee,setEmployee] = useState([]);
      const [errors, setErrors] = useState('');
      const [loading,setLoading] = useState(true);
      
    
      
      const [modalShow1, setModalShow1] = React.useState(false);
      const [employeeDet,setEmployeeDet] = useState(null); 
      const fetchEmployee = async () =>{
    try{
      const response = await  API.get('/admin/getEmployees');
      setEmployee(response.data);
     
      setLoading(false)
    }catch(err){
      setErrors(err.response?.data?.message || "Failed to fetch the employee details");
      return <div>No employees found</div>
      
    }

    }
       useEffect(()=>{
    
    fetchEmployee();
  },[]);
  if (loading) {
    
      return <p>Loading...</p>;
    }
     const todayAttendence = (emp) =>{
    const today = new Date();
    today.setHours(0,0,0,0);
    const attendance = emp.find((dates) =>{
        const attDate = new Date(dates.date)
        attDate.setHours(0,0,0,0)
        return attDate.getTime() === today.getTime();

    })
    return attendance? attendance.status : 'Not Marked'
  }
   
    const handleShowEmpDetails = async (id) =>{
    const response = getEmployee.find(emp => emp._id === id);
    setModalShow1(true);
    setEmployeeDet(response);
  }
  const present = async(_id) =>{
    try{ 
    const response = await API.post('/supervisor/attendence/present',{id:_id});
      if(response.status == 200){
        alert('Attendece marked as present successfully')
        fetchEmployee();
      }
      else{
        alert('failed to mark as present')
      }
    }catch(err){
      console.log('error occured',err)
      if(err.status ==409){
        alert('attendence already marked');
      }
    }
  }
  const absent = async (_id) =>{
    try{
      const response = await API.post('/supervisor/attendence/absent',{id:_id});
      if(response.status ==200){
        alert('Attendence marked as absent successfully');
        fetchEmployee();
      }
      else{
        alert('failed to marked as absent')
      }
    }catch(err){
      console.log('error occured',err);
      if(err.status ==409){
        alert('attendence already marked')
      }
    }
  }
 
 
  return (
    <>
     <div >
      <div >
        <h1 className={styles.hone}>Employees</h1>
        

      </div>
      <div className={styles.tablediv}>
        {getEmployee.length ==0 ?(<> <div>No Employees found</div></>)
        : (<>
        <br /><br />
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th style={{width:"10%"}}>
                S.No
              </th>
              <th>Name</th>
              <th>Attendence</th>
              <th>Salary</th>
              <th>Actions</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
          {getEmployee.map((emp,index)=>(
            <tr key={emp._id} className={styles.table} >
              <td style={{width:"10%"}}>
                {index+1}
              </td>
              <td>{emp.employeename}</td>
               
               <td>{todayAttendence(emp.attendence)}</td>
               
               <td>{emp.salary}</td>
               <td>
                <Row>
                  <Button style={{width:'100px'}} variant='success' onClick={()=>present(emp._id)}>
                    Mark as present

                  </Button>
                  <Button style={{width:'100px', marginLeft:'5px'}} variant='danger' onClick={()=>absent(emp._id)}>
                    Mark as absent
                  </Button>
                </Row>
               </td>
               <td><Button onClick={() => handleShowEmpDetails(emp._id)}>Details</Button></td>
            </tr>
          ))}
          </tbody>
        </table>
        </>) }

      </div>
     
      
    </div>
    
      <SupEmployeeDetails
       show={modalShow1}
       onHide={() =>setModalShow1(false)}
          employeeId={employeeDet?._id}
      />

    </>
  )
    }
