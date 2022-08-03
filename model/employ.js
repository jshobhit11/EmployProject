const mongoose = require("mongoose");

const EmploySchema = new mongoose.Schema({

  name: {
    type: String,
  },
  salary: {
    type: Number,
    min:0,
  },
  age: {
    type: Number,
  }
});

const Employ=mongoose.model('Employ',EmploySchema);
module.exports=Employ;