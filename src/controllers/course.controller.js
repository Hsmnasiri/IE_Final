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

    return res.status(200).json({
        studentId: student.id,
        average: student.average,
        Courses: student.courses,
        last_updated: student.last_updated,
        code: 200, message: "All courses received successfully!"
    });

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
        const preAvg = user.average;
        user.courses.push(createdCourse);
        user.average = (preAvg*(user.courses.length -1)+grade)/user.courses.length
        await user.save();
        console.log(createdCourse);
        
        return res.status(200).json({
            name: createdCourse.name,
            id: createdCourse.id,
            grade: createdCourse.grade,
            code: 200,
            message: "Course created successfully"
        });

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
        const stu = await Student.findOne({ id: studentId });
    
        if(!(studentId && courseId)){
            console.log("fields are empty");
            return res.status(400).json({ error: { message: "Bad Request" } });
        }   
        if (!stu)
        {
            console.log("student not found");
            return res.status(400).json({ error: { message: "Bad Request" } });

        }
        const updatedCourse =await Course.findOneAndUpdate({id : courseId}, {name : name , id : id, grade:grade})

        return res.status(200).json({
            name: updatedCourse.name,
            id: updatedCourse.id,
            grade: updatedCourse.grade,
            code: 200,
            message: "grade updated successfully!"
        }); 
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
                if (!docs)
                {
                    console.log("Course not found");
                    return res.status(400).json({ error: { message: "Bad Request" } });
                }
                await Student.findOneAndUpdate({ id: studentId }, {
                    average: docs.average,
                    $pull : {
                        courses :docs._id
                    }
                })
                
                
                return res.status(200).json({
                    name: docs.name,
                    id: docs.id,
                    grade: docs.grade,
                    code: 200,
                    message: "course deleted successfully!"
                }); 
            }
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({ error: { message: "Internal Server Error" } });
    }
}
}

module.exports = new CourseController();