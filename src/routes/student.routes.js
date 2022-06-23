const express = require("express");
const router = express.Router();

//controllers
const studentController =  require('controllers/studentController');

//validators

router.get("/",  studentController.getAllUsers );
router.post( "/",  studentController.createUser );
router.put("/:id", studentController.updateUser );
router.delete("/:id", studentController.deleteUser );

module.exports = router;