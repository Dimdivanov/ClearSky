const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT } = require('../config');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: [5, 'Username should be at least 5 characters'],
            validate: {
                validator: function (v) {
                    return /[a-zA-Z0-9]+/g.test(v);
                },
                message: (props) =>
                    `${props.value} must contains only latin letters and digits!`,
            },
        },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: {
            type: String,
            required: true,
            minlength: [5, 'Password should be at least 5 characters'],
            validate: {
                validator: function (v) {
                    return /[a-zA-Z0-9]+/g.test(v);
                },
                message: (props) =>
                    `${props.value} must contains only latin letters and digits test!`,
            },
        },
        savedLocation: [{ type: ObjectId, ref: 'City' }],
    },
    { timestamps: { createdAt: 'created_at' } }
);

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    },
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, SALT);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
