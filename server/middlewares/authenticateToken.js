const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../connect');

const authenticateToken = (req, res, next) => {
    // console.log(req.headers);
    const authHeader = req.headers.authorization;
    // console.log(authHeader)
    // console.log('jwtsecret', jwtsecret);
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(500).send('Token not provided');
    jwt.verify(token, jwtsecret, (err, user) => {
        if (err) {
            return res.status(500).send('Unauthorized');
        }
        req.user = user;
        // console.log(user);
        next();
    })
}

module.exports = {
    authenticateToken
}