const _ = require('joi');
const Course = require('../models/course');
const Student = require('../models/student');

let controller = require("./controller");

class CourseController extends controller {
 
async  getCourses(req,res){
try{
    const studentId = req.params.studentId;
    console.log(studentId);
    const stduent = await Student.findById(studentId).populate({path : 'courses'});

    return res.status(200).json({ error: { message: "Internal Server Error" } });
}catch(e){
    console.log(e);
    return res.status(500).json({ error: { message: "Internal Server Error" } });
}
}

async  createCourse(req,res){
    try{
        const stduentId = req.params.studentId;
        console.log(stduentId);
        const {name, grade, id} = req.body;
        const user = await User.findById(stduentId).populate({path : 'courses'});
        console.log(user);

        if(user.courses[0]==id){
            return res.status(400).json({ error: { message: "Bad request" } });

        }

        const createdCourse = await Course.Create({name:name, grade:grade, _id:id});
        console.log(createdCourse);

        return res.status(200).json({createdCourse, code :200,message: "Course created successfully"});

    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}
async  updateCourse(req,res){
    try{

    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}

async  deleteCourse(req,res){
    try{

    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}
}

module.exports = new CourseController();