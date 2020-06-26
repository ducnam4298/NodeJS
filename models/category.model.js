const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required:[true,'must be the correct name'],
        validate: {
            validator: (v) => {
                return /^[a-z A-Z]*$/.test(v);
            },
            message: props => `${props.value}is not a valid name`
        }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

categorySchema.index({ name: 1 });

module.exports = mongoose.model('categories', categorySchema);