const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { HASH } = require('../config');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        savedLocation: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, HASH);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
