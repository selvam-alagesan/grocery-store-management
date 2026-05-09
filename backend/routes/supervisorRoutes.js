const express = require('express');
const router = express.Router();


const {supervisorLogin,present,absent,suppresent,getAllSalary} = require('../controllers/supervisorController');

router.post('/login',supervisorLogin);
router.post('/attendence/present',present)
router.post('/attendence/absent',absent)
router.post('/supattendence/present',suppresent)
router.get('/salary',getAllSalary)

module.exports = router;