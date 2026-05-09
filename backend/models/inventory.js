const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  
  productname: String,
  brandname: String,
  price : Number,
  unitquantity: Number,
  type: String,
  Items: [{
    barcode: Number,
    purchasingDate: Date,
    expiringDate: Date,
  }],
  }
);
module.exports = mongoose.model("Inventory", userSchema);