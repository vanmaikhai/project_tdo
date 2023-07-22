const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token)
            return res.status(403).send({
                message: 'Access denied.',
            });

        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send({
            message: 'Invalid token',
        });
    }
};
