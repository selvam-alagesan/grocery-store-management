const {employeeLogin, getItems,addItem,bill,present,getAllSalary} =require('../controllers/employeeControllers');
const express = require('express');
const router = express.Router();
const {protect} =require('../middleware/authMiddleware');


router.post('/login',employeeLogin);
router.get('/getitems',getItems)
router.post('/addItems',addItem);
router.post('/billing',bill);
router.post('/attendence/present',present);
router.get('/salary',getAllSalary)
module.exports = router;