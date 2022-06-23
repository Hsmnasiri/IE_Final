const express = require("express");
const router = express.Router();

//controllers
const courseController =  require('controllers/courseController');

//validators

router.post("/",  courseController.getAllUsers );
router.get( "/",  courseController.createUser );
router.put("/:id", courseController.updateUser );
router.delete("/:id", courseController.deleteUser );

module.exports = router;