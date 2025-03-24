const router = require('express').Router();
const User = require('../models/User');
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        const token = await authService.register(userData);
        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });
        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        console.error('Error registering the user:', err);
        res.status(400).json({ error: 'Server couldn not register user!' });
    }
});

router.post('/login', async (req, res) => {
    const loginData = req.body;
    try {
        const token = await authService.login(loginData);
        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });
        res.status(201).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error logging the user:', err);
        res.status(400).json({ error: 'Login was not successful try again!' });
    }
});

router.post('/logout', async (req, res) => {
    return await authService.logout(req, res);
});

router.get('/profiles/:username', async (req, res) => {
    const { _id: userId } = req.user;

    try {
        const user = await User.findOne({ _id: userId }, { password: 0, __v: 0 }).lean();
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching the user info:', err);
        res.status(400).json({ error: 'Cannot get user info' });
    }
});

module.exports = router;
