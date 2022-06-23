const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  average: Number,
  courses:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' ,}],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Student", studentSchema);