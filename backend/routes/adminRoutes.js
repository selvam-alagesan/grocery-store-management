const express = require('express');
const router = express.Router();
const {loginAdmin,updateEmployee, logoutAdmin,getMe,getEmployee,employeeRegister,getOneEmployee,getSupervisor,supervisorRegister,getOneSupervisor,getItems,addItem, getPurchasings,getOneBill,present,absent, updateSupervisor,saveSalary,getSalary,removeItem,updateSupervisorDetails}= require('../controllers/adminControllers');
const {protect} =require('../middleware/authMiddleware');





router.post('/login',loginAdmin);
router.post('/logout',logoutAdmin);
router.get('/me',protect,getMe);
router.get('/getEmployees',getEmployee);
router.post('/employeeRegister',employeeRegister);
router.get('/oneemp',getOneEmployee);
router.post('/updateEmployee',updateEmployee);
router.get('/getSupervisor',getSupervisor);
router.post('/supervisorRegistor',supervisorRegister);
router.get('/onesup',getOneSupervisor);
router.get('/items',getItems);
router.post('/addItem',addItem)
router.get('/purchasings',getPurchasings)
router.get('/getOneBill/:id',getOneBill)
router.post('/attendence/present',present);
router.post('/attendence/absent',absent);
router.post('/updateSupervisor',updateSupervisor);
router.post('/salary/save',saveSalary)
router.get('/salary', getSalary);
router.post('/removeItem',removeItem)
router.post('/updateSupervisor/details',updateSupervisorDetails);


module.exports = router;