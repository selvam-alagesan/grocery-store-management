const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  
  name: String,
  username: String,
  password: String,
  dob: Date,
  phoneno:Number,
  aadharno: Number,
  temadd: String,
  peradd: String,
  salary: Number,
  
  gender: String,
  attendence: [{
    date: Date,
    status: String,
  }],
  },
  { timestamps: true }
);
userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
 
});

userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
};



module.exports = mongoose.model("Supervisor", userSchema);