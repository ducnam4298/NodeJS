const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'must be the correct name'],
        validate: {
            validator: (v) => {
                return /^[a-z A-Z 0-9]*$/.test(v);
            },
            message: props => `${props.value}is not a valid name`
        }
    },
    color: new Array(),
    quantity: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

sizeSchema.index({ name: 1 });

module.exports = mongoose.model('sizes', sizeSchema);