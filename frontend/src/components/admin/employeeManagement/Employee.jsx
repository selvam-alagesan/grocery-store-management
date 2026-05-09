import React from 'react'
import styles from './Employee.module.css'
import Button from 'react-bootstrap/esm/Button'
import { useState,useEffect } from 'react'
import API from '../../../api/axios'
import EmployeeModal from './EmployeeModal'
import EmployeeDetails from './EmployeeDetails'
export default function Employee() {
  const [getEmployee,setEmployee] = useState([]);
  const [errors, setErrors] = useState('');
  const [loading,setLoading] = useState(true);
  const [refresh,setRefresh] = useState(0);

  const [modalShow, setModalShow] = React.useState(false);
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
  },[refresh,getEmployee]);
  if (loading) {
    
      return <p>Loading...</p>;
    }
   
    const handleShowEmpDetails = async (id) =>{
    const response = getEmployee.find(emp => emp._id === id);
    setModalShow1(true);
    setEmployeeDet(response);
  }
 

 const getTodayStatus = (attendence = []) => {
  const today = new Date().toISOString().split("T")[0];

  const record = attendence.find(a => {
    const d = new Date(a.date).toISOString().split("T")[0];
    return d === today;
  });

  return record ? record.status : "Not Marked";
};

  return (
    <>
     <div >
      <div >
        <h1 className={styles.hone}>Employees</h1>
        <Button className={styles.add} onClick={() => setModalShow(true)}>Add +</Button>

      </div>
      <div className={styles.tablediv}>
        {getEmployee.length ==0 ?(<> <div>No Employees found</div></>)
        : (<>
        <br /><br />
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th style={{width:'20px'}}>S.No</th>
              <th>Name</th>
        
              <th>Attendence</th>
              <th>Salary</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
          {getEmployee.map((emp,index)=>(
            <tr key={emp._id} className={styles.table} >
              <td style={{width:'20px'}}>{index+1}</td>
              <td>{emp.employeename}</td>
               <td>{getTodayStatus(emp.attendence)}</td>
               <td>{emp.salary}</td>
               <td><Button onClick={() => handleShowEmpDetails(emp._id)}>Details</Button></td>
            </tr>
          ))}
          </tbody>
        </table>
        </>) }

      </div>
     
      
    </div>
     <EmployeeModal
      show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <EmployeeDetails
       show={modalShow1}
       onHide={() =>setModalShow1(false)}
          employeeId={employeeDet?._id}
      />

    </>
  )
}
