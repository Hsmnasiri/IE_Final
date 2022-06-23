const _ = require('joi');
const Student = require('../models/student')
let controller = require("./controller");

class StudentController extends controller {
 
async  getStudents(req,res){
try{
   const students = await Student.find({}); 

   return res.status(200).json({ students ,code :200,  message: "All students received successfully!" } );
}catch(e){
    console.log(e);
    return res.status(500).json({ error: { message: "Internal Server Error" } });
}
}

async  createStudent(req,res){
    try{
        const {studentId} = req.body.studentId;
        if(!_isNumber(studentId)){
        
            return res.status(400).json({ error: { message: "Bad Request" } });
        }
      const createdStudent= await Student.create({ Id: 'small' }, function (err, small) {
            if (err) return handleError(err);
          });
        return res.status(200).json({ createdStudent ,code :200,  message: "All students received successfully!" } );
        
    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}
async  updateStudent(req,res){
    try{
        const {studentId} = req.body.studentId;
        if(!_isNumber(studentId)){
        
            return res.status(400).json({ error: { message: "Bad Request" } });
        }
        const updatedStudent = await Student.findOneAndUpdate(studentId,{_id : studentId});

        return res.status(200).json({ updatedStudent ,code :200,  message: "All students received successfully!" } );

    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}

async  deleteStudent(req,res){
    try{
        const {studentId} = req.body.studentId;
        if(!_isNumber(studentId)){
        
            return res.status(400).json({ error: { message: "Bad Request" } });
        }
        await Student.findByIdAndDelete(studentId);
    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}
}

module.exports = new StudentController();