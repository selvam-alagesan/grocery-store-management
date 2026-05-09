import React from 'react'
import styles from './Supervisor.module.css'
import Button from 'react-bootstrap/Button'
import SupervisroAddingModal from './SupervisorAddingModal'
import { useState,useEffect } from 'react';
import API from '../../../api/axios';
import SupervisorDetailsModal from './SupervisorDetailsModal'
export default function Supervisor() {
     const [getSupervisor,setSupervisor] = useState([]);
          const [errors, setErrors] = useState('');
          const [loading,setLoading] = useState(true)
        
          const [modalShow, setModalShow] = React.useState(false);
          const [modalShow1, setModalShow1] = React.useState(false);
          const [supervisorDet,setSupervisorDet] = useState(null);
   
          const fetchSupervisor = async () =>{
        try{
          const response = await  API.get('/admin/getSupervisor');
          setSupervisor(response.data);
          setLoading(false)
        }catch(err){
          setErrors(err.response?.data?.message || "Failed to fetch supervisor details");
          setLoading(false);
        }
    
        }
     useEffect(()=>{

        
        fetchSupervisor();
      },[supervisorDet]);

      /* while loading show the loading option */
       if (loading) {
    
      return <p>Loading...</p>;
    }
    /* More button actions */
     const handleShowSupDetails = async (id) =>{
    const response = getSupervisor.find(sup => sup._id === id);
    setModalShow1(true);
    setSupervisorDet(response)
  }
 const getTodayStatus = (attendence = []) => {
  const today = new Date().toISOString().split("T")[0];

  const record = attendence.find(a => {
    const d = new Date(a.date).toISOString().split("T")[0];
    return d === today;
  });

  return record ? record.status : "Not Marked";
};

  const present = async(_id) =>{
      try{ 
      const response = await API.post('/admin/attendence/present',{id:_id});
        if(response.status == 200){
          alert('Attendece marked as present successfully')
          fetchSupervisor();
        }
        else{
          alert('failed to mark as present')
        }
      }catch(err){
        console.log('error occured',err)
        if(err.status ==409){
          alert('attendence already marked');
        }
      }
    }
    const absent = async (_id) =>{
      try{
        const response = await API.post('/admin/attendence/absent',{id:_id});
        if(response.status ==200){
          alert('Attendence marked as absent successfully');
          fetchSupervisor();
        }
        else{
          alert('failed to marked as absent')
        }
      }catch(err){
        console.log('error occured',err);
        if(err.status ==409){
          alert('attendence already marked')
        }
      }
    }


  return (
    <div>
       <div>
        <h1 className={styles.hone}>Supervisors</h1>
        <Button className={styles.add} onClick={() => setModalShow(true)}>Add +</Button>

      </div>
      <div className={styles.tablediv}>
        {getSupervisor.length ==0 ?(<> <div>No Supervisor Details found</div></>)
        : (<>
        <br /><br />
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th style={{width:'20px'}}>
                S.No
              </th>
              <th>Name</th>
              
              <th >Attendence</th>
              <th >Salary</th>
              <th>Actions</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
          {getSupervisor.map((sup,index)=>(
            <tr key={sup._id} className={styles.table} >
              <td style={{width:'20px'}}>
                {index+1}
              </td>
              <td>{sup.name}</td>
               
               <td>{getTodayStatus(sup.attendence)}</td>
               <td>{sup.salary}</td>
               <td>
                <Button variant='success' style={{width:"100px"}} onClick={()=>present(sup._id)}>Mark as present</Button>
                <Button variant='danger' style={{width:"100px"}} onClick={()=>absent(sup._id)}> Mark as absent</Button>
               </td>
               <td><Button onClick={() => handleShowSupDetails(sup._id)}>Details</Button></td>
            </tr>
          ))}
          </tbody>
        </table>
        </>) }

      </div>
     
      <SupervisroAddingModal
       show={modalShow}
        onHide={() => setModalShow(false)}/>

        <SupervisorDetailsModal
        show={modalShow1}
        onHide={()=>setModalShow1(false)}
        supervisorId={supervisorDet?._id}/>
    </div>

    
  )
}
