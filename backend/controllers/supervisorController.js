const jwt = require('jsonwebtoken');
const Supervisor = require('../models/supervisor')
const Salary =require('../models/salary')
const Employee = require('../models/employee')

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    });

}

const supervisorLogin = async (req,res) =>{
    const{username,password}=req.body;
    try{
        const employee = await Supervisor.findOne({username: username});
        if(employee && (await employee.matchPassword(password))){
            const token = generateToken(employee._id);


            res.cookie('token',token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                
            });

            res.json({
                _id: employee._id,
                name: employee.username,

            })
        }else{
            res.status(401).json({message: 'Invalid credentials'})
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
};
const present = async (req,res) =>{
    const {id} = req.body;
    const check1 = await Employee.findById(id);
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const check = await check1.attendence.some(a=>{
        recordDate = new Date(a.date).toISOString().split('T')[0];
        return recordDate === todayDate;
    })
    if(!check){

    const emp = await Employee.findByIdAndUpdate( id,{$push: {attendence: {
        date: new Date,
        status: "present"

    }}});
     if(!emp){
      return res.status(400).json({message: "error in updating"});
    }
    else{ return res.status(200).json({
        message:'successfuly updated'
    })}
}else{
    res.status(409).json({message: 'already marked'})
}
   
  

}
const absent = async (req,res) =>{
    
        const {id} = req.body;
          const check1 = await Employee.findById(id);
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const check =  await 
    check1.attendence.some(a=>{
        recordDate = new Date(a.date).toISOString().split('T')[0];
        return recordDate === todayDate;
    })
    if (!check){
        const emp = await Employee.findByIdAndUpdate(id,{$push : {attendence:{date: new Date, status: 'absent'}}});
         if(!emp){

            return res.status(400).json({message: 'error in updating'})
        }else{
            return res.status(200).json({message:"successfully updated"})
        }
        }else{
            res.status(409).json({message:'already marked'})
        }
       
    
}

const suppresent = async (req,res) =>{
     const {id} = req.body;
        const check1 = await Supervisor.findById(id);
        const today = new Date;
             const todayDate = today.toISOString().split('T')[0];
        const check = await check1.attendence.some(a=>{
          const recordDate = new Date(a.date).toISOString().split('T')[0];
          return recordDate === todayDate;   
        })
        if(check){
            return res.status(405).json({message:"already marked"})
        }else{
        const emp = await Supervisor.findByIdAndUpdate(id,{$push:{
            attendence:{
                date: new Date,
                status: 'present'
            }
        }})
        if(!emp){
            return res.status(400).json({message:'not updated'})
        }else{
            return res.status(200).json({message:"updated"});
        }}
}
const getAllSalary = async (req, res) => {
  try {
    const data = await Salary.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching salary history" });
  }
};
module.exports={
    supervisorLogin,
    present,
    absent,
    suppresent,
   getAllSalary,
};