const express = require("express");
const router = express.Router();

//controllers
const studentController =  require('../controllers/student.controller');

//validators

router.get("/",  studentController.getAll );
router.post( "/",  studentController.create );
router.put("/:studentid", studentController.update );
router.delete("/:studentid", studentController.delete );

module.exports = router;