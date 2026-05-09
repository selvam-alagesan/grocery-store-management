import React from 'react'
import Nav from 'react-bootstrap/Nav'
import styles from './Sidebar.module.css'
import {useAdmin} from '../../context/AdminContext'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import { useLocation } from "react-router-dom";


export default function Sidebar() {
  const navigate = useNavigate();
  const {user ,logout} = useAdmin();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  const location = useLocation();


  
  return (
    <div className={styles.sidebar}>
    

           <Nav
            className="flex-column"
            activeKey={location.pathname} 
            onSelect={(selectedKey) =>  navigate(selectedKey)}>
              <Nav.Item >
                <Button style={{width:'200px',backgroundColor:'white',color:'black',fontSize:'27px',fontWeight:'bold'}} disabled><i className="fa-solid fa-user-tie"></i> Admin</Button>
              </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/adminDashboard/employeeManagement" className={styles.sideButtons} ><i className="fa-solid fa-user-group"></i> Employees</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/adminDashboard/supervisorManagement" className={styles.sideButtons}><i className="fa-solid fa-user-check"></i> Supervisors</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/adminDashboard/sales" className={styles.sideButtons}><i className="fa-brands fa-shopify"></i> Sales</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/adminDashboard/allSalary" className={styles.sideButtons}><i className="fa-solid fa-credit-card"></i> Salary</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/adminDashboard/inventoryManagement" className={styles.sideButtons} >
         <i className="fa-solid fa-warehouse"></i> Inventory 
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Button variant='danger' onClick={handleLogout} style={{marginLeft:"60px"}}>
          Logout
        </Button>
      </Nav.Item>
    </Nav>
       
      
      
        
    </div>
  )
}

