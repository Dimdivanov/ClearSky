const { SECRET } = require('../config');
const User = require('../models/User');

exports.register = async function register({ username, email, password, rePassword }) {
    if (!username || !email || !password || !rePassword) {
        throw new Error('All fields are required.');
    }

    if (password != rePassword) {
        throw new Error('Passwords do not match.');
    }

    const user = await User.findOne({ email });
    if (user) {
        throw new Error('Email already exists.');
    }

    return User.create({ username, email, password, rePassword });
};

exports.login = async function login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email or password is invalid');
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Email or password do not match');
    }

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '3h' });
    return token;
};
