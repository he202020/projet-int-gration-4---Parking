const sqlConnection = require("../index");
const crypto = require('crypto');

exports.postUserData = async function (request, response) {
    try {
        if (request.body.password.length < 8) {
            response.status(400).send('le mot de passe doit contenir au moins 8 caractères')
        }
        else {
            await sqlConnection`
                insert into app_user (id, firstname, lastname, email, password, company, numberplate)
                values (${crypto.randomUUID()}, ${request.body.firstname}, ${request.body.lastname},
                        ${request.body.email}, ${request.body.password}, ${request.body.company},
                        ${request.body.numberplate})
            `;
            response.status(201).send('l\'utilisateur a bien été créé');
        }
    }
    catch (error) {
        response.status(400).send(error.message);
    }
}