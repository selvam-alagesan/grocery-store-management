import { useState } from 'react'
import Login from './pages/admin/Login'
import AdminDashboard from './pages/admin/adminDashboard'
import './App.css'
import { AuthProvider } from './context/AdminContext'
import {BrowserRouter as Router , Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/home/Home'
import Employee from './components/admin/employeeManagement/Employee'

import Salary from './components/admin/salary/Salary'
import Supervisor from './components/admin/supervisorManagement/Supervisor'
import Inventory from './components/admin/inventoryManagement/Inventory'
import EmpLogin from './pages/employee/EmpLogin'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import EmpInventory from './components/employee/inventory/EmpInventory'
import Billing from './components/employee/billing/Billing'
import Profile from './components/employee/profile/Profile'
import Sales from './components/admin/Sales/Sales'
import SupProfile from './components/supervisor/profile/SupProfile'
import SupLogin from './pages/supervisor/SupLogin'
import SupervisorDashboard from './pages/supervisor/SupervisorDashboard'
import SupInventory from './components/supervisor/inventory/SupInventory'
import SupEmployee from './components/supervisor/employeeManagement/SupEmployee'
import SupAttendence from './components/supervisor/attendence/SupAttendence'
import EmployeeAttendence from './components/employee/attendence/EmployeeAttendence'
function App() {
  

  return (
    <>
    <Router>
     <AuthProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/adminDashboard' element={<AdminDashboard/>}>
      <Route index element={<Navigate to="employeeManagement" replace />} />
      <Route path='employeeManagement' element={<Employee/>}/>
      <Route path='supervisorManagement' element={<Supervisor/>}/>
      <Route path='sales' element={<Sales/>} />
      <Route path='inventoryManagement' element={<Inventory/>}></Route>
      <Route path='allSalary' element={<Salary/>}/>
      </Route>
      <Route path='/employeelogin' element={<EmpLogin/>}></Route>
      <Route path='/employee' element={<EmployeeDashboard/>}>
      <Route path='inventory' element={<EmpInventory/>}></Route>
      <Route path='billing' element={<Billing/>}></Route>
      <Route path='profile' element={<Profile/>}></Route>
      <Route path='attendence' element={<EmployeeAttendence/>}></Route>
      </Route>
      <Route path='supervisorLogin' element={<SupLogin/>}></Route>
      <Route path='/supervisor' element={<SupervisorDashboard/>}>
        <Route path='inventory' element={<SupInventory/>}></Route>
        <Route path='employee' element={<SupEmployee/>}></Route>
        <Route path='profile' element={<SupProfile/>}></Route>
        <Route path='attendence' element={<SupAttendence/>}></Route>
      </Route>
      
     </Routes>
     </AuthProvider>
     </Router>
    </>
  )
}

export default App
