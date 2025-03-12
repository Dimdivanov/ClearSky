const router = require('express').Router();

const weatherController = require('./controllers/weatherController');
const authController = require('./controllers/authController');

router.use('/api', weatherController);
router.use('/auth', authController);

router.all('*', (req, res) => {
    res.render('404');
});

module.exports = router;
