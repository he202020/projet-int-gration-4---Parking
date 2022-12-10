const sqlConnection = require("../index");
const token = require('../token');

exports.login = async function (request, response) {
    try {
        const result = await sqlConnection`
            select person_id from person
            where person_email=${request.body.person_email} and person_password=${request.body.person_password}
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