const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { SECRET } = require('../config');

exports.register = async function register({ username, email, password, rePassword }) {
    if (!username || !email || !password || !rePassword) {
        throw new Error('All fields are required.');
    }

    if (password != rePassword) {
        throw new Error('Passwords do not match.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already exists.');
    }

    try {
        const createdUser = await User.create({ username, email, password });
        const token = await generateToken(createdUser);

        return token;
    } catch (err) {
        throw new Error('Erro registering user: ', err.message);
    }
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

    const token = await generateToken(user);
    return token;
};

exports.logout = async function logout(req, res) {
    res.clearCookie('auth').status(204).send({ message: 'Logged out' });
};

async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: '3h' });

    return token;
}
