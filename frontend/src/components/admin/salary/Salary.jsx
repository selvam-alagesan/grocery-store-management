import React from 'react'
import { useState,useEffect } from 'react';
import API from '../../../api/axios';
import styles from './Salary.module.css'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
export default function Salary() {
  const [getEmployee,setEmployee] = useState([]);
  const [errors,setErrors] = useState(null);
  const [loading,setLoading] = useState(true)
  const [supervisors,setSupervisors] = useState([]);
  const [month,setMonth] = useState('');
  const [year,setYear] = useState('');
  const [current,setCurrent] = useState(true);
  const [customMonAndYear,setCustomMonAndYear] = useState(false);
  const [noMonthandYearData,setNoMonthAndYearData] = useState(false);
  const [view,setView] = useState('summary');
  const [mode, setMode] = useState("current"); 
  const [employeeDetails,setEmployeeDetails] = useState([]);
  const [supervisorDetails,setSupervisorDetails] = useState([]);
  const [empMonthTot,setEmpMonthTot] = useState([]);
  const [supMonthTot,setSupMonthTot] = useState([]);
  useEffect(() => {
     if (mode === "search" || view !== "summary") return;
  if (!supervisors.length) return;

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const totalDays = new Date(year, month + 1, 0).getDate();

  const getWeekendDays = (month, year) => {
    let count = 0;
    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(year, month, i).getDay();
      if (day === 0 || day === 6) count++;
    }
    return count;
  };

  const holidays = getWeekendDays(month, year);

  const data = supervisors.map(sup => {
    const records = sup.attendence?.filter(a => {
      const d = new Date(a.date);
      return (
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    }) || [];

    const present = records.filter(a => a.status === "present").length;
    const absent = records.filter(a => a.status === "absent").length;

    const perDay = sup.salary / totalDays;
    const calculatedSalary = (present + holidays) * perDay;

    return {
      supervisorId: sup._id,
      name: sup.name, 
      present,
      absent,
      holidays,
      calculatedSalary,
      finalSalary: calculatedSalary,
      remarks: "No remarks"
    };
  });

  setSupervisorDetails(data);
}, [supervisors,mode,view]);
  
  useEffect(()=>{
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
    fetchEmployee();
  },[]);
  useEffect(()=>{
    const fetchSupervisor = async()=>{
      try{
        const response = await API.get('/admin/getSupervisor');
        setSupervisors(response.data);
      }catch(err){
        console.log('error while fetching the supervisors',err);
      }
    }
    fetchSupervisor();
  },[])
  useEffect(() => {
     if (mode === "search" || view !== "summary") return;
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const totalDays = new Date(year, month + 1, 0).getDate();

  const getWeekendDays = (month, year) => {
    let count = 0;
    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(year, month, i).getDay();
      if (day === 0 || day === 6) count++;
    }
    return count;
  };

  const holidays = getWeekendDays(month, year);

  const data = getEmployee.map(emp => {
    const records = emp.attendence?.filter(a => {
      const d = new Date(a.date);
      return (
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    }) || [];

    const present = records.filter(a => a.status === "present").length;
    const absent = records.filter(a => a.status === "absent").length;

    const perDay = emp.salary / totalDays;

    const calculatedSalary = (present + holidays) * perDay;

    return {
      employeeId: emp._id,
      name: emp.employeename,
      present,
      absent,
      holidays,
      calculatedSalary,
      finalSalary: calculatedSalary,
      remarks: "No remarks"
    };
  });

  setEmployeeDetails(data);
}, [getEmployee,mode,view]);
  const getWeekendDays = (month, year) => {
  let count = 0;
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= totalDays; i++) {
    const day = new Date(year, month, i).getDay();
    if (day === 0 || day === 6) count++; 
  }

  return count;
};
    const totalSalary=getEmployee.reduce((sum,employee) =>{
      const  val = Number(employee.salary || 0);
       return sum+val;
    },0)
   
    const supTotalSalary = supervisors.reduce((sum,supervise)=>{
      const val =Number(supervise.salary || 0);
      return sum+val;
    },0);

      
   const employeeMonthTotal = getEmployee.reduce((sum, emp) => {
  const salary = Number(emp.salary || 0);

  const today = new Date();
  const totalDays = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const records = emp.attendence?.filter(a => {
    const d = new Date(a.date);
    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  }) || [];

  const presentDays = records.filter(a => a.status === "present").length;
  const holidays = getWeekendDays(today.getMonth(), today.getFullYear());
  const perDay = salary / totalDays;

  return sum + ((presentDays + holidays) * perDay);

}, 0);

const supervisorMonthTotal = supervisors.reduce((sum, sup) => {
  const salary = Number(sup.salary || 0);

  const today = new Date();
  const totalDays = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const records = sup.attendence?.filter(a => {
    const d = new Date(a.date);
    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  }) || [];

  const presentDays = records.filter(a => a.status === "present").length;
  const holidays = getWeekendDays(today.getMonth(), today.getFullYear());
  const perDay = salary / totalDays;
  return sum + ((presentDays + holidays) * perDay);

}, 0);      
      const handleSavePayroll = async () => {
  try {
    const today = new Date();

    const payload = {
      month: today.getMonth(),
      year: today.getFullYear(),

      employees: employeeDetails.map(emp => ({
        employeeId: emp.employeeId,
        name: emp.name,
        finalSalary: Number(emp.finalSalary),
        remarks: emp.remarks
      })),

      supervisors: supervisorDetails.map(sup => ({
        supervisorId: sup.supervisorId,
        name: sup.name,
        finalSalary: Number(sup.finalSalary),
        remarks: sup.remarks
      })),

      totalEmployeeSalary: employeeDetails.reduce(
        (sum, emp) => sum + Number(emp.finalSalary || 0),
        0
      ),

      totalSupervisorSalary: supervisorDetails.reduce(
        (sum, sup) => sum + Number(sup.finalSalary || 0),
        0
      )
    };

    const response =await API.post("/admin/salary/save", payload);
    
    alert("Payroll saved successfully ✅");
   

  } catch (err) {
    console.log(err);
    if(err.response.status === 400){
      alert('paryroll already saved')
    }else{
      alert("Error saving payroll ");
    }
    
  }
};
const handleSearch = async (e) => {
  e.preventDefault();

  if (month === "" || year === "") {
    alert("Select month and year");
    return;
  }

  try {
    const res = await API.get(`/admin/salary?month=${month}&year=${year}`);

    const data = res.data;

    setMode("search");  
    setEmployeeDetails(data.employees);
    setSupervisorDetails(data.supervisors);
    setEmpMonthTot(data.totalEmployeeSalary);
    setSupMonthTot(data.totalSupervisorSalary);

    setView("search"); 

  } catch (err) {
    console.log(err);
    alert("No salary found for this month");
  }
};
  

      

  return (
    <div>
    <div>
      <h1 style={{backgroundColor:"rgb(23, 85, 109)",color:"white", height: "55px",width:'100%'}}>Salary</h1>
      <div className={styles.tablediv}>
      <form>
      <Row>
        <FormGroup as={Col}>
          <Form.Label>
            Select Month
          </Form.Label>
          <Form.Select name='month' onChange={(e)=>{setMonth(e.target.value)}} required>
            <option value=''>
              Select Month
            </option>
            <option value="0">JAN</option>
            <option value="1">FEB</option>
            <option value="2">MAR</option>
            <option value="3">APR</option>
            <option value="4">MAY</option>
            <option value="5">JUN</option>
            <option value="6">JUL</option>
            <option value="7">AUG</option>
            <option value="8">SEP</option>
            <option value="9">OCT</option>
            <option value="10">NOV</option>
            <option value="11">DEC</option>
          </Form.Select>
        </FormGroup>
       <Form.Group as={Col}>
          <Form.Label>
            Input the year
          </Form.Label>
          <Form.Control placeholder='Ex 2026' name='year' minLength={4} maxLength={4} onChange={(e)=>{setYear(e.target.value)}}/>

         
        </Form.Group>
        <Form.Group as={Col} style={{textAlign:'center'}} >
          <Button variant='success' onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass-dollar"></i> Search
          </Button>
        
         
        </Form.Group>
      </Row>
      </form>
    </div>
       {view=='search' && (
     <div className={styles.tablediv}>
    <h2>Saved Payroll</h2>

    <h3>Employees</h3>
    <table className={styles.table}>
      <thead>
        <tr>
          <th >
            S.No
          </th>
          <th>
            Name
          </th>
          <th>
            Salary
          </th>
          <th>
            Remarks
          </th>
        </tr>
      </thead>
      <tbody>
        {employeeDetails.map((emp, i) => (
          <tr key={i}>
            <td >{i+1}</td>
            <td>{emp.name}</td>
            <td>{emp.finalSalary}</td>
            <td>{emp.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3>Supervisors</h3>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            S.No
          </th>
          <th>
            Name
          </th>
          <th>
            Salary
          </th>
          <th>
            Remarks
          </th>
        </tr>
      </thead>
      <tbody>
        {supervisorDetails.map((sup, i) => (
          <tr key={i}>
            <td>
              {i+1}
            </td>
            <td>{sup.name}</td>
            <td>{sup.finalSalary}</td>
            <td>{sup.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <br /><br />
    <Row>
      <Form.Group as={Col}>
        <Form.Label >
          Employee Salary Total
        </Form.Label>
        <Form.Control type='text' value={empMonthTot}  disabled />

      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>
          Supervisor Salary Total
        </Form.Label>
        <Form.Control type='text' value={supMonthTot} disabled />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>
          Total Salary
        </Form.Label>
        <Form.Control disabled value={supMonthTot+empMonthTot} />
      </Form.Group>
    </Row>
    <br />
    <Button onClick={()=>{setView('summary')}} style={{marginLeft:"1000px",width:'100px '}} variant='outline-danger'>
      Back
    </Button>
  </div>
   )}
    
    
    {view ==='summary' && (<>
      
      <div className={styles.tablediv}>
     
      
    <div className={styles.tablediv}>
      {loading ? (<>Loading...</>):(<>
      
      <h3>Employees Salary</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              Total Employees
            </th>
            <th>
              Total Salary
            </th>
            <th>
              This month salary
            </th>
            <th>
              More
            </th>
           

          </tr>
        </thead>
        <tbody>
          <tr >
            <td>
              {getEmployee.length }
            </td>
            <td>
              {totalSalary}
            </td>
            <td>
              {employeeMonthTotal}
            </td>
            <td>
              <Button onClick={()=>{setView('employeeDetails')}}>
                Show
              </Button>
            </td>
           
          </tr>
        </tbody>
      </table>
    </>)}
      </div>
       
       <div className={styles.tablediv}>
      {loading ? (<>Loading...</>):(<>
      
      <h3>Supervisor Salary</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              Total Supervisors
            </th>
            <th>
              Total Salary
            </th>
            <th>
              This month salary
            </th>
            <th>
              More
            </th>
           

          </tr>
        </thead>
        <tbody>
          <tr >
            <td>
              {supervisors.length }
            </td>
            <td>
              {supTotalSalary}
            </td>
            <td>
              {supervisorMonthTotal}
            </td>
            <td>
              <Button onClick={() => setView("supervisorDetails")}>
                Show
              </Button>
            </td>
           
          </tr>
        </tbody>
      </table>
    </>)}
      </div>
     {mode === "current" && !month && (
  <Button variant='success' onClick={handleSavePayroll} style={{marginLeft:'1000px'}}>
    Finalize Payroll
  </Button>
)}
      </div>

      </>
    )}

    {view === "employeeDetails" && (
  <div className={styles.tablediv}>
    <h2>Employee Details</h2>

    <table className={styles.table}>
      <thead>
        <tr>
          <th style={{width:'20px'}}>
            S.No
          </th>
          <th>Name</th>
          <th style={{width:'20px'}}>Present</th>
          <th style={{width:'20px'}}>Absent</th>
          <th style={{width:'20px'}}>Holidays</th>
          <th>Calculated</th>
          <th>Final Salary</th>
          <th>Remarks</th>
        </tr>
      </thead>

      <tbody>
        {employeeDetails.map((emp, index) => (
          <tr key={index}>
            <td style={{width:'20px'}}>
              {index+1}
            </td>
            <td>{emp.name}</td>
            <td style={{width:'20px'}}>{emp.present}</td>
            <td style={{width:'20px'}}>{emp.absent}</td>
            <td style={{width:'20px'}}>{emp.holidays}</td>
            <td>{emp.calculatedSalary}</td>

            <td>
              <Form.Control
                type="number"
                value={emp.finalSalary}
                  disabled={mode === "search"}
                onChange={(e) => {
                  const updated = [...employeeDetails];
                  updated[index].finalSalary = e.target.value;
                  setEmployeeDetails(updated);
                }}
              />
            </td>

            <td>
              <Form.Control
                type="text"
                value={emp.remarks}
                  disabled={mode === "search"}
                onChange={(e) => {
                  const updated = [...employeeDetails];
                  updated[index].remarks = e.target.value;
                  setEmployeeDetails(updated);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <Button onClick={() =>  {setView("summary");
  setMode("current");}}>
      Back
    </Button>


    
  </div>

  

  
)}
 


{view === "supervisorDetails" && (
  <div className={styles.tablediv}>
    <h2>Supervisor Details</h2>

    <table className={styles.table}>
      <thead>
        <tr>
          <th style={{width:'20px'}}>
            S.No
          </th>
          <th>Name</th>
          <th style={{width:'20px'}}>Present</th>
          <th style={{width:'20px'}}>Absent</th>
          <th style={{width:'20px'}}>Holidays</th>
          <th>Calculated</th>
          <th>Final Salary</th>
          <th>Remarks</th>
        </tr>
      </thead>

      <tbody>
        {supervisorDetails.map((sup, index) => (
          <tr key={index}>
            <td style={{width:'20px'}}>{index+1}</td>
            <td>{sup.name}</td>
            <td style={{width:'20px'}}>{sup.present}</td>
            <td style={{width:'20px'}}>{sup.absent}</td>
            <td style={{width:'20px'}}>{sup.holidays}</td>
            <td>{sup.calculatedSalary}</td>

            <td>
              <Form.Control
                type="number"
                value={sup.finalSalary}
                  disabled={mode === "search"}
                onChange={(e) => {
                  const updated = [...supervisorDetails];
                  updated[index].finalSalary = e.target.value;
                  setSupervisorDetails(updated);
                }}
              />
            </td>

            <td>
              <Form.Control
                type="text"
                value={sup.remarks}
                  disabled={mode === "search"}
                onChange={(e) => {
                  const updated = [...supervisorDetails];
                  updated[index].remarks = e.target.value;
                  setSupervisorDetails(updated);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <Button onClick={() =>  {setView("summary");
  setMode("current");}}>
      Back
    </Button>
  </div>
)}
    

   
      
    </div>
 
    
      </div>
   
  )
}
