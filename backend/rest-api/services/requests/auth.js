const jwt = require('jsonwebtoken');

exports.authenticate = async function (req, res, next) {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        console.log("No token");
        res.status(401);
    }

    try {
        if (await jwt.verify(token, process.env.SECRET_KEY)) {
            console.log("User is authorized");
            next();
        } else {
            console.log("Unauthorized user");
            res.status(401);
        }
    } catch (err) {
        res.send(err.message)
    }
};

exports.hashPassword = async function (req, res, next) {
    const { hash } = req.body;
    req.body.hash = await bcrypt.hash(hash, 10);
    next();
}

exports.verifyPassword = async function (receivedPassword, password) {
    return await bcrypt.compare(receivedPassword, password);
}
