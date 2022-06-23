const _ = require('joi');
const Course = require('../models/course');
const Student = require('../models/student');

let controller = require("./controller");

class CourseController extends controller {
 
    async  create(req,res){
        try{
            console.log("we are in create course Function");

            const { name, grade, id } = req.body;
            //check  body fields are exist
            if (!(id && grade && name))
            {
                console.log("fields are empty")
                return res.status(400).json({ error: { message: "Bad request" } });
            }
             //check  param fields are exist

            const sId = req.params.studentid;
            if (!sId)
            {
                console.log("param is empty")
                return res.status(400).json({ error: { message: "Bad request" } });
            }
            //check user exists
            const user = await Student.findOne({ id:sId }).populate({ path: 'courses' });
            if (!user)
            {
                console.log("user not found")
                return res.status(400).json({ error: { message: "Bad request" } });
            }
            const courses = user.courses;
              //name and id will not repeated for this user
                    const isOkForCreate= courses.find(item => 
                    {   
                          return  item.id == id || item.name==name
                       
                    })
            console.log(isOkForCreate)
                    if (isOkForCreate){
                        console.log("name or id is repeated");
                        return res.status(400).json({ error: { message: "Bad Request" } });
                    }

            //create new Course
            const createdCourse = await Course.create({ name: name, grade: grade, id: id });
        

            //calculate new average
            user.average = (user.average * (user.courses.length - 1) + grade) / user.courses.length;
            
            //push new course for the Student
            user.courses.push(createdCourse);
            await user.save();
            

            //response
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

    async getAll(req,res){
        try{
            const studentId = req.params.studentid;
            console.log(studentId);
            const student = await Student.findOne({id : studentId}).populate({path : 'courses',select:["id","name","grade"]});
        
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

    async  update(req,res){
        try
        {
            const cId = req.params.courseid; 
            const sId = req.params.studentid; 
        
            const { name, id, grade } = req.body;
            if(!(sId && cId)){
                console.log("fields are empty");
                return res.status(400).json({ error: { message: "Bad Request" } });
            }   

            //check the user exist
            const foundStudent = await Student.findOne({ id: sId }).populate({path : 'courses'});
            if (!foundStudent){
                console.log("student not found");
                return res.status(400).json({ error: { message: "Bad Request" } });

            }
            
            //check the course exist
            const updateCourse = await Course.findOne({ id: cId })
            if (!updateCourse){
                console.log("course not found");
                return res.status(400).json({ error: { message: "Bad Request" } });
            }

            //check the user owns the course
            const courses = foundStudent.courses;
            const isOwner= courses.map(item => 
                {
                    if (item.id == cId)
                    {
                        return true;
                    }else
                        return false;
                })
            if (!isOwner){
                console.log("this user is not the Owner of this Course");
                return res.status(400).json({ error: { message: "Bad Request" } });
            }
            //name and id will not repeated for this user
            const isOkForUpdate= courses.find(item => 
                {
                  return  item.id == id || item.name==name

                })
            if (isOkForUpdate){
                console.log("id or name is repeated");
                return res.status(400).json({ error: { message: "Bad Request" } });
            }
            //calculate new average
            foundStudent.average = ((foundStudent.average * courses.length) - updateCourse.grade + grade) / courses.length;
            await foundStudent.save();

            updateCourse.id =  updateCourse.id; 
            updateCourse.grade =  updateCourse.grade; 
            updateCourse.name =  updateCourse.name; 
            if (name)
            {
                updateCourse.name =  name; 
            }
            if (id)
            {
                updateCourse.id =  id; 
            }
            if (!grade)
            {
                console.log("grade is empty");
                return res.status(400).json({ error: { message: "Bad Request" } });
            }
            updateCourse.grade =  grade; 
            await updateCourse.save();

            return res.status(200).json({
                name: updateCourse.name,
                id: updateCourse.id,
                grade: updateCourse.grade,
                code: 200,
                message: "grade updated successfully!"
            }); 
        }catch(e){
            console.log(e);
            return res.status(500).json({ error: { message: "Internal Server Error" } });
        }
    }

    async delete(req,res){
        try
        {
            console.log("we are in delete course Function");

            const sId = req.params.studentid; 
            const dCourse = req.params.courseid; 

        
            if(!(sId && dCourse)){
                console.log("fields are empty");
                return res.status(400).json({ error: { message: "Bad Request" } });
            }

            //check the user exist
            const foundStudent = await Student.findOne({ id: sId });
            if (!foundStudent){
                console.log("student not found");
                return res.status(400).json({ error: { message: "Bad Request" } });

            }
            //check the course exist
            await Course.findOneAndDelete({id : dCourse}, async function (err, c) {
                if (!err){
                    if (!c){
                        console.log("Course not found");
                        return res.status(400).json({ error: { message: "Bad Request" } });
                    }
                    //calculate new average
                    const foundUser = await Student.findOne({ id: sId });
                    foundUser.average = ((foundUser.average * foundUser.courses.length) - c.grade) / (foundUser.courses.length - 1);
                    await foundUser.save();

                    //remove  the course from array course of the User
                    await Student.findOneAndUpdate({ id: sId }, {
                        $pull : {
                            courses :c._id
                        }
                    })
                    
                    //response
                    return res.status(200).json({
                        name: c.name,
                        id: c.id,
                        grade: c.grade,
                        code: 200,
                        message: "course deleted successfully!"
                    }); 
                }
                else
                    console.log(err)
            });
        }catch(e){
            console.log(e);
            return res.status(500).json({ error: { message: "Internal Server Error" } });
        }
    }
}

module.exports = new CourseController();