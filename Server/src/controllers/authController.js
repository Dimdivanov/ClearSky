const router = require('express').Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        await authService.register(userData);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('Error registering the user:', err);
        res.status(500).json({ error: 'Server couldn not register user!' });
    }
});

router.post('/login', async (req, res) => {
    const loginData = req.body;
    try {
        const token = await authService.login(loginData);
        res.cookie('auth', token);
    } catch (err) {
        console.log('login was not successful try again');
    }
});
module.exports = router;
