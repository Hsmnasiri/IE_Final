const express = require("express");
const router = express.Router();




router.use('/strudents', require('./student.routes'));
 
router.all('*',async(req,res,next)=>{
    res.status(404).json("Page Not Found");
    console.log("error 404!!!! not found");

})

module.exports = router;