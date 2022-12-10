const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: (user) => {
        return jwt.sign(user, process.env.TOKEN, {expiresIn: 60 * 60});
    },
    authenticateToken: (request, response, next) => {
        const header = request.headers['authorization'];
        const token = header && header.split(' ')[1];
        if (!token) {
            response.sendStatus(401);
        }
        jwt.verify(token, process.env.TOKEN, (error, user) => {
            if (error) {
                response.status(401).send('token non valide');
            }
            request.user = user;
            next();
        });
    }
};