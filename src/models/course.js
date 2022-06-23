const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
      },
    grade:{
        type:Number,
        require: true
    }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Course", CourseSchema);
