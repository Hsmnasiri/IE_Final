const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
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
