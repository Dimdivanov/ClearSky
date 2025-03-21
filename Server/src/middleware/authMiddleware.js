const jwt = require('../lib/jwt');
const { SECRET } = require('../config');

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        res.clearCookie('auth');
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.isAuth = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};
