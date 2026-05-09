import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useAdmin } from '../../../context/AdminContext'
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './EmployeeAttendence.module.css'
export default function EmployeeAttendence() {
     const {user,checkAuth} = useAdmin();
        const [thisMonth,setThisMonth] = useState([])
        const [thisMon,setThisMon] = useState(true);
        const [oldMonth,setOldMonth] = useState(false)
        useEffect(()=>{
            checkAuth();
        },[]);
        
        useEffect(()=>{
            if (!user || !user.attendence) return;
            const today = new Date();
            const year = today.getFullYear();
            const month =  today.getMonth()
            const thisMonthAttendence = user.attendence.filter((a)=>{
                const d = new Date(a.date);
                return d.getMonth() == month && d.getFullYear() == year
            });
            setThisMonth(thisMonthAttendence);
            
            
        },[user]);
        
        const formattedDate = (date)=>{
            return new Date(date).toISOString().split("T")[0]
        }
    
  return (
    <div> <h1 style={{backgroundColor:" rgb(23, 85, 109)",color:'white'}}>Attendence</h1>
        <div style={{display:'flex',justifyContent:'center'}}>
            <Button onClick={()=>{setThisMon(true);setOldMonth(false)}}>
                This Month 
            </Button>
            <Button style={{marginLeft:'10px'}} onClick={()=>{setThisMon(false);setOldMonth(true)}}>
                Old Attendence
            </Button>
        </div>
<br /><br />
       {thisMon ? ( <div className={styles.tablediv}>
            
            {thisMonth.length === 0? (<>No marked attendence in this month</>):(<table style={{width:'500px'}}>
                <thead>
                    <tr>
                        <th>
                            Date
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>

                </thead>
                <tbody>
                    {thisMonth.map((a)=>{
                        return(
                            <tr key={a._id}>
                                <td>
                                    {formattedDate(a.date)}
                                </td>
                                <td>
                                    {a.status}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>)}
        </div>) : (<></>)}


        {oldMonth ?( <div className={styles.tablediv}>
            {user?.attendence.length === 0?(<>Attendence not marked</>):(<table style={{width:'500px'}}>
                <thead>
                    <tr>
                        <th>
                            Date
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {user?.attendence?.map((a)=>{
                        return(
                            <tr key={a._id}>
                                <td>
                                    {formattedDate(a.date)}
                                </td>
                                <td>
                                    {a.status}
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>)}

        </div>) : (<></>)}</div>
  )
}
