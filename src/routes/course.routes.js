const express = require("express");
const router = express.Router();

//controllers
const courseController =  require('../controllers/course.controller');

//routes

router.post("/:studentid/course",  courseController.createCourse );
router.get( "/:studentid",  courseController.getCourses );
router.put("/:studentid/:courseid", courseController.updateCourse );
router.delete("/:studentid/:courseid", courseController.deleteCourse );

module.exports = router;