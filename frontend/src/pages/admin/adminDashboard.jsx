import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function adminDashboard() {
  
    return (

    <div style={{display: 'flex', backgroundColor:" #f1f5f9"}}>
      
        <Sidebar/>
        <div style={{flex:1}}>
          <Outlet/>
        </div>
       
    </div>
  )
}
