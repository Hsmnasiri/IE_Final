const express = require("express");
const router = express.Router();

//controllers
const courseController =  require('../controllers/course.controller');

//routes
router.post("/:studentid/course",  courseController.create );
router.get( "/:studentid",  courseController.getAll );
router.put("/:studentid/:courseid", courseController.update);
router.delete("/:studentid/:courseid", courseController.delete);

module.exports = router;