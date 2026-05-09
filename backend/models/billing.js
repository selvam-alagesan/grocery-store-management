const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    customerName: String,
    customerNumber: Number,
    cashierName: String,
    items: [{
        productname: String,
        barcode: String,
        price: Number,
        quantity: Number,
    }],
    totalAmount: Number,
    paymentMethod: String,
    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model("Billing", userSchema);