const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: String,
    status: { type: Number, required: true },
    product:[{
        name:{type:String},
        
    }],
    total_price: { type: Number, required: true },
    description: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

orderSchema.index({name: 1 });

module.exports = mongoose.model('orders', orderSchema);