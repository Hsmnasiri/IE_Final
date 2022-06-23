const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    require:true
  },
  name: {
    type: String
  },
  average: {type :  Number, default:0 },
  courses:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' ,}],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' },
  }
);


module.exports = mongoose.model("Student", studentSchema);