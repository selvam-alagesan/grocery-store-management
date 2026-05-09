import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import EmpSidebar from '../../components/sidebar/EmpSidebar'
import {useAdmin} from '../../context/AdminContext'
import { useEffect } from 'react'
export default function EmployeeDashboard() {
  
  const { user, loading, checkAuth } = useAdmin();
  
 


  useEffect(() => {

    if (!user && !loading) {
      checkAuth();
    }
  }, [user, loading, checkAuth]);
  if (loading) return <div className="p-5 text-center">Loading...</div>;
  return (
   <div style={{display: 'flex', backgroundColor:" #f1f5f9"}}>
         
           <EmpSidebar/>
           <div style={{flex:1}}>
             <Outlet/>
           </div>
          
       </div>
  )
}
