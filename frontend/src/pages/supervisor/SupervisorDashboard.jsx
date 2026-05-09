import React from 'react'
import {useAdmin} from '../../context/AdminContext'
import { useEffect } from 'react'
import SupSidebar from '../../components/sidebar/SupSidebar'
import { Outlet } from 'react-router-dom'
export default function SupervisorDashboard() {
    const { user, loading, checkAuth } = useAdmin();
     useEffect(() => {

    if (!user && !loading) {
      checkAuth();
    }
  }, [user, loading, checkAuth]);
  return (
    
         <div style={{display: 'flex', backgroundColor:" #f1f5f9"}}>
               
                 <SupSidebar/>
                 <div style={{flex:1}}>
                   <Outlet/>
                 </div>
                
             </div>

    
  )
}
