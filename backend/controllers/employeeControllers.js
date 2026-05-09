const Employee = require('../models/employee')
const jwt = require('jsonwebtoken');
const Inventory =require('../models/inventory')
const Billing = require('../models/billing')
const Salary = require('../models/salary')
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    });

}
const employeeLogin = async (req,res) =>{
    const{username,password}=req.body;
    try{
        const employee = await Employee.findOne({employeeusername: username});
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
const getItems =async(req,res) =>{
  try { const Items = await Inventory.find();
    res.json(Items);}catch(err){
        res.message('error occur while getting a items')
    }
}
const addItem = async (req,res) =>{
    try{
        const { productId, expDate, barcode } = req.body;
         const itemToInsert = barcode.map(code=>({
            barcode: Number(code),
            expiringDate: new Date(expDate),
            purchasingDate: new Date()
         }))
        const result = await Inventory.findByIdAndUpdate(
            productId, 
            {
                $push: {
                    Items: {
                       $each: itemToInsert
                    }
                }
            },
            { new: true }
        );
        
       if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }

        
        return res.status(200).json({ 
            message: 'Item added successfully', 
            data: result 
        });

    }catch(err){
        res.status(201).json({message: 'product not added'})
    }
}
const bill = async (req, res) => {
    try {
        const { selectedProduct, paymentMethod ,customerName,customerNumber,cashierName} = req.body;

        if (!selectedProduct || !Array.isArray(selectedProduct)) {
            return res.status(400).json({ message: 'Invalid selectedProduct' });
        }

        if (!paymentMethod) {
            return res.status(400).json({ message: 'Payment method required' });
        }
        const items = selectedProduct.map((item=>({
            productname: item.productname,
            barcode: item.barcode,
            price: item.price,
            quantity: item.count,
        })))
        const totalAmount = items.reduce((sum,item)=>{
            return sum + (item.price * item.quantity);
        },0)
        const newBill = await Billing.create({
            customerName,
            customerNumber,
            cashierName,
            items,
            totalAmount,
            paymentMethod
        })


        for (const item of selectedProduct) {
            await Inventory.findByIdAndUpdate(item._id, {
                $pull: {
                    Items: {
                        barcode: Number(item.barcode)
                    }
                }
            });
        }

        res.status(200).json({ message: 'billed successfully' });

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

const present = async(req,res) =>{
    const {id} = req.body;
    const check1 = await Employee.findById(id);
    const today = new Date;
         const todayDate = today.toISOString().split('T')[0];
    const check = await check1.attendence.some(a=>{
      const recordDate = new Date(a.date).toISOString().split('T')[0];
      return recordDate === todayDate;   
    })
    if(check){
        return res.status(405).json({message:"already marked"})
    }else{
    const emp = await Employee.findByIdAndUpdate(id,{$push:{
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
    employeeLogin,
    getItems,
    addItem,
    bill,
    present,
    getAllSalary,
};