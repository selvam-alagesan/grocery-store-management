import React from 'react'
import styles from './EmpSidebar.module.css'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'
import {useAdmin} from '../../context/AdminContext' 
import { useLocation } from "react-router-dom";
export default function EmpSidebar() {
    const navigate = useNavigate();
    const {logout} = useAdmin();
    const location = useLocation();
      const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  return (
    <div className={styles.sidebar}>
    

           <Nav
            className="flex-column"
            activeKey={location.pathname}
            onSelect={(selectedKey) =>  navigate(selectedKey)}>
              <Nav.Item>
                <Button style={{width:'200px',backgroundColor:'white',color:'black',fontSize:'27px',fontWeight:'bold'}} disabled><i className="fa-solid fa-user-tie"></i> Employee</Button>
              </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/employee/inventory" className={styles.sideButtons}><i className="fa-solid fa-warehouse"></i> Inventory</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/employee/billing" className={styles.sideButtons}><i className="fa-regular fa-money-bill-1"></i> Billing</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/employee/profile" className={styles.sideButtons}><i className="fa-solid fa-address-card"></i>  Profile</Nav.Link>
      </Nav.Item>
       <Nav.Item>
        <Nav.Link eventKey="/employee/attendence" className={styles.sideButtons}><i className="fa-solid fa-clipboard-user"></i> Attendence</Nav.Link>
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
