const router = require('express').Router();

const weatherController = require('./controllers/weatherController');

router.use('/api', weatherController);

router.all('*', (req, res) => {
    res.send('404');
});

module.exports = router;
