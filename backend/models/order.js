const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: [{ name: String, quantity: Number }],
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
    deliveryDate: Date,
})
module.exports = mongoose.model('Order', orderSchema);