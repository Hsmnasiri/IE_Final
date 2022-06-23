const { update } = require('lodash');
const _ = require('lodash');
const Student = require('../models/student')
let controller = require("./controller");

class StudentController extends controller {
 
async  getStudents(req,res){
try{
   const students = await Student.find({}).populate({path : 'courses', select:["name","id","grade"]});
   const responses = students.map(item =>
    {
        return {
            studentId :item.id,
            average :item.average,
            Courses : item.courses,
            last_updated: item.last_updated
        }                
   })
    return res.status(200).json({
        size: students.length,
        responses,
        code: 200,
        message: "All students received successfully!"
    });
}catch(e){
    console.log(e);
    return res.status(500).json({ error: { message: "Internal Server Error" } });
}
}
async createStudent(req,res){
    try
    {
        console.log("we are in Create student Function");
        console.log(req.body)
        const { studentId } = req.body;
        console.log(studentId);
        if (!(studentId))
        {
           return res.status(400).json({ error: { message: "Bad request" } });
        }
        const foundedStudent = await Student.findOne({ id: studentId })
        if (foundedStudent)
        {
            return res.status(400).json({ error: { message: "Bad request" } });
        }
        const createdStudent = new Student({ id: studentId }, function (err, small)
        {
            if (err) return handleError(err);
        });
        await createdStudent.save();
        const student = await Student.findOne({ id: studentId }).select(["id", "average", "courses", "last_updated"]);
        console.log("the student is : ",student)
  
        console.log(student.last_updated);
        return res.status(200).json({
            id: student.id,
            average: student.average,
            courses: student.courses,
            last_update:student.last_updated,
            code: 200,
            message: "student added successfully!"
        });
        
    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}
async  updateStudent(req,res){
    try
    {
        const updateStudent = req.params.studentid;
        const { studentId } = req.body;
        
        console.log(studentId, "will be replace :", updateStudent);
        if(!(studentId)){
            return res.status(400).json({ error: { message: "Bad Request" } });
        }
        const updatedStudent = await Student.findOneAndUpdate({ id :updateStudent },{id : studentId});
        console.log(updatedStudent);
        if (!updatedStudent)
        {
            console.log("Not Found")
            return res.status(400).json({ error: { message: "Bad Request" } });

        }
        return res.status(200).json({id: updatedStudent.id,
            average: updatedStudent.average,
            courses: updatedStudent.courses,
            last_update: updatedStudent.last_updated,
            code: 200,
            message: "All students received successfully!"
        });

    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}

 async deleteStudent(req, res)
    {
    try{
        const deleteStudent = req.params.studentid;
        if(!(deleteStudent)){
            console.log("Not Found");
            return res.status(400).json({ error: { message: "Bad Request" } });
        }

     await Student.findOneAndDelete({id : deleteStudent }, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted User : ", docs);
                
                return res.status(200).json({
                    name: docs.name,
                    id: docs.id,
                    grade: docs.grade,
                    code: 200,
                    message: "student deleted successfully!"
                }); 
            }
        });
    } catch (e)
    {
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}
}

module.exports = new StudentController();