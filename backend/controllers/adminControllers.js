const Admin = require('../models/admin');
/* const Employee = require('') */
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const Supervisor = require('../models/supervisor');
const Inventory =require('../models/inventory')
const Billing =require('../models/billing')
const Salary = require('../models/salary');

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    });

}

const loginAdmin = async (req,res) =>{
    const{username,password}=req.body;
    try{
        const admin = await Admin.findOne({username});
        if(admin && (await admin.matchPassword(password))){
            const token = generateToken(admin._id);


            res.cookie('token',token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                
            });

            res.json({
                _id: admin._id,
                name: admin.username,

            })
        }else{
            res.status(401).json({message: 'Invalid credentials'})
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

const logoutAdmin =(req,res) =>{
    res.cookie('token','',{
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({message: 'Logged out successfully'});
};

const getMe =async(req,res) =>{
    try{
        let person = await Admin.findById(req.user.id).select('-password');
        if (person){
            return res.json({...person._doc, type:'admin'});
        }
        person =await Employee.findById(req.user.id).select('-password');
        if(person){
            return res.json({...person._doc, type:'employee'});
        }
        person = await Supervisor.findById(req.user.id).select('-password');
        if(person){
            return res.json({...person._doc,type:'supervisor'})
        }
        res.status(404).json({message:"User not found"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
const getEmployee = async (req, res) =>{
    try{
        const employees = await Employee.find();
        res.json(employees);
    }catch(err){
        res.status(500).json({message: err.message});
    }

}
const employeeRegister = async (req,res) =>{
    try{
        const{username,name,password,gender,temadd,phoneno,salary,aadharno,peradd,dob} = req.body;
        
        
      
        
        const employee = await Employee.create({
            employeeusername: username,
            employeename: name,
            password,
            gender: gender || '',
            temadd: temadd || '',
            phoneno: phoneno || 0,
            salary: salary || 0,
            aadharno: aadharno || 0,
            peradd: peradd || '',
            dob: dob || null,
           
        })
        res.status(201).json({message: "Employee registered successfully", employee})
    }catch(err){
        console.error('Employee registration error:', err);
        res.status(500).json({message: err.message || 'Failed to register employee'})
    }
}
const getOneEmployee = async (req,res)=>{
        try{
    const id = req.query.id;
        const emp = await Employee.findById(id).select('-password');
        if (!emp) {
            return res.status(404).json({message:"Employee not found"});
        }
        res.json(emp);
        }catch(err){
            res.status(500).json({message:"Employee not found"})
        }
}
const updateEmployee = async (req,res) =>{
    try{
        const {username,name,password,gender,temadd,phoneno,salary,aadharno,peradd,dob,id} = req.body;
        const employee = await Employee.findById(id);
        employee.employeename=name;
        employee.employeeusername=username;
        employee.password=password;
        employee.gender=gender;
        employee.temadd=temadd;
        employee.peradd=peradd;
        employee.phoneno=phoneno;
        employee.salary=salary;
        employee.aadharno=aadharno;
        employee.dob=dob;
        employee.save();
        res.status(200).json({message:'updated successfully'});
        

    }catch(err){
        res.status(401).json({message: "employee not updated"})
    }
}
const updateSupervisorDetails = async (req,res)=>{
    try{
        const {username,name,password,gender,temadd,phoneno,salary,aadharno,peradd,dob,id} = req.body;
        const employee = await Supervisor.findById(id);
        employee.name=name;
        employee.username=username;
        employee.password=password;
        employee.gender=gender;
        employee.temadd=temadd;
        employee.peradd=peradd;
        employee.phoneno=phoneno;
        employee.salary=salary;
        employee.aadharno=aadharno;
        employee.dob=dob;
        employee.save();
        res.status(200).json({message:'updated successfully'});
        

    }catch(err){
        res.status(401).json({message: "employee not updated"})
    }
}
const getSupervisor =async (req,res)=>{
        try{
            const supervisor = await Supervisor.find();
            res.json(supervisor);
        }catch(err){
            res.status(200).json({message:"Supervisors not found"})
        }
}
const supervisorRegister = async (req,res) =>{
       try{
     const{username,name,password,gender,temadd,phoneno,salary,aadharno,peradd,dob} = req.body;

        const supervisor = await Supervisor.create({
            username,
            name,
            password,
            gender: gender || '',
            temadd: temadd || '',
            phoneno: phoneno || 0,
            salary: salary || 0,
            aadharno: aadharno || 0,
            peradd: peradd || '',
            dob: dob || null,
           
        })
        res.status(201).json({message: "Supervisor registered successfully", supervisor})
    }catch(err){
        console.error('Supervisor registration error:', err);
        res.status(500).json({message: err.message || 'Failed to register supervisor'})
    }
}
const getOneSupervisor = async (req,res) =>{
     try{
    const id = req.query.id;
        const sup = await Supervisor.findById(id).select('-password');
        if (!sup) {
            return res.status(404).json({message:"Supervisor not found"});
        }
        res.json(sup);
        }catch(err){
            res.status(500).json({message:"Supervisor not found"})
        }
}
const getItems = async (req,res) =>{
    try{
        const items = await Inventory.find();
        res.json(items);

    }catch(err){
        res.status(500).json({message:"Items not found"});
    }}
const addItem = async (req,res) =>{
    try{
        const {productname,brandname,price,unitquantity,type} = req.body;
        const inventory = await Inventory.create({
            productname,
            brandname,
            price ,
            unitquantity,type,
            
        })
        res.json({inventory})
    }catch(err){
        res.status(500).json({message: "Item not added"})
    }
}
const getPurchasings = async (req,res) =>{
    try{
        const purchased = await Billing.find();
        res.json(purchased);
    }catch(err){
        res.json(err)
    }
}

const getOneBill = async (req,res)=>{
    try{
        const id = req.params.id;
        const individual = await Billing.findById(id);
        res.json(individual)
    }catch(err){
        res.status(400).json({message:"error in fetching the one bill"});
    }

}

const present = async (req,res) =>{
    const {id} = req.body;
    const check1 = await Supervisor.findById(id);
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const check = await check1.attendence.some(a=>{
        recordDate = new Date(a.date).toISOString().split('T')[0];
        return recordDate === todayDate;
    })
    if(!check){

    const emp = await Supervisor.findByIdAndUpdate( id,{$push: {attendence: {
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
          const check1 = await Supervisor.findById(id);
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const check =  await 
    check1.attendence.some(a=>{
        recordDate = new Date(a.date).toISOString().split('T')[0];
        return recordDate === todayDate;
    })
    if (!check){
        const emp = await Supervisor.findByIdAndUpdate(id,{$push : {attendence:{date: new Date, status: 'absent'}}});
         if(!emp){

            return res.status(400).json({message: 'error in updating'})
        }else{
            return res.status(200).json({message:"successfully updated"})
        }
        }else{
            res.status(409).json({message:'already marked'})
        }
       
    
}
const updateSupervisor = async(req,res) =>{
     try{
        const {id,work} = req.body;
      
        const employee = await Employee.findById(id);
         employee.work = work;
        await employee.save();
        res.json("updated successfully");

    }catch(err){
        console.log("ERROR:", err);
        res.status(500).json({message: "employee not updated"})
    }
}
const saveSalary = async (req, res) => {
  try {
     console.log("BODY:", req.body); 
    const {
      month,
      year,
      employees,
      supervisors,
      totalEmployeeSalary,
      totalSupervisorSalary
    } = req.body;

    const exists = await Salary.findOne({ month, year });

    if (exists) {
      return res.status(400).json({
        message: "Payroll already created for this month"
      });
    }

    const salary = await Salary.create({
      month,
      year,
      employees,
      supervisors,
      totalEmployeeSalary,
      totalSupervisorSalary
    });

    res.status(201).json({
      message: "Payroll saved successfully",
      data: salary
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error saving payroll"
    });
  }
};
const getSalary = async (req, res) => {
  try {
    const { month, year } = req.query;

    const data = await Salary.findOne({
      month: Number(month),
      year: Number(year)
    });

    if (!data) {
      return res.status(404).json({
        message: "No salary data found"
      });
    }

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching salary"
    });
  }
};
const removeItem = async(req,res)=>{
    const {productId,barcode} = req.body;
    try{
        const deleted = await Inventory.findByIdAndUpdate(productId,
            {
                $pull:{
                    Items:{barcode:barcode}
                }
            },{new:true}
        );
        
        if(deleted){
            res.json({message:"successfully removed"})
        }
    }catch(err){
        res.json({message:'error while deleting the item'})
    }
}
module.exports = {
    loginAdmin,
    logoutAdmin,
    getMe,
    getEmployee,
    employeeRegister,
    getOneEmployee,
    updateEmployee,
    getSupervisor,
    supervisorRegister,
    getOneSupervisor,
    getItems,
    addItem,
    getPurchasings,
    getOneBill,
    present,
    absent,
    updateSupervisor,
    saveSalary,
    getSalary,
    removeItem,
    updateSupervisorDetails,
    
};