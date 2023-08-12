require('dotenv').config();
const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, `${process.env.SECREAT_KEY}`, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}

module.exports = authentication;