const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required:[true,'must be the correct name'],
        validate: {
            validator: (v) => {
                return /^[a-z A-Z 0-9]*$/.test(v);
            },
            message: props => `${props.value}is not a valid name`
        }
    },
    category: String,
    size: new Array(),
    price: { type: Number, required: true },
    image: [String],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

productSchema.index({name: 1 });

module.exports = mongoose.model('products', productSchema);