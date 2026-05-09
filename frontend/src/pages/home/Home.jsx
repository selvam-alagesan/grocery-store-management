import React from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import styles from './Home.module.css'
import admin from '../../assets/home/image.png'
import supimage from '../../assets/home/supervisor.webp'
import empimage from '../../assets/home/employee.avif'
import logo from '../../assets/home/logo.png'
export default function Home() {
      const navigate = useNavigate();
   
  return (
    <div className={styles.div}>
        <img src={logo} className={styles.img}></img>
    
        <div className= {styles.card}  > 
            <img src={admin} alt="adminImage" className={styles.images}/>
        <Button  className={styles.Button} onClick={()=>navigate('Login')}>
            Admin
        </Button>
        </div>
        <div className={styles.card}>
            <img src={supimage} alt="supervisorImage" className={styles.images} />
        <Button className={styles.Button} onClick={()=>navigate('supervisorLogin')}>
            Supervisor
        </Button>
        </div>
        <div className={styles.card}>
            <img src={empimage} alt="employeeImage" className={styles.images} />
        <Button className={styles.Button} onClick={()=> navigate('employeeLogin')} >
            Employee
        </Button>
        </div>
    </div>
  )
}
