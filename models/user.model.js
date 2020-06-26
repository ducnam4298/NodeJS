const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'must be the correct name'],
        validate: {
            validator: (v) => {
                return /^[a-z A-Z]+$/.test(v);
            },
            message: props => `${props.value} is not name`
        }
    },
    address: {
        type: String,
        required: [true, 'must be the correct address'],
        validate: {
            validator: (v) => {
                return /^[a-z A-Z 0-9]*$/.test(v);
            },
            message: props => `${props.value} is not address`
        }
    },
    phone: {
        type: String,
        required: [true, 'must be the correct phone'],
        validate: {
            validator: (v) => {
                return /^[0-9]{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone`
        }
    },
    email: {
        type: String,
        required: [true, 'must be the correct email'],
        validate: {
            validator: (v) => {
                return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: { type: String, required: true },
    role: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

userSchema.index({ name: 1, phone: 1 });

module.exports = mongoose.model('users', userSchema);