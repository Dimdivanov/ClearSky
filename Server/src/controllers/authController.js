const router = require('express').Router();
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
        res.status(201).json({ message: 'Registration successful'});
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
        res.status(201).json({ message: 'Login successful'});
    } catch (err) {
        console.error('Error logging the user:', err);
        res.status(400).json({ error: 'Login was not successful try again!' });
    }
});

router.post('/logout', async (req, res) => {
    return await authService.logout(req, res);
});

module.exports = router;
