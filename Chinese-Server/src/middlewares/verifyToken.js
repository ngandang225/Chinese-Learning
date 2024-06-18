const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = {
    
    authenToken (req, res, next) {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) 
            res.status(401).json('Unauthorized error!');

        // Beaer [token] 
        const token = authorizationHeader.split(' ')[1];
        if (!token) 
            res.status(401).json('Unauthorized error!');

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) 
                res.status(403).json('Forbidden action!');
            req.user = user;
            next();
        })
    },

    verifyTokenAdmin (req, res, next) {
        verifyToken.authenticationToken(req, res, () => {
            if (req.user.role == 1) {
                next();
            }
            else {
                res.status(403).json('You are not allowed to this action!');
            }
        })
    }
}

module.exports = verifyToken;