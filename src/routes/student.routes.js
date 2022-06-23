const express = require("express");
const router = express.Router();

//controllers
const studentController =  require('../controllers/student.controller');

//validators

router.get("/",  studentController.getStudents );
router.post( "/",  studentController.createStudent );
router.put("/:studentid", studentController.updateStudent );
router.delete("/:studentid", studentController.deleteStudent );

module.exports = router;