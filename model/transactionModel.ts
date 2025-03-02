const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    bookingDetails: Object,
    customerDetails: Object
},{
    versionKey: false
});

export const Transaction = mongoose.model('transactions', transactionSchema);