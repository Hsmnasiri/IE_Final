const express = require("express");
const router = express.Router();




router.use('/students', require('./student.routes'));

router.use('/', require('./course.routes'));

router.all('*',async(req,res,next)=>{
    res.status(404).json("Page Not Found, Please Enter Correct URL");

})

module.exports = router;