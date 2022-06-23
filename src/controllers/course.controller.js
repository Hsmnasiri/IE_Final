const _ = require('joi');
const Course = require('../models/course');
const Student = require('../models/student');

let controller = require("./controller");

class CourseController extends controller {
 
async  getCourses(req,res){
try{
    const studentId = req.params.studentid;
    console.log(studentId);
    const student = await Student.findOne({id : studentId}).populate({path : 'courses'});

    return res.status(500).json({student , code :200,message:"All courses received successfully!"});

}catch(e){
    console.log(e);
    return res.status(500).json({ error: { message: "Internal Server Error" } });
}
}

async  createCourse(req,res){
    try{
        const studentId = req.params.studentid;
        console.log(studentId);
        const { name, grade, id } = req.body;
        if (!(id && grade && name && studentId))
        {
            console.log("fields are empty")
            return res.status(400).json({ error: { message: "Bad request" } });
        }
        const user = await Student.findOne({ id:studentId }).populate({ path: 'courses' });
        console.log("user is : ",user);

        if(user.courses[0]==id){
            return res.status(400).json({ error: { message: "Bad request" } });

        }

        const createdCourse = new Course({ name: name, grade: grade, id: id });
        await createdCourse.save();
        user.courses.push(createdCourse);
        await user.save();
        console.log(createdCourse);
        
        return res.status(200).json({createdCourse, code :200,message: "Course created successfully"});

    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}
async  updateCourse(req,res){
    try{
        const studentId = req.params.studentid; 
        const courseId = req.params.courseid; 
        const { name, id, grade } = req.body;

    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}

async  deleteCourse(req,res){
    try{
        const studentId = req.params.studentid; 
        const deleteCourse = req.params.courseid; 
        const stu = await Student.findOne({ id: studentId });
    
        if(!(studentId && deleteCourse)){
            console.log("fields are empty");
            return res.status(400).json({ error: { message: "Bad Request" } });
        }   
        if (!stu)
        {
            console.log("student not found");
            return res.status(400).json({ error: { message: "Bad Request" } });

        }
         await Course.findOneAndDelete({id : deleteCourse},async function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted Course is  : ", docs);
              await  Student.findOneAndUpdate({ id: studentId }, {
                    $pull : {
                        courses :docs._id
                }})
                return res.status(200).json({docs }); 
            }
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}
}

module.exports = new CourseController();