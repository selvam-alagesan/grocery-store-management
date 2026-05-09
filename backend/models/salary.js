const mongoose = require("mongoose");
const salarySchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },

  employees: [
    {
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      finalSalary: {
        type: Number,
        required: true
      },
      remarks: {
        type: String,
        default: "No remarks"
      }
    }
  ],

  supervisors: [
    {
      supervisorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supervisor",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      finalSalary: {
        type: Number,
        required: true
      },
      remarks: {
        type: String,
        default: "No remarks"
      }
    }
  ],

  totalEmployeeSalary: {
    type: Number,
    required: true
  },

  totalSupervisorSalary: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});




module.exports = mongoose.model("Salary", salarySchema);