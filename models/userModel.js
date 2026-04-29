


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNo: { type: String, default: '' },
    mobileNo: { type: String, default: '' },
    address: { type: String, default: '' },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: { type: String, required: true },
    // Remove confirmPassword from schema - it's only for validation
    termCondition: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["customer", "admin", "counter"],
        default: "customer"
    },
    isVerified: { type: Boolean, default: false },
    registeredDate: { type: String, default: () => new Date().toISOString() }
});

// Don't store confirmPassword in database
userSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;