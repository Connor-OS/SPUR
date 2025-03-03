const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    bookingDetails: Object,
    customerDetails: Object,
    paid: {type: Boolean, default: false}
},{
    versionKey: false
});

export const Transaction = mongoose.model('transactions', transactionSchema);