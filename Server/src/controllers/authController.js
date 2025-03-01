const router = require('express').Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        await authService.register(userData);
        res.status(201).json({ message: 'User registered successfully!' });
        res.redirect('/auth/login');
    } catch (err) {
        console.error('Error registering the user:', err);
        res.status(500).json({ error: 'Server couldn not register user!' });
    }
});

module.exports = router;
