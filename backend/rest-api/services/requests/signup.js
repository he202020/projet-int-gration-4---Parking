const sqlConnection = require("../index");

exports.postUserData = async function (request, response) {
    try {
        await sqlConnection`
            insert into person (person_id, person_firstname, person_lastname, person_email, person_password)
            values (${request.body.person_id}, ${request.body.person_firstname}, ${request.body.person_lastname}, ${request.body.person_email}, ${request.body.person_password})
        `;
        response.status(201).send('l\'utilisateur a bien été créé');
    }
    catch (error) {
        response.status(400).send(error.message);
    }
}