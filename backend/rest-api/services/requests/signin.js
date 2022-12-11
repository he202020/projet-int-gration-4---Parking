const sqlConnection = require("../index");
const token = require('../token');

exports.login = async function (request, response) {
    try {
        const result = await sqlConnection`
            select id, is_admin from app_user
            where email=${request.body.email} and password=${request.body.password}
        `;
        if (!result.length) {
            response.status(401).send('votre email ou votre mot de passe est incorrect');
        }
        else {
            const accessToken = token.generateToken(result[0]);
            response.status(200).send({accessToken, message: 'loggé'});
        }
    }
    catch (error) {
        response.status(400).send(error.message);
    }
}